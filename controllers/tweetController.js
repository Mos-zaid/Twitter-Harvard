
const Tweet = require('../models/Tweet')

exports.home = async function (req, res){
    try {
        let [tweets, tweetsPerDay] = await Tweet.getTweets(req.visitorId)
        res.render("tweets", {tweets: tweets, tweetsPerDay: tweetsPerDay})
        // if (post.isVisitorOwner) {
        //     res.render("tweets")
        //   } else {
        //     req.flash("errors", "You do not have permission to perform that action.")
        //     req.session.save(() => res.redirect("/"))
        //   }
    } catch {
        res.render("404")
    }
}

exports.createTweet = function (req, res){
    let tweet = new Tweet(req.body, req.session.user._id)
    tweet.createTweet().then( function (newId) {
        res.json(newId)
    }).catch(function (errors) {
        errors.forEach(error => req.flash("errors", error))
        req.session.save(() => res.redirect("/tweet"))
    })
}


exports.editTweet = function (req, res){
    let tweet = new Tweet(req.body, req.session.user._id)
    tweet.editTweet(req.visitorId).then( function (msg) {
        res.json(msg)
    }).catch(function (errors) {
        res.json(errors)
    })
}

exports.deleteTweet = function (req, res){
    let tweet = Tweet.deleteTweets(req.body.id, req.session.user._id).then( function (msg) {
        res.json(msg)
    }).catch(function (errors) {
        res.json(errors)
    })
}

