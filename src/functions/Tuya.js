require("dotenv").config();
const TuyaCloud = require("./../lib/TuyaCloud");
const { ACCESS_KEY, SECRET_KEY, SERVER } = process.env;

let Tuya = new TuyaCloud({
  secretKey: SECRET_KEY,
  accessKey: ACCESS_KEY,
  server: SERVER,
});

module.exports={Tuya};