import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await (prisma as any).siteContent.findMany();
    const content: Record<string, string> = {};
    items.forEach((item: any) => { content[item.key] = item.value; });
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({});
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const body = await req.json() as Record<string, string>;

    const updates = Object.entries(body).map(([key, value]) =>
      (prisma as any).siteContent.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    );

    await Promise.all(updates);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erro ao salvar conteúdo:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
