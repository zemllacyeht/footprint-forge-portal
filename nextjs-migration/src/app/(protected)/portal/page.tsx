import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PortalClient } from "./portal-client";

export default async function PortalPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: roles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id);

  const userRoles = (roles ?? []).map((r) => r.role);

  return <PortalClient userId={user.id} userEmail={user.email ?? ""} userRoles={userRoles} />;
}
