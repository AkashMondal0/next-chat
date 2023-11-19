import { getCookie } from 'cookies-next'
import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest, res: NextResponse) {
    const token = getCookie('profile', { req, res })
    const url = req.nextUrl.clone()
    url.pathname = '/auth'

    // const ignorePaths = '/api/authentication/login'.includes(req.nextUrl.pathname) || '/api/authentication/register'.includes(req.nextUrl.pathname) || '/api/authentication/authorize'.includes(req.nextUrl.pathname)

    if (token) {
        return NextResponse.next()
    }
    else {
        // if (req.nextUrl.pathname.includes('/api')) {
        //     if (ignorePaths) {
        //         return NextResponse.next()
        //     }
        //     return NextResponse.json({ error: 'Unauthorized Api' })
        // }
        return NextResponse.redirect(url)
    }
}

export const config = {
    matcher: ["/"],
}