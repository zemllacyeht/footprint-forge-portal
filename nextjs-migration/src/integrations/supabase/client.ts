// Compatibility shim — components import from here, we delegate to the SSR browser client
import { createClient } from "@/lib/supabase/client";

export const supabase = createClient();
