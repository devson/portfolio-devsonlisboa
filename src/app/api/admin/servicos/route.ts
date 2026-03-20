import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const body = await req.json();
    const { title, slug, description, time } = body;

    if (!title || !slug || !description) {
      return NextResponse.json({ error: "Campos obrigatórios não preenchidos." }, { status: 400 });
    }

    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Já existe um serviço com esse título." }, { status: 409 });
    }

    const service = await prisma.service.create({
      data: { title, slug, description, time: time || null },
    });

    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (err) {
    console.error("Erro ao criar serviço:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
