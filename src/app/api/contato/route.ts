import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, interest, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }

    // Log the contact for now (can integrate with email service later)
    console.log("📩 Novo contato recebido:", { name, email, interest, message, date: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erro no formulário de contato:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
