var express         =  require('express');
var passport        =  require('passport');
var router          =  express.Router();
var homeRoutes      =  require('./home');
var sessionRoutes   = require('./session');
var userRoutes      = require('./user');
var eventRoutes     = require('./events');
var  roleRoutes     = require('./roles');
var  sharesRoutes   = require('./shares');
var membersRoutes   = require('./members');

var Role = require("../../app/models/roles");
var User = require("../../app/models/user");

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.returnTo = req.path;
  res.redirect('/login');
}

function isAdmin(req, res, next){
  username = req.user.username;
  console.log(username);
  User.findOne({'local.username' : username}, function(err, foundUser){
    roleId = foundUser.local.role;

    Role.findById(roleId, function(err, role){
      if(err) return error;
      if(role.name == 'admin'){
        return next()
      }
      req.flash('error', 'you are not authorised to access that resource');
      res.redirect('/userevents');
    } );
  });
}
//user routes
router.get('/', homeRoutes.index);
router.get('/login', sessionRoutes.new);
router.post('/session/create', sessionRoutes.create

);
router.get('/logout', sessionRoutes.delete);
router.get('/signup', userRoutes.new );
router.post('/user/create',passport.authenticate('local-signup', {
        successRedirect : '/userevents', //
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
router.get('/members', membersRoutes.index);

//roles routes
router.get('/roles/:role',  roleRoutes.create);
router.get('/roles',isLoggedIn, isAdmin, roleRoutes.index);
router.post('/role', isLoggedIn, roleRoutes.assign);

//shares routes
router.get('/manageshares', isLoggedIn, sharesRoutes.new);
router.post('/updateshares', isLoggedIn, sharesRoutes.update);
router.get('/shares', isLoggedIn, sharesRoutes.userShares);
router.get('/loancalc', function(req, res){
  res.render('userdashboard/loancalc',{
      page : 'loancalc'
  });
});

//events routes
router.get('/newevent', isLoggedIn, eventRoutes.new);
router.post('/events/new', isLoggedIn, eventRoutes.create);
router.get('/events', isLoggedIn,eventRoutes.index);
router.get('/userevents', eventRoutes.userevent);

module.exports = router;
