import { request, response } from "express";
import db from "../../Connector";

const createPost = async (req = request, res = response) => {
    const userId = req.userId;  
    const { judul, body } = req.body;

    try {
        // Mencari user berdasarkan userId
        const userExists = await db.user.findUnique({
            where: { id: userId }
        });

        // Jika user tidak ditemukan, kembalikan status 404
        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Buat post baru dengan asosiasi ke userId yang valid
        const newPost = await db.post.create({
            data: {
                judul,
                body,
                userId, // UserId diambil dari request
                author: userExists.name // Nama diambil dari user yang ditemukan
            }
        });

        // Kembalikan respons sukses dengan data post yang baru dibuat
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
