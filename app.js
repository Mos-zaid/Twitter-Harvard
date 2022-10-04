const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const csrf = require("csurf")
const app = express();
const zaidCron = require('./mycron')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let sessionOptions = session({
    secret: "JavaScript is sooooooooo coool",
    store: MongoStore.create({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
  })

app.use(sessionOptions)
app.use(flash())

// Express MiddleWare, to use
app.use(function(req, res, next){

  // make all error and success flash messages available from all templates
  res.locals.errors = req.flash("errors")
  res.locals.success = req.flash("success")

  // make current user id available on the req object
  if (req.session.user) {
    req.visitorId = req.session.user._id
  } else {
    req.visitorId = 0
  }

  // make user session data available from within view templates
  res.locals.user = req.session.user
  // console.log(res.locals)
  // console.log(req.url)
  next()

})

const router = require('./router')

app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(csrf())

app.use(function (req, res, next) {
  res.locals.csrfToken = req.csrfToken()
  next()
})


app.use(function (err, req, res, next) {
  if (err) {
    if (err.code == "EBADCSRFTOKEN") {
      console.log("Cross site request forgery detected.")
      req.flash("errors", "Cross site request forgery detected.")
      req.session.save(() => res.redirect("/"))
    } else {
      res.render("404")
    }
  }
})


app.use('/', router)

module.exports = app

// app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));