import { StatusCodes } from 'http-status-codes';
import { CommentInlineModel } from '~/models/commentInlineModel.js';
import ApiError from '~/utils/ApiError.js';
import { ObjectId } from 'mongodb';
import { AuthModel } from '~/models/AuthModel.js';

const createComment = async reqBody => {
  try {
    const commentData = {
      ...reqBody,
      author: new ObjectId(reqBody.userId), // Convert userId to ObjectId
      boardID: new ObjectId(reqBody.boardId), // Assuming comments are linked to posts
    };

    // Save the new comment to the database
    const createdComment = await CommentInlineModel.createComment(commentData);

    return createdComment;
  } catch (error) {
    throw error;
  }
};

const getDetails = async commentId => {
  try {
    const comment = await CommentInlineModel.findOneById(
      new ObjectId(commentId),
    );
    if (!comment) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Comment not found!');
    }
    return comment;
  } catch (error) {
    throw error;
  }
};

const updateComment = async (commentId, updateData) => {
  try {
    const updatedComment = await CommentInlineModel.updateOneById(
      new ObjectId(commentId),
      updateData,
    );
    if (!updatedComment) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Comment not found!');
    }
    return updatedComment;
  } catch (error) {
    throw error;
  }
};

const deleteComment = async (commentId) => {
  try {
    const result = await CommentInlineModel.deleteComment(commentId);
    if (!result) {
      throw new Error('Comment inline not found');
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSortedComments = async postId => {
  try {
    const comments = await CommentInlineModel.findManyByPostId(
      new ObjectId(postId),
    );
    return comments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  } catch (error) {
    throw error;
  }
};


export const CommentInlineService = {
  createComment,
  getDetails,
  updateComment,
  deleteComment,
  getSortedComments,
};
