const express = require('express')
const router = express.Router()
const { getStudentController, postStudentController, singleStudentController, updateStudentController, deleteStudentController } = require('../../controllers/studentController')
const authVerify = require('../../middlewares/authVerifyMiddleware')


router.get('/', authVerify, getStudentController)
router.post('/create-student', authVerify, postStudentController)
router.get('/single-student/:id', authVerify, singleStudentController)
router.post('/update-student/:id', authVerify, updateStudentController)
router.delete('/delete-student/:id', authVerify, deleteStudentController)


module.exports = router
