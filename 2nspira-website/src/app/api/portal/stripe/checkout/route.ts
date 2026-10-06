import { NextResponse } from "next/server";

// Retired: this endpoint accepted browser-supplied amounts without an
// authenticated, server-priced billing obligation.
export async function POST() {
  return NextResponse.json(
    { error: "This payment option is unavailable. Use Billing to pay an issued invoice." },
    { status: 410 },
  );
}
