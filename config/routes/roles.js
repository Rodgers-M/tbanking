var Role = require("../../app/models/roles");
var User = require("../../app/models/user");

module.exports = {
  index  : function(req, res){
    res.render('admindashboard/roles');
  },
  create : function(req, res){
    var role = new Role();

    role.name = req.params.role;

    Role.findOne({name:role.name}, function(err, foundRole){
      if(err) return err;

      if(foundRole){
        res.send("role exists in database");
      }else{
        role.save(function(err, role){
          if(err) return err;
          res.send("Role created successfully");
        });
      }
    });
  },

  assign : function(req, res){
  //  var user = new User();
    //var role = new Role();
    var username = req.body.username;
    var role     = req.body.role;
    console.log(role);
    console.log(username);
    User.findOne({ 'local.username': username }, function(err, foundUser){
      if(err) return err;

      if(foundUser){
        console.log(foundUser);
        console.log(foundUser.local.username);
        Role.findOne({ 'name': role}, function(err, foundRole){
          if(err) return err;

          if(foundRole){
            console.log('role found');
            console.log(foundRole._id);


            User.update({"local.username" : foundUser.local.username}, {$set:{"local.role": foundRole._id}},
            function(err, user){
              if(err) return err;


              res.send(user);
            });
          }
        });

      }
    });
  }
};
