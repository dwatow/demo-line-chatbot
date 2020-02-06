// 引用linebot SDK
var linebot = require('linebot');
var axios = require("axios");
var bot = linebot({
  channelId: process.env['LineUserId'],
  channelSecret: process.env["ChannelAccessToken"],
  channelAccessToken: process.env["ChannelSecret"]
});


// 當有人傳送訊息給Bot時
bot.on('message', async function ({ source, message, reply }) {
  const { type } = source


  const profile = await source.profile()
  const userId = profile.displayName;


  if (message.type === "image") {
    // 拍照上傳才會做的動作
    const { originalContentUrl } = message.contentProvider
    console.log(message.contentProvider);

    const origin_url = originalContentUrl;
    const image = userId;
    // const preview_url = previewImageUrl;
    const post_response = await axios.post(process.env["userProcessStepURI"], {
      type, userId, image
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })

    console.log(post_response.data);
    if (!~post_response.data) {
      reply({
        "type": "text",
        "text": "玩完囉~"
      })
    }
    const get_response = await axios.get(process.env["giveRecordURI"], {
      params: {
        index: post_response.data
      }
    })

    // console.log(get_response.data);
    const response_list = get_response.data

    reply(response_list.map(element => ({
      "type": "text",
      "text": element
    })));
  }
});

// Bot所監聽的webhook路徑與port
const PORT = 3000;
bot.listen('/', PORT, function () {
    console.log(`[BOT已準備就緒, port: ${PORT}]`);
});
