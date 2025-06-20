import z from 'zod';

import prisma from '#prisma';
import { roomAvailabilitySchema } from '#schemas/roomSchema';

class RoomService {
  static async getAllRooms() {
    return prisma.room.findMany();
  }

  static async getAvailableRooms(data: z.infer<typeof roomAvailabilitySchema>) {
    const bookings = await prisma.booking.findMany({
      where: {
        OR: [
          {
            fromDate: { lte: new Date(data.to) },
            toDate: { gte: new Date(data.from) },
          },
        ],
      },
      select: { roomId: true },
    });
    const bookedRoomIds = bookings.map((b) => b.roomId);

    return prisma.room.findMany({
      where: { id: { notIn: bookedRoomIds } },
    });
  }
}

export default RoomService;
