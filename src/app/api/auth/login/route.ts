import { NextRequest, NextResponse } from "next/server";
import api from "../..";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const result = await api().login(email, password);

    const response = NextResponse.json({
      user: {
        name: result.name,
        id: result.id,
        role: result.role,
        shopId: result.shopId,
      },
    });

    response.cookies.set("token", result.token, {
      httpOnly: true,
      secure: false, // 🔹 HTTP en local
      sameSite: "lax", // 🔹 permite cross-site localhost
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
