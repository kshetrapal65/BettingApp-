const APPConfig = {
  API_URL: "http://173.212.250.62/betting/ap-admin/public/api",
};

const ApiEndPoints = {
  // ApiKey: "5269f50f7cb93fcfadbc3b2e991d2477",
  ApiKey: "d9ad15d505b6cb0c7e925d3ca0899ef7",
  Login: `${APPConfig.API_URL}/login`,
  Register: `${APPConfig.API_URL}/register`,
  ForgotPassword: `${APPConfig.API_URL}/forgot-password`,
  VerifyOtp: `${APPConfig.API_URL}/forgot-verify-email-otp`,
  ResetPassword: `${APPConfig.API_URL}/reset-password`,
  ProfileGet: `${APPConfig.API_URL}/profile`,
  ProfileUpdate: `${APPConfig.API_URL}/update-profile`,
  BankUpdate: `${APPConfig.API_URL}/update-bank-info`,
  BankInfo: `${APPConfig.API_URL}/bank-info`,
  PlaceBet: `${APPConfig.API_URL}/place-bet`,
  Get_Market: `${APPConfig.API_URL}/markets-by-game/`,
};

export default ApiEndPoints;
