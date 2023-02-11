const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

function handleResponseWithData(res, code, data) {
  res.status(code).json(data);
}

function jwtTokenCreation(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = {
  handleResponse,
  handleResponseWithData,
  jwtTokenCreation,
  comparePass,
};
