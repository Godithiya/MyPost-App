import db from "../../Connector"

const postByAuth = async (req, res) => {
    const userId = req.userId
    try {
        const respons = await db.post.findMany({
            where : {userId}
        })
        res.status(200).json({
            default : true,
            message : "Data Valid Brooo",
            respons
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            default : false,
            message : "user id "
        })
    }

}
 export default postByAuth