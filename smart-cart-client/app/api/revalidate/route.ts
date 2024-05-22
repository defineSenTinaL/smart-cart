import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  const id = request.nextUrl.searchParams.get("id");

  console.log(path);

  if (path) {
    //revalidatePath(path);
    revalidateTag('products')
    //revalidatePath('/(home)/[slug]', 'page')
    return Response.json({ revalidated: true, now: Date.now() });
  }
     
  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path to revalidate",
  });
}
