// 引用linebot SDK
var linebot = require('linebot');
var bot = linebot({
  channelId: '1653725972',
  channelSecret: '976c6261319ff34a5ff0cf5e59db068c',
  channelAccessToken: 'ewXWN4h20PxIhQvJFu4x3b94n5AXMyGZtbcUA9+n9IqAItPvWABoSkrxqiE2jkpIsnXDJLCsPrNu3VMpBToUVuLf4QGmFgh0jWm67sDqnwoLjoYzbh4S8s4zKTyEFtbtIHDKDplcsJBFFHX2TiVZFwdB04t89/1O/w1cDnyilFU='
});

bot.on('join', function (event) {
  event.reply("join")
});
bot.on('leave', function (event) {
  event.reply("leave")
});
bot.on('memberJoined', function (event) {
  event.reply("memberJoined")
});
bot.on('memberLeft', function (event) {
  event.reply("memberLeft")
});

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {
  // event.message.text是使用者傳給bot的訊息
  // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
  // event.reply({
  //   "type": "text",
  //   "text": "https://drive.google.com/open?id=1QY-R8AF35DUMeoaYb-YjTZz0KHHHT54J\n接下來移動前，請在大廳任何一扇對外窗，觀察「美術館被什麼樣的街景包圍」，並拍攝一張觀察結果回傳給我，我們將繼續第三段導覽。對了，等下如果有上二樓的需求，可以先把語音按暫停。"
  // })
  event.reply({
  "type": "template",
  "altText": "this is a carousel template",
  "template": {
    "type": "carousel",
    "actions": [],
    "columns": [
      {
        "title": "第 2 段",
        "text": "下來移動前，請在大廳任何一扇對外窗，觀察「美術館被什麼樣的街景包圍」，並拍攝一張觀察結果回傳給我，我們將繼續第三段導覽。",
        "actions": [
          {
            "type": "uri",
            "label": "語音",
            "uri": "https://drive.google.com/open?id=1rVl5V_S0Hg65j9V_HTwHQYJc0L9OmGXU"
          },
          {
            "type": "postback",
            "label": "聽完上面的語音後請按此",
            "text": "動作 2",
            "data": "資料 2"
          }
        ]
      }
    ]
  }
})
  .then(function (data) {
    // 當訊息成功回傳後的處理
  }).catch(function (error) {
    // 當訊息回傳失敗後的處理
  });
});

// Bot所監聽的webhook路徑與port
const PORT = 3000;
bot.listen('/', PORT, function () {
    console.log(`[BOT已準備就緒, port: ${PORT}]`);
});
