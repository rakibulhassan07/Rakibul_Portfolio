import { type NextRequest, NextResponse } from "next/server";

// Placeholder session middleware utility.
// This app uses password-cookie auth for /rakib07 and can be extended for Supabase auth flows later.
export const updateSession = (_request: NextRequest) => {
  return NextResponse.next();
};
