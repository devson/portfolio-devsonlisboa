"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

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
    <div className="mb-6">
      <label className="font-sans text-xs font-semibold uppercase tracking-wider text-black-obsidian/70 mb-2 block">{label}</label>
      {value && (
        <div className="relative aspect-[3/4] w-full max-w-[200px] bg-black-obsidian/5 overflow-hidden mb-3">
          <Image src={value} alt={label} fill className="object-cover" unoptimized />
        </div>
      )}
      <div className="flex gap-3 items-center">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-xs font-sans uppercase tracking-wider border border-black-obsidian/15 px-4 py-2 hover:border-black-obsidian/40 transition-colors cursor-pointer"
        >
          {uploading ? "Enviando..." : "Trocar Foto"}
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 text-xs font-mono bg-transparent border border-black-obsidian/10 focus:border-black-obsidian/40 outline-none"
          placeholder="URL da foto"
        />
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
    </div>
  );
}

const inputClass = "w-full px-4 py-3 bg-transparent border border-black-obsidian/10 focus:border-black-obsidian/50 focus:ring-0 outline-none transition-colors font-sans text-sm";
const labelClass = "font-sans text-xs font-semibold uppercase tracking-wider text-black-obsidian/70 mb-2 block";

export default function AdminSobrePage() {
  const [content, setContent] = useState<Record<string, string>>({});
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

  const parseArray = (key: string, defaultValue: any) => {
    try {
      return content[key] ? JSON.parse(content[key]) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const updateArray = (key: string, array: any[]) => {
    update(key, JSON.stringify(array));
  };

  if (loading) return <div className="p-12 font-sans text-sm text-black-obsidian/50">Carregando conteúdo...</div>;

  const timeline = parseArray("sobre_timeline", []);
  const education = parseArray("sobre_education", []);
  const tools = parseArray("sobre_tools", []);
  const process = parseArray("sobre_process", [
    { title: "Conceito", description: "Imersão na essência do projeto." },
    { title: "Estratégia", description: "Definição do caminho visual e narrativo." },
    { title: "Projeto", description: "Desenvolvimento técnico e estético rigoroso." },
    { title: "Visualização", description: "Tradução da arquitetura em imagens icônicas." },
    { title: "Entrega", description: "Apresentação de alto impacto para o cliente." }
  ]);
  const stats = parseArray("sobre_stats", [
    { number: 20, suffix: "+", label: "Anos de atuação em arquitetura e artes visuais" },
    { number: 14, suffix: "+", label: "Clientes corporativos e institucionais atendidos" },
    { number: 3, suffix: "", label: "Formações: Belas Artes, Arquitetura, Pós-graduação Digital" },
  ]);

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <header className="mb-12 border-b border-black-obsidian/10 pb-6">
        <h1 className="font-serif text-3xl font-medium tracking-editorial text-black-obsidian mb-2">Conteúdo da Página Sobre</h1>
        <p className="font-sans text-sm text-black-obsidian/60">Gerencie sua biografia, trajetória, formação e stack técnica.</p>
      </header>

      <div className="flex flex-col gap-12">
        {/* HERO */}
        <section className="bg-off-white p-8 border border-black-obsidian/5">
          <h2 className="font-serif text-xl font-medium mb-6 pb-3 border-b border-black-obsidian/10">✨ Hero & Intro</h2>
          <div className="flex flex-col gap-6">
            <div><label className={labelClass}>Título Principal (Hero)</label><input value={content.sobre_hero_title || ""} onChange={(e) => update("sobre_hero_title", e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Descrição (Hero)</label><textarea value={content.sobre_hero_description || ""} onChange={(e) => update("sobre_hero_description", e.target.value)} rows={3} className={inputClass} /></div>
          </div>
        </section>

        {/* PORTRAIT & STATS */}
        <section className="bg-off-white p-8 border border-black-obsidian/5">
          <h2 className="font-serif text-xl font-medium mb-6 pb-3 border-b border-black-obsidian/10">👤 Perfil & Estatísticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImageField label="Foto de Perfil" value={content.sobre_portrait_image || ""} onChange={(v) => update("sobre_portrait_image", v)} />
            <div className="flex flex-col gap-4">
              <label className={labelClass}>Estatísticas (Contadores)</label>
              {stats.map((s: any, i: number) => (
                <div key={i} className="flex gap-2 items-center bg-white p-3 border border-black-obsidian/5">
                  <input className="w-16 p-2 border border-black-obsidian/10 text-center font-mono text-sm" type="number" value={s.number} onChange={(e) => {
                    const newStats = [...stats];
                    newStats[i].number = parseInt(e.target.value) || 0;
                    updateArray("sobre_stats", newStats);
                  }} />
                  <input className="w-8 p-2 border border-black-obsidian/10 text-center font-mono text-sm" value={s.suffix} onChange={(e) => {
                    const newStats = [...stats];
                    newStats[i].suffix = e.target.value;
                    updateArray("sobre_stats", newStats);
                  }} />
                  <input className="flex-1 p-2 border border-black-obsidian/10 text-sm" value={s.label} onChange={(e) => {
                    const newStats = [...stats];
                    newStats[i].label = e.target.value;
                    updateArray("sobre_stats", newStats);
                  }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="bg-off-white p-8 border border-black-obsidian/5">
          <h2 className="font-serif text-xl font-medium mb-6 pb-3 border-b border-black-obsidian/10">📜 Manifesto / Bio Longa</h2>
          <div className="flex flex-col gap-6">
            <div><label className={labelClass}>Título do Manifesto</label><input value={content.sobre_manifesto_title || ""} onChange={(e) => update("sobre_manifesto_title", e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Parágrafo 1</label><textarea value={content.sobre_bio_1 || ""} onChange={(e) => update("sobre_bio_1", e.target.value)} rows={3} className={inputClass} /></div>
            <div><label className={labelClass}>Parágrafo 2</label><textarea value={content.sobre_bio_2 || ""} onChange={(e) => update("sobre_bio_2", e.target.value)} rows={3} className={inputClass} /></div>
            <div><label className={labelClass}>Parágrafo 3</label><textarea value={content.sobre_bio_3 || ""} onChange={(e) => update("sobre_bio_3", e.target.value)} rows={3} className={inputClass} /></div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="bg-off-white p-8 border border-black-obsidian/5">
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-black-obsidian/10">
            <h2 className="font-serif text-xl font-medium">🛤 Trajetória (Timeline)</h2>
            <button type="button" onClick={() => updateArray("sobre_timeline", [{ period: "2024 — Atual", role: "Arquiteto", company: "Empresa", location: "Cidade, UF", highlights: ["Destaque 1"] }, ...timeline])} className="text-xs uppercase tracking-widest bg-black-obsidian text-off-white px-3 py-1 hover:bg-black-obsidian/80 transition-colors">+ Adicionar</button>
          </div>
          <div className="flex flex-col gap-6">
            {timeline.map((item: any, i: number) => (
              <div key={i} className="bg-white p-6 border border-black-obsidian/5 flex flex-col gap-4 relative group">
                <button type="button" onClick={() => updateArray("sobre_timeline", timeline.filter((_: any, idx: number) => idx !== i))} className="absolute top-4 right-4 text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">Remover</button>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>Período</label><input value={item.period} onChange={(e) => { const n = [...timeline]; n[i].period = e.target.value; updateArray("sobre_timeline", n); }} className={inputClass} /></div>
                  <div><label className={labelClass}>Cargo</label><input value={item.role} onChange={(e) => { const n = [...timeline]; n[i].role = e.target.value; updateArray("sobre_timeline", n); }} className={inputClass} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>Empresa</label><input value={item.company} onChange={(e) => { const n = [...timeline]; n[i].company = e.target.value; updateArray("sobre_timeline", n); }} className={inputClass} /></div>
                  <div><label className={labelClass}>Localização</label><input value={item.location} onChange={(e) => { const n = [...timeline]; n[i].location = e.target.value; updateArray("sobre_timeline", n); }} className={inputClass} /></div>
                </div>
                <div>
                  <label className={labelClass}>Destaques (um por linha)</label>
                  <textarea value={item.highlights.join("\n")} onChange={(e) => { const n = [...timeline]; n[i].highlights = e.target.value.split("\n"); updateArray("sobre_timeline", n); }} rows={3} className={inputClass} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="bg-off-white p-8 border border-black-obsidian/5">
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-black-obsidian/10">
            <h2 className="font-serif text-xl font-medium">🎓 Formação</h2>
            <button type="button" onClick={() => updateArray("sobre_education", [{ title: "Curso", school: "Instituição", year: "2024", type: "Graduação" }, ...education])} className="text-xs uppercase tracking-widest bg-black-obsidian text-off-white px-3 py-1 hover:bg-black-obsidian/80 transition-colors">+ Adicionar</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {education.map((item: any, i: number) => (
              <div key={i} className="bg-white p-4 border border-black-obsidian/5 flex flex-col gap-3 relative group">
                <button type="button" onClick={() => updateArray("sobre_education", education.filter((_: any, idx: number) => idx !== i))} className="absolute top-2 right-2 text-[10px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">Remover</button>
                <input value={item.title} placeholder="Título" onChange={(e) => { const n = [...education]; n[i].title = e.target.value; updateArray("sobre_education", n); }} className="w-full text-sm font-medium border-none p-0 focus:ring-0 placeholder:text-black/20" />
                <input value={item.school} placeholder="Escola" onChange={(e) => { const n = [...education]; n[i].school = e.target.value; updateArray("sobre_education", n); }} className="w-full text-xs font-sans p-0 border-none focus:ring-0 text-black-obsidian/60" />
                <div className="flex gap-2">
                  <input value={item.year} placeholder="Ano" onChange={(e) => { const n = [...education]; n[i].year = e.target.value; updateArray("sobre_education", n); }} className="w-1/2 text-[10px] uppercase font-mono p-0 border-none focus:ring-0 text-accent-bronze" />
                  <input value={item.type} placeholder="Tipo" onChange={(e) => { const n = [...education]; n[i].type = e.target.value; updateArray("sobre_education", n); }} className="w-1/2 text-[10px] uppercase font-mono p-0 border-none focus:ring-0 text-black-obsidian/40 text-right" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TOOLS */}
        <section className="bg-off-white p-8 border border-black-obsidian/5">
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-black-obsidian/10">
            <h2 className="font-serif text-xl font-medium">🛠 Stack Técnica</h2>
            <button type="button" onClick={() => updateArray("sobre_tools", [...tools, { name: "Nova", category: "IA", logo: "" }])} className="text-xs uppercase tracking-widest bg-black-obsidian text-off-white px-3 py-1 hover:bg-black-obsidian/80 transition-colors">+ Adicionar</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((item: any, i: number) => (
              <div key={i} className="bg-white p-4 border border-black-obsidian/10 flex flex-col gap-3 group relative">
                <button type="button" onClick={() => updateArray("sobre_tools", tools.filter((_: any, idx: number) => idx !== i))} className="absolute top-2 right-2 text-[10px] text-red-500 opacity-0 group-hover:opacity-100 px-1">Remover</button>
                
                <div className="flex gap-4 items-center">
                  {/* Tool Icon Upload */}
                  <div 
                    className="w-12 h-12 bg-black-obsidian/5 flex items-center justify-center cursor-pointer overflow-hidden border border-black-obsidian/10 hover:border-black-obsidian/30 transition-colors"
                    onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = async (e: any) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const fd = new FormData();
                                fd.append("file", file);
                                const res = await fetch("/api/upload", { method: "POST", body: fd });
                                if (res.ok) { 
                                    const d = await res.json(); 
                                    const n = [...tools];
                                    n[i].logo = d.url;
                                    updateArray("sobre_tools", n);
                                }
                            }
                        };
                        input.click();
                    }}
                  >
                    {item.logo ? (
                        <img src={item.logo} alt="" className="w-full h-full object-contain grayscale" />
                    ) : (
                        <span className="text-[10px] text-black-obsidian/30">Logo</span>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <input 
                        value={item.name} 
                        placeholder="Nome da Ferramenta"
                        className="text-sm font-medium border-none p-0 focus:ring-0 w-full" 
                        onChange={(e) => { const n = [...tools]; n[i].name = e.target.value; updateArray("sobre_tools", n); }} 
                    />
                    <input 
                        value={item.category} 
                        placeholder="Categoria (ex: BIM)"
                        className="text-[9px] uppercase tracking-widest text-black-obsidian/40 border-none p-0 focus:ring-0 w-full" 
                        onChange={(e) => { const n = [...tools]; n[i].category = e.target.value; updateArray("sobre_tools", n); }} 
                    />
                  </div>
                </div>
                
                <input 
                    type="text"
                    value={item.logo || ""}
                    placeholder="URL do Logo (opcional)"
                    className="text-[10px] font-mono bg-black-obsidian/5 px-2 py-1 border-none focus:ring-0"
                    onChange={(e) => { const n = [...tools]; n[i].logo = e.target.value; updateArray("sobre_tools", n); }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* METHODOLOGY */}
        <section className="bg-off-white p-8 border border-black-obsidian/5">
          <h2 className="font-serif text-xl font-medium mb-6 pb-3 border-b border-black-obsidian/10">⚙ Metodologia (Como trabalhamos)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {process.map((step: any, i: number) => (
              <div key={i} className="bg-white p-4 border border-black-obsidian/5 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-mono text-black-obsidian/30">Etapa 0{i+1}</span>
                </div>
                <input value={step.title} onChange={(e) => { const n = [...process]; n[i].title = e.target.value; updateArray("sobre_process", n); }} className="w-full text-sm font-medium border-none p-0 focus:ring-0" />
                <textarea value={step.description} onChange={(e) => { const n = [...process]; n[i].description = e.target.value; updateArray("sobre_process", n); }} rows={2} className="w-full text-xs text-black-obsidian/60 border-none p-0 focus:ring-0 resize-none" />
              </div>
            ))}
          </div>
        </section>

        {/* SAVE */}
        <div className="sticky bottom-8 z-50 flex items-center gap-4 bg-white/80 backdrop-blur-md p-6 border border-black-obsidian/10 shadow-xl self-start">
          <Button type="button" onClick={handleSave} className="bg-black-obsidian text-off-white hover:bg-black-obsidian/80 px-8 py-4" disabled={saving}>
            {saving ? "Salvando..." : "Salvar Todas as Alterações"}
          </Button>
          {success && <span className="text-sm font-sans text-green-600">✓ Alterações salvas na página Sobre!</span>}
        </div>
      </div>
    </div>
  );
}
