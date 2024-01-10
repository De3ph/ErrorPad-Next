import React from "react";

import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

import { Card } from "@/ui/index";
import BarChartComponent from "@/components/barchart";
import { Data } from "@/app/types/Error";
import fetchUserData from "@/app/methods/fetchuserdata";
import Languages from "@/app/myErrors/languages";

type ChartData = {
  name: string;
  count: number;
};

async function fetchData(supabase: SupabaseClient, userEmail?: string) {
  try {
    let { data: errors, error } = await supabase
      .from("errors")
      .select("*")
      .eq("user_email", userEmail);

    return errors;
  } catch (error) {
    console.log(error);
  }
}

async function userErrors({ params }: any) {
  const supabase = createServerComponentClient({ cookies });
  const session = await supabase.auth.getSession();

  if (session.data.session === null) {
    return <div>Unauthorized</div>
  }
  const user = await fetchUserData(params.user_id);
  const errors = await fetchData(supabase, user.email);

  let errorCount: ChartData[] = [];
  errors?.forEach((error: Data) => {
    var langNameSliced: string = error?.lang.slice(1);
    var langName: string = error?.lang.charAt(0).toUpperCase() + langNameSliced;
    var index = errorCount.findIndex(({ name }) => name == langName);
    index == -1
      ? errorCount.push({ name: langName, count: 1 })
      : errorCount[index].count++;
  });
  return (
    <Card className=" flex flex-col items-center gap-4 ">
      <h2 className=" text-4xl">{user?.first_name}'s All Errors</h2>
      <div className="flex flex-col md:flex-row">
        <BarChartComponent dataList={errorCount} />
        <Languages urlLink={params.user_id} />
      </div>
    </Card>
  );
}

export default userErrors;
