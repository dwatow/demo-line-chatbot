const linebot = require('linebot');
const bot = linebot(require('./config'));
const fetchDataAPI = require('../fetchDataAPI')
const uploadImageAPI = require('../uploadImageAPI')

// 當有人傳送訊息給Bot時
bot.on('message', async function ({ source, message, reply }) {
  console.log('當有人傳送訊息給Bot時');

  if (message.type !== "image") {
    const content = await message.content();
    console.log("content: ", [...content].map(x => String.fromCharCode(x)).join(""));
    reply("請認真逛展。")
  }

  console.log('上傳照片');

  const { type } = source

  const binaryBuffer = await message.content();
  const imgurRes = await uploadImageAPI(binaryBuffer.toString('base64'));
  const image = imgurRes.data.link;

  const profile = await source.profile()
  const userId = profile.displayName;

  console.log(`使用者 ${userId}`);
  const post_response = await fetchDataAPI.post("", {
    type, userId, image
  })

  console.log(`使用者進度: ${post_response.data}`);
  if (!~post_response.data) {
    reply({
      "type": "text",
      "text": "玩完囉~"
    })
  }

  const get_response = await fetchDataAPI.get("", {
    params: {
      index: post_response.data,
      resource: "records",
    }
  })
  console.log(get_response);
  console.log(`已取得錄音檔${get_response.data}`);
  const response_list = get_response.data

  reply(response_list.map(element => ({
    "type": "text",
    "text": element
  })));
});

module.exports = bot;
