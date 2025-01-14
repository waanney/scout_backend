import express from 'express'
import { AuthValidation } from '../../validations/AuthValidation.js'
import { AuthController } from '../../controllers/UsersCollection/AuthController.js'
import { middlewareToken } from '../../middlewares/middlewareToken.js'

const Router1 = express.Router()

Router1.route('/')
    .post(AuthValidation.createNew, AuthController.createNew)

Router1.route('/:id')
    .get(AuthController.getDetails)
    .put

Router1.route('/login')
    .post(AuthController.LoginUser)
    .put

Router1.route('/refresh-token')
    .post(AuthController.requestRefreshToken)

Router1.route('/logout')
    .post(AuthController.Logout)

/*Router1.route('/changepassword')
    .post(AuthValidation.changePassword,AuthController.changePassword)*/
export const AuthRoute = Router1