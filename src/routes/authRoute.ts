import express from 'express'
import {login,register} from '../controllers/authController'

const router = express.Router()

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: רישום משתמש חדש
 *     description: יוצר חשבון משתמש חדש במערכת. אם המשתמש הוא מנהל, מחזיר טוקן ב-cookie.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *               - classname
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [teacher, student]
 *               classname:
 *                 tipe: string
 *     responses:
 *       201:
 *         description: המשתמש נרשם בהצלחה
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *       400:
 *         description: שגיאה בנתונים שהוזנו
 */
router.post('/register', register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: התחברות למערכת
 *     description: מאמת את פרטי המשתמש ומחזיר טוקן ב-cookie אם המשתמש הוא מנהל.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: התחברות הצליחה
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 isManager:
 *                   type: boolean
 *                 userId:
 *                   type: string
 *                 token:
 *                   type: string
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: token=abcde12345; HttpOnly; Secure; SameSite=Strict
 *       401:
 *         description: שם משתמש או סיסמה שגויים
 */
router.post('/login',login)

export default router