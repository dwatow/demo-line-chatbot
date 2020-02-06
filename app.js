// 引用linebot SDK
var linebot = require('linebot');
var axios = require("axios");
var bot = linebot({
  channelId: process.env['LineUserId'],
  channelSecret: process.env["ChannelSecret"],
  channelAccessToken: process.env["ChannelAccessToken"]
});


// 當有人傳送訊息給Bot時
bot.on('message', async function ({ source, message, reply }) {
  console.log('當有人傳送訊息給Bot時');
  const { type } = source

  const profile = await source.profile()
  const userId = profile.displayName;

  if (message.type === "image") {
    console.log('拍照上傳才會做的動作');
    // 拍照上傳才會做的動作
    const { originalContentUrl } = message.contentProvider
    console.log(message.contentProvider);

    const origin_url = originalContentUrl;
    const image = userId;
    // const preview_url = previewImageUrl;

    console.log('使用者 userId');
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

    console.log('上傳使用者進度 1');
    const get_response = await axios.get(process.env["giveRecordURI"], {
      params: {
        index: post_response.data
      }
    })
    console.log('回覆錄音檔');
    // console.log(get_response.data);
    const response_list = get_response.data

    reply(response_list.map(element => ({
      "type": "text",
      "text": element
    })));
  }
});

// Bot所監聽的webhook路徑與port
const PORT = process.env.PORT || 3000;
bot.listen('/', PORT, function () {
    console.log(`[BOT已準備就緒, port: ${PORT}]`);
});
