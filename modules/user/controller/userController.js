import { localDB } from "../../../config/db.js";
import { v4 as uuid } from "uuid";

import bcrypt from "bcrypt";
import date_and_time from "date-and-time";

import pkg from "jsonwebtoken";
const { sign } = pkg;

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const now = new Date();

export const createUser = (req, res) => {
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
      console.log(err);
      return res.status(500).json(err);
    }
    return res.status(201).json({ message: " User successfully created!" });
  });
};

export const getAllUser = (req, res) => {
  const query = `SELECT * from users`;
  localDB.query(query, (err, results, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.status(200).json(results);
  });
};

export const getUser = (req, res) => {
  const query = "SELECT * from users WHERE user_id = ? and `status` = 1";
  localDB.query(query, req.params.id, (err, results, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.status(200).json(results);
  });
};

export const updateUser = (req, res) => {
  const query = `UPDATE users set
    email = ?, password = ?, username = ?, contact_no = ?, updated_at = ?
    WHERE user_id = ?`;

  const password = bcrypt.hashSync(req.body.password, salt);

  const VALUES = [
    req.body.email,
    password,
    req.body.username,
    req.body.contact_no,
    date_and_time.format(now, "YYYY-MM-DD HH:mm:ss"),
    req.params.id,
  ];

  localDB.query(query, VALUES, (err, results, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log("Update user : ", req.params.id);
    return res.status(200).json({ message: "Updated successfully" });
  });
};

export const deleteUser = (req, res) => {
  const query = "UPDATE users SET `status` = '0' WHERE user_id = ?";
  localDB.query(query, req.params.id, (err, results, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log("delete user : ", req.params.id);
    return res.status(200).json({ message: "Deleted successfully" });
  });
};

export const generateToken = (req, res) => {
  const payload = {
    user_id: "12345",
  };

  if (!process.env.SECRET_KEY) {
    return res.status(500).json({ SECRET_KEY: "SECRET_KEY is not defined!" });
  }
  const secret_key = process.env.SECRET_KEY;
  const options = { expiresIn: "5m" };

  const access_token = sign(payload, secret_key, options);
  return res.status(200).json({ access_token });
};
