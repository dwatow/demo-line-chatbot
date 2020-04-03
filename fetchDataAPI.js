var axios = require("axios");
const fetchDataAPI = axios.create({
  baseURL: process.env["fetchDataAPI"],
  headers: {
    "Content-Type": "application/json"
  }
});

module.exports = fetchDataAPI;