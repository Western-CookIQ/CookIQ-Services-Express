const { mockClient } = require("aws-sdk-client-mock");
const { v4: uuidv4 } = require("uuid");
const Auth = require("../../services/auth.services.js");
const {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  ChangePasswordCommand,
  GlobalSignOutCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  ResendConfirmationCodeCommand,
  GetUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

// Configure AWS Cognito Provider
const cognitoProviderMock = mockClient(CognitoIdentityProviderClient);
let auth = new Auth({});

jest.mock("uuid");

afterEach(() => {
  cognitoProviderMock.reset(); // Reset AWS SDK mocks after each test
  auth = new Auth({}); // Reset auth object
});

test("register with well formed data expect success", () => {
  // Mock Functions
  cognitoProviderMock.on(SignUpCommand).resolves({
    MessageId: "12345678-1111-2222-3333-111122223333",
    UserConfirmed: false,
    UserSub: "",
    $metadata: {},
  });
  uuidv4.mockReturnValue("mocked-uuid"); // required for username in response

  // Setup
  auth.email = "test@gmail.com";
  auth.password = "Password1!";

  // Execute
  Auth.register(auth, (_, data) => {
    // Assert
    expect(data).toEqual({
      UserConfirmed: false,
      UserSub: "",
      Username: "mocked-uuid",
      $metadata: {},
    });
  });
});

test("confirmSignUp with well formed data expect success", () => {
  // Mock Functions
  cognitoProviderMock.on(ConfirmSignUpCommand).resolves({
    $metadata: {
      httpStatusCode: 200,
    },
  });

  // Setup
  auth.email = "test@gmail.com";
  auth.confirmationCode = "123456";
  auth.username = "mocked-uuid";

  // Execute
  Auth.confirmSignUp(auth, (_, data) => {
    // Assert
    expect(data).toEqual({ $metadata: { httpStatusCode: 200 } });
  });
});

test("resendConfirmationCode with well formed data expect success", () => {
  // Mock Functions
  cognitoProviderMock.on(ResendConfirmationCodeCommand).resolves({
    $metadata: { httpStatusCode: 200 },
  });

  // Setup
  auth.username = "mocked-uuid";

  // Execute
  Auth.resendConfirmationCode(auth, (_, data) => {
    // Assert
    expect(data).toEqual({ $metadata: { httpStatusCode: 200 } });
  });
});

test("forgotPassword with well formed data expect success", () => {
  // Mock Functions
  cognitoProviderMock.on(ForgotPasswordCommand).resolves({
    $metadata: { httpStatusCode: 200 },
  });

  // Setup
  auth.username = "mocked-uuid";

  // Execute
  Auth.forgotPassword(auth, (_, data) => {
    // Assert
    expect(data).toEqual({ $metadata: { httpStatusCode: 200 } });
  });
});

test("forgotPasswordConfirmation with well formed data expect success", () => {
  // Mock Functions
  cognitoProviderMock.on(ConfirmForgotPasswordCommand).resolves({
    $metadata: { httpStatusCode: 200 },
  });

  // Setup
  auth.username = "mocked-uuid";
  auth.confirmationCode = "123456";
  auth.password = "NewPassword1!";

  // Execute
  Auth.forgotPasswordConfirmation(auth, (_, data) => {
    // Assert
    expect(data).toEqual({ $metadata: { httpStatusCode: 200 } });
  });
});

test("login with well formed data expect success", () => {
  // Mock Functions
  cognitoProviderMock.on(InitiateAuthCommand).resolves({
    AuthenticationResult: {
      AccessToken: "access-token",
    },
  });

  // Setup
  auth.email = "test@gmail.com";
  auth.password = "Password1!";

  // Execute
  Auth.login(auth, (_, data) => {
    // Assert
    expect(data).toEqual({ sessionToken: "access-token" });
  });
});

test("updatePassword with well formed data expect success", () => {
  // Mock Functions
  cognitoProviderMock.on(ChangePasswordCommand).resolves({
    $metadata: {},
  });

  // Setup
  auth.accessToken = "access-token";
  auth.previousPassword = "OldPassword1!";
  auth.proposedPassword = "NewPassword1!";

  // Execute
  Auth.updatePassword(auth, (_, data) => {
    // Assert
    expect(data).toEqual({ $metadata: {} });
  });
});

test("logout with well formed data expect success", () => {
  // Mock Functions
  cognitoProviderMock.on(GlobalSignOutCommand).resolves({
    $metadata: {},
  });

  // Setup
  auth.accessToken = "access-token";

  // Execute
  Auth.logout(auth, (_, data) => {
    // Assert
    expect(data).toEqual({ $metadata: {} });
  });
});

test("userDetails with well formed data expect success", () => {
  // Mock Functions
  cognitoProviderMock.on(GetUserCommand).resolves({
    UserAttributes: [
      {
        Name: "email",
        Value: "test@gmail.com",
      },
      {
        Name: "custom:fname",
        Value: "fname",
      },
      {
        Name: "custom:lname",
        Value: "lname",
      },
      {
        Name: "custom:picture",
        Value: "picture",
      },
    ],
  });

  // Setup
  auth.accessToken = "access-token";

  // Execute
  Auth.userDetails(auth, (_, data) => {
    // Assert
    expect(data).toEqual({
      email: "test@gmail.com",
      fName: "fname",
      lName: "lname",
      picture: "picture",
    });
  });
});
