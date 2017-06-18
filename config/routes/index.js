var express         =  require('express');
var passport        =  require('passport');
var router          =  express.Router();
var homeRoutes      =  require('./home');
var sessionRoutes   = require('./session');
var userRoutes      = require('./user');
var eventRoutes     = require('./events');
var roleRoutes      = require('./roles');
var sharesRoutes    = require('./shares');
var rsvpRoutes   	= require('./rsvp');

var Role = require("../../app/models/roles");
var User = require("../../app/models/user");

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.returnTo = req.path;
  req.flash('info', 'you must login to acces this page');
  res.redirect('/login');
}

function isAdmin(req, res, next){
  username = req.user.username;
  console.log(username);
  User.findOne({'local.username' : username}, function(err, foundUser){
    roleId = foundUser.local.role;

    Role.findById(roleId, function(err, role){
      if(err) return error;
      if(role !==null){
        if(role.name == 'admin'){
          return next()
        }
        req.flash('error', 'you are not authorised to access that resource');
        res.redirect('/userevents');
      }
      else{
        req.flash('error', 'you are not authorised to access that resource');
        res.redirect('/userevents');
      }

    } );
  });
}
//user routes
router.get('/', homeRoutes.index);
router.get('/login', sessionRoutes.new);
router.post('/session/create', sessionRoutes.create);
router.get('/logout', sessionRoutes.delete);
router.get('/signup', userRoutes.new );
router.post('/user/create', userRoutes.create);
router.get('/resetpass', userRoutes.getpage );
router.post('/resetpass', userRoutes.reset );
router.get('/members', isLoggedIn, isAdmin, userRoutes.index);
router.get('/remove/:member', isLoggedIn, isAdmin, userRoutes.delete);

//roles routes
router.get('/roles/:role',  roleRoutes.create);
router.get('/roles',isLoggedIn, isAdmin, roleRoutes.index);
router.post('/role', isLoggedIn, isAdmin, roleRoutes.assign);

//shares routes
router.get('/manageshares', isLoggedIn, isAdmin, sharesRoutes.new);
router.post('/updateshares', isLoggedIn,  isAdmin, sharesRoutes.update);
router.get('/shares', isLoggedIn,  isAdmin, sharesRoutes.userShares);
router.get('/myshares', isLoggedIn,sharesRoutes.myShares);
router.get('/loancalc',isLoggedIn, function(req, res){
  res.render('userdashboard/loancalc',{
      page : 'loancalc'
  });
});

router.get('/assets', isLoggedIn, sharesRoutes.assets);
//events routes
router.get('/newevent', isLoggedIn, isAdmin, eventRoutes.new);
router.post('/events/new', isLoggedIn,isAdmin, eventRoutes.create);
router.get('/events', isLoggedIn,isAdmin, eventRoutes.index);
router.get('/userevents',isLoggedIn, eventRoutes.userevent);
router.get('/editevent/:slug', isLoggedIn, eventRoutes.edit);
router.post('/events/update', isLoggedIn, eventRoutes.update);
router.get('/deleteEvent/:slug', isLoggedIn, eventRoutes.delete);

//rsvp routes
router.post('/rsvp/:slug', isLoggedIn, rsvpRoutes.create);
router.get('/showrsvp/:slug', rsvpRoutes.index);

module.exports = router;
