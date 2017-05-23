const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User',{
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

module.exports = {User};
