import { NextRequest, NextResponse } from "next/server";
import { backendBase } from "@/app/utils/constant";

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  const postReq = await fetch(`${backendBase}/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody)
  });

  const resPost = await postReq.json();

  return Response.json({ data: resPost });
};
