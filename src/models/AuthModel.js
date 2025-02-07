import Joi from 'joi'
import {ObjectId} from'mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '../utils/validators.js'
import { GET_DB } from '../config/mongodb.js'
import bcrypt from 'bcrypt'
import { boardModel } from './boardModel.js'



// Define Collection (name & schema)
const USER_COLLECTION_NAME = 'Users'
const USER_COLLECTION_SCHEMA = Joi.object({
    username: Joi.string().required().min(6).max(20).trim().strict(),
    userID: Joi.string().required().min(6).max(30).trim().strict(),
    password: Joi.string().required().min(8).trim().strict(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).strict(),
    admin: Joi.boolean().default(false),
    slug: Joi.string().required().trim().strict(),
    
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
    return await USER_COLLECTION_SCHEMA.validateAsync(data, {abortEarly: false})


};


const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        validData.password = await bcrypt.hash(validData.password, 10)
        delete validData.confirmPassword

        console.log('validData: ', validData)
        const createdUser = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)

        return createdUser
    } catch (error) {
        throw new Error(error)
    }
}

const findOne = async (query) => {
    try {
        return await GET_DB().collection(USER_COLLECTION_NAME).findOne(query)
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        return await GET_DB().collection(USER_COLLECTION_NAME).findOne({_id: new ObjectId(id)})
    } catch (error) {
        throw new Error(error)
    }
}
// bat dau join data tai day
const getDetails = async (id) => {
    try {
       // return await GET_DB().collection(USER_COLLECTION_NAME).findOne({_id: new ObjectId(id)})
        const result = await GET_DB().collection(USER_COLLECTION_NAME).aggregate([
            {$match: {
                _id: new ObjectId(id),
                _destroy: false
            } },
            {$lookup: {
                from: boardModel.BOARD_COLLECTION_NAME,
                localField: '_id',
                foreignField: 'userID',
                as: 'boards'
            } }

        ]).toArray()

        return result[0] || {}

    } catch (error) {
        throw new Error(error)
    }
}


export const AuthModel = {
    USER_COLLECTION_NAME,
    USER_COLLECTION_SCHEMA,
    createNew,
    findOneById,
    getDetails,
    validateBeforeCreate,
    findOne,
}