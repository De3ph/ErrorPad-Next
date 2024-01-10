import React from "react";
import CreateEmployeeForm from "./createEmployeeForm";
import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Messages from "@/app/login/messages";
import fetchUserData from "@/app/methods/fetchuserdata";

async function page() {
  const supabase = createServerComponentClient({ cookies });

  const session = await supabase.auth.getSession();

  if (session.data.session === null) {
    return <div>Unauthorized</div>;
  }

  const user = await fetchUserData(session.data.session.user.id);

  var companyMail = user.email?.split("@")[1];
  var company = user.company;
  return (
    <div className="flex w-full px-8 justify-center gap-2 flex-col items-center">
      <CreateEmployeeForm mail={companyMail} company={company} />
      <Messages />
    </div>
  );
}

export default page;
