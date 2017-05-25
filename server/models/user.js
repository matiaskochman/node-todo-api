const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//Schema is created to add methods.
var UserSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    unique:true,
    validate:{
      validator:(value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valida email'
    }
  },
  password:{
    type:String,
    require:true,
    minlength: 6
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});


UserSchema.methods.toJSON = function() {
  var user = this;
  //converts a user mongoose variable to a regular object
  // where only the properties available on the document exists.
  var userObject = user.toObject();

  return _.pick(userObject,['_id','email']);
}

//intance method that has access to user.id
//using a funcion() because we need to use (this)
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth'; //type of access
  var token = jwt.sign({_id:user._id.toHexString()},'abc123').toString();

  user.tokens.push({access,token});

  return user.save().then( ()=> {
    return token;
  })
}

var User = mongoose.model('User',UserSchema);

module.exports = {User};
