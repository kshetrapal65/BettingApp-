const APPConfig = {
  API_URL: "http://173.212.250.62/betting/ap-admin/public/api",
};

const ApiEndPoints = {
  ApiKey: "5269f50f7cb93fcfadbc3b2e991d2477",
  Login: `${APPConfig.API_URL}/login`,
  Register: `${APPConfig.API_URL}/register`,
  ForgotPassword: `${APPConfig.API_URL}/forgot-password`,
  VerifyOtp: `${APPConfig.API_URL}/forgot-verify-email-otp`,
  ResetPassword: `${APPConfig.API_URL}/reset-password`,
};

export default ApiEndPoints;
