import express from 'express'
import {createScore} from '../controllers/scoreController'

const router = express.Router()

router.post('/',createScore)


export default router