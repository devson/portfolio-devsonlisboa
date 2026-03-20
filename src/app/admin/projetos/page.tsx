import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch all projects from the database
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-warm-gray p-6 md:p-12">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12 border-b border-black-obsidian/10 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-medium tracking-editorial text-black-obsidian mb-2">
            Projetos
          </h1>
          <p className="font-sans text-sm text-black-obsidian/60 tracking-wide">
            Gerencie o portfólio de {session.user?.name || "Administrador"}.
          </p>
        </div>
        
        <Link
          href="/api/auth/signout"
          className="text-xs uppercase font-sans tracking-wide hover:underline cursor-pointer"
        >
          Sair do Painel
        </Link>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-sans font-semibold text-lg">Acervo de Projetos</h2>
          <Button href="/admin/projetos/novo" className="bg-black-obsidian text-off-white hover:bg-black-obsidian/80">
            Adicionar Novo
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="bg-off-white p-12 text-center border border-black-obsidian/5 flex flex-col items-center">
            <h3 className="font-serif text-2xl text-black-obsidian mb-4">Nenhum projeto cadastrado</h3>
            <p className="text-sm font-sans text-black-obsidian/60 max-w-md mx-auto mb-8">
              O seu portfólio está vazio no banco de dados. Adicione o seu primeiro trabalho para exibí-lo no site.
            </p>
            <Button href="/admin/projetos/novo" variant="outline" className="border-black-obsidian">
              Adicionar Primeiro Projeto
            </Button>
          </div>
        ) : (
          <div className="bg-off-white border border-black-obsidian/5 overflow-hidden">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-black-obsidian/5 border-b border-black-obsidian/10">
                <tr>
                  <th className="font-semibold p-4">Título</th>
                  <th className="font-semibold p-4">Categoria</th>
                  <th className="font-semibold p-4">Data</th>
                  <th className="font-semibold p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-black-obsidian/5 hover:bg-black-obsidian/5 transition-colors">
                    <td className="p-4 font-medium">{project.title}</td>
                    <td className="p-4 text-black-obsidian/70">{project.category}</td>
                    <td className="p-4 text-black-obsidian/70">
                      {new Date(project.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="p-4 text-right">
                      <Link 
                        href={`/admin/projetos/${project.id}/editar`}
                        className="text-xs font-semibold uppercase tracking-wider underline hover:text-black-obsidian/70"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

