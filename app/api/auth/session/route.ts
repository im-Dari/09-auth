import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    const refreshToken = cookieStore.get("refreshToken");

    if (!accessToken && !refreshToken) {
      return NextResponse.json(null, { status: 200 });
    }

    const cookieString = cookieStore.toString();
    
    if (!accessToken && refreshToken) {
      try {
        const apiRes = await api.get("/auth/session", {
          headers: {
            Cookie: cookieString,
          },
        });

        const setCookie = apiRes.headers["set-cookie"];
        if (setCookie) {
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed["Max-Age"]),
            };
            if (parsed.accessToken)
              cookieStore.set("accessToken", parsed.accessToken, options);
            if (parsed.refreshToken)
              cookieStore.set("refreshToken", parsed.refreshToken, options);
          }
        }
      } catch (error) {
        if (isAxiosError(error) && error.status === 401) {
          return NextResponse.json(null, { status: 200 });
        }
        throw error;
      }
    }

    const userRes = await api.get("/users/me", {
      headers: {
        Cookie: cookieString,
      },
    });

    return NextResponse.json(userRes.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.status === 401 || error.status === 403) {
        return NextResponse.json(null, { status: 200 });
      }
      logErrorResponse(error.response?.data);
      return NextResponse.json(null, { status: 200 });
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(null, { status: 200 });
  }
}