import { type NextRequest, NextResponse } from "next/server";
import { register } from "~/server/actions";
import type { SignUpData } from "~/server/types";

export const POST = async (request: NextRequest) => {
  const body = (await request.json()) as SignUpData;

  try {
    await register(body);

    return NextResponse.json({ success: true, created: true }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ success: false, error: e }, { status: 404 });
  }
};
