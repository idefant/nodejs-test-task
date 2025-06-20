import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const rooms = [];

  for (let floor = 1; floor <= 9; floor += 1) {
    for (let i = 0; i < 10; i += 1) {
      const number = floor * 100 + i;
      rooms.push({ number });
    }
  }

  await prisma.room.createMany({ data: rooms });
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
