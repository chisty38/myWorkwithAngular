let express = require("express");
let router = express.Router();

let mongoose = require("mongoose");
let passport = require("passport");
//define user model
let userModel = require("../model/user");
let User = userModel.User; //alias

module.exports.displayHomePage = (req, res, next) => {
  res.render("index", {
    title: "Home",
    displayName: req.user ? req.user.displayName : ""
  });
};

module.exports.displayAboutPage = (req, res, next) => {
  res.render("index", {
    title: "About",
    displayName: req.user ? req.user.displayName : ""
  });
};

module.exports.displayProductPage = (req, res, next) => {
  res.render("index", {
    title: "Product",
    displayName: req.user ? req.user.displayName : ""
  });
};

module.exports.displayServicesPage = (req, res, next) => {
  res.render("index", {
    title: "Services",
    displayName: req.user ? req.user.displayName : ""
  });
};

module.exports.displayContactPage = (req, res, next) => {
  res.render("index", {
    title: "Contact",
    displayName: req.user ? req.user.displayName : ""
  });
};

module.exports.displayLoginPage = (req, res, next) => {
  // check if user is already log in
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      message: req.flash("LoginMessage"),
      //message: "hello",
      displayName: req.user ? req.user.displayName : ""
    });
  } else {
    return res.redirect("/");
  }
};
/*
module.exports.processLoginPage = passport.authenticate("local", {
  successRedirect: "/contact-list",
  failureRedirect: "/login",
  failureFlash: "loginMessage",
  failureMessage: "Authentication Error"

});
*/
module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if(err) {
      return next(err);
    }
    if(!user) 
    {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect('/login');
    }
    req.login(user, (err) => {
      if(err) {
        return next(err);
      }
      res.redirect("/contact-list");
    });
  })(req, res, next);

}

module.exports.displayRegisterPage = (req, res, next) => {
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      message: req.flash("registerMessage"),
      displayName: req.user ? req.user.displayName : ""
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processRegisterPage = (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
    console.log(err);
    if (err) {
      console.log("Error: Inserting new User");
      if (err.name == "UserExistsError") {
        req.flash(
          "registerMessage",
          "Registration Error: User Already Exists!!"
        );
        console.log("Error: User Already Exists");
      }
      return res.render("auth/register", {
        title: "Register",
        message: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : ""
      });
    } 
    else {
      // if no error exists, then registration successful

      //redirect the user
      return passport.authenticate("local")(req, res, () => {
        res.redirect("/contact-list");
      });
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
