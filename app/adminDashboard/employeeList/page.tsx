import React from "react"
import EmployeeTable from "../employeeTable"
import {
  SupabaseClient,
  createServerComponentClient
} from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import fetchUserData from "@/app/methods/fetchuserdata"
import { Employee } from "@/app/types/Employee"

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

async function EmployeeList() {
  const supabase = createServerComponentClient({ cookies })
  const session = await supabase.auth.getSession()
  if (session.data.session === null) {
    return <div>Unauthorized</div>
  }
  const user = await fetchUserData(session.data.session.user.id)
  const employeeLists: Employee[] =
    (await fetchData(supabase, user?.company)) || []

  return (
    <div className='w-full p-8'>
      <header className='w-full text-2xl flex items-center mb-4 text-gray-900'>
        <h2>Employee List</h2>
      </header>
      <div className='w-full'>
        <EmployeeTable dataList={employeeLists} />
      </div>
    </div>
  )
}

export default EmployeeList
