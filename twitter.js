// TWITTER
const { TwitterApi } = require('twitter-api-v2');
const dotenv = require('dotenv')
dotenv.config()

const client = new TwitterApi({
    appKey: process.env.APPKEY,
    appSecret: process.env.APPSECRET,
    accessToken: process.env.ACCESSTOKEN,
    accessSecret: process.env.ACCESSSECRET
})


const rwClient = client.readWrite

module.exports = rwClient