//require modules for our user

let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
      trim: true,
      required: "user name is required"
    },
    email: {
      type: String,
      default: "",
      trim: true,
      required: "email is required"
    },
    displayName: {
      type: String,
      default: "",
      trim: true,
      required: "Display name is required"
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    }
    /* taken out bcz password will encrypted by passport-local-mongoose
    password: {
        type: String,
        default: '',
        trim: true,
        required: 'user name is required'
    }
*/
  },
  {
    collection: "users"
  }
);

// configure options for the user schema

let options = ({
    missingPasswordError: "Wrong / Missing Password"
});

userSchema.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model("User", userSchema);
