import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    return NextResponse.json({ error: "Projeto não encontrado" }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await params;

  try {
    const body = await req.json();
    const { title, slug, category, thumbnail, year, location, challenge, concept, materials, images } = body;

    // Convert images to JSON string if it's newline-separated
    const imagesJson = images && !images.startsWith("[")
      ? JSON.stringify(images.split("\n").map((u: string) => u.trim()).filter(Boolean))
      : images;

    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        slug,
        category,
        thumbnail,
        year,
        location,
        challenge,
        concept,
        materials: materials || "",
        images: imagesJson || "[]",
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (err) {
    console.error("Erro ao atualizar projeto:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await params;

  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erro ao deletar projeto:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
