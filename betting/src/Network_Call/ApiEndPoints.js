const APPConfig = {
  API_URL: "http://173.212.250.62/appointly/ap-admin/public/api",
};

const ApiEndPoints = {
  ApiKey: "49b34a81ab3b6e31820052b16f9684c7",
  Login: `${APPConfig.API_URL}/login`,
  BusinessRegister: `${APPConfig.API_URL}/business-register`,
  ClientRegister: `${APPConfig.API_URL}/client-register`,
  ForgotPassword: `${APPConfig.API_URL}/forgot-password`,
  VerifyOtp: `${APPConfig.API_URL}/forgot-verify-email-otp`,
  ResetPassword: `${APPConfig.API_URL}/reset-password`,
  SendOTPEmail: `${APPConfig.API_URL}/send-otp-email`,
  VerifyEmailOtp: `${APPConfig.API_URL}/verify-email-otp`,
  SocialLogin: `${APPConfig.API_URL}/social-login`,
  Blogs: `${APPConfig.API_URL}/blogs-list`,
  BlogSlug: `${APPConfig.API_URL}/blog-slug/`,
  ContactsUs: `${APPConfig.API_URL}/contactus`,
  ClientProfile: `${APPConfig.API_URL}/client-profile`,
  ClientUpdateProfile: `${APPConfig.API_URL}/client-update-profile`,
  BussinessProfile: `${APPConfig.API_URL}/business-profile`,
  ChangePassword: `${APPConfig.API_URL}/change-password`,
  PrivacyPolicy: `${APPConfig.API_URL}/page/privacy_policy`,
  TandC: `${APPConfig.API_URL}/page/terms_condition`,
  BussinessEditProfile: `${APPConfig.API_URL}/business-update-profile`,
  BussinessUpdateBio: `${APPConfig.API_URL}/business-update-bio`,
  GetbusinessTime: `${APPConfig.API_URL}/business-time`,
  UpdateBusinessTime: `${APPConfig.API_URL}/business-update-time`,
};

export default ApiEndPoints;
