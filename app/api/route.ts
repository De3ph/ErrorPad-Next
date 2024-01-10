import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { decode } from "js-base64"
import { Data } from "../types/Error"

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json({
    message: "Hi"
  })
}

// Handles inserting new errors to db
export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })

  const auth = req.headers.get("authorization")?.replace("Basic", "").trim()
  // [email, password]
  let [email, password] = decode(auth ? auth : "").split(":")

  password = password.replaceAll('"', "")
  email = email.replaceAll('"', "")

  const body: { data: Data[] } = await req.json()

  const { data: isLoggedIn } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (isLoggedIn.user) {
    let updatedData = body?.data.slice().map((item) => {
      let updatedItem = Object()
      Object.assign(updatedItem, item)
      updatedItem["user_email"] = email
      return updatedItem
    })

    const { data, error } = await supabase
      .from("errors")
      .insert(updatedData)
      .select()

    if (error) {
      console.log("🚀 ~ file: route.ts:48 ~ POST ~ error:", error)
    }
  }

  console.log("ok")

  return NextResponse.json({
    message: "ok"
  })
}
