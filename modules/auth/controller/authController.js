import { localDB } from "../../../config/db.js";
import { v4 as uuid } from "uuid";

import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const now = new Date();

export const register = (req, res) => {
  const query = `INSERT into users
      (user_id, email, password, username, contact_no, status)
      VALUES
      (?,?,?,?,?,?)`;

  const password = bcrypt.hashSync(req.body.password, salt);

  const VALUES = [
    uuid(),
    req.body.email,
    password,
    req.body.username,
    req.body.contact_no,
    req.body.status,
  ];

  localDB.query(query, VALUES, (err, rows, fields) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(201).json({ message: " User successfully created!" });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  localDB.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = {
      ...results[0],
      role: "Admin",
    };

    const secret_key = process.env.SECRET_KEY;
    const options = { expiresIn: "5m" };

    const access_token = sign(payload, secret_key, options);

    res
      .status(200)
      .json({ token: access_token, message: "Login Success", payload });
  });
};
