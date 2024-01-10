const {
  CognitoIdentityProviderClient,
  AuthFlowType,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  ChangePasswordCommand,
  GlobalSignOutCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  ResendConfirmationCodeCommand,
  GetUserCommand,
  UpdateUserAttributesCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
const { v4: uuidv4 } = require("uuid");
const generateHash = require("../utils/generateHash");

const fs = require('fs');
/*
TODO: add federated login with google
*/

// Configure AWS Cognito
const client = new CognitoIdentityProviderClient({ region: "us-east-2" });

class Auth {
  constructor(auth) {
    this.username = auth.username;
    this.email = auth.email;
    this.password = auth.password;
    this.confirmationCode = auth.confirmationCode;
    this.accessToken = auth.accessToken;
    this.firstName = auth.firstName;
    this.lastName = auth.lastName;
  }

  // Register User
  static async register(auth, result) {
    const { email, password, firstName, lastName } = auth;
    const username = uuidv4(); // generate unique UUID for client

    const params = {
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
      Username: username,
      Password: password,
      SecretHash: generateHash(username), // always use the params username value (uuid OR email) for the hash!
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
        {
          Name: "custom:fname",
          Value: firstName,
        },
        {
          Name: "custom:lname",
          Value: lastName,
        },
        {
          Name: "custom:picture",
          Value:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz_PnL4lnzSDKighhjBQlZwv1M5LKWGlRgxw&usqp=CAU://png.pngtree.com/element_our/20200610/ourmid/pngtree-default-avatar-image_2237213.jpg",
        },
      ],
    };

    try {
      const data = await client.send(new SignUpCommand(params));
      result(null, {
        UserConfirmed: data.UserConfirmed,
        UserSub: data.UserSub,
        Username: username,
        $metadata: data.$metadata,
      });
    } catch (error) {
      console.error("Error registering user:", error);
      result(error, null);
    }
  }

  // Confirm registration
  static async confirmSignUp(auth, result) {
    const params = {
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
      ConfirmationCode: auth.confirmationCode,
      Username: auth.username,
      SecretHash: generateHash(auth.username),
    };

    try {
      const metadata = await client.send(new ConfirmSignUpCommand(params));
      result(null, metadata);
    } catch (error) {
      console.log("Error confirming user registration", error);
      result(error, null);
    }
  }

  // Resend Confirmation Code
  static async resendConfirmationCode(auth, result) {
    const params = {
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
      Username: auth.username,
      SecretHash: generateHash(auth.username),
    };

    try {
      const metadata = await client.send(
        new ResendConfirmationCodeCommand(params)
      );
      result(null, { $metadata: metadata.$metadata });
    } catch (error) {
      console.log("Error resending confirmation code:", error);
      result(error, null);
    }
  }

  // Forgot password email confirmation
  static async forgotPassword(auth, result) {
    const params = {
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
      Username: auth.username,
      SecretHash: generateHash(auth.username),
    };

    try {
      const res = await client.send(new ForgotPasswordCommand(params));

      // Pass the result to the client
      result(null, { $metadata: res.$metadata });
    } catch (error) {
      console.error("Error sending forgotten password code:", error);
      result(error, null);
    }
  }

  // Confirm forgotten password confirmation
  static async forgotPasswordConfirmation(auth, result) {
    const params = {
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
      Username: auth.username,
      Password: auth.password,
      ConfirmationCode: auth.confirmationCode,
      SecretHash: generateHash(auth.username),
    };

    try {
      const metadata = await client.send(
        new ConfirmForgotPasswordCommand(params)
      );

      // Pass the result to the client
      result(null, { $metadata: metadata.$metadata });
    } catch (error) {
      console.error("Error confirmation forgotten password:", error);
      result(error, null);
    }
  }

  // Login with email
  static async login(auth, result) {
    const params = {
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: auth.email,
        PASSWORD: auth.password,
        SECRET_HASH: generateHash(auth.email),
      },
    };

    try {
      const metadata = await client.send(new InitiateAuthCommand(params));
      const accessToken = metadata.AuthenticationResult.AccessToken;

      // Include the JWT token in the response
      result(null, { sessionToken: accessToken });
    } catch (error) {
      console.error("Error logging in user:", error);
      result(error, null);
    }
  }

  // Update Password
  static async updatePassword(auth, result) {
    const params = {
      PreviousPassword: auth.previousPassword,
      ProposedPassword: auth.proposedPassword,
      AccessToken: auth.accessToken,
    };

    try {
      const metadata = await client.send(new ChangePasswordCommand(params));
      result(null, metadata);
    } catch (error) {
      console.log("Error changing password:", error);
      result(error, null);
    }
  }

  // Logout User
  static async logout(auth, result) {
    // Invalidate the user's session
    try {
      const metadata = await client.send(
        new GlobalSignOutCommand({ AccessToken: auth.accessToken })
      );
      result(null, metadata);
    } catch (error) {
      console.error("Error logging out user:", error);
      result(error, null);
    }
  }

  static async userDetails(auth, result) {
    const params = {
      AccessToken: auth.accessToken,
    };

    try {
      const res = await client.send(new GetUserCommand(params));
      const user = {};
      res.UserAttributes.forEach((attribute) => {
        switch (attribute.Name) {
          case "email":
            user.email = attribute.Value;
            break;
          case "custom:fname":
            user.fName = attribute.Value;
            break;
          case "custom:lname":
            user.lName = attribute.Value;
            break;
          case "custom:picture":
            user.picture = attribute.Value;
            break;
        }
      });
      // Pass the result to the client
      result(null, { ...user });
    } catch (error) {
      console.error("Error sending forgotten password code:", error);
      result(error, null);
    }
  }

  //Update user function
  static async updateUserDetails(auth, result, updatedFields) {
    const params = {
      AccessToken: auth.accessToken,
    };
  
    try {
      const res = await client.send(new GetUserCommand(params));
      const user = {};
      
      res.UserAttributes.forEach((attribute) => {
        switch (attribute.Name) {
          case "email":
            user.email = attribute.Value;
            break;
          case "custom:fname":
            user.fName = attribute.Value;
            break;
          case "custom:lname":
            user.lName = attribute.Value;
            break;
          case "custom:picture":
            user.picture = attribute.Value;
            break;
        }
      });
  
      // Update user details based on the request body
      if (updatedFields.email) {
        user.email = updatedFields.email;
      }
      if (updatedFields.fName) {
        user.fName = updatedFields.fName;
      }
      if (updatedFields.lName) {
        user.lName = updatedFields.lName;
      }
      if (updatedFields.picture) {
        user.picture = updatedFields.picture;
      }

      const updateParams = {
        AccessToken: auth.accessToken,
        UserAttributes: [
          { Name: "email", Value: user.email },
          { Name: "custom:fname", Value: user.fName },
          { Name: "custom:lname", Value: user.lName },
          { Name: "custom:picture", Value: user.picture },
        ],
      };

      await client.send(new UpdateUserAttributesCommand(updateParams));
      
      // Pass the updated user details to the client
      result(null, { ...user });
    } catch (error) {
      console.error("Error updating user details:", error);
      result(error, null);
    }
  }
}

module.exports = Auth;
