import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function AdminServicosPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="p-8 md:p-12 max-w-5xl">
      <header className="mb-12 border-b border-black-obsidian/10 pb-6">
        <h1 className="font-serif text-3xl font-medium tracking-editorial text-black-obsidian mb-2">
          Serviços
        </h1>
        <p className="font-sans text-sm text-black-obsidian/60 tracking-wide">
          Gerencie os serviços oferecidos pelo escritório.
        </p>
      </header>

      <div className="flex justify-between items-center mb-8">
        <h2 className="font-sans font-semibold text-lg">Lista de Serviços</h2>
        <Button href="/admin/servicos/novo" className="bg-black-obsidian text-off-white hover:bg-black-obsidian/80">
          Adicionar Novo
        </Button>
      </div>

      {services.length === 0 ? (
        <div className="bg-off-white p-12 text-center border border-black-obsidian/5 flex flex-col items-center">
          <h3 className="font-serif text-2xl text-black-obsidian mb-4">Nenhum serviço cadastrado</h3>
          <p className="text-sm font-sans text-black-obsidian/60 max-w-md mx-auto mb-8">
            Adicione os serviços que você oferece para exibi-los no site.
          </p>
          <Button href="/admin/servicos/novo" variant="outline" className="border-black-obsidian">
            Adicionar Primeiro Serviço
          </Button>
        </div>
      ) : (
        <div className="bg-off-white border border-black-obsidian/5 overflow-hidden">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-black-obsidian/5 border-b border-black-obsidian/10">
              <tr>
                <th className="font-semibold p-4">Título</th>
                <th className="font-semibold p-4">Descrição</th>
                <th className="font-semibold p-4">Tempo</th>
                <th className="font-semibold p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b border-black-obsidian/5 hover:bg-black-obsidian/5 transition-colors">
                  <td className="p-4 font-medium">{service.title}</td>
                  <td className="p-4 text-black-obsidian/70 max-w-xs truncate">{service.description.substring(0, 80)}...</td>
                  <td className="p-4 text-black-obsidian/70">{service.time || "—"}</td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/servicos/${service.id}/editar`}
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
    </div>
  );
}
