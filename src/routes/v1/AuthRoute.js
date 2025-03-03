import express from 'express';
import { AuthValidation } from '~/validations/AuthValidation.js';
import { AuthController } from '~/controllers/UsersCollection/AuthController.js';
import { middlewareToken } from '~/middlewares/middlewareToken.js';
const Router1 = express.Router();

Router1.route('/').post(AuthValidation.createNew, AuthController.createNew);

Router1.route('/:id').get(AuthController.getDetails).put;

Router1.route('/login').post(AuthController.LoginUser).put;

// Router1.route('/refresh-token')
//     .post(AuthController.requestRefreshToken)

Router1.route('/logout').post(AuthController.Logout);

Router1.route('/change-password/:userId').put(
  AuthValidation.changePassword,
  AuthController.changePassword,
);

Router1.route('/forgot-password').post(AuthController.forgotPassword);

Router1.route('/reset-password/:token').put(AuthController.resetPassword);

Router1.route('/change-username/:userId').put(AuthController.changeUsername);

Router1.route('/avatar/:userId').put(
  AuthController.handleAvatarUpload,
  AuthController.updateAvatar,
);

Router1.route('/get-avatar/:userId').get(AuthController.getAvatar);

Router1.route('/delete-sharedpost/:userId/:postId').put(AuthController.deleteSharedPost);

export const AuthRoute = Router1;
