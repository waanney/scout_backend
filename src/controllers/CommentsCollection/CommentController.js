import { StatusCodes } from 'http-status-codes';
import ApiError from '../../utils/ApiError.js';
import { CommentService } from '../../services/CommentService.js';

const createNew = async (req, res, next) => {
    try {
        // Assuming req.body contains the comment data
        const createdComment = await commentService.createNew(req.body);
        res.status(StatusCodes.CREATED).json(createdComment);
    } catch (error) {
        next(error);
    }
};

const getDetails = async (req, res, next) => {
    try {
        const commentId = req.params.id; 
        const comment = await commentService.getDetails(commentId);
        
        res.status(StatusCodes.OK).json(comment);
    } catch (error) {
        next(error);
    }
};

const updateComment = async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const updatedComment = await commentService.updateComment(commentId, req.body);
        
        res.status(StatusCodes.OK).json(updatedComment);
    } catch (error) {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const deleted = await commentService.deleteComment(commentId);
        
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
};

export const commentController = {
    createNew,
    getDetails,
    updateComment,
    deleteComment,
};
