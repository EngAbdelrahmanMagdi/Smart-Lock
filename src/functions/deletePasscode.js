const { Tuya } = require("./Tuya");
const { generateToken } = require("./generateAccessToken");

const deletePassCode = async (device_id, remotePassCode) => {
  let tokenData = await generateToken();
  let token = tokenData.access_token;
  const deletePassCode = await Tuya.devices(token).delete_passCode(
    device_id,
    remotePassCode
  );
  console.log('deleted passcode');

};

module.exports= {deletePassCode};