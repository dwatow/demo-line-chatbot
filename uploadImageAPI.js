const FormData = require('form-data');
const axios = require("axios");

const data = new FormData();
const imgurAPI = axios.create({
  baseURL: process.env["imgurUploadImageAPI"],
  headers: {
    // "Content-Type": "multipart/form-data",
    ...data.getHeaders(),
    "Authorization": `Client-ID ${process.env["imgurClientID"]}`
  }
});

async function uploadImage(base64) {
  try {
    data.append("image", base64);
    const res =  await imgurAPI.post("", data)
    return res.data;
  } catch (error) {
    console.log("error: ", error);
    console.log("error.message: ", error.message);
  }
}

module.exports = {
  uploadImage
};