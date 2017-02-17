var User          = require('../../app/models/user');
module.exports ={
  new : function(req, res){
    res.render('signup', {
       title   : "Sign Up"
    });
  }
};
