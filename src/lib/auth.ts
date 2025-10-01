import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export interface User {
  sub: string;
  email: string;
  rol: string;
  shopId: string;
  iat?: number;
  exp?: number;
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (
      typeof payload.sub === "string" &&
      typeof payload.email === "string" &&
      typeof payload.rol === "string" &&
      typeof payload.shopId === "string"
    ) {
      return {
        sub: payload.sub,
        email: payload.email,
        rol: payload.rol,
        shopId: payload.shopId,
        iat: typeof payload.iat === "number" ? payload.iat : undefined,
        exp: typeof payload.exp === "number" ? payload.exp : undefined,
      };
    }

    return null;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}

export async function getServerSession(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    return verifyToken(token);
  } catch (error) {
    console.error("Error getting server session:", error);
    return null;
  }
}

export function deleteCookie(name: string) {
  const isProduction = process.env.NODE_ENV === "production";
  const domain = isProduction ? "; domain=.dukarmo.com" : "";
  const secure = isProduction ? "; secure" : "";
  const sameSite = isProduction ? "; samesite=none" : "; samesite=lax";
  document.cookie = `${name}=; path=/${domain}${secure}${sameSite}; max-age=0`;
}
