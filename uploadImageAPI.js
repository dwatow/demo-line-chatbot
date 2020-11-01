const FormData = require('form-data');
const axios = require("axios");

const imgurAPI = axios.create({
  baseURL: process.env["imgurUploadImageAPI"],
  headers: {
    // "Content-Type": "multipart/form-data",
    "Authorization": `Client-ID ${process.env["imgurClientID"]}`
  }
});

async function uploadImageAPI(base64) {
  try {
    const data = new FormData();
    data.append("image", base64);
    const res =  await imgurAPI.post("", data, {
      headers: {
        ...data.getHeaders()
      }
    })
    return res.data;
  } catch (error) {
    console.log("error: ", error);
    console.log("error.message: ", error.message);
  }
}

module.exports = uploadImageAPI;