// lib/supabase/server.ts
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type Database } from "@/lib/database.types"; 

export function createClient() {
  return createServerComponentClient<Database>({ cookies });
}
