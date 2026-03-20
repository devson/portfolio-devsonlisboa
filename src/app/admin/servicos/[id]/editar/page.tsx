"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function EditarServicoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    fetch(`/api/admin/servicos/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setTitle(data.title || "");
        setDescription(data.description || "");
        setTime(data.time || "");
        setLoading(false);
      })
      .catch(() => { setError("Erro ao carregar serviço."); setLoading(false); });
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const slug = title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    try {
      const res = await fetch(`/api/admin/servicos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, description, time }),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Erro ao salvar."); setSaving(false); return; }
      router.push("/admin/servicos");
      router.refresh();
    } catch { setError("Erro de conexão."); setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este serviço?")) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/servicos/${id}`, { method: "DELETE" });
      router.push("/admin/servicos");
      router.refresh();
    } catch { setError("Erro ao excluir."); setDeleting(false); }
  };

  const inputClass = "w-full px-4 py-3 bg-transparent border border-black-obsidian/10 focus:border-black-obsidian/50 focus:ring-0 outline-none transition-colors font-sans text-sm";
  const labelClass = "font-sans text-xs font-semibold uppercase tracking-wide-editorial text-black-obsidian/80 mb-2 block";

  if (loading) return <div className="p-12 text-center font-sans text-sm text-black-obsidian/50">Carregando serviço...</div>;

  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <header className="mb-12 border-b border-black-obsidian/10 pb-6">
        <Link href="/admin/servicos" className="font-sans text-xs uppercase tracking-wider text-black-obsidian/50 hover:text-black-obsidian transition-colors mb-4 inline-block">← Voltar</Link>
        <h1 className="font-serif text-3xl font-medium tracking-editorial text-black-obsidian">Editar Serviço</h1>
      </header>

      <div className="bg-off-white p-8 md:p-12 border border-black-obsidian/5">
        {error && <div className="bg-red-50 text-red-600 text-sm p-4 text-center font-sans mb-8">{error}</div>}

        <form onSubmit={handleSave} className="flex flex-col gap-8">
          <div><label className={labelClass}>Nome do Serviço</label><input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} required /></div>
          <div><label className={labelClass}>Descrição</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className={inputClass} required /></div>
          <div><label className={labelClass}>Tempo Estimado</label><input value={time} onChange={(e) => setTime(e.target.value)} className={inputClass} placeholder="4 a 8 semanas" /></div>

          <div className="flex justify-between items-center pt-4 border-t border-black-obsidian/10">
            <div className="flex gap-4">
              <Button type="submit" className="bg-black-obsidian text-off-white hover:bg-black-obsidian/80 px-8 py-4" disabled={saving}>
                {saving ? "Salvando..." : "Salvar Alterações"}
              </Button>
              <Link href="/admin/servicos" className="flex items-center font-sans text-sm text-black-obsidian/60 hover:text-black-obsidian transition-colors">Cancelar</Link>
            </div>
            <button type="button" onClick={handleDelete} disabled={deleting} className="text-xs font-sans uppercase tracking-wider text-red-500 hover:text-red-700 transition-colors cursor-pointer disabled:opacity-50">
              {deleting ? "Excluindo..." : "Excluir Serviço"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
