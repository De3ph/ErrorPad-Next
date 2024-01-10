import React from "react"
import {
  SupabaseClient,
  createServerComponentClient
} from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Button } from "@/ui/index"
import Link from "next/link"
import Image from "next/image"
import pylogo from "@/images/python.png"
import fetchUserData from "../methods/fetchuserdata"

async function adminDashboard() {
  const supabase = createServerComponentClient({ cookies })

  const session = await supabase.auth.getSession()

  if (session.data.session === null) {
    return <div>Unauthorized</div>
  }

  return (
    <div className='space-y-16'>
      <h2 className='text-3xl font-semibold mb-4 text-center'>
        Admin Dashboard
      </h2>
      <div
        className='
      gap-8 flex flex-col items-center
      lg:flex-row lg:gap-0 lg:justify-around lg:items-center 
      h-full'
      >
        <Link href='/adminDashboard/employeeList'>
          <Button className='text-xl max-w-fit' variant='gradient' color='gray'>
            <h3>Employee List</h3>
          </Button>
        </Link>

        <Link href='/adminDashboard/newEmployee'>
          <Button
            className='text-xl max-w-fit'
            variant='gradient'
            color='green'
          >
            Create New Employee
          </Button>
        </Link>
        <Link href='/adminDashboard/entryReview'>
          <Button className='text-xl max-w-fit' variant='gradient' color='gray'>
            Entry Review
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default adminDashboard
