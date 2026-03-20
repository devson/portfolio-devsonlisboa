import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const { title, slug, category, thumbnail, year, location, challenge, concept, materials, images } = body;

    if (!title || !slug || !category || !thumbnail || !year || !location || !challenge || !concept) {
      return NextResponse.json({ error: "Campos obrigatórios não preenchidos." }, { status: 400 });
    }

    // Check if slug already exists
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Já existe um projeto com esse título (slug duplicado)." }, { status: 409 });
    }

    // Convert images text (one URL per line) to JSON string array
    const imagesArray = images
      ? JSON.stringify(
          (images as string)
            .split("\n")
            .map((url: string) => url.trim())
            .filter(Boolean)
        )
      : "[]";

    const project = await prisma.project.create({
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
        images: imagesArray,
      },
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (err) {
    console.error("Erro ao criar projeto:", err);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
