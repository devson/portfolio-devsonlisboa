"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Credenciais inválidas. Tente novamente.");
        setLoading(false);
      } else {
        router.push("/admin/projetos");
        router.refresh();
      }
    } catch (err) {
      setError("Ocorreu um erro ao conectar.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-gray flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-off-white shadow-xl p-8 md:p-12 relative overflow-hidden">
        {/* Subtle decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-black-obsidian/5 rounded-bl-full -mr-16 -mt-16 pointer-events-none" />
        
        <header className="mb-10 text-center">
          <h1 className="font-serif text-3xl font-medium tracking-editorial mb-2 text-black-obsidian">
            Acesso Restrito
          </h1>
          <p className="font-sans text-sm text-black-obsidian/60 tracking-wide-editorial">
            Painel Administrativo Devson Lisboa
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-4 text-center font-sans tracking-wide">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label 
              htmlFor="email" 
              className="font-sans text-xs font-semibold uppercase tracking-wide-editorial text-black-obsidian/80"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 bg-transparent border border-black-obsidian/10 focus:border-black-obsidian/50 focus:ring-0 outline-none transition-colors font-sans text-sm"
              placeholder="contato@arquiteto.com.br"
              required
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label 
              htmlFor="password" 
              className="font-sans text-xs font-semibold uppercase tracking-wide-editorial text-black-obsidian/80"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 bg-transparent border border-black-obsidian/10 focus:border-black-obsidian/50 focus:ring-0 outline-none transition-colors font-sans text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full justify-center bg-black-obsidian hover:bg-black-obsidian/90 py-4"
            disabled={loading}
          >
            {loading ? "Autenticando..." : "Entrar no Painel"}
          </Button>
        </form>
      </div>
      
      <p className="mt-8 font-sans text-xs tracking-wider text-black-obsidian/40 uppercase">
        Sistema de Gestão &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
}
