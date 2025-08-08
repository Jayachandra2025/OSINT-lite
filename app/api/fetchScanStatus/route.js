import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const requestBody = await request.json();

    // Fetch API call
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };
    const fetchResponse = await fetch(apiUrl + "/status", options);

    const data = await fetchResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
