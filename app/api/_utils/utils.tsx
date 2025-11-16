import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

export function logErrorResponse(errorObj: unknown) {
  const green = "\x1b[32m";
  const yellow = "\x1b[33m";
  const reset = "\x1b[0m";

  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });

  if (isAxiosError(errorObj)) {
    const status = errorObj.response?.status ?? 500;
    const message = errorObj.response?.data?.message ?? "Something went wrong";
    return NextResponse.json({ error: message }, { status });
  }

  return NextResponse.json({ error: "Unknown error" }, { status: 500 });
}
