import express from 'express';
import sendReq from '../controller/sendReq.js'

const router = express.Router()

router.post('/sendReq', sendReq)

export default router