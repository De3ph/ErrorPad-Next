import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fetchUserData from "@/app/methods/fetchuserdata";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const userdata = {
    first_name: String(formData.get("first_name")),
    last_name: String(formData.get("last_name")),
    company: String(formData.get("company")),
    job: String(formData.get("job")),
    role: String(formData.get("role")),
  };

  const supabase = createRouteHandlerClient({ cookies });
  const supabaseUrl = "https://cfypijftqgmdtxtadnva.supabase.co";
  const supabaseRoleKey =
    process.env.NEXT_PRIVATE_SUPABASE_SERVICE_ROLE_KEY || "";
  const supabaseAdmin = createClient(supabaseUrl, supabaseRoleKey);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userData = await fetchUserData(user?.id)
  if (userData?.role == "ADMIN") {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
      password,
      user_metadata: {
        first_name: userdata.first_name,
        last_name: userdata.last_name,
        company: userdata.company,
        job: userdata.job,
        role: userdata.role,
      },
    });
    if (error) {
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${error.message}`,
        {
          // a 301 status is required to redirect from a POST to a GET route
          status: 301,
        }
      );
    }

    return NextResponse.redirect(
      `${requestUrl.origin}/adminDashboard/newEmployee?message=User has been created successfully.`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  } else {
    return NextResponse.redirect(
      `${requestUrl.origin}/adminDashboard/newEmployee?message=Don't have a permisson for create user!`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }
}
