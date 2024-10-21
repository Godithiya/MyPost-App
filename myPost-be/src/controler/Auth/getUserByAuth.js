import { request, response } from "express"
import db from "../../Connector"

const getUserByAuth = async(req = request, res = response) => {
    const userId = req.userId
    try {
        const response = await db.user.findUnique({
            where : {
                id : userId
            }
        })

        res.status(200).json({ response })
    } catch (error) {
        console.error(error)
    }
}

export default getUserByAuth