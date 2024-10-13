import express from 'express'
import * as scoreController from '../controllers/scoreController'
import * as middlwere from '../middlewares/authMiddleware'
// import * as 
const router = express.Router()

router.post('/',scoreController.createScore)
router.post('/myscore',scoreController.getAllScoreByStudentEmail)
router.get('/mystudentscore',middlwere.authMiddleware,middlwere.isManager, scoreController.getAllScoreByClassname)

export default router