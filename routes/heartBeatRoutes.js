import express from 'express'
import { addHeartBeatData } from '../controllers/heartBeatController.js'

const router = express.Router()

router.route('/').post(addHeartBeatData)
export default router