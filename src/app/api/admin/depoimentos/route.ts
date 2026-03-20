import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const testimonials = await (prisma as any).testimonial.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(testimonials);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const body = await req.json();
    const testimonial = await (prisma as any).testimonial.create({
      data: {
        name: body.name,
        role: body.role,
        company: body.company || null,
        quote: body.quote,
        featured: body.featured ?? true,
        order: body.order ?? 0,
      },
    });
    return NextResponse.json(testimonial, { status: 201 });
  } catch (err) {
    console.error("Erro ao criar depoimento:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const { id } = await req.json();
    await (prisma as any).testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erro ao excluir depoimento:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
