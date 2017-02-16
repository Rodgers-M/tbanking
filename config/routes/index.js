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

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.returnTo = req.path;
  res.redirect('/login');
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
router.get('/roles', roleRoutes.index);
router.post('/role', roleRoutes.assign);

//shares routes
router.get('/manageshares', sharesRoutes.new);
router.post('/updateshares', sharesRoutes.update);
router.get('/shares', sharesRoutes.userShares);
router.get('/loancalc', function(req, res){
  res.render('userdashboard/loancalc',{
      page : 'loancalc'
  });
});

//events routes
router.get('/newevent', eventRoutes.new);
router.post('/events/new', eventRoutes.create);
router.get('/events', eventRoutes.index);
router.get('/userevents', eventRoutes.userevent);

module.exports = router;
