const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const tweetController = require('./controllers/tweetController')

// User related routes
router.get('/', userController.home)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/logout', userController.logout)
router.get('/register', userController.showRegistrationForm)
router.post('/register', userController.register)

// Tweet related routes
router.get('/tweet', tweetController.home)
router.post('/create-tweet', userController.mustBeLoggedIn ,tweetController.createTweet)
router.post('/edit-tweet', userController.mustBeLoggedIn ,tweetController.editTweet)
router.post('/delete-tweet', userController.mustBeLoggedIn ,tweetController.deleteTweet)

module.exports = router