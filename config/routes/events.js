var Event = require('../../app/models/events');
module.exports = {
  new : function(req, res){
      res.render('events/new',{
        page : 'events'
      });

 },
 create : function(req, res){
   var event = new Event();

   event.title        =  req.body.title;
   event.venue        =  req.body.venue;
   event.date         =  req.body.date;
   event.time         =  req.body.time;
   event.description  =  req.body.description;


    Event.findOne({title: event.title}, function(err, foundEvent){
      if (foundEvent){
        req.flash('error', 'Event Already already exists');
        return res.redirect('/newevent');
      } else{
        event.save(function(err, event){
          if (err) return next(err);
          req.flash('success', 'Event Created successfuly');
          res.redirect('/events');
          console.log("saved event ", event);
        });
      }
    });
  },

   index : function(req, res){
      Event.find({}, function(error, events){
        if(error) res.send(error);
        res.render('events/index',{
            events : events,
            page   : 'events'
        });
      });
    },
  userevent : function(req, res){
    Event.find({}, function(error, events){
      if(error) res.send(error);
      res.render('userdashboard/events',{
          events : events,
          page   : 'events'
      });
    }).sort({"date":-1});
  }

};