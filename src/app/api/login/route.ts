import { NextResponse } from "next/server";
import { type NextApiRequest } from "next";
import { login } from "~/server/actions";
import { type LoginData } from "~/server/types";

export const GET = async () => {
  return NextResponse.json({ hello: "world" });
};

export const POST = async (request: NextApiRequest) => {
  const body = request.body as LoginData;

  try {
    const res = await login(body);

    return NextResponse.json(res, { status: 201 });
  } catch (e) {
    console.log(e);

    return NextResponse.json({ error: e }, { status: 404 });
  }
};
