const Auth = require("../services/auth.services.js");

// const SESSION_DURATION = 24 * 60 * 60 * 1000; // milliseconds to day conversion

// Register
exports.register = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const auth = new Auth({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName, // saved to DB
    lastName: req.body.lastName, // saved to DB
  });

  Auth.register(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "An error occurred while registering a User.",
      });
    else {
      res.send(data);
    }
  });
};

// Confirm Email
exports.confirmation = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const auth = new Auth({
    username: req.body.username,
    confirmationCode: req.body.confirmationCode,
  });

  Auth.confirmSignUp(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "An error occurred while confirming a User.",
      });
    else {
      res.send(data);
    }
  });
};

// Resend Confirmation Code
exports.resendConfirmationCode = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const auth = new Auth({
    username: req.body.username,
  });

  Auth.resendConfirmationCode(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "An error occurred while resending confirmation code.",
      });
    else {
      res.send(data);
    }
  });
};

// Forgot Password
exports.forgotPassword = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const auth = new Auth({
    username: req.body.username,
  });

  Auth.forgotPassword(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while sending Forgot Password request to the User.",
      });
    else {
      // let timeToExpire = new Date(new Date().getTime() + ADD_TIME);
      res.send(data);
    }
  });
};

// Forgot Password
exports.forgotPasswordConfirmation = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const auth = new Auth({
    username: req.body.username,
    password: req.body.password,
    confirmationCode: req.body.confirmationCode,
  });

  Auth.forgotPasswordConfirmation(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while sending Forgot Password request to the User.",
      });
    else {
      // let timeToExpire = new Date(new Date().getTime() + ADD_TIME);
      res.send(data);
    }
  });
};

// Login
exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const auth = new Auth({
    email: req.body.email,
    password: req.body.password,
  });

  Auth.login(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while logging in the User.",
      });
    else {
      // let timeToExpire = new Date(new Date().getTime() + ADD_TIME);
      res.send(data);
    }
  });
};

exports.updatePassword = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const auth = new Auth({
    accessToken: req.body.accessToken,
  });

  auth.previousPassword = req.body.previousPassword;
  auth.proposedPassword = req.body.proposedPassword;

  // add new parameters to object

  Auth.updatePassword(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while updating the User's password.",
      });
    else {
      res.send(data);
    }
  });
};

// Logout
exports.logout = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const auth = new Auth({
    accessToken: req.body.accessToken,
  });

  Auth.logout(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while logging out the User.",
      });
    else {
      res.send({
        loggedIn: false,
        ...data,
      });
    }
  });
};

//User Details
exports.userDetails = (req, res) => {

  const auth = new Auth({
    accessToken: req.query.accessToken,
  });

  Auth.userDetails(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "An error occurred while registering a User.",
      });
    else {
      res.send(data);
    }
  });
};

