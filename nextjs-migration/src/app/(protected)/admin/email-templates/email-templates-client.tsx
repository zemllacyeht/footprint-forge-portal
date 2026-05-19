"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AlertCircle, ChevronLeft, FileWarning, Loader2 } from "lucide-react";

type TemplateStatus = "ready" | "preview_data_required" | "render_failed";

interface TemplatePreview {
  templateName: string;
  displayName: string;
  subject: string;
  html: string;
  status: TemplateStatus;
  errorMessage?: string;
}

interface PreviewResponse {
  templates: TemplatePreview[];
}

export function EmailTemplatesClient() {
  const [templates, setTemplates] = useState<TemplatePreview[]>([]);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showRawHtml, setShowRawHtml] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke<PreviewResponse>(
          "preview-transactional-email",
          { body: {} },
        );
        if (cancelled) return;
        if (error) throw error;
        if (!data?.templates) throw new Error("Empty response from preview function");
        setTemplates(data.templates);
        const firstReady = data.templates.find((t) => t.status === "ready");
        setSelectedName(firstReady?.templateName ?? data.templates[0]?.templateName ?? null);
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Unknown error";
        setFetchError(message);
        toast.error(`Could not load templates: ${message}`);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const selected = useMemo(
    () => templates.find((t) => t.templateName === selectedName) ?? null,
    [templates, selectedName],
  );

  const renderTopBar = () => (
    <div className="border-b border-border bg-background px-6 py-4 flex items-center gap-4">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to admin
        </Link>
      </Button>
      <div className="flex-1">
        <h1 className="font-display text-xl">Email template previews</h1>
        <p className="text-xs text-muted-foreground">
          Rendered via <code className="text-foreground">preview-transactional-email</code> with each template&apos;s <code className="text-foreground">previewData</code>.
        </p>
      </div>
      <div className="text-xs text-muted-foreground">
        {templates.length > 0 ? `${templates.length} templates` : null}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col">
        {renderTopBar()}
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin mr-3" />
          Loading templates&hellip;
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col">
        {renderTopBar()}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md text-center space-y-3">
            <AlertCircle className="h-10 w-10 mx-auto text-destructive" />
            <h2 className="font-display text-lg">Could not load templates</h2>
            <p className="text-sm text-muted-foreground">{fetchError}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {renderTopBar()}
      <div className="flex-1 grid grid-cols-[280px_1fr] min-h-0">
        <aside className="border-r border-border bg-muted/20 overflow-y-auto">
          <ul className="py-2">
            {templates.map((t) => {
              const isActive = t.templateName === selectedName;
              return (
                <li key={t.templateName}>
                  <button
                    type="button"
                    onClick={() => setSelectedName(t.templateName)}
                    className={`w-full text-left px-4 py-3 border-l-2 transition-colors ${
                      isActive
                        ? "border-accent bg-background"
                        : "border-transparent hover:bg-background/60 hover:border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{t.displayName}</div>
                        <div className="text-xs text-muted-foreground font-mono truncate">
                          {t.templateName}
                        </div>
                      </div>
                      {t.status === "render_failed" && (
                        <FileWarning className="h-3.5 w-3.5 text-destructive shrink-0" aria-label="Render failed" />
                      )}
                      {t.status === "preview_data_required" && (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0"
                          aria-label="No preview data"
                        />
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <main className="flex flex-col min-h-0 bg-muted/10">
          {selected ? (
            <>
              <div className="border-b border-border px-6 py-3 bg-background">
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-1">
                  Subject
                </div>
                <div className="font-medium text-sm">
                  {selected.subject || <span className="text-muted-foreground italic">No subject (template has no previewData)</span>}
                </div>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <code>{selected.templateName}</code>
                  <span>·</span>
                  <span>{selected.status === "ready" ? "Ready" : selected.status === "preview_data_required" ? "No previewData" : "Render failed"}</span>
                  <span className="flex-1" />
                  <button
                    type="button"
                    onClick={() => setShowRawHtml((v) => !v)}
                    className="underline-offset-2 hover:underline"
                  >
                    {showRawHtml ? "Hide" : "Show"} raw HTML
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-6">
                {selected.status === "ready" ? (
                  <iframe
                    key={selected.templateName}
                    title={`Preview: ${selected.displayName}`}
                    srcDoc={selected.html}
                    sandbox=""
                    className="w-full min-h-[800px] bg-white rounded-lg border border-border shadow-sm"
                  />
                ) : selected.status === "preview_data_required" ? (
                  <div className="max-w-lg mx-auto text-center py-16 space-y-2">
                    <FileWarning className="h-8 w-8 mx-auto text-muted-foreground" />
                    <h3 className="font-medium">No preview data defined</h3>
                    <p className="text-sm text-muted-foreground">
                      Add a <code>previewData</code> field to this template&apos;s registry entry to render a preview.
                    </p>
                  </div>
                ) : (
                  <div className="max-w-lg mx-auto text-center py-16 space-y-2">
                    <AlertCircle className="h-8 w-8 mx-auto text-destructive" />
                    <h3 className="font-medium">Template failed to render</h3>
                    {selected.errorMessage ? (
                      <pre className="text-left text-xs bg-muted p-3 rounded overflow-auto">
                        {selected.errorMessage}
                      </pre>
                    ) : null}
                  </div>
                )}

                {showRawHtml && selected.html ? (
                  <details open className="mt-6">
                    <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                      Raw HTML ({selected.html.length} chars)
                    </summary>
                    <pre className="mt-2 text-xs bg-muted p-3 rounded overflow-auto max-h-96">
                      {selected.html}
                    </pre>
                  </details>
                ) : null}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a template from the sidebar.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
