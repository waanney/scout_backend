import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardValidation } from '../../validations/boardValidation.js';
import { boardController } from '../../controllers/PostsCollection/boardController.js';

const Router = express.Router();

Router.route('/').post(boardValidation.createNew, boardController.createNew);

Router.route('/:id').get(boardController.getDetails).put;

Router.route('/:boardId/share').post(boardController.shareBoard);

Router.route('/:boardId/save').post(boardController.saveBoard);

Router.route('/details').post(boardController.getSharedPostsDetails);

Router.route('/saveDetails').post(boardController.getSavedPostsDetails);

export const boardRoute = Router;
