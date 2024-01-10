import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function fetchUserData(id) {
  const supabase = createServerComponentClient({ cookies });
  try {
    let { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id);
    return users[0];
  } catch (error) {
    console.log(error);
  }
}
