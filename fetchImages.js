
const fetchDataAPI = require('./fetchDataAPI')

module.exports = async function fetchImages (req, res) {
  console.log("抓圖片");
  const images = await fetchDataAPI("", {
    params: {
      resource: "images"
    }
  })
  console.log("結果", res);
  res.json(images.data);
}