import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const excludedPaths = [
    "/api/generate-token",
    "/api/auth/register",
    "/api/auth/login",
    // "/api/users",
  ];

  if (excludedPaths.includes(req.path)) {
    return next();
  }

  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ message: "Permission error!" });
  }

  jwt.verify(token.split(" ")[1], process.env.SECRET_KEY, (err) => {
    if (err) {
      switch (key) {
        case "TokenExpiredError":
          return res.status(401).send({ message: "TokenExpiredError" });
        case "JsonWebTokenError":
          return res.status(401).send({ message: "JsonWebTokenError" });
        default:
          return res.status(401).send({ message: "Access denied" });
      }
    }
    next();
  });
};
