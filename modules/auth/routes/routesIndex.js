import express from "express";
import { register, login } from "../controller/authController.js";

const route = express.Router();

route.post("/auth/register", register);
route.post("/auth/login", login);

export default route;
