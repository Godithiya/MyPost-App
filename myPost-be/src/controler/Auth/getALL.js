import db from "../../Connector"

const getAll = async (req, res) => {
    try {
        const response = await db.user.findMany()
        res.json(response)
    } catch (error) {
        console.error(error)
    }
}

export default getAll