import { request, response } from "express";
import db from "../../Connector";

const createPost = async (req = request, res = response) => {
    const userId = req.userId;  
    const { judul, body } = req.body;

    try {
        
        const userExists = await db.user.findUnique({
            where: { id: userId }
        });

        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const newPost = await db.post.create({
            data: {
                judul,
                body,
                userId
            }
        });

      
        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post: newPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error creating post: " + error.message
        });
    }
};

export default createPost;
