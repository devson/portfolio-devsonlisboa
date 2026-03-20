"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

function ImageUpload({
  label,
  value,
  onChange,
  multiple = false,
}: {
  label: string;
  value: string | string[];
  onChange: (urls: string | string[]) => void;
  multiple?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.url;
  };

  const handleFiles = async (files: FileList | File[]) => {
    setUploading(true);
    const fileArray = Array.from(files);

    const uploadedUrls: string[] = [];
    for (const file of fileArray) {
      const url = await uploadFile(file);
      if (url) uploadedUrls.push(url);
    }

    if (multiple) {
      const currentArr = Array.isArray(value) ? value : [];
      onChange([...currentArr, ...uploadedUrls]);
    } else {
      onChange(uploadedUrls[0] || "");
    }

    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (index: number) => {
    if (multiple && Array.isArray(value)) {
      const updated = value.filter((_, i) => i !== index);
      onChange(updated);
    } else {
      onChange("");
    }
  };

  const hasImages = multiple
    ? Array.isArray(value) && value.length > 0
    : typeof value === "string" && value.length > 0;

  const imageList = multiple
    ? (Array.isArray(value) ? value : [])
    : typeof value === "string" && value ? [value] : [];

  return (
    <div>
      <label className="font-sans text-xs font-semibold uppercase tracking-wide-editorial text-black-obsidian/80 mb-2 block">
        {label}
      </label>

      {/* Preview */}
      {hasImages && (
        <div className={`grid gap-3 mb-3 ${multiple ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
          {imageList.map((url, i) => (
            <div key={i} className="relative group aspect-video bg-black-obsidian/5 overflow-hidden">
              <Image
                src={url}
                alt={`Upload ${i + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-2 right-2 w-7 h-7 bg-black-obsidian/70 text-off-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
          dragOver
            ? "border-black-obsidian bg-black-obsidian/5"
            : "border-black-obsidian/15 hover:border-black-obsidian/30"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? (
          <p className="font-sans text-sm text-black-obsidian/60 animate-pulse">
            Enviando imagem...
          </p>
        ) : (
          <>
            <p className="font-sans text-sm text-black-obsidian/60 mb-1">
              Arraste a imagem aqui ou <span className="underline font-medium">clique para selecionar</span>
            </p>
            <p className="font-sans text-xs text-black-obsidian/40">
              JPG, PNG ou WebP — máximo 10MB {multiple ? "(múltiplas)" : ""}
            </p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
          }
        }}
      />
    </div>
  );
}

export default function NovoProjetoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (!thumbnail) {
      setError("Envie pelo menos a imagem de capa.");
      setLoading(false);
      return;
    }

    const body = {
      title,
      slug,
      category: formData.get("category") as string,
      thumbnail,
      year: formData.get("year") as string,
      location: formData.get("location") as string,
      challenge: formData.get("challenge") as string,
      concept: formData.get("concept") as string,
      materials: formData.get("materials") as string,
      images: galleryImages.join("\n"),
    };

    try {
      const res = await fetch("/api/admin/projetos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erro ao salvar o projeto.");
        setLoading(false);
        return;
      }

      router.push("/admin/projetos");
      router.refresh();
    } catch {
      setError("Erro de conexão ao salvar.");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-transparent border border-black-obsidian/10 focus:border-black-obsidian/50 focus:ring-0 outline-none transition-colors font-sans text-sm";
  const labelClass =
    "font-sans text-xs font-semibold uppercase tracking-wide-editorial text-black-obsidian/80 mb-2 block";

  return (
    <div className="min-h-screen bg-warm-gray p-6 md:p-12">
      <header className="max-w-3xl mx-auto mb-12 border-b border-black-obsidian/10 pb-6">
        <Link
          href="/admin/projetos"
          className="font-sans text-xs uppercase tracking-wider text-black-obsidian/50 hover:text-black-obsidian transition-colors mb-4 inline-block"
        >
          ← Voltar ao Acervo
        </Link>
        <h1 className="font-serif text-3xl font-medium tracking-editorial text-black-obsidian">
          Novo Projeto
        </h1>
      </header>

      <main className="max-w-3xl mx-auto bg-off-white p-8 md:p-12 border border-black-obsidian/5">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-4 text-center font-sans tracking-wide mb-8">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className={labelClass}>Título do Projeto</label>
              <input id="title" name="title" type="text" className={inputClass} placeholder="Residência Horizonte" required />
            </div>
            <div>
              <label htmlFor="category" className={labelClass}>Categoria</label>
              <select id="category" name="category" className={inputClass} required>
                <option value="">Selecione...</option>
                <option value="Residencial">Residencial</option>
                <option value="Corporativo">Corporativo</option>
                <option value="Comercial">Comercial</option>
                <option value="Institucional">Institucional</option>
                <option value="Interiores">Interiores</option>
                <option value="Urbanismo">Urbanismo</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="year" className={labelClass}>Ano</label>
              <input id="year" name="year" type="text" className={inputClass} placeholder="2024" required />
            </div>
            <div>
              <label htmlFor="location" className={labelClass}>Localização</label>
              <input id="location" name="location" type="text" className={inputClass} placeholder="São Paulo, SP" required />
            </div>
          </div>

          {/* Thumbnail Upload */}
          <ImageUpload
            label="Imagem de Capa"
            value={thumbnail}
            onChange={(url) => setThumbnail(url as string)}
          />

          {/* Texts */}
          <div>
            <label htmlFor="challenge" className={labelClass}>Desafio</label>
            <textarea id="challenge" name="challenge" rows={3} className={inputClass} placeholder="Descreva o desafio principal do projeto..." required />
          </div>

          <div>
            <label htmlFor="concept" className={labelClass}>Conceito</label>
            <textarea id="concept" name="concept" rows={3} className={inputClass} placeholder="Descreva o conceito arquitetônico e a solução adotada..." required />
          </div>

          <div>
            <label htmlFor="materials" className={labelClass}>Materiais Principais</label>
            <input id="materials" name="materials" type="text" className={inputClass} placeholder="Concreto aparente, Madeira de demolição, Vidro temperado" required />
            <p className="text-xs text-black-obsidian/40 mt-2 font-sans">Separe com vírgulas</p>
          </div>

          {/* Gallery Upload */}
          <ImageUpload
            label="Galeria de Imagens"
            value={galleryImages}
            onChange={(urls) => setGalleryImages(urls as string[])}
            multiple
          />

          {/* Submit */}
          <div className="flex gap-4 pt-4 border-t border-black-obsidian/10">
            <Button
              type="submit"
              className="bg-black-obsidian text-off-white hover:bg-black-obsidian/80 px-8 py-4"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Publicar Projeto"}
            </Button>
            <Link
              href="/admin/projetos"
              className="flex items-center font-sans text-sm text-black-obsidian/60 hover:text-black-obsidian transition-colors"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
