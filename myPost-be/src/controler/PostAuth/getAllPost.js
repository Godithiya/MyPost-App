import db from "../../Connector";

const getAllPost = async (req, res) => {
    try {
        const dataAll = await db.post.findMany();
        res.status(200).json({
            default : true,
            data : dataAll
        });  
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Data is not defined"
        });
    }
};

export default getAllPost;
