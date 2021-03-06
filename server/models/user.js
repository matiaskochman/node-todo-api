const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
  var token = jwt.sign({_id:user._id.toHexString(), access},process.env.JWT_SECRET).toString();

  user.tokens.push({access,token});

  return user.save().then( ()=> {
    return token;
  })
}

UserSchema.methods.removeToken = function(token){
  var user = this;

  return user.update({
    $pull:{
      tokens:{
        token:token
      }
    }
  })
}

UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token,process.env.JWT_SECRET);
  }catch (e){
    // return new Promise((resolve,reject) => {
    //   reject();
    // });
    return Promise.reject('bad token');
  }

  return User.findOne({
    '_id':decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  });
}

UserSchema.statics.findByCredentials = function(email,password){
  var User = this;

  var a = User.findOne({email}).then((usr) => {
    if(!usr){
      return new Promise.reject();
    }

    /*
    devuelvo una Promise porque bcrypt devuelve un callback,
    entonces wrapeo el callback en una Promise
    */
    return new Promise((resolve,reject) => {
      bcrypt.compare(password,usr.password,(err,res) =>{
        if(res){
          resolve(usr);
        }else{
          reject();
        }
      });
    });
  });

  return a;

}

UserSchema.pre('save', function(next){
  var user = this;

  if(user.isModified('password')){

    bcrypt.genSalt(10,(err,salt) => {
      bcrypt.hash(user.password,salt,(err,hash) => {

        user.password = hash;
        next();
      })
    });
  }else{
    next();
  }
});

var User = mongoose.model('User',UserSchema);

module.exports = {User};
