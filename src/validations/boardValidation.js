import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError.js';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators.js';

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(1).max(100).trim().messages({
      //custom message
      'any.required': 'Title is required',
      'string.empty': 'Title is not allowed to be empty',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title must be at most 50 characters long',
      'string.trim': 'Title must not have leading or trailing whitespace',
    }),
    description: Joi.string().required().min(1).trim().messages({
      'any.required': 'description is required',
      'string.empty': 'description is not allowed to be empty',
      'string.min': 'description must be at least 3 characters long',
      'string.max': 'description must be at most 50 characters long',
      'string.trim': 'description must not have leading or trailing whitespace',
    }),
    language: Joi.string().required().trim().messages({
      'any.required': 'description is required',
      'string.empty': 'description is not allowed to be empty',
      'string.min': 'description must be at least 3 characters long',
      'string.max': 'description must be at most 50 characters long',
      'string.trim': 'description must not have leading or trailing whitespace',
    }),
    userId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
    content: Joi.string().required(),
    boardCollectionID: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .default('677e53f474f256608d6044a2') // Gán giá trị mặc định
      .messages({
        'string.pattern.base': 'Invalid boardCollectionID format',
      }),
    boardshareCollectionID: Joi.array()
      .items(Joi.string().pattern(OBJECT_ID_RULE))
      .default([]) // Giá trị mặc định là một mảng rỗng
      .messages({
        'array.base': 'boardCollectionID must be an array',
        'string.pattern.base': 'Invalid boardCollectionID format',
      }),
  });

  try {
    //kiểm tra dữ liệu gửi lên có phù hợp hay không?
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    //Validate dữ liệu hợp lệ xong req đi tiếp sang controller
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message),
    );
  }
};

export const boardValidation = {
  createNew,
};
