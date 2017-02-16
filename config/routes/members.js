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
   }
}
