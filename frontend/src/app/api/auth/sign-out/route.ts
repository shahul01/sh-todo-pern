import { backendBase } from "@/app/utils/constant";


export async function GET() {

  const postReq = await fetch(`${backendBase}/auth/logout`);
  const resPost = await postReq.json();

  return Response.json({ data: resPost });

};
