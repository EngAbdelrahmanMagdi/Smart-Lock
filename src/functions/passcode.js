const { Tuya } = require("./Tuya");
const { generateToken } = require("./generateAccessToken");
const { refreshToken } = require("./refreshToken");

const { promisify } = require("util");
const workerFarm = require("worker-farm");
const path = require("path");

require("dotenv").config();
const { DEVICE_ID, INVALID_TIME, EFFECTIVE_TIME, NAME } = process.env;
let device_id = DEVICE_ID;

const generatePasscode = () => Math.floor(1000000 + Math.random() * 9000000);
const passcode = generatePasscode();

const accessCode = async () => {
  let tokenData = await generateToken();
  let token = tokenData.access_token;
  let invalid_time = INVALID_TIME;
  let effective_time = EFFECTIVE_TIME;
  let name = NAME;

  console.log(tokenData);
  console.log(token);
  const newToken = await refreshToken.runOnDate(new Date());
  if (newToken) {
    token = newToken;
  }
  deviceData = await Tuya.devices(token).get_details(device_id);

  // get device details
  console.log("device data is");
  console.log(deviceData);
  let local_key = deviceData.result.local_key;
  console.log(`Local key is ${local_key}`);

  console.log(local_key);

  const workers = workerFarm(
    require.resolve(path.join(__dirname, "encryption.js"))
  );

  const encryptPassword = promisify(workers);
  console.log(`passcode is ${passcode}`);
  const password = (await encryptPassword(`${passcode}#${local_key || ""}`))
    ?.content;
  console.log(`password is ${password}`);

  generatedAccessCode = await Tuya.devices(token).post_passCode(device_id, {
    invalid_time,
    effective_time,
    name,
    password,
  });
  console.log("generated access code is");
  console.log(generatedAccessCode);
  console.log("remote passcode is");
  const remote_passcode_id = generatedAccessCode.result.id;
  console.log(remote_passcode_id);
  console.log(typeof device_id);
  let stringfyPasscode = remote_passcode_id.toString();
  console.log(typeof stringfyPasscode);
  console.log(stringfyPasscode);
  password_id = await Tuya.devices(token).get_passCode(
    device_id,
    stringfyPasscode
  );
  console.log("password id is");
  console.log(password_id);
  return remote_passcode_id;
};

module.exports = { accessCode, passcode };
