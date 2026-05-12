"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageLayout } from "@/components/site/PageLayout";
import { Button } from "@/components/ui/button";
import { Loader2, Check, AlertCircle } from "lucide-react";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const FUNCTION_URL = `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe`;

type State = "loading" | "ready" | "already" | "invalid" | "submitting" | "done" | "error";

function UnsubscribeContent() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [state, setState] = useState<State>("loading");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) { setState("invalid"); return; }
    (async () => {
      try {
        const res = await fetch(`${FUNCTION_URL}?token=${encodeURIComponent(token)}`, {
          headers: { apikey: ANON_KEY },
        });
        const data = await res.json();
        if (!res.ok) { setError(data?.error ?? "Invalid link"); setState("invalid"); return; }
        if (data?.alreadyUnsubscribed) { setEmail(data?.email ?? ""); setState("already"); }
        else { setEmail(data?.email ?? ""); setState("ready"); }
      } catch { setState("invalid"); }
    })();
  }, [token]);

  const confirm = async () => {
    setState("submitting");
    try {
      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: ANON_KEY },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? "Could not unsubscribe");
        setState("error");
        return;
      }
      setState("done");
    } catch { setState("error"); }
  };

  return (
    <PageLayout>
      <section className="py-32">
        <div className="container max-w-xl">
          <div className="glass rounded-2xl p-10 text-center">
            {state === "loading" && (
              <><Loader2 className="h-6 w-6 animate-spin mx-auto mb-4 text-muted-foreground" /><p className="text-sm text-muted-foreground">Checking your link…</p></>
            )}
            {state === "ready" && (
              <><h1 className="font-display text-3xl mb-3">Unsubscribe</h1><p className="text-sm text-muted-foreground mb-6">Confirm to stop receiving emails at <span className="text-foreground">{email}</span>.</p><Button variant="hero" onClick={confirm}>Confirm unsubscribe</Button></>
            )}
            {state === "submitting" && (
              <><Loader2 className="h-6 w-6 animate-spin mx-auto mb-4 text-muted-foreground" /><p className="text-sm text-muted-foreground">Updating your preferences…</p></>
            )}
            {state === "done" && (
              <><div className="h-12 w-12 rounded-full bg-primary/15 grid place-items-center mx-auto mb-4"><Check className="h-5 w-5 text-primary" /></div><h1 className="font-display text-3xl mb-3">You're unsubscribed</h1><p className="text-sm text-muted-foreground mb-6">{email} will no longer receive emails from us.</p><Button variant="glass" asChild><Link href="/">Back to home</Link></Button></>
            )}
            {state === "already" && (
              <><h1 className="font-display text-3xl mb-3">Already unsubscribed</h1><p className="text-sm text-muted-foreground mb-6">{email || "This address"} is already opted out.</p><Button variant="glass" asChild><Link href="/">Back to home</Link></Button></>
            )}
            {(state === "invalid" || state === "error") && (
              <><div className="h-12 w-12 rounded-full bg-destructive/15 grid place-items-center mx-auto mb-4"><AlertCircle className="h-5 w-5 text-destructive" /></div><h1 className="font-display text-3xl mb-3">Link not valid</h1><p className="text-sm text-muted-foreground mb-6">{error || "This unsubscribe link is invalid or expired."}</p><Button variant="glass" asChild><Link href="/">Back to home</Link></Button></>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>}>
      <UnsubscribeContent />
    </Suspense>
  );
}
