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
    sharesBought    = parseInt(req.body.shares);

    User.findOne({"local.username" : username}, function(err, user){
      if(err) return err;
      if(user){
        console.log(user);
        currentShares   = parseInt(user.local.shares);
        newShares       = currentShares + sharesBought;
        console.log(newShares);
        User.update({"local.username" : user.local.username}, {$set:{"local.shares": newShares}},
        function(err, user){
          if(err) return err;
          console.log(user);
          req.flash('success', "shares updated successfully");
          res.redirect('/manageshares');
        });
      }
      else{
        req.flash('info', 'user not found, please check spellings and try again');
        res.redirect('/manageshares');
      }
     });
  },
  myShares : function(req, res){
  var  user = req.user.username;
    console.log(user);
    User.findOne({"local.username" : user},  function(err, user){
      if(err) return err;
      console.log( user.local.shares);
      req.flash( 'info', 'hey', user.local.username, 'you have', user.local.shares, 'shares' );
      res.redirect('userevents');
    });
  }
}
