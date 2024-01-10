import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cfypijftqgmdtxtadnva.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseRoleKey = process.env.NEXT_PRIVATE_SUPABASE_SERVICE_ROLE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
