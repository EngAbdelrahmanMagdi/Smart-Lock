const {Tuya} = require('./Tuya');
const generateToken = async()=>{
    let tokenData = await Tuya.token().get_new();
    return tokenData.result;
}
 
module.exports={generateToken};