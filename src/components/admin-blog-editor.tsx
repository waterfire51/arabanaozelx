"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Code, Copy, Eye, FileText, List, ListOrdered, Type } from "lucide-react";
import { BLOG_CHATGPT_PROMPT } from "@/lib/blog-chatgpt-prompt";
import { BLOG_ALLOWED_TAGS, sanitizeBlogHtml } from "@/lib/blog-html";

type Tab = "html" | "visual";

type AdminBlogEditorProps = {
  defaultValue?: string;
  inputName?: string;
};

function execCommand(command: string, value?: string) {
  document.execCommand(command, false, value);
}

export function AdminBlogEditor({ defaultValue = "", inputName = "body" }: AdminBlogEditorProps) {
  const initial = defaultValue || "";
  const [tab, setTab] = useState<Tab>("html");
  const [html, setHtml] = useState(initial);
  const [promptOpen, setPromptOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const syncVisualFromHtml = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = sanitizeBlogHtml(html) || "<p></p>";
    }
  }, [html]);

  useEffect(() => {
    if (tab === "visual") {
      syncVisualFromHtml();
    }
  }, [tab, syncVisualFromHtml]);

  function switchTab(next: Tab) {
    if (next === "visual" && tab === "html") {
      setHtml(sanitizeBlogHtml(html));
    }
    if (next === "html" && tab === "visual" && editorRef.current) {
      setHtml(editorRef.current.innerHTML);
    }
    setTab(next);
  }

  function onVisualInput() {
    if (editorRef.current) {
      setHtml(editorRef.current.innerHTML);
    }
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(BLOG_CHATGPT_PROMPT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const allowedList = BLOG_ALLOWED_TAGS.join(", ");

  return (
    <div className="admin-blog-editor space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="form-label mb-0">İçerik</span>
        <div className="inline-flex rounded-lg border border-[#e2e5eb] bg-white p-0.5 text-sm font-bold">
          <button
            type="button"
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 ${tab === "html" ? "bg-[#111] text-white" : "text-[#525866]"}`}
            onClick={() => switchTab("html")}
          >
            <Code size={14} /> HTML yapıştır
          </button>
          <button
            type="button"
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 ${tab === "visual" ? "bg-[#111] text-white" : "text-[#525866]"}`}
            onClick={() => switchTab("visual")}
          >
            <Eye size={14} /> Görsel önizleme
          </button>
        </div>
      </div>

      <p className="text-xs text-[#6b7280]">
        ChatGPT çıktısını <strong>HTML yapıştır</strong> sekmesine yapıştırın. Kayıtta otomatik temizlenir (h1 kaldırılır, izinli etiketler
        kalır).
      </p>

      <details
        className="rounded-lg border border-[#ee3625]/20 bg-[#fff8f7] p-3"
        open={promptOpen}
        onToggle={(event) => setPromptOpen((event.target as HTMLDetailsElement).open)}
      >
        <summary className="cursor-pointer text-sm font-bold text-[#c82014]">ChatGPT kuralları ve sabit prompt</summary>
        <div className="mt-3 space-y-3 text-xs leading-relaxed text-[#374151]">
          <ul className="list-inside list-disc space-y-1">
            <li>
              <strong>h1 kullanma</strong> — sayfa başlığı panelde ayrı; içerikte h2 → h3 → h4
            </li>
            <li>İzinli etiketler: {allowedList}</li>
            <li>img, iframe, script, div, class, style kullanma</li>
            <li>Meta başlık / özet / anahtar kelime HTML içine yazma</li>
          </ul>
          <button type="button" className="secondary-button text-xs" onClick={() => void copyPrompt()}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Kopyalandı" : "Promptu ChatGPT’ye kopyala"}
          </button>
          <p className="text-[#9ca3af]">
            Detaylı kurallar: <code className="rounded bg-white px-1">docs/blog-chatgpt-prompt.md</code>
          </p>
        </div>
      </details>

      {tab === "html" ? (
        <textarea
          className="form-input min-h-[320px] font-mono text-xs leading-relaxed"
          value={html}
          onChange={(event) => setHtml(event.target.value)}
          placeholder={'<h2>Başlık</h2>\n<p>ChatGPT HTML çıktısını buraya yapıştırın...</p>'}
          spellCheck={false}
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-[#e2e5eb] bg-white">
          <div className="flex flex-wrap gap-1 border-b border-[#eef1f5] bg-[#f8f9fb] p-2">
            <button
              type="button"
              className="admin-blog-tool"
              title="Alt başlık 2"
              onMouseDown={(event) => {
                event.preventDefault();
                editorRef.current?.focus();
                execCommand("formatBlock", "h2");
              }}
            >
              <Type size={14} /> H2
            </button>
            <button
              type="button"
              className="admin-blog-tool"
              title="Alt başlık 3"
              onMouseDown={(event) => {
                event.preventDefault();
                editorRef.current?.focus();
                execCommand("formatBlock", "h3");
              }}
            >
              H3
            </button>
            <button
              type="button"
              className="admin-blog-tool"
              onMouseDown={(event) => {
                event.preventDefault();
                editorRef.current?.focus();
                execCommand("bold");
              }}
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              className="admin-blog-tool"
              onMouseDown={(event) => {
                event.preventDefault();
                editorRef.current?.focus();
                execCommand("italic");
              }}
            >
              <em>I</em>
            </button>
            <button
              type="button"
              className="admin-blog-tool"
              onMouseDown={(event) => {
                event.preventDefault();
                editorRef.current?.focus();
                execCommand("insertUnorderedList");
              }}
            >
              <List size={14} />
            </button>
            <button
              type="button"
              className="admin-blog-tool"
              onMouseDown={(event) => {
                event.preventDefault();
                editorRef.current?.focus();
                execCommand("insertOrderedList");
              }}
            >
              <ListOrdered size={14} />
            </button>
            <button
              type="button"
              className="admin-blog-tool"
              onMouseDown={(event) => {
                event.preventDefault();
                editorRef.current?.focus();
                execCommand("formatBlock", "p");
              }}
            >
              <FileText size={14} /> P
            </button>
          </div>
          <div
            ref={editorRef}
            className="prose-blog admin-blog-visual min-h-[280px] max-h-[480px] overflow-y-auto px-4 py-3 text-sm outline-none"
            contentEditable
            suppressContentEditableWarning
            onInput={onVisualInput}
            onBlur={onVisualInput}
          />
        </div>
      )}

      <input type="hidden" name={inputName} value={sanitizeBlogHtml(html)} readOnly required />

      {html.trim() ? (
        <div className="rounded-lg border border-[#e8ebf0] bg-[#fafbfc] p-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#9ca3af]">Site önizlemesi (kaydedilecek HTML)</p>
          <div
            className="prose-blog max-h-48 overflow-y-auto text-sm"
            dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(html) }}
          />
        </div>
      ) : null}
    </div>
  );
}
