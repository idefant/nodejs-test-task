import { z } from 'zod';

export const bookingSchema = z.object({
  roomId: z.string().uuid(),
  fromDate: z.string().date(),
  toDate: z.string().date(),
});
