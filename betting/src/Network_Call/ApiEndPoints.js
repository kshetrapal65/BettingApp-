const APPConfig = {
  API_URL: "http://173.212.250.62/betting/ap-admin/public/api",
};

const ApiEndPoints = {
  // ApiKey: "7f64f57aeecccd74db85bbe0e7aab19e",
  ApiKey: "986449725209251fd4d6a3449e6949f1",
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
  BettingHistory: `${APPConfig.API_URL}/bet-history`,
};

export default ApiEndPoints;
