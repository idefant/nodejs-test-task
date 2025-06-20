import { Request, Response, NextFunction } from 'express';

import { bookingSchema } from '#schemas/bookingSchema';
import BookingService from '#services/bookingService';

class BookingController {
  static async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user?.id;
      if (!userId) return res.status(401).json({ message: 'Unauthorized' });

      const bookings = await BookingService.getList(userId);
      res.json(bookings);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = bookingSchema.parse(req.body);
      const userId = res.locals.user?.id;
      if (!userId) return res.status(401).json({ message: 'Unauthorized' });

      const booking = await BookingService.create(userId, data);
      res.status(201).json(booking);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const bookingId = req.params.id;
      const userId = res.locals.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const deleted = await BookingService.delete(userId, bookingId);
      if (!deleted) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export default BookingController;
