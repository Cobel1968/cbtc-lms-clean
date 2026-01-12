/**
 * cobel business training center - supabase client
 * version: engine v2.7
 * filename: supabaseclient.ts
 */

import { createClient as create_client } from "@supabase/supabase-js";
import { Database as database_interface } from "./database.types"; 

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("missing_env_vars: check vercel settings.");
}

/**
 * phase 1: multi-dimensional diagnostic
 */
export const supabase = create_client<database_interface>(supabaseUrl, supabaseAnonKey);

/**
 * phase 2: dynamic path mapping
 * fetches bilingual catalog (fr/en)
 */
export const getBilingualCatalog = async () => { 
  const { data, error } = await supabase
    .from("courses")
    .select("slug, name_fr, name_en, price, currency, duration_weeks, level, language"); 
  
  if (error) {
    console.error("cobel_sync_error:", error.message);
    return null;
  }
  return data; 
};

/**
 * helper: generic course fetcher
 */
export const getCourses = async () => { 
  const { data, error } = await supabase.from("courses").select("*"); 
  if (error) console.error("fetch_error:", error.message);
  return data; 
};

export default supabase;