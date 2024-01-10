"use server";
import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function updateTypeScriptReview(
  userEmail,
  typescriptReview
) {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("users")
    .update({ typescript_review: typescriptReview })
    .eq("email", userEmail);
  if (error) return false;

  return true;
}
