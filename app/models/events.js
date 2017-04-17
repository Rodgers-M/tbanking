var mongoose      =   require('mongoose');
var Schema        =   mongoose.Schema;

var EventSchema   = new Schema({
    title        : { type : String, unique:true },
	slug		 : {type : String},
    venue        : { type : String },
    description  : { type : String },
    date         : { type : Date },
    time         : { type : String }
});


EventSchema.methods.slugify =  function(text) {
	return text.toString().toLowerCase()
	.replace(/\s+/g, '-')        // Replace spaces with -
	.replace(/[^\w\-]+/g, '')   // Remove all non-word chars
	.replace(/\-\-+/g, '-')      // Replace multiple - with single -
	.replace(/^-+/, '')          // Trim - from start of text
	.replace(/-+$/, '');         // Trim - from end of text
}; 
module.exports = mongoose.model('Event', EventSchema);
