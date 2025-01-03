
import {boardModel} from '../models/boardModel.js'
import { slugify } from '../utils/formatters.js'


const createNew = async (reqBody) => {
    try{
        // xử lý logic dữ liệu tùy đặc thù dự án
        const newBoard = {
            ...reqBody,
            slug: slugify(reqBody.title)
        }
        // Gọi tầng Models để xử lý  lưu bản ghi newBoard vào database
        const createdBoard = await boardModel.createNew(newBoard)
        //console.log(createdBoard)

        // lấy bản ghi board sau khi gọi 
        const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
        //console.log(getNewBoard)
        
        // trả kết quả trong service
        return getNewBoard
    } 
    
    catch (error) { throw error }
}

export const boardService  ={
    createNew
}
