import { Request, Response, NextFunction } from 'express';

import { roomAvailabilitySchema } from '#schemas/roomSchema';
import RoomService from '#services/roomService';

class RoomController {
  static async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const rooms = await RoomService.getAllRooms();
      res.json(rooms);
    } catch (err) {
      next(err);
    }
  }

  static async getAvailableList(req: Request, res: Response, next: NextFunction) {
    try {
      const data = roomAvailabilitySchema.parse(req.query);
      const availableRooms = await RoomService.getAvailableRooms(data);
      res.json(availableRooms);
    } catch (err) {
      next(err);
    }
  }
}

export default RoomController;
