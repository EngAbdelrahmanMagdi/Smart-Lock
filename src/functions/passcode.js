const { Tuya } = require("./Tuya");
const { generateToken } = require("./generateAccessToken");
const { refreshToken } = require("./refreshToken");

const { promisify } = require("util");
const workerFarm = require("worker-farm");
const path = require("path");

require("dotenv").config();
const { DEVICE_ID, INVALID_TIME, EFFECTIVE_TIME, NAME } = process.env;
let device_id = DEVICE_ID;

const generatePasscode = async () =>
  Math.floor(1000000 + Math.random() * 9000000);

const accessCode = async (passcode) => {
  let tokenData = await generateToken();
  let token = tokenData.access_token;
  let invalid_time = INVALID_TIME;
  let effective_time = EFFECTIVE_TIME;
  let name = NAME;

  const newToken = await refreshToken.runOnDate(new Date());
  if (newToken) {
    token = newToken;
  }
  deviceData = await Tuya.devices(token).get_details(device_id);

  // get device details

  let local_key = deviceData.result.local_key;

  const workers = workerFarm(
    require.resolve(path.join(__dirname, "encryption.js"))
  );

  const encryptPassword = promisify(workers);
  const password = (await encryptPassword(`${passcode}#${local_key || ""}`))
    ?.content;

  generatedAccessCode = await Tuya.devices(token).post_passCode(device_id, {
    invalid_time,
    effective_time,
    name,
    password,
  });

  const remote_passcode_id = generatedAccessCode.result.id;

  return remote_passcode_id;
};

module.exports = { accessCode, generatePasscode };
