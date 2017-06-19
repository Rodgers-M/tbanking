var passport	  = require('passport');
var User          = require('../../app/models/user');
module.exports ={
  new : function(req, res){
    res.render('signup', {
       title   : "Sign Up"
    });
  },
 create : function(req, res, next){
	passport.authenticate('local-signup',{
        successRedirect : '/login', //
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    })(req, res, next);
 },
 index : function(req, res){
     User.find({}, function(error, users){
       if(error) return error;
       res.render('admindashboard/members',{
           members : users,
           page   : 'members'
       });
     });
   },
	delete :function(req, res){
		User.findOneAndRemove({'local.username' : req.params.member}, function(error, removedMember){
			if(error) return next(error);
			req.flash('success', 'Member deleted successfully');
			res.redirect('/members');
		});
	
	},
	getpage : function(req, res){
		res.render('passwordreset');

	},
	reset : function(req, res){
		User.findOne({'local.username': req.body.username, 'local.email' : req.body.email },function(err, user){
			if(err) return err;
			if(!user){
			  req.flash("info", "Username and email don't match, Check and try again");
			  res.redirect('/resetpass');
			}else{
			  user.local.password = user.generateHash(req.body.password);
			  user.save(function(err, user){
			  	if(err) return err;
					req.flash('success', "Password reset successful, now login with new password");
					res.redirect('/login');
			  });
			}
		});
	}
};
