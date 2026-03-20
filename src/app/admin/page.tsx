import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminHomePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const [projectCount, serviceCount] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
  ]);

  const recentProjects = await prisma.project.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 md:p-12 max-w-5xl">
      <header className="mb-12">
        <h1 className="font-serif text-3xl font-medium tracking-editorial text-black-obsidian mb-2">
          Bem-vindo, {session.user?.name || "Administrador"}
        </h1>
        <p className="font-sans text-sm text-black-obsidian/60">
          Painel de gestão do portfólio e serviços.
        </p>
      </header>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link href="/admin/projetos" className="bg-off-white p-6 border border-black-obsidian/5 hover:border-black-obsidian/15 transition-colors group">
          <p className="text-xs font-sans uppercase tracking-widest text-black-obsidian/40 mb-2">Projetos</p>
          <p className="font-serif text-4xl font-medium text-black-obsidian">{projectCount}</p>
          <p className="text-xs font-sans text-black-obsidian/40 mt-2 group-hover:text-black-obsidian/60 transition-colors">Ver todos →</p>
        </Link>

        <Link href="/admin/servicos" className="bg-off-white p-6 border border-black-obsidian/5 hover:border-black-obsidian/15 transition-colors group">
          <p className="text-xs font-sans uppercase tracking-widest text-black-obsidian/40 mb-2">Serviços</p>
          <p className="font-serif text-4xl font-medium text-black-obsidian">{serviceCount}</p>
          <p className="text-xs font-sans text-black-obsidian/40 mt-2 group-hover:text-black-obsidian/60 transition-colors">Ver todos →</p>
        </Link>

        <div className="bg-off-white p-6 border border-black-obsidian/5">
          <p className="text-xs font-sans uppercase tracking-widest text-black-obsidian/40 mb-2">Status</p>
          <p className="font-serif text-lg font-medium text-green-700">● Online</p>
          <p className="text-xs font-sans text-black-obsidian/40 mt-2">Site público ativo</p>
        </div>
      </div>

      {/* Recent projects */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-sans font-semibold text-lg">Projetos Recentes</h2>
          <Link href="/admin/projetos/novo" className="text-xs font-sans uppercase tracking-wider text-black-obsidian/50 hover:text-black-obsidian transition-colors">
            + Adicionar Novo
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div className="bg-off-white p-8 border border-black-obsidian/5 text-center">
            <p className="text-sm font-sans text-black-obsidian/50">Nenhum projeto cadastrado ainda.</p>
            <Link href="/admin/projetos/novo" className="text-sm font-sans underline text-black-obsidian/70 mt-2 inline-block">
              Adicionar primeiro projeto
            </Link>
          </div>
        ) : (
          <div className="bg-off-white border border-black-obsidian/5">
            {recentProjects.map((project, i) => (
              <Link
                key={project.id}
                href={`/admin/projetos/${project.id}/editar`}
                className={`flex justify-between items-center p-4 hover:bg-black-obsidian/5 transition-colors ${
                  i < recentProjects.length - 1 ? "border-b border-black-obsidian/5" : ""
                }`}
              >
                <div>
                  <p className="font-sans text-sm font-medium">{project.title}</p>
                  <p className="font-sans text-xs text-black-obsidian/50">{project.category} · {project.year}</p>
                </div>
                <span className="text-xs text-black-obsidian/30">Editar →</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
