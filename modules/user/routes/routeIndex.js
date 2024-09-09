import express from "express";
import {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  generateToken,
} from "../controller/userController.js";

const route = express.Router();

route.post("/user", createUser);
route.get("/users", getAllUser);
route.get("/user/:id", getUser);
route.put("/user/:id", updateUser);
route.delete("/user/:id", deleteUser);
route.get("/generate-token", generateToken);

export default route;
