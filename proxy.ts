import { NextResponse, type NextRequest } from 'next/server';
import { parse } from 'cookie';
import { checkSession } from './lib/api/serverApi';

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken');
  const refreshToken = req.cookies.get('refreshToken');

  const isAuthPage =
    req.nextUrl.pathname.startsWith('/sign-in') ||
    req.nextUrl.pathname.startsWith('/sign-up');

  const isPrivate =
    req.nextUrl.pathname.startsWith('/profile') ||
    req.nextUrl.pathname.startsWith('/notes');

  if (!accessToken && refreshToken && isPrivate) {
    try {
      const res = await checkSession();
      const nextResponse = NextResponse.next();

      const setCookie = res.headers['set-cookie'];
      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed['Max-Age']),
          };
          if (parsed.accessToken) nextResponse.cookies.set('accessToken', parsed.accessToken, options);
          if (parsed.refreshToken) nextResponse.cookies.set('refreshToken', parsed.refreshToken, options);
        }
      }

      return nextResponse;
    } catch {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  if (!accessToken && !refreshToken && isPrivate) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}