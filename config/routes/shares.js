var User = require('../../app/models/user');

module.exports ={
  view : function(req, resave){
    // define a function to view user's shares
  },
  update : function(req, res){
    username        = req.body.username;
    sharesBought    = req.body.shares;

    User.findOne({"local.username" : username}, function(err, user){
      if(err) return err;
      currentShares   = user.local.shares;
      newShares       = currentShares + sharesBought;

      User.update({"local.username" : user.local.username}, {$set:{"local.shares": newShares}},
      function(err, user){
        if(err) return err;
        console.log(user);
        res.send("shares updated successfully");
        res.redirect('/manageshares');
      }
    );
     });
  }
}
