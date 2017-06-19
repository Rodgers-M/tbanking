var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var User       =   require('../../app/models/user');
var Event      =   require('../../app/models/events');

var RsvpSchema =  Schema( {
   username   : [{type: Schema.Types.ObjectId,  ref:'User' }],
   event_slug : [{type : String, ref:'Event'}]
 });


module.exports = mongoose.model('Rsvp', RsvpSchema);

