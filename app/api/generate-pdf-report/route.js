import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const requestBody = await req.json();
    const reportUrl = `${req.nextUrl.origin}/report?search=${requestBody.search}&sessionId=${requestBody.sessionId}`;
    const isDev = process.env.NODE_ENV === "development";

    requestBody.reportUrl = isDev
      ? `https://osint-lite.vercel.app/report?search=${requestBody.search}&sessionId=${requestBody.sessionId}`
      : reportUrl;

    // Fetch API call
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };
    const fetchResponse = await fetch(apiUrl + "/generate-report", options);

    const data = await fetchResponse.json();
    // console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
