import { prisma } from "./prisma";
import { headers } from "next/headers";

interface DeviceInfo {
  os: string;
  browser: string;
  device: string;
}

export function parseUserAgent(userAgent: string): DeviceInfo {
  const os = /Windows/.test(userAgent)
    ? "Windows"
    : /Mac/.test(userAgent)
    ? "MacOS"
    : /Linux/.test(userAgent)
    ? "Linux"
    : /Android/.test(userAgent)
    ? "Android"
    : /iOS|iPhone|iPad/.test(userAgent)
    ? "iOS"
    : "Unknown";

  const browser = /Edg\//.test(userAgent)
    ? "Edge"
    : /Chrome\//.test(userAgent)
    ? "Chrome"
    : /Safari\//.test(userAgent)
    ? "Safari"
    : /Firefox\//.test(userAgent)
    ? "Firefox"
    : /MSIE|Trident/.test(userAgent)
    ? "IE"
    : "Unknown";

  const device = /Mobile|Android|iPhone|iPad/.test(userAgent)
    ? "Mobile"
    : /Tablet/.test(userAgent)
    ? "Tablet"
    : "Desktop";

  return { os, browser, device };
}

export async function getClientInfo() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const ipAddress =
    headersList.get("x-forwarded-for")?.split(",")[0] ||
    headersList.get("x-real-ip") ||
    "unknown";

  const deviceInfo = parseUserAgent(userAgent);

  return {
    ipAddress,
    userAgent,
    ...deviceInfo,
  };
}

export async function trackPageView(data: {
  path: string;
  referrer?: string;
  userId?: string;
  sessionId?: string;
}) {
  try {
    const clientInfo = await getClientInfo();

    await prisma.pageView.create({
      data: {
        path: data.path,
        referrer: data.referrer,
        userId: data.userId,
        sessionId: data.sessionId,
        ipAddress: clientInfo.ipAddress,
        userAgent: clientInfo.userAgent,
        os: clientInfo.os,
        browser: clientInfo.browser,
        device: clientInfo.device,
      },
    });
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
}

export async function trackUserActivity(data: {
  action: string;
  category?: string;
  label?: string;
  value?: Record<string, unknown>;
  userId?: string;
  sessionId?: string;
}) {
  try {
    const clientInfo = await getClientInfo();

    await prisma.userActivity.create({
      data: {
        action: data.action,
        category: data.category,
        label: data.label,
        value: data.value ? JSON.stringify(data.value) : null,
        userId: data.userId,
        sessionId: data.sessionId,
        ipAddress: clientInfo.ipAddress,
        userAgent: clientInfo.userAgent,
        os: clientInfo.os,
        browser: clientInfo.browser,
      },
    });
  } catch (error) {
    console.error("Error tracking user activity:", error);
  }
}

export async function createAnalyticsSession(data: {
  sessionId: string;
  userId?: string;
  landingPage: string;
  referrer?: string;
}) {
  try {
    const clientInfo = await getClientInfo();

    await prisma.analyticsSession.create({
      data: {
        sessionId: data.sessionId,
        userId: data.userId,
        landingPage: data.landingPage,
        referrer: data.referrer,
        ipAddress: clientInfo.ipAddress,
        userAgent: clientInfo.userAgent,
        os: clientInfo.os,
        browser: clientInfo.browser,
        device: clientInfo.device,
      },
    });
  } catch (error) {
    console.error("Error creating analytics session:", error);
  }
}

export async function updateAnalyticsSession(
  sessionId: string,
  data: { endedAt?: Date; duration?: number; pageCount?: number }
) {
  try {
    await prisma.analyticsSession.update({
      where: { sessionId },
      data,
    });
  } catch (error) {
    console.error("Error updating analytics session:", error);
  }
}

// Get analytics stats for admin dashboard
export async function getAnalyticsStats(
  timeRange: "today" | "week" | "month" | "all" = "all"
) {
  const now = new Date();
  let startDate: Date;

  switch (timeRange) {
    case "today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    default:
      startDate = new Date(0);
  }

  try {
    const [
      totalPageViews,
      uniqueVisitors,
      totalSessions,
      loginCount,
      signupCount,
      avgSessionDuration,
      topPages,
      osByCount,
      browserByCount,
      deviceByCount,
    ] = await Promise.all([
      // Total page views
      prisma.pageView.count({
        where: { createdAt: { gte: startDate } },
      }),
      // Unique visitors (unique IP addresses)
      prisma.pageView.groupBy({
        by: ["ipAddress"],
        where: { createdAt: { gte: startDate } },
      }),
      // Total sessions
      prisma.analyticsSession.count({
        where: { startedAt: { gte: startDate } },
      }),
      // Login count
      prisma.userActivity.count({
        where: {
          action: "login",
          createdAt: { gte: startDate },
        },
      }),
      // Signup count
      prisma.userActivity.count({
        where: {
          action: "signup",
          createdAt: { gte: startDate },
        },
      }),
      // Average session duration
      prisma.analyticsSession.aggregate({
        _avg: { duration: true },
        where: {
          startedAt: { gte: startDate },
          duration: { not: null },
        },
      }),
      // Top pages
      prisma.pageView.groupBy({
        by: ["path"],
        where: { createdAt: { gte: startDate } },
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 10,
      }),
      // OS distribution
      prisma.pageView.groupBy({
        by: ["os"],
        where: { createdAt: { gte: startDate } },
        _count: { os: true },
        orderBy: { _count: { os: "desc" } },
      }),
      // Browser distribution
      prisma.pageView.groupBy({
        by: ["browser"],
        where: { createdAt: { gte: startDate } },
        _count: { browser: true },
        orderBy: { _count: { browser: "desc" } },
      }),
      // Device distribution
      prisma.pageView.groupBy({
        by: ["device"],
        where: { createdAt: { gte: startDate } },
        _count: { device: true },
        orderBy: { _count: { device: "desc" } },
      }),
    ]);

    return {
      totalPageViews,
      uniqueVisitors: uniqueVisitors.length,
      totalSessions,
      loginCount,
      signupCount,
      avgSessionDuration: avgSessionDuration._avg.duration || 0,
      topPages: topPages.map((p) => ({ path: p.path, views: p._count.path })),
      osByCount: osByCount.map((o) => ({
        os: o.os || "Unknown",
        count: o._count.os,
      })),
      browserByCount: browserByCount.map((b) => ({
        browser: b.browser || "Unknown",
        count: b._count.browser,
      })),
      deviceByCount: deviceByCount.map((d) => ({
        device: d.device || "Unknown",
        count: d._count.device,
      })),
    };
  } catch (error) {
    console.error("Error fetching analytics stats:", error);
    return {
      totalPageViews: 0,
      uniqueVisitors: 0,
      totalSessions: 0,
      loginCount: 0,
      signupCount: 0,
      avgSessionDuration: 0,
      topPages: [],
      osByCount: [],
      browserByCount: [],
      deviceByCount: [],
    };
  }
}

// Get page views over time for charts
export async function getPageViewsOverTime(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  try {
    const pageViews = await prisma.pageView.findMany({
      where: { createdAt: { gte: startDate } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    // Group by date
    const grouped = pageViews.reduce((acc, pv) => {
      const date = pv.createdAt.toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped).map(([date, count]) => ({ date, count }));
  } catch (error) {
    console.error("Error fetching page views over time:", error);
    return [];
  }
}
