const { decodeJWT } = require("../helpers/jwtHelper");

const authorization = (req, res, next) => {
  const token = req.cookies?.auth_token;

  if (!token) return res.sendStatus(404);

  const data = decodeJWT(token);

  req.user = data;

  return next();
};

module.exports = authorization;
