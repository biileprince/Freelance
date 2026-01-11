# Google One Tap Production Setup Guide

## 🔴 CORS Error Fix - "Error retrieving a token"

If you're seeing this error in production:

```
Error retrieving a token.
The fetch of the id assertion endpoint resulted in a network error: ERR_FAILED
Server did not send the correct CORS headers.
```

This means your **production domain is not configured** in Google Cloud Console.

## ✅ Step-by-Step Fix

### 1. Get Your Production Domain

First, identify your production domain:

- Example: `https://yourdomain.com`
- Example: `https://www.yourdomain.com`
- Example: `https://yourapp.vercel.app`

### 2. Update Google Cloud Console

Go to [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials)

#### A. Select Your OAuth 2.0 Client ID

1. Click on your OAuth 2.0 Client ID
2. You should see the configuration page

#### B. Add Authorized JavaScript Origins

In the **Authorized JavaScript origins** section, add:

**For your production domain:**

```
https://yourdomain.com
https://www.yourdomain.com
```

**IMPORTANT:**

- ✅ Use `https://` (required for production)
- ✅ No trailing slash
- ❌ Don't use `http://` in production
- ❌ Don't include paths like `/api/auth`

#### C. Add Authorized Redirect URIs

In the **Authorized redirect URIs** section, add:

```
https://yourdomain.com/api/auth/callback/google
https://www.yourdomain.com/api/auth/callback/google
```

**IMPORTANT:**

- ✅ Must include the full path `/api/auth/callback/google`
- ✅ Must use `https://` in production
- ✅ Must match your BETTER_AUTH_URL exactly

#### D. Save Changes

Click **Save** at the bottom of the page.

### 3. Update Environment Variables

In your **production environment** (Vercel, Railway, etc.), set these:

```env
# Google OAuth Credentials (same as development)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# Better Auth Configuration - MUST be your production domain
BETTER_AUTH_URL=https://yourdomain.com
NEXT_PUBLIC_BETTER_AUTH_URL=https://yourdomain.com

# Better Auth Secret - use a strong random string
BETTER_AUTH_SECRET=your-production-secret-key

# Google One Tap Client ID (public, can be same as GOOGLE_CLIENT_ID)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

**Critical Points:**

- ❌ **NEVER** use `http://localhost:3000` in production
- ✅ Use your actual production domain
- ✅ Must use `https://` (SSL required)
- ✅ Environment variables must match Google Cloud Console settings

### 4. Verify Your Deployment Platform

#### For Vercel:

1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add/Update the variables above
4. **Redeploy** your application

#### For Railway:

1. Go to your project
2. Click on **Variables**
3. Add/Update the variables
4. Railway will auto-redeploy

#### For Other Platforms:

Make sure to:

1. Set environment variables in your platform's dashboard
2. Trigger a new deployment
3. Verify variables are loaded (check build logs)

## 🔍 Verification Checklist

After making changes, verify:

### ✅ Google Cloud Console

- [ ] Production domain added to **Authorized JavaScript origins**
- [ ] Production callback URL added to **Authorized redirect URIs**
- [ ] No `http://` URLs in production (only `https://`)
- [ ] No trailing slashes in origins
- [ ] Changes saved successfully

### ✅ Environment Variables

- [ ] `BETTER_AUTH_URL` set to production domain (https://)
- [ ] `NEXT_PUBLIC_BETTER_AUTH_URL` set to production domain
- [ ] `GOOGLE_CLIENT_ID` matches Google Cloud Console
- [ ] `GOOGLE_CLIENT_SECRET` is set
- [ ] `BETTER_AUTH_SECRET` is set (not "secret-key-change-in-production")
- [ ] `NEXT_PUBLIC_GOOGLE_CLIENT_ID` matches Google Cloud Console

### ✅ Application

- [ ] Application redeployed after environment variable changes
- [ ] Using HTTPS (not HTTP)
- [ ] Browser console shows correct baseURL (not localhost)

## 🧪 Testing in Production

1. **Open your production site** in an incognito/private window
2. **Sign out** if you're logged in
3. **Clear cookies** for your domain
4. **Refresh the page**
5. **Wait 3-5 seconds** for One Tap popup

### Expected Result:

```
┌─────────────────────────────────────┐
│   [Profile Picture]                 │
│   Your Name                         │
│   your@gmail.com                    │
│                                     │
│   [Continue as your@gmail.com]      │
└─────────────────────────────────────┘
```

### If Still Getting Errors:

**Check Browser Console:**

```javascript
// Should show your production domain, NOT localhost
console.log(process.env.NEXT_PUBLIC_BETTER_AUTH_URL);
// Should show: https://yourdomain.com
```

**Check Network Tab:**

1. Open DevTools > Network
2. Look for requests to `accounts.google.com`
3. Check for CORS errors in the console

## 🚨 Common Mistakes

### ❌ Wrong: Using localhost in production

```env
BETTER_AUTH_URL=http://localhost:3000  # WRONG!
```

### ✅ Correct: Using production domain

```env
BETTER_AUTH_URL=https://yourdomain.com  # CORRECT!
```

### ❌ Wrong: Missing https://

```env
BETTER_AUTH_URL=yourdomain.com  # WRONG!
```

### ✅ Correct: Including https://

```env
BETTER_AUTH_URL=https://yourdomain.com  # CORRECT!
```

### ❌ Wrong: Trailing slash in JavaScript origins

```
https://yourdomain.com/  # WRONG!
```

### ✅ Correct: No trailing slash

```
https://yourdomain.com  # CORRECT!
```

### ❌ Wrong: Missing callback path

```
https://yourdomain.com  # WRONG for redirect URI!
```

### ✅ Correct: Full callback path

```
https://yourdomain.com/api/auth/callback/google  # CORRECT!
```

## 🔧 Quick Fix Commands

### Check what environment variables are set:

```bash
# In your deployment platform's console/logs
echo $BETTER_AUTH_URL
echo $NEXT_PUBLIC_BETTER_AUTH_URL
```

### Force rebuild:

```bash
# Trigger a new deployment to ensure env vars are loaded
git commit --allow-empty -m "Force rebuild for env vars"
git push
```

## 📊 Debugging Production Errors

If you're still getting errors, check these in browser console:

### 1. Check Current baseURL

```javascript
console.log("Current baseURL:", process.env.NEXT_PUBLIC_BETTER_AUTH_URL);
// Should output: https://yourdomain.com (NOT localhost)
```

### 2. Check Network Requests

1. Open DevTools > Network
2. Look for requests to `accounts.google.com`
3. Check response headers for CORS issues

### 3. Check Error Messages

The component now provides detailed error messages:

```
🔧 PRODUCTION SETUP CHECKLIST:
1. Add your production domain to Google Cloud Console > Authorized JavaScript origins
2. Add callback URL to Authorized redirect URIs
3. Set BETTER_AUTH_URL and NEXT_PUBLIC_BETTER_AUTH_URL to your production domain
4. Ensure GOOGLE_CLIENT_ID matches the one in Google Cloud Console
5. Verify your domain is using HTTPS (required for One Tap)

📍 Current baseURL: https://yourdomain.com
```

## 🎯 Success Criteria

You know it's working when:

1. ✅ No CORS errors in browser console
2. ✅ One Tap popup appears automatically
3. ✅ Email is displayed in the popup
4. ✅ Clicking "Continue" signs you in successfully
5. ✅ No "ERR_FAILED" or network errors

## 📞 Still Need Help?

If you're still experiencing issues:

1. **Verify OAuth Client Type**: Make sure you're using "Web application" type in Google Cloud Console
2. **Check DNS**: Ensure your domain is properly configured
3. **SSL Certificate**: Verify HTTPS is working (padlock icon in browser)
4. **Wait for Propagation**: Google Cloud Console changes can take 5-10 minutes to propagate
5. **Clear Browser Cache**: Hard refresh (Ctrl+F5 or Cmd+Shift+R)

## 🔐 Security Notes

- ✅ `NEXT_PUBLIC_*` variables are safe to expose (client-side)
- ❌ Keep `GOOGLE_CLIENT_SECRET` and `BETTER_AUTH_SECRET` private (server-only)
- ✅ Always use HTTPS in production (HTTP is insecure and won't work with One Tap)
- ✅ Regenerate `BETTER_AUTH_SECRET` if exposed

## 📚 Related Documentation

- [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- [Better Auth Docs](https://www.better-auth.com/docs/plugins/one-tap)
- [Google Identity Services](https://developers.google.com/identity/gsi/web/guides/overview)

---

**After following this guide, your Google One Tap should work perfectly in production! 🚀**
