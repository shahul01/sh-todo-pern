

export async function GET() {

  const postReq = await fetch('http://localhost:8000/auth/logout');
  const resPost = await postReq.json();

  return Response.json({ data: resPost });

};
