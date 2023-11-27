import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest, res:NextResponse) {

  const reqBody = await req.json();
  const postReq = await fetch('http://localhost:8000/auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody)
  });
  const resPost = await postReq.json();

  return Response.json({ data: resPost });
};
