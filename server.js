import express from "express";
import userRoute from "./modules/user/routes/routeIndex.js";
import authRoute from "./modules/auth/routes/routesIndex.js";

import logs from "./middleware/logs.js";
import { authenticate } from "./middleware/jwt.js";
import cors from "cors";

const server = express();
const PORT = process.env.PORT || 8000;

server.use(express.json());

server.use(express.urlencoded({ extended: true }));

server.use(cors());
server.options("/api/*", cors());

server.use(logs);

server.use(authenticate);

server.use("/api", userRoute);
server.use("/api", authRoute);

server.listen(PORT, () => {
  console.log(`localhost running on port ${PORT}`);
});

// const { v4 : uuid} = require("uuid")
// console.log(uuid())

// const saltRounds = 10;
// const salt = bcrypt.genSaltSync(saltRounds);
// const hash = bcrypt.hashSync("test", salt);

// console.log(salt);
// console.log(hash);

// const foo = bcrypt.compareSync("test", hash); // true
// console.log(foo);

// server.get("/api/get-all-users", (req, res) => {
//   const username = "test";
//   return res.json({ username });
// });

// server.get("/api/user/:id", (req, res) => {
//   const id = req.params.id;
//   const username = req.body.username;
//   const email = req.body.email;

//   const user = {
//     id,
//     username,
//     email,
//   };
//   return res.json({ user });
// });

// server.post("/api/user", (req, res) => {
//   const username = req.body.username;
//   const email = req.body.email;

//   const user_payload = {
//     username,
//     email,
//   };
//   return res.json({ user_payload });
// });
