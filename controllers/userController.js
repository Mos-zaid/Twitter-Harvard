let User = require('../models/User')

exports.home = function (req, res){
  if( req.session.user ){
    res.redirect('/tweet')
  } else {
    res.render('index')
  }
}

exports.mustBeLoggedIn = function(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    req.flash("errors", "You must be logged in to perform that action.")
    req.session.save(function() {
      res.redirect('/')
    })
  }
}

exports.register = function (req, res){
    let user = new User(req.body)
    user.register().then( (success)=> {
      req.flash('success', success)
      req.session.save(function() {
        res.redirect('/')
      })
    }).catch( regErrors => {
      req.flash('errors', regErrors)
      req.session.save(function() {
        res.redirect('/register')
      })
    })

}

exports.showRegistrationForm = function (req, res){
    res.render('register', {errors: req.flash('errors'), success: req.flash('success')})
}

exports.login = function(req, res) {
    let user = new User(req.body)
    user.login().then(function(result) {
      req.session.user = {username: user.data.username, _id: user.data._id}
      req.session.save(function() {
        res.redirect('/tweet')
      })
    }).catch(function(e) {
      req.flash('errors', e)
      req.session.save(function() {
        res.redirect('/')
      })
    })
  }


  exports.logout = function(req, res) {
    req.session.destroy(function() {
      res.redirect('/')
    })
  }
