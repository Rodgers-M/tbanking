var mongoose      =   require('mongoose');
var Schema        =   mongoose.Schema;

var EventSchema   = new Schema({
    title        : { type : String, unique:true },
    venue        : { type : String },
    description  : { type : String },
    date         : { type : Date },
    time         : { type : String }
});

EventSchema.methods.getEventByTitle = function(title, callback){
  var query = {'title': title};
  Event.findOne(query,callback);
};

module.exports = mongoose.model('Event', EventSchema);
