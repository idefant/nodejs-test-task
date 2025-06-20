import { Router } from 'express';

import RoomController from '#controllers/roomController';

/**
 * @openapi
 * tags:
 *   name: Rooms
 *   description: Получение информации о номерах
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - id
 *         - number
 *       properties:
 *         id:
 *           type: string
 *         number:
 *           type: number
 */

/**
 * @openapi
 * /api/rooms:
 *   get:
 *     summary: Список номеров
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *
 * /api/rooms/available:
 *   get:
 *     summary: Список номеров доступных для бронирования в заданный период
 *     tags: [Rooms]
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *         example: "2025-06-20"
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *         example: "2025-06-22"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */

const router = Router();

router.get('/', RoomController.getList);
router.get('/available', RoomController.getAvailableList);

export default router;
