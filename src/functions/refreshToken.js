const { generateToken } = require("./generateAccessToken");
const {Tuya} = require("./Tuya");

const dayjs = require("dayjs");
const nodeSchedule = require("node-schedule");

const refreshToken = nodeSchedule.scheduleJob("*/2 * * * *", async () => {
  let tokenData = await generateToken();
  let token = tokenData.access_token;
  let refreshToken = tokenData.refresh_token;
  let expire_date = dayjs().add(tokenData.expire_time, "second").toDate();
  const currentDate = dayjs();
  try {
    if (dayjs(expire_date).isBefore(currentDate)) {
      console.log("generate new token");
      const newToken = await generateToken().access_token;
    } else if (
      dayjs(expire_date).subtract(60, "minute").isBefore(currentDate) &&
      !dayjs(expire_date).isBefore(currentDate)
    ) {
      console.log("refresh token");
      let tokenRefreshedData = await Tuya.token().get_refresh(refreshToken);
      console.log("refresh Access token Data are");
      console.log(tokenRefreshedData);
      let newToken = tokenRefreshedData.result.access_token;
      console.log(`new token is ${newToken}`);
      return newToken;
    }
  } catch (e) {
    console.error(e.message);
  }
});

module.exports = { refreshToken };
