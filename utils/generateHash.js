const crypto = require("crypto");

// https://docs.aws.amazon.com/cognito/latest/developerguide/signing-up-users-in-your-app.html#cognito-user-pools-computing-secret-hash
const generateHash = (uuid) => {
  return crypto
    .createHmac("SHA256", process.env.AWS_COGNITO_CLIENT_ID_SECRET)
    .update(uuid + process.env.AWS_COGNITO_CLIENT_ID)
    .digest("base64");
};

module.exports = generateHash;
