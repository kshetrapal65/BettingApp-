const APPConfig = {
  // API_URL: "http://173.212.250.62/betting/ap-admin/public/api",
  API_URL: "https://betting.aercjbp.com/ap-admin/public/api",
};

const ApiEndPoints = {
  ApiKey: "d721d4110bd0a00db3ad99235111f749",
  // ApiKey: "f9af698cc538367931ebfe9e11c6b3cc",
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
  LeagueList: `${APPConfig.API_URL}/leagues`,
  CreateLeague: `${APPConfig.API_URL}/create-league`,
  LeagueDetail: `${APPConfig.API_URL}/league/`,
  DeleteLeague: `${APPConfig.API_URL}/league-delete/`,
  LeaveLeague: `${APPConfig.API_URL}/league-leave/`,
  AcceptInvite: `${APPConfig.API_URL}/league-accept-invite`,
  LeagueUnits: `${APPConfig.API_URL}/league-member/`,
};

export default ApiEndPoints;
