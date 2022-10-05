// CRON
const CronJob = require('cron').CronJob;
const usersCollection = require('./db').db().collection("users")
const tweetCollection = require('./db').db().collection("tweets")
const ObjectID = require('mongodb').ObjectID
const rwClient = require('./twitter')


const tweet =  (newTweet) => {
    return new Promise ( async ( resolve, reject) => {
        try{
            let response = await rwClient.v1.tweet(newTweet)
            // console.log(response)
             resolve(response)
        } catch (e) {
            console.log(e)
        }
    })
}


let tweetPerDay = 3; //Default Value
let earliestTweetTime = 7 //in 24hrs clock
let latestTweetTime = 23 //in 24hrs clock
let numOfHoursInADay = latestTweetTime - earliestTweetTime
let hourInterval = Math.ceil(numOfHoursInADay/tweetPerDay)


// five times everyday, It will pull in the value of the number of tweetsperday
const job = new CronJob('0 0 8-20/3 * * *', async () => {
    let adminDetails = await usersCollection.findOne({role: 'admin'})
    tweetPerDay = adminDetails.tweetPerDay
    let hourInterval = Math.ceil(numOfHoursInADay/tweetPerDay)
});

job.start();


// Find the hour diff, tweet and update value in database
const job2 = new CronJob(`0 0 ${earliestTweetTime}-${latestTweetTime}/${hourInterval} * * *`, async () => {
    let tweetToPost = await tweetCollection.findOne({status: {$nin:  ['tweeted', 'notWorking']}})
    if (tweetToPost.content){
        let response = await tweet(tweetToPost.content)
        if (response.id) {
            console.log("Just Tweeted")
            await tweetCollection.findOneAndUpdate({_id: new ObjectID(tweetToPost._id)}, {$set: {status: "tweeted", tweetDate: new Date()}})
        } else {
            await tweetCollection.findOneAndUpdate({_id: new ObjectID(tweetToPost._id)}, {$set: {status: "notWorking"}})
        }
    }
});

job2.start();

// console.log('System TZ next 10: ', job2.nextDates(10));


