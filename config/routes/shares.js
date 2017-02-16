var User = require('../../app/models/user');

module.exports ={
  new  : function(req, res){
    res.render('admindashboard/shares',{
      page :'shares'
    });
  },
  userShares : function(req, res){
    res.render('userdashboard/shares',{
      page : 'shares'
    });
  },
  view : function(req, res){
    // define a function to view total group shares
  },
  update : function(req, res){
    username        = req.body.username;
    sharesBought    = req.body.shares;

    User.findOne({"local.username" : username}, function(err, user){
      if(err) return err;
      console.log(user);
      currentShares   = user.local.shares;
      newShares       = currentShares + sharesBought;
      console.log(newShares);
      User.update({"local.username" : user.local.username}, {$set:{"local.shares": newShares}},
      function(err, user){
        if(err) return err;
        console.log(user);
        req.flash('success', "shares updated successfully");
        res.redirect('/manageshares');
      }
    );
     });
  }
}
