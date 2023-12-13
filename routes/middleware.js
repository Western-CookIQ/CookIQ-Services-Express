const { CognitoJwtVerifier } = require("aws-jwt-verify");

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.AWS_COGNITO_POOL_ID,
  tokenUse: "access",
  clientId: process.env.AWS_COGNITO_CLIENT_ID,
});

// https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const payload = await jwtVerifier.verify(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).send({
      message: error.message || "Token Error",
    });
  }
};

module.exports = authenticateToken;
