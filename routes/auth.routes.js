const auth = require("../controllers/auth.controller.js");
const authenticateToken = require("./middleware.js");

module.exports = (app) => {
  const router = require("express").Router();
  app.use("/api/auth", router);

  // Create a new user in cognito user pool & Confirm user email
  router.post("/register", auth.register);
  router.post("/confirmation", auth.confirmation);

  // Resend user confirmation code
  router.post("/resendConfirmationCode", auth.resendConfirmationCode);

  // Forgot password & Confirm new password
  router.post("/forgotPassword", auth.forgotPassword);
  router.post("/forgotPasswordConfirmation", auth.forgotPasswordConfirmation);

  // Login
  router.post("/login", auth.login);

  // Search all users, require access token to be verified
  router.get("/users", authenticateToken, auth.searchUsers);

  // * Protected Route, AWS function verifies access tokens
  router.get("/user", auth.userDetails);

  // Update User
  router.put("/user", auth.userDetails);

  // Change password
  router.post("/updatePassword", auth.updatePassword);

  // Logout
  router.post("/logout", auth.logout);
};
