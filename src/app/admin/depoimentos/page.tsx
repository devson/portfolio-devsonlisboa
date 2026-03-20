"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string | null;
  quote: string;
  featured: boolean;
}

export default function DepoimentosPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = () => {
    fetch("/api/admin/depoimentos")
      .then((r) => r.json())
      .then((data) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este depoimento?")) return;
    await fetch("/api/admin/depoimentos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchItems();
  };

  if (loading) return <div className="p-12 font-sans text-sm text-black-obsidian/50">Carregando...</div>;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="flex items-center justify-between mb-12 border-b border-black-obsidian/10 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-medium tracking-editorial text-black-obsidian mb-2">Depoimentos</h1>
          <p className="font-sans text-sm text-black-obsidian/60">{items.length} depoimentos cadastrados</p>
        </div>
        <Link
          href="/admin/depoimentos/novo"
          className="font-sans text-xs uppercase tracking-wider bg-black-obsidian text-off-white px-6 py-3 hover:bg-black-obsidian/80 transition-colors"
        >
          + Adicionar
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 text-black-obsidian/40 font-sans text-sm">
          Nenhum depoimento ainda. Adicione o primeiro!
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {items.map((t) => (
            <div key={t.id} className="bg-off-white p-6 border border-black-obsidian/5 flex items-start justify-between gap-6">
              <div className="flex-1">
                <p className="font-serif text-lg italic text-black-obsidian/80 mb-4">"{t.quote}"</p>
                <p className="font-sans text-sm font-semibold">{t.name}</p>
                <p className="font-sans text-xs text-black-obsidian/50">{t.role}{t.company ? ` · ${t.company}` : ""}</p>
                {t.featured && <span className="inline-block mt-2 font-sans text-[10px] uppercase tracking-wider bg-green-50 text-green-700 px-2 py-1">Destaque</span>}
              </div>
              <button
                onClick={() => handleDelete(t.id)}
                className="font-sans text-xs text-red-500 hover:text-red-700 cursor-pointer"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
