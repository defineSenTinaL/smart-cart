import { API } from "@/utils/urls";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const merchantTransactionId = params.id;
  const url = `${API}/payment/user/${merchantTransactionId}`;
    const response: any = await fetch(url);
    const data = await response.json();

    if (data?.code == "PAYMENT_SUCCESS")
    return NextResponse.redirect("http://localhost:3000/order/status/success",{
      status: 301,
    });
  else return NextResponse.redirect("http://localhost:3000/order/status/failed",{
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
