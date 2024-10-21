import { response, request } from "express";
import db from "../../Connector";

const upddatePost = async (req = request, res = response) => {
    const { judul, body } = req.body;
    const { id } = req.params; 
    const intId = parseInt(id); 
    const userId = req.userId; 
    console.info(id)

    try {

        const getPost = await db.post.findUnique({
            where: {
                id: intId 
            }
        });

        if (!getPost) {
            return res.status(404).json({
                success: false,
                message: "Post tidak ditemukan"
            });
        }

        if(getPost.userId !== userId) {
            return res.status(500).json({
                default : false,
                message : "kamu dilarang edit di postingan ini"
            })
        }


        const editPost = await db.post.update({
            where: { 
                id: intId, 
                userId: userId 
            },
            data: {
                judul, 
                body
            }
        });

        if (!editPost) {
            return res.status(403).json({
                success: false,
                message: "Anda tidak bisa mengedit post ini"
            });
        }

 
        res.status(200).json({
            success: true,
            message: "Post berhasil diupdate",
            post: editPost
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan, post tidak dapat diupdate"
        });
    }
};

export default upddatePost;
