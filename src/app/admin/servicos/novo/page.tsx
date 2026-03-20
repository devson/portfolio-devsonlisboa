"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NovoServicoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const slug = title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    try {
      const res = await fetch("/api/admin/servicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          description: formData.get("description") as string,
          time: formData.get("time") as string,
        }),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Erro ao salvar."); setLoading(false); return; }
      router.push("/admin/servicos");
      router.refresh();
    } catch { setError("Erro de conexão."); setLoading(false); }
  };

  const inputClass = "w-full px-4 py-3 bg-transparent border border-black-obsidian/10 focus:border-black-obsidian/50 focus:ring-0 outline-none transition-colors font-sans text-sm";
  const labelClass = "font-sans text-xs font-semibold uppercase tracking-wide-editorial text-black-obsidian/80 mb-2 block";

  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <header className="mb-12 border-b border-black-obsidian/10 pb-6">
        <Link href="/admin/servicos" className="font-sans text-xs uppercase tracking-wider text-black-obsidian/50 hover:text-black-obsidian transition-colors mb-4 inline-block">← Voltar</Link>
        <h1 className="font-serif text-3xl font-medium tracking-editorial text-black-obsidian">Novo Serviço</h1>
      </header>

      <div className="bg-off-white p-8 md:p-12 border border-black-obsidian/5">
        {error && <div className="bg-red-50 text-red-600 text-sm p-4 text-center font-sans mb-8">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div><label htmlFor="title" className={labelClass}>Nome do Serviço</label><input id="title" name="title" className={inputClass} placeholder="Projeto Arquitetônico" required /></div>
          <div><label htmlFor="description" className={labelClass}>Descrição</label><textarea id="description" name="description" rows={5} className={inputClass} placeholder="Descreva o serviço oferecido..." required /></div>
          <div><label htmlFor="time" className={labelClass}>Tempo Estimado (opcional)</label><input id="time" name="time" className={inputClass} placeholder="4 a 8 semanas" /></div>

          <div className="flex gap-4 pt-4 border-t border-black-obsidian/10">
            <Button type="submit" className="bg-black-obsidian text-off-white hover:bg-black-obsidian/80 px-8 py-4" disabled={loading}>
              {loading ? "Salvando..." : "Publicar Serviço"}
            </Button>
            <Link href="/admin/servicos" className="flex items-center font-sans text-sm text-black-obsidian/60 hover:text-black-obsidian transition-colors">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
