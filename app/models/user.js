var mongoose      =   require('mongoose');
var bcrypt        =   require('bcrypt-nodejs')
var crypto        =   require('crypto');
var Schema        =   mongoose.Schema;
var Role          =   require('../../app/models/roles');

var userSchema    = new Schema({
  local: {
      username  :  { type: String, unique:true },
      firstname :  { type: String },
      lastname  :  { type: String },
      password  :  { type: String },
      email     :  { type: String, unique:true },
      shares    :  { type: Number },
      role      :  [{type: Schema.Types.ObjectId, ref:Role }]
    }
},
  {timestamps: true}
);

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
