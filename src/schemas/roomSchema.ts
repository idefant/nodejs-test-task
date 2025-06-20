import { z } from 'zod';

export const roomAvailabilitySchema = z.object({
  from: z.string().date(),
  to: z.string().date(),
});
