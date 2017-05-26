var Rsvp	 = require("../../app/models/rsvp");
var User	 = require("../../app/models/user");

module.exports = {
	index : function(req, res){
	 // display everyone who has RSVP
	},
	
	create: function(req, res){
		var rsvp = new Rsvp();
		rsvp.username 		= req.user.username;
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

		}

}
