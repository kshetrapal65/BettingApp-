const APPConfig = {
  API_URL: "http://173.212.250.62/betting/ap-admin/public/api",
};

const ApiEndPoints = {
  ApiKey: "770e21540bd6eda56ddbc97be3999aa7",
  Login: `${APPConfig.API_URL}/login`,
  Register: `${APPConfig.API_URL}/register`,
  ForgotPassword: `${APPConfig.API_URL}/forgot-password`,
  VerifyOtp: `${APPConfig.API_URL}/forgot-verify-email-otp`,
  ResetPassword: `${APPConfig.API_URL}/reset-password`,
};

export default ApiEndPoints;
