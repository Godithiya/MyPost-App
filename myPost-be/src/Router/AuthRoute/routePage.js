import { Router } from "express";
import Register from "../../controler/Auth/Regiter";
import Login from "../../controler/Auth/Login";
import getAll from "../../controler/Auth/getALL";
import Autetication from "../../middlewer/Autetication";
import getUserByAuth from "../../controler/Auth/getUserByAuth";


const routePage =  Router()
routePage.post("/api/register", Register)
routePage.post("/api/login", Login)
routePage.get("/api/getAll", getAll)
routePage.get("/api/getUser", Autetication, getUserByAuth )

export default routePage