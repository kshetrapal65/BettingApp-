const APPConfig = {
  // API_URL: "http://173.212.250.62/betting/ap-admin/public/api",
  API_URL: "https://betting.aercjbp.com/ap-admin/public/api",
};

const ApiEndPoints = {
  ApiKey: "ca1580fc2b7658a7e7f15b90657d8492",
  // ApiKey: "e12abd197618e682c3a72344b99b9252",
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
  GetNews: `${APPConfig.API_URL}/news`,
};

export default ApiEndPoints;
