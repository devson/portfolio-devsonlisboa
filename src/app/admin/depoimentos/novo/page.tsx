"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

const inputClass = "w-full px-4 py-3 bg-transparent border border-black-obsidian/10 focus:border-black-obsidian/50 focus:ring-0 outline-none transition-colors font-sans text-sm";
const labelClass = "font-sans text-xs font-semibold uppercase tracking-wider text-black-obsidian/70 mb-2 block";

export default function NovoDepoimentoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", company: "", quote: "", featured: true });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/admin/depoimentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) router.push("/admin/depoimentos");
    setSaving(false);
  };

  return (
    <div className="p-8 md:p-12 max-w-2xl">
      <header className="mb-12 border-b border-black-obsidian/10 pb-6">
        <h1 className="font-serif text-3xl font-medium tracking-editorial text-black-obsidian mb-2">Novo Depoimento</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div><label className={labelClass}>Nome do Cliente</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} required /></div>
        <div><label className={labelClass}>Cargo / Função</label><input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputClass} placeholder="Ex: CEO, Diretor" required /></div>
        <div><label className={labelClass}>Empresa (opcional)</label><input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputClass} /></div>
        <div><label className={labelClass}>Depoimento</label><textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} rows={4} className={inputClass} required /></div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4" />
          <label htmlFor="featured" className="font-sans text-sm text-black-obsidian/70">Exibir na página inicial (destaque)</label>
        </div>

        <div className="pt-4 border-t border-black-obsidian/10">
          <Button type="submit" className="bg-black-obsidian text-off-white hover:bg-black-obsidian/80 px-8 py-4" disabled={saving}>
            {saving ? "Salvando..." : "Salvar Depoimento"}
          </Button>
        </div>
      </form>
    </div>
  );
}
