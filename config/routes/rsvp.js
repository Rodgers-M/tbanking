var Rsvp	 = require("../../app/models/rsvp");
var User	 = require("../../app/models/user");
var Event	 = require("../../app/models/events");

module.exports = {
	index : function(req, res){
		console.log(req.params.slug);
		Rsvp.find({'event_slug' : req.params.slug}).populate('username').exec(function(err,rsvps){
			console.log(rsvps.length);
//			res.json(rsvps);
			res.render('admindashboard/rsvps',{
				page 	: 'rsvps',
				rsvps 	: rsvps
			});
		});	
	},
	
	create: function(req, res){
		User.findOne({'local.username': req.user.username},'_id', function(err,user){
		console.log(req.user.username);
		console.log(user._id);
		var rsvp = new Rsvp();
		rsvp.username 		= user._id;
		rsvp.event_slug     = req.body.slug;
		Rsvp.findOne({'username': rsvp.username, 'event_slug': rsvp.event_slug}).exec(function(err, existingRsvp){
			if(err) return(err);
			if(existingRsvp){
				 req.flash('info', 'I reserverd you a seat last time, just waiting to see you');
				 res.redirect('/userevents');
			}
			else{
			  rsvp.save(function(err, rsvpd){
			  if(err) return(err);
	 		  req.flash('success', 'I successfully reserverd you a seat, see you then!!');
			  res.redirect('/userevents');
			});

			}
		});
		});
	

		}

}
