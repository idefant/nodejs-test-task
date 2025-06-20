import z from 'zod';

import HttpException from '#models/HttpException';
import prisma from '#prisma';
import { bookingSchema } from '#schemas/bookingSchema';
import { checkIsVip } from '#utils/checkIsVip';

class BookingService {
  static async getList(userId: string) {
    const bookings = await prisma.booking.findMany({
      where: { userId },
    });
    return bookings;
  }

  static async create(userId: string, data: z.infer<typeof bookingSchema>) {
    const { roomId, fromDate, toDate } = data;

    const overlap = await prisma.booking.findFirst({
      where: {
        roomId,
        fromDate: { lte: new Date(toDate) },
        toDate: { gte: new Date(fromDate) },
      },
    });
    if (overlap) {
      throw new HttpException(400, 'Номер уже забронирован на этот период');
    }

    const isVip = await checkIsVip();

    return prisma.booking.create({
      data: {
        roomId,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        userId,
        isVip,
      },
    });
  }

  static async delete(userId: string, bookingId: string) {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking || booking.userId !== userId) return false;
    await prisma.booking.delete({ where: { id: bookingId } });
    return true;
  }
}

export default BookingService;
