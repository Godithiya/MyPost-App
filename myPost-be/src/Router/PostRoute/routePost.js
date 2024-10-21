import { Router } from "express";
import createPost from "../../controler/PostAuth/createPost";
import Autetication from "../../middlewer/Autetication";
import getAllPost from "../../controler/PostAuth/getAllPost";
import postByAuth from "../../controler/PostAuth/postByAuth";
import upddatePost from "../../controler/PostAuth/updatePost";
import deletePost from "../../controler/PostAuth/deletePost";

const apiPost = Router()
apiPost.post("/api/post/create", Autetication, createPost)
apiPost.get("/api/post/getAll", getAllPost)
apiPost.get("/api/post/postByAuth", Autetication, postByAuth)
apiPost.put("/api/post/update/:id",Autetication, upddatePost)
apiPost.delete("/api/post/delete/:id", deletePost)

export default apiPost 