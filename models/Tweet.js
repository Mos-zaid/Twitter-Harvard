const tweetCollection = require('../db').db().collection("tweets")
const usersCollection = require('../db').db().collection("users")
const ObjectID = require('mongodb').ObjectID
const sanitizeHTML = require('sanitize-html')

let Tweet = function (data, userid){
    this.data = data
    this.errors = []
    this.userid = userid
}

function countWords(str) {
  const arr = str.split(' ');

  return arr.filter(word => word !== '').length;
}


Tweet.prototype.cleanUp = function() {
    if (typeof(this.data.content) != "string") {this.data.content = ""}
    if (typeof(this.data.tweetDate) != "string") {this.data.tweetDate = ""}

    // get rid of any bogus properties
    this.data = {
        content: sanitizeHTML(this.data.content.trim(), {allowedTags: [], allowedAttributes: {}}),
        tweetDate: sanitizeHTML(this.data.tweetDate.trim(), {allowedTags: [], allowedAttributes: {}}),
        createdDate: new Date(),
        author: ObjectID(this.userid)
    }
}


Tweet.prototype.editCleanUp = function() {
  if (typeof(this.data.content) != "string") {this.data.content = ""}
  if (typeof(this.data.tweetDate) != "string") {this.data.tweetDate = ""}
  if (!ObjectID.isValid(this.data.id)) {this.data.id = ""}

  // get rid of any bogus properties
  this.data = {
      id: this.data.id,
      content: sanitizeHTML(this.data.content.trim(), {allowedTags: [], allowedAttributes: {}}),
      tweetDate: sanitizeHTML(this.data.tweetDate.trim(), {allowedTags: [], allowedAttributes: {}}),
      editedDate: new Date(),
  }
}

Tweet.prototype.validate = function() {
    if (this.data.content == "") {this.errors.push("You must provide Tweet Content.")}
    if (countWords(this.data.content) >= 280) {this.errors.push("Content should be less than 280 words.")}
}

Tweet.prototype.createTweet = function () {
    return new Promise( (resolve, reject) => {
        this.cleanUp()
        this.validate()

        if (!this.errors.length) {
            // save post into database
            tweetCollection.insertOne(this.data).then((info) => {
              resolve({_id: info.insertedId})
            }).catch(() => {
              this.errors.push("Please try again later.")
              reject(this.errors)
            })
          } else {
            reject(this.errors)
          }

    })

}

Tweet.prototype.editTweet = function () {
  return new Promise( async (resolve, reject) => {
      this.editCleanUp()
      this.validate()

      if (!this.errors.length) {
        await tweetCollection.findOneAndUpdate({_id: new ObjectID(this.data.id)}, {$set: {content: this.data.content, updatedDate: this.data.editedDate}})
        resolve("success")
      } else {
        reject("failure")
      }



  })

}

Tweet.getTweets = function ( visitorId ) {
    return new Promise ( async ( resolve, reject ) => {

        // For Me as Admin
        // Get my id and then compare it with the visitors ID
        let adminDetails = await usersCollection.findOne({role: 'admin'})

        if (adminDetails._id.equals(visitorId)){
          let tweet = await tweetCollection.find({status: {$nin:  ['tweeted']}}).toArray( (err, items) => {
            resolve([items, adminDetails.tweetPerDay])
          })
        } else {
          let tweet = await tweetCollection.find({status: 'tweeted'}).toArray( (err, items) => {
            resolve([items, adminDetails.tweetPerDay])
          })
        }
    })

}

Tweet.deleteTweets = function ( postIdToDelete, visitorId ) {
  return new Promise ( async ( resolve, reject ) => {
        // For Me as Admin
        // Get my id and then compare it with the visitors ID
        let adminDetails = await usersCollection.findOne({role: 'admin'})
        if (adminDetails._id.equals(visitorId)){
            await tweetCollection.deleteOne({_id: new ObjectID(postIdToDelete)})
            resolve()
        }
    })

}


module.exports = Tweet