var User = require("../../app/models/user");

module.exports = {
  index : function(req, res){
     User.find({}, function(error, users){
       if(error) res.send(error);
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
	
	}
}
