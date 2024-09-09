import mysql from "mysql2";

const config = {
  host: "localhost",
  port: 3306,
  database: "apidb",
  user: "root",
  password: "",
};

export const localDB = mysql.createPool(config);

localDB.getConnection((err, conn) => {
  if (err) console.log("Database connection is not established!!!!!!!");
  else console.log("db connected!");
});
