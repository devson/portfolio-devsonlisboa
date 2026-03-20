"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

function ImageUpload({
  label, value, onChange, multiple = false,
}: {
  label: string; value: string | string[];
  onChange: (urls: string | string[]) => void; multiple?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) return null;
    return (await res.json()).url;
  };

  const handleFiles = async (files: FileList | File[]) => {
    setUploading(true);
    const arr = Array.from(files);
    const urls: string[] = [];
    for (const f of arr) { const u = await uploadFile(f); if (u) urls.push(u); }
    if (multiple) { onChange([...(Array.isArray(value) ? value : []), ...urls]); }
    else { onChange(urls[0] || ""); }
    setUploading(false);
  };

  const removeImage = (index: number) => {
    if (multiple && Array.isArray(value)) onChange(value.filter((_, i) => i !== index));
    else onChange("");
  };

  const imageList = multiple ? (Array.isArray(value) ? value : []) : (typeof value === "string" && value ? [value] : []);

  return (
    <div>
      <label className="font-sans text-xs font-semibold uppercase tracking-wide-editorial text-black-obsidian/80 mb-2 block">{label}</label>
      {imageList.length > 0 && (
        <div className={`grid gap-3 mb-3 ${multiple ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
          {imageList.map((url, i) => (
            <div key={i} className="relative group aspect-video bg-black-obsidian/5 overflow-hidden">
              <Image src={url} alt={`Upload ${i + 1}`} fill className="object-cover" unoptimized />
              <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 w-7 h-7 bg-black-obsidian/70 text-off-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">✕</button>
            </div>
          ))}
        </div>
      )}
      <div
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${dragOver ? "border-black-obsidian bg-black-obsidian/5" : "border-black-obsidian/15 hover:border-black-obsidian/30"}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? (
          <p className="font-sans text-sm text-black-obsidian/60 animate-pulse">Enviando imagem...</p>
        ) : (
          <><p className="font-sans text-sm text-black-obsidian/60 mb-1">Arraste ou <span className="underline font-medium">clique para selecionar</span></p>
          <p className="font-sans text-xs text-black-obsidian/40">JPG, PNG ou WebP — máximo 10MB</p></>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple={multiple} className="hidden"
        onChange={(e) => { if (e.target.files?.length) handleFiles(e.target.files); }} />
    </div>
  );
}

export default function EditarProjetoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [challenge, setChallenge] = useState("");
  const [concept, setConcept] = useState("");
  const [materials, setMaterials] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/admin/projetos/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setTitle(data.title || "");
        setCategory(data.category || "");
        setYear(data.year || "");
        setLocation(data.location || "");
        setThumbnail(data.thumbnail || "");
        setChallenge(data.challenge || "");
        setConcept(data.concept || "");
        setMaterials(data.materials || "");
        try { setGalleryImages(JSON.parse(data.images || "[]")); } catch { setGalleryImages([]); }
        setLoading(false);
      })
      .catch(() => { setError("Erro ao carregar projeto."); setLoading(false); });
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const slug = title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    try {
      const res = await fetch(`/api/admin/projetos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, category, thumbnail, year, location, challenge, concept, materials, images: galleryImages.join("\n") }),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Erro ao salvar."); setSaving(false); return; }
      router.push("/admin/projetos");
      router.refresh();
    } catch { setError("Erro de conexão."); setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.")) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/projetos/${id}`, { method: "DELETE" });
      router.push("/admin/projetos");
      router.refresh();
    } catch { setError("Erro ao excluir."); setDeleting(false); }
  };

  const inputClass = "w-full px-4 py-3 bg-transparent border border-black-obsidian/10 focus:border-black-obsidian/50 focus:ring-0 outline-none transition-colors font-sans text-sm";
  const labelClass = "font-sans text-xs font-semibold uppercase tracking-wide-editorial text-black-obsidian/80 mb-2 block";

  if (loading) return <div className="p-12 text-center font-sans text-sm text-black-obsidian/50">Carregando projeto...</div>;

  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <header className="mb-12 border-b border-black-obsidian/10 pb-6">
        <Link href="/admin/projetos" className="font-sans text-xs uppercase tracking-wider text-black-obsidian/50 hover:text-black-obsidian transition-colors mb-4 inline-block">← Voltar ao Acervo</Link>
        <h1 className="font-serif text-3xl font-medium tracking-editorial text-black-obsidian">Editar Projeto</h1>
      </header>

      <div className="bg-off-white p-8 md:p-12 border border-black-obsidian/5">
        {error && <div className="bg-red-50 text-red-600 text-sm p-4 text-center font-sans mb-8">{error}</div>}

        <form onSubmit={handleSave} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className={labelClass}>Título</label><input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} required /></div>
            <div>
              <label className={labelClass}>Categoria</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} required>
                <option value="">Selecione...</option>
                {["Residencial","Corporativo","Comercial","Institucional","Interiores","Urbanismo"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className={labelClass}>Ano</label><input value={year} onChange={(e) => setYear(e.target.value)} className={inputClass} required /></div>
            <div><label className={labelClass}>Localização</label><input value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} required /></div>
          </div>

          <ImageUpload label="Imagem de Capa" value={thumbnail} onChange={(url) => setThumbnail(url as string)} />

          <div><label className={labelClass}>Desafio</label><textarea value={challenge} onChange={(e) => setChallenge(e.target.value)} rows={3} className={inputClass} required /></div>
          <div><label className={labelClass}>Conceito</label><textarea value={concept} onChange={(e) => setConcept(e.target.value)} rows={3} className={inputClass} required /></div>
          <div><label className={labelClass}>Materiais</label><input value={materials} onChange={(e) => setMaterials(e.target.value)} className={inputClass} /><p className="text-xs text-black-obsidian/40 mt-2">Separe com vírgulas</p></div>

          <ImageUpload label="Galeria de Imagens" value={galleryImages} onChange={(urls) => setGalleryImages(urls as string[])} multiple />

          <div className="flex justify-between items-center pt-4 border-t border-black-obsidian/10">
            <div className="flex gap-4">
              <Button type="submit" className="bg-black-obsidian text-off-white hover:bg-black-obsidian/80 px-8 py-4" disabled={saving}>
                {saving ? "Salvando..." : "Salvar Alterações"}
              </Button>
              <Link href="/admin/projetos" className="flex items-center font-sans text-sm text-black-obsidian/60 hover:text-black-obsidian transition-colors">Cancelar</Link>
            </div>
            <button type="button" onClick={handleDelete} disabled={deleting} className="text-xs font-sans uppercase tracking-wider text-red-500 hover:text-red-700 transition-colors cursor-pointer disabled:opacity-50">
              {deleting ? "Excluindo..." : "Excluir Projeto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
