require('dotenv').config();
// 引用linebot SDK
const linebot = require('linebot');

const fetchDataAPI = require('./fetchDataAPI')
const { uploadImage } = require('./uploadImageAPI')
const bot = linebot({
  channelId: process.env['ChannelId'],
  channelSecret: process.env["ChannelSecret"],
  channelAccessToken: process.env["ChannelAccessToken"]
});

// 當有人傳送訊息給Bot時
bot.on('message', async function ({ source, message, reply }) {
  console.log('當有人傳送訊息給Bot時');

  const { type } = source
  const imageBse64 = await message.content();
  // console.log("[imageBse64: ]", imageBse64.toString("base64"));
  
  const imgurRes = await uploadImage(imageBse64);
  
  

  const profile = await source.profile()
  const userId = profile.displayName;

  if (message.type === "image") {
    console.log('拍照上傳才會做的動作');
    // 拍照上傳才會做的動作
    const { originalContentUrl } = message.contentProvider
    console.log(message.contentProvider);

    const origin_url = originalContentUrl;
    const image = imgurRes.data.link;
    // const preview_url = previewImageUrl;

    console.log('使用者 userId');
    const post_response = await fetchDataAPI.post("", {
      type, userId, image
    })

    console.log(post_response.data);
    if (!~post_response.data) {
      reply({
        "type": "text",
        "text": "玩完囉~"
      })
    }

    console.log('上傳使用者進度 1');
    const get_response = await fetchDataAPI.get("", {
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
  else {
    const content = await message.content();
    console.log("content: ", [...content].map(x => String.fromCharCode(x)).join(""));  
  }
});

// Bot所監聽的webhook路徑與port
const PORT = process.env.PORT || 3000;
bot.listen('/callback', PORT, function () {
    console.log(`[BOT已準備就緒, port: ${PORT}]`);
});
