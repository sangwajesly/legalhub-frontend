# Frontend Integration Guide for the FastAPI Backend

This document outlines recent architectural changes in the Next.js frontend and details the expected impact on the FastAPI backend.

## Overview of Changes

The frontend's method for handling API requests and user authentication has been refactored to improve security and align with modern best practices. The two main changes are:

1.  **Implementation of a Server-Side API Proxy:** All API requests from the frontend to the backend are now routed through a Next.js server-side proxy.
2.  **Robust Authentication Flow:** The frontend now uses a reactive Firebase `AuthProvider` to manage user sessions and ID tokens.

---

## 1. API Requests are Now Proxied

Previously, the frontend application made direct calls from the user's browser to the FastAPI backend. Now, all requests are first sent to a Next.js API route (`/api/[...path]`), which then forwards them to the backend.

### What this means for the backend:

#### A. Request Origin Has Changed

All incoming API requests will now originate from the **IP address of the Next.js server**, not the end-user's browser IP.

*   **Impact:** Any backend logic that relies on the client's source IP address (e.g., rate limiting, geolocation, IP-based access rules, security logging) will no longer function as intended. All requests will appear to come from a single, trusted source.
*   **Action Required:** **Review all IP-based functionality.** You may need to adapt your security and logging mechanisms. If you need the original user's IP, it must now be explicitly read by the Next.js proxy and forwarded in a custom header like `X-Forwarded-For`.

#### B. CORS Configuration Can Be Simplified

Since the backend is no longer being called directly from a browser on a different origin, your CORS (Cross-Origin Resource Sharing) policy can be adjusted.

*   **Impact:** The backend will now receive server-to-server requests from the Next.js proxy, which is a trusted environment. You no longer need to allowlist the frontend's browser origin (e.g., `http://localhost:3000`).
*   **Action Required:** Review your `CORSMiddleware` settings. You can likely simplify the `allow_origins` list. Depending on your deployment environment, you may be able to restrict it significantly or adjust the policy for server-to-server communication.

```python
# In your get_fast_api_app function:
# You can likely simplify or remove the browser-specific origins from this list.
app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins, # <-- REVIEW THIS LIST
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 2. Authentication and Token Handling

The frontend now uses a more robust, reactive approach to manage Firebase authentication, but **the core authentication contract with the backend remains the same.**

### What this means for the backend:

#### A. Token Verification is Unchanged

The backend should continue to expect a **Firebase ID Token** in the `Authorization` header with the `Bearer` scheme.

*   **Impact:** None. Your existing token validation middleware that verifies the Firebase ID token should continue to work exactly as before.
*   **Action Required:** **No changes are needed for your token validation logic.**

#### B. Extra Layer of Security

As part of the new proxy, the Next.js server now also verifies the Firebase ID token *before* forwarding the request to your backend. This adds an extra layer of security, ensuring that your backend only receives requests from authenticated users with valid tokens.

---

## Summary of Backend Actions

To ensure a smooth transition, please take the following steps:

1.  **[High Priority] Review IP-Dependent Logic:** Identify and update any backend features (like rate limiting or logging) that rely on the end-user's IP address.
2.  **[Recommended] Simplify CORS Policy:** Adjust your `CORSMiddleware` configuration, as you no longer need to handle cross-origin requests directly from the user's browser.
3.  **[Verification] Confirm Token Handling:** No changes are expected, but confirm that your endpoints are still correctly validating the `Authorization: Bearer <token>` header.
