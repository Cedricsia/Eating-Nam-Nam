const jwt = require("jsonwebtoken");

const { TOKEN_SECRET } = process.env;

const signOptions = { expiresIn: "1h" };

const encodeJWT = (payload) => {
  return jwt.sign(payload, TOKEN_SECRET, signOptions);
};

const decodeJWT = (token) => {
  return jwt.decode(token, TOKEN_SECRET);
};

module.exports = { encodeJWT, decodeJWT };
