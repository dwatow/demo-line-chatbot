require('dotenv').config();
// 引用linebot SDK
const express = require('express');
const bot = require("./linebot/index.js");
const app = express();

const fetchImages = require("./fetchImages.js");

// Bot所監聽的webhook路徑與port
const PORT = process.env.PORT || 3000;

app.get('/images', fetchImages);
app.post('/callback', bot.parser());
app.listen(PORT, function () {
  console.log(`[BOT已準備就緒, port: ${PORT}]`);
});