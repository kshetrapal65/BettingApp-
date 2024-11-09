const APPConfig = {
  API_URL: "http://173.212.250.62/betting/ap-admin/public/api",
};

const ApiEndPoints = {
  ApiKey: "5b446cdaea2e4fe866909b50e6b7a0a6",
  Login: `${APPConfig.API_URL}/login`,
  Register: `${APPConfig.API_URL}/register`,
  ForgotPassword: `${APPConfig.API_URL}/forgot-password`,
  VerifyOtp: `${APPConfig.API_URL}/forgot-verify-email-otp`,
  ResetPassword: `${APPConfig.API_URL}/reset-password`,
};

export default ApiEndPoints;
