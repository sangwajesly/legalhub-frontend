import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    try {
        const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT;
        
        if (serviceAccountEnv) {
            console.log('Initializing Firebase Admin from environment variable.');
            const serviceAccount = JSON.parse(serviceAccountEnv);
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        } else {
            const serviceAccountPath = path.join(process.cwd(), 'firebase-service-account.json');
            if (fs.existsSync(serviceAccountPath)) {
                console.log('Initializing Firebase Admin from local file.');
                const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                });
            } else {
                console.warn('Firebase Admin Service Account not found (env or file). Authentication verification may fail.');
            }
        }
    } catch (error: any) {
        console.error('Firebase Admin SDK initialization error:', error.message);
    }
}

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '').replace(/\/api$/, '') || "http://localhost:8001";

// Define public routes that should bypass token verification in the proxy
const publicRoutes = [
    '/api/v1/auth/login',
    '/api/v1/auth/register',
    '/api/v1/auth/google',
    '/api/v1/auth/refresh',
];

async function handler(req: NextRequest, { params }: { params: { path: string[] } }) {
    const { path } = params;
    
    // Check if path is defined and is an array
    if (!path || !Array.isArray(path)) {
        return new NextResponse(JSON.stringify({ detail: 'Invalid path parameter.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Join the path segments and handle query parameters.
    // The `path` param does not include `/api`, so we need to add it back.
    const requestPath = '/' + path.join('/');
    const { search } = new URL(req.url); // This includes the '?'
    const targetUrl = `${BACKEND_BASE_URL}/api${requestPath}${search}`;

    console.log(`Proxying request to: ${targetUrl}`);

    // If the request path is a public route, bypass token verification and forward
    if (publicRoutes.includes(requestPath)) {
        console.log(`Bypassing token verification for public route: ${requestPath}`);
        try {
            // Forward all headers from the original request, but remove the Authorization header
            // as the backend's public auth routes may not expect it.
            const headers = new Headers(req.headers);
            headers.delete('authorization');

            const backendResponse = await fetch(targetUrl, {
                method: req.method,
                headers: headers,
                body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
                ...(req.method !== 'GET' && req.method !== 'HEAD' && { duplex: 'half' } as any),
            });
            return new NextResponse(backendResponse.body, {
                status: backendResponse.status,
                statusText: backendResponse.statusText,
                headers: backendResponse.headers,
            });
        } catch (error) {
            console.error('Error proxying request to public route:', error);
            return new NextResponse(JSON.stringify({ detail: 'Internal server error during proxy.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }
    }

    // For all other routes, perform token verification
    const authHeader = req.headers.get('authorization');
    const idToken = authHeader?.split(' ')[1];

    if (!idToken) {
        return new NextResponse(JSON.stringify({ detail: 'Authorization token not provided.' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    // Verify the token using Firebase Admin SDK
    try {
        await admin.auth().verifyIdToken(idToken);
    } catch (error) {
        console.error("Error verifying ID token in Next.js API route:", error);
        return new NextResponse(JSON.stringify({ detail: 'Invalid or expired authorization token.' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const backendResponse = await fetch(targetUrl, {
            method: req.method,
            headers: {
                'Content-Type': req.headers.get('content-type') || 'application/json',
                'Authorization': `Bearer ${idToken}`,
                // Forward other headers if necessary
            },
            body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
            // duplex: 'half' is required for streaming request bodies
            ...(req.method !== 'GET' && req.method !== 'HEAD' && { duplex: 'half' } as any)
        });

        // The response from the backend could be of any content type.
        // We should stream it back to the client.
        return new NextResponse(backendResponse.body, {
            status: backendResponse.status,
            statusText: backendResponse.statusText,
            headers: backendResponse.headers,
        });

    } catch (error) {
        console.error('Error proxying request:', error);
        return new NextResponse(JSON.stringify({ detail: 'Internal server error during proxy.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE, handler as HEAD, handler as OPTIONS };
