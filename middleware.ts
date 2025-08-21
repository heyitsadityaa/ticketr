import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/auth"]);
const isProtectedRoute = createRouteMatcher(["/seller", "/ticket", "/profile"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
    // If user is on sign-in page and already authenticated, redirect to home
    if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
        return nextjsMiddlewareRedirect(request, "/");
    }

    // If user tries to access protected routes without authentication, redirect to auth
    if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
        return nextjsMiddlewareRedirect(request, "/auth");
    }
});

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};