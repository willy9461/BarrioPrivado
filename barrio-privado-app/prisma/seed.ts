import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🔥 Iniciando seed...');

  // 1. Limpieza segura de datos existentes
  await prisma.$executeRaw`SET session_replication_role = 'replica';`;
  await prisma.expensa.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$executeRaw`SET session_replication_role = 'origin';`;

  // 2. Creación de usuarios
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'usuario1@test.com',
        name: 'Usuario Uno',
        role: Role.USER,
        password: 'temp-pass-123', 
      },
    }),
    prisma.user.create({
      data: {
        email: 'admin@test.com',
        name: 'Administrador',
        role: Role.ADMIN,
        password: 'temp-pass-456',
      },
    }),
  ]);

  // 3. Creación de expensas
  await prisma.expensa.createMany({
    data: [
      {
        amount: 150.75,
        paid: false,
        dueDate: new Date('2024-12-31'),
        userId: users[0].id,
      },
      {
        amount: 299.99,
        paid: true,
        dueDate: new Date('2024-11-15'),
        userId: users[1].id,
      },
    ],
  });

  console.log('✅ Seed completado con éxito!');
  console.log(`📝 ${users.length} usuarios creados`);
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });