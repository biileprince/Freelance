import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      path,
      referrer,
      ipAddress,
      userAgent,
      os,
      browser,
      device,
      sessionId,
      isNewSession,
    } = body;

    // Track page view
    await prisma.pageView.create({
      data: {
        path,
        referrer,
        ipAddress,
        userAgent,
        os,
        browser,
        device,
        sessionId,
      },
    });

    // Handle session tracking
    if (isNewSession) {
      // Create new analytics session
      await prisma.analyticsSession.create({
        data: {
          sessionId,
          landingPage: path,
          referrer,
          ipAddress,
          userAgent,
          os,
          browser,
          device,
        },
      });
    } else {
      // Update existing session page count
      await prisma.analyticsSession
        .update({
          where: { sessionId },
          data: { pageCount: { increment: 1 } },
        })
        .catch(() => {
          // Session might not exist yet, create it
          return prisma.analyticsSession.create({
            data: {
              sessionId,
              landingPage: path,
              referrer,
              ipAddress,
              userAgent,
              os,
              browser,
              device,
            },
          });
        });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking page view:", error);
    return NextResponse.json(
      { error: "Failed to track page view" },
      { status: 500 }
    );
  }
}
