const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding de Usuário Admin...');

  const adminEmail = 'contato@arquiteto.com.br';
  
  // Verifica se o usuário já existe
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (existingUser) {
    console.log('⚠️ Usuário já existe no banco de dados. Pulando...');
    return;
  }

  // Gera o hash da senha ("paineladmin2025")
  const hashedPassword = await bcrypt.hash('paineladmin2025', 10);

  // Cria o usuário
  const user = await prisma.user.create({
    data: {
      name: 'Devson Lisboa (Admin)',
      email: adminEmail,
      password: hashedPassword,
    },
  });

  console.log(`✅ Usuário criado com sucesso! Email: ${user.email} / Senha: paineladmin2025`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
