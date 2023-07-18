const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const verifyAuthToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null;
  }
};

const generateUserToken = (user) => {
  const generateToken = (data) =>
    jwt.sign(data, SECRET_KEY, { expiresIn: "1h" });

  const payload = {
    email: user.email,
    firstname: user.first_name,
    lastname: user.last_name,
    username: user.username,
  };

  return generateToken(payload);
};

module.exports = { verifyAuthToken, generateUserToken };
