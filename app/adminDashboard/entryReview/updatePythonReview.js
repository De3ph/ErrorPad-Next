"use server";
import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { headers } from "next/headers";

export default async function updatePythonReview(userEmail, pythonReview) {
  const url = headers().get("referer")
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("users")
    .update({ python_review: pythonReview })
    .eq("email", userEmail);

  if (error) return false;

  return true;
}
