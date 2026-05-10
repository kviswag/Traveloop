import { createBrowserClient } from "@supabase/ssr";

import { assertSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

export function createClient() {
  const { key, url } = assertSupabaseEnv();

  return createBrowserClient<Database>(url, key);
}
