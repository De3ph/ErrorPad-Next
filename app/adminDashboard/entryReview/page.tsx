export const revalidate = 0

import React from "react"
import {
  SupabaseClient,
  createServerComponentClient
} from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import fetchUserData from "@/app/methods/fetchuserdata"
import { Employee } from "@/app/types/Employee"
import ReviewForm from "./reviewForm"

async function fetchData(supabase: SupabaseClient, company?: string) {
  try {
    let { data: errors, error } = await supabase
      .from("users")
      .select("*")
      .eq("company", company)
    return errors
  } catch (error) {
    console.log(error)
  }
}

const EntryReview = async () => {
  const supabase = createServerComponentClient({ cookies })
  const session = await supabase.auth.getSession()
  if (session.data.session === null) {
    return <div>Unauthorized</div>
  }
  const user = await fetchUserData(session.data.session.user.id)
  const employeeLists: Employee[] =
    (await fetchData(supabase, user?.company)) || []
  return (
    <div>
      <ReviewForm employeeLists={employeeLists} />
    </div>
  )
}

export default EntryReview
