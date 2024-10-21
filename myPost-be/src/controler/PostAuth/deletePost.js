import {response, request } from "express"
import db from "../../Connector"

const deletePost = async ( req = request, res = response ) => {
    const { id } = req.params
    const intId = parseInt(id)
    const userId = req.userId

    try {
        const getPostUser = await db.post.findUnique({
            where : {
                id : intId
            }
        })

        if (!getPostUser) {
            return res.status(500).json({
                default : false,
                message : "data is not devind"
            })
        }

        const deletePostUser = await db.post.delete({
            where : {
                id : intId
            }
        })


        if(!deletePostUser) {
            return res.status(500).json({
                default : false,
                message : "delete gagal"
            })
        }

        res.json({
            default : true,
            message : "success delete data",
            data : deletePostUser
        })
    } catch (error) {
        console.error(error)
    }
}

export default deletePost