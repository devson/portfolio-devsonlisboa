"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

function VideoField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (res.ok) { const d = await res.json(); onChange(d.url); }
    setUploading(false);
  };

  return (
    <div>
      <label className="font-sans text-xs font-semibold uppercase tracking-wider text-black-obsidian/70 mb-2 block">{label}</label>
      {value && (
        <div className="relative aspect-video w-full max-w-sm bg-black-obsidian/5 overflow-hidden mb-3">
          <video src={value} className="w-full h-full object-cover" muted loop autoPlay />
        </div>
      )}
      <div className="flex gap-3 items-center">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-xs font-sans uppercase tracking-wider border border-black-obsidian/15 px-4 py-2 hover:border-black-obsidian/40 transition-colors cursor-pointer"
        >
          {uploading ? "Enviando..." : "Trocar Vídeo"}
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 text-xs font-mono bg-transparent border border-black-obsidian/10 focus:border-black-obsidian/40 outline-none"
          placeholder="URL do vídeo (.mp4)"
        />
      </div>
      <input ref={inputRef} type="file" accept="video/mp4,video/webm" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
    </div>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (res.ok) { const d = await res.json(); onChange(d.url); }
    setUploading(false);
  };

  return (
    <div>
      <label className="font-sans text-xs font-semibold uppercase tracking-wider text-black-obsidian/70 mb-2 block">{label}</label>
      {value && (
        <div className="relative aspect-video w-full max-w-sm bg-black-obsidian/5 overflow-hidden mb-3">
          <Image src={value} alt={label} fill className="object-cover" unoptimized />
        </div>
      )}
      <div className="flex gap-3 items-center">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-xs font-sans uppercase tracking-wider border border-black-obsidian/15 px-4 py-2 hover:border-black-obsidian/40 transition-colors cursor-pointer"
        >
          {uploading ? "Enviando..." : "Trocar Imagem"}
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 text-xs font-mono bg-transparent border border-black-obsidian/10 focus:border-black-obsidian/40 outline-none"
          placeholder="URL da imagem"
        />
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
    </div>
  );
}

const inputClass = "w-full px-4 py-3 bg-transparent border border-black-obsidian/10 focus:border-black-obsidian/50 focus:ring-0 outline-none transition-colors font-sans text-sm";
const labelClass = "font-sans text-xs font-semibold uppercase tracking-wider text-black-obsidian/70 mb-2 block";

type ContentMap = Record<string, string>;

export default function ConteudoAdminPage() {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/admin/site-content")
      .then((r) => r.json())
      .then((data) => { setContent(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const update = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
    setSuccess(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) setSuccess(true);
    } catch {}
    setSaving(false);
  };

  if (loading) return <div className="p-12 font-sans text-sm text-black-obsidian/50">Carregando conteúdo...</div>;

  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <header className="mb-12 border-b border-black-obsidian/10 pb-6">
        <h1 className="font-serif text-3xl font-medium tracking-editorial text-black-obsidian mb-2">Conteúdo da Home</h1>
        <p className="font-sans text-sm text-black-obsidian/60">Edite os textos e imagens da página principal do site.</p>
      </header>

      <div className="flex flex-col gap-12">
        {/* HERO */}
        <section className="bg-off-white p-8 border border-black-obsidian/5">
          <h2 className="font-serif text-xl font-medium mb-6 pb-3 border-b border-black-obsidian/10">🏠 Hero (Banner Principal)</h2>
          <div className="flex flex-col gap-6">
            <ImageField label="Imagem de Fundo (ou Poster do Vídeo)" value={content.hero_image || ""} onChange={(v) => update("hero_image", v)} />
            <VideoField label="Vídeo de Fundo (Opcional - MP4)" value={content.hero_video || ""} onChange={(v) => update("hero_video", v)} />
            <div><label className={labelClass}>Subtítulo</label><input value={content.hero_subtitle || ""} onChange={(e) => update("hero_subtitle", e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Título Principal</label><input value={content.hero_title || ""} onChange={(e) => update("hero_title", e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Descrição</label><textarea value={content.hero_description || ""} onChange={(e) => update("hero_description", e.target.value)} rows={3} className={inputClass} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelClass}>Botão Primário</label><input value={content.hero_cta_primary_text || ""} onChange={(e) => update("hero_cta_primary_text", e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Botão Secundário</label><input value={content.hero_cta_secondary_text || ""} onChange={(e) => update("hero_cta_secondary_text", e.target.value)} className={inputClass} /></div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="bg-off-white p-8 border border-black-obsidian/5">
          <h2 className="font-serif text-xl font-medium mb-6 pb-3 border-b border-black-obsidian/10">👤 Seção Sobre</h2>
          <div className="flex flex-col gap-6">
            <ImageField label="Foto do Arquiteto" value={content.about_image || ""} onChange={(v) => update("about_image", v)} />
            <div><label className={labelClass}>Label</label><input value={content.about_label || ""} onChange={(e) => update("about_label", e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Frase de Destaque</label><input value={content.about_quote || ""} onChange={(e) => update("about_quote", e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Descrição</label><textarea value={content.about_description || ""} onChange={(e) => update("about_description", e.target.value)} rows={4} className={inputClass} /></div>
            <div><label className={labelClass}>Texto do Botão</label><input value={content.about_cta_text || ""} onChange={(e) => update("about_cta_text", e.target.value)} className={inputClass} /></div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="bg-off-white p-8 border border-black-obsidian/5">
          <h2 className="font-serif text-xl font-medium mb-6 pb-3 border-b border-black-obsidian/10">◈ Seção Serviços</h2>
          <div className="flex flex-col gap-6">
            <div><label className={labelClass}>Label da Seção</label><input value={content.services_label || ""} onChange={(e) => update("services_label", e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Título da Seção</label><textarea value={content.services_title || ""} onChange={(e) => update("services_title", e.target.value)} rows={2} className={inputClass} /></div>
            <p className="text-xs font-sans text-black-obsidian/40">Os serviços individuais são editados na seção <a href="/admin/servicos" className="underline">Serviços</a>.</p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-off-white p-8 border border-black-obsidian/5">
          <h2 className="font-serif text-xl font-medium mb-6 pb-3 border-b border-black-obsidian/10">📞 Call to Action (Rodapé)</h2>
          <div className="flex flex-col gap-6">
            <div><label className={labelClass}>Título</label><input value={content.cta_title || ""} onChange={(e) => update("cta_title", e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Texto do Botão</label><input value={content.cta_button_text || ""} onChange={(e) => update("cta_button_text", e.target.value)} className={inputClass} /></div>
          </div>
        </section>

        {/* SAVE */}
        <div className="flex items-center gap-4 pt-4 border-t border-black-obsidian/10">
          <Button type="button" onClick={handleSave} className="bg-black-obsidian text-off-white hover:bg-black-obsidian/80 px-8 py-4" disabled={saving}>
            {saving ? "Salvando..." : "Salvar Todas as Alterações"}
          </Button>
          {success && <span className="text-sm font-sans text-green-600">✓ Salvo com sucesso!</span>}
        </div>
      </div>
    </div>
  );
}
