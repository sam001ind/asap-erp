import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tenants = await prisma.tenant.findMany({
    where: {
      name: {
        not: 'ASAP Kerala',
      }
    }
  });
  
  console.log(`Found ${tenants.length} other tenants to delete.`);

  for (const tenant of tenants) {
    // Delete all related data first if there is any cascade deletion required.
    // Assuming Prisma schema has cascade deletes configured, but if not we might need to delete manually.
    // Let's try deleting the tenant directly.
    try {
      await prisma.tenant.delete({
        where: { id: tenant.id },
      });
      console.log(`Deleted tenant ${tenant.name} (${tenant.id})`);
    } catch (e) {
      console.error(`Failed to delete tenant ${tenant.name} (${tenant.id}):`, e);
    }
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
