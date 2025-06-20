import { Router } from 'express';

import BookingController from '#controllers/bookingController';
import { authMiddleware } from '#middlewares/authMiddleware';

/**
 * @openapi
 * tags:
 *   name: Bookings
 *   description: Управление бронированием номеров
 */

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - id
 *         - roomId
 *         - fromDate
 *         - toDate
 *         - isVip
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *         roomId:
 *           type: string
 *         fromDate:
 *           type: string
 *           format: date
 *         toDate:
 *           type: string
 *           format: date
 *         isVip:
 *           type: boolean
 *         userId:
 *           type: string
 *
 *     BookingInput:
 *       type: object
 *       required:
 *         - roomId
 *         - fromDate
 *         - toDate
 *       properties:
 *         roomId:
 *           type: string
 *           format: uuid
 *         fromDate:
 *           type: string
 *           format: date
 *         toDate:
 *           type: string
 *           format: date
 */

/**
 * @openapi
 * /api/bookings:
 *   get:
 *     summary: Получение списка броней пользователя
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingInput'
 *     responses:
 *       201:
 *         description: Booking created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Номер уже забронирован на этот период
 *       401:
 *         description: Unauthorized
 *
 * /api/bookings/{id}:
 *   delete:
 *     summary: Отмена бронирования номера
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Бронь отменена
 *       403:
 *         description: Forbidden
 */

const router = Router();

router.get('/', authMiddleware, BookingController.getList);
router.post('/', authMiddleware, BookingController.create);
router.delete('/:id', authMiddleware, BookingController.delete);

export default router;
