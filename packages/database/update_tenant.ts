import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tenants = await prisma.tenant.findMany({
    where: {
      name: 'Apex International Academy',
    }
  });

  for (const tenant of tenants) {
    await prisma.tenant.update({
      where: { id: tenant.id },
      data: { name: 'ASAP Kerala' },
    });
    console.log(`Updated tenant ${tenant.id} to ASAP Kerala`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
