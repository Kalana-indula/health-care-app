import {clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server';
import {NextResponse} from "next/dist/server/web/spec-extension/response";
import {NextRequest} from "next/dist/server/web/spec-extension/request";
import {routeAccess} from "@/lib/routes";

const matchers = Object.keys(routeAccess).map((route) => ({
    matcher: createRouteMatcher([route]),
    allowRoles: routeAccess[route],
}));

export default clerkMiddleware(async (auth, req) => {
    const {userId, sessionClaims} = await auth();
    const url = new URL(req.url);

    const role = userId && sessionClaims?.metadata?.role
        ? sessionClaims.metadata.role : userId ? "patient" : "sign-in";

    const matchingRoute = matchers.find(({matcher})=>matcher(req));

    if(matchingRoute && !matchingRoute.allowRoles.includes(role)){

        //redirect authorized role to their corresponding default page
        return NextResponse.redirect(new URL(`/${role}`,url.origin));
    }

    //continue if the user is authorized
    return NextResponse.next();
})


export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};