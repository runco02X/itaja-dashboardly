
import { enUS } from './en-US';
import { fr } from './fr';

// Export the translation objects
export { enUS, fr };

// Define the type for the translations
export type TranslationKey = keyof typeof enUS;
export type Translations = typeof enUS;
export type SupportedLanguage = 'en' | 'fr';

// Re-export the translation keys as a type for better type checking
export type TranslationKeys = {
  // Navigation & Layout
  projects: string;
  paymentLogs: string;
  apiWebhooks: string;
  settings: string;
  management: string;
  configuration: string;
  notifications: string;
  viewAllNotifications: string;
  changeLanguage: string;
  selectLanguage: string;
  darkMode: string;
  lightMode: string;
  systemTheme: string;
  changeTheme: string;
  skipToContent: string;
  languageChanged: string;
  
  // Authentication
  signIn: string;
  signUp: string;
  createAccount: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  forgotPassword: string;
  rememberMe: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  email: string;
  orContinueWith: string;
  passwordsDontMatch: string;
  logout: string;
  bySigningUp: string;
  terms: string;
  and: string;
  privacy: string;
  loginPageDescription: string;
  registerPageDescription: string;
  enterEmailForPasswordReset: string;
  sendResetLink: string;
  sending: string;
  backToLogin: string;
  passwordResetEmailSent: string;
  passwordResetEmailSentDescription: string;
  passwordResetInstructions: string;
  passwordResetError: string;
  checkEmailForInstructions: string;
  error: string;

  // Projects page
  projectsTitle: string;
  projectsSubtitle: string;
  newProject: string;
  searchProjects: string;
  clients: string;
  subscriptions: string;
  active: string;
  inactive: string;
  dashboard: string;
  edit: string;
  viewDetails: string;
  delete: string;
  actions: string;
  project: string;
  returningToProject: string;

  // Notifications page
  notificationsTitle: string;
  notificationsSubtitle: string;
  markAllAsRead: string;
  markAsRead: string;
  searchNotifications: string;
  notification: string;
  noNotificationsFound: string;
  date: string;
  type: string;
  info: string;
  warning: string;
  noProjectsFound: string;
  createYourFirstProject: string;

  // Project dashboard
  backToProjects: string;
  projectDashboardSubtitle: string;
  analytics: string;
  clientsBtn: string;
  subscriptionsBtn: string;
  mrr: string;
  activeSubscriptions: string;
  churnRate: string;
  totalTransactions: string;
  vsLastMonth: string;
  revenueGrowth: string;
  subscriptionsByPlan: string;
  recentActivities: string;
  viewAll: string;
  noActivitiesYet: string;
  noSubscriptionsYet: string;
  noClientsYet: string;

  // Project Clients page
  manageClients: string;
  searchClients: string;
  createClient: string;
  plan: string;
  spent: string;
  lastPayment: string;
  createNewClient: string;
  addClientTo: string;
  
  // Project Subscriptions page
  manageSubscriptions: string;
  searchPlans: string;
  newPlan: string;
  planName: string;
  description: string;
  price: string;
  frequency: string;
  features: string;
  subscribers: string;
  createNewSubscription: string;
  addSubscriptionTo: string;
  enterFeatures: string;
  quarterly: string;
  subscriptionsTitle: string;
  subscriptionsSubtitle: string;
  
  // Payment logs
  paymentLogsTitle: string;
  paymentLogsSubtitle: string;
  export: string;
  searchPayments: string;
  invoiceId: string;
  client: string;
  transactionId: string;
  paymentDate: string;
  paymentMethod: string;
  paymentStatus: string;
  successful: string;
  failed: string;
  pending: string;
  refunded: string;
  downloadReceipt: string;
  contactClient: string;

  // API & Webhooks page
  apiKeysTitle: string;
  apiKeysSubtitle: string;
  createApiKey: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  regenerate: string;
  revoke: string;
  webhooksTitle: string;
  webhooksSubtitle: string;
  createWebhook: string;
  url: string;
  events: string;
  createNewWebhook: string;
  enterWebhookUrl: string;
  selectEvents: string;
  testWebhook: string;
  
  // Settings page
  settingsTitle: string;
  settingsSubtitle: string;
  accountTab: string;
  notificationsTab: string;
  billingTab: string;
  accountInformation: string;
  accountInfoSubtitle: string;
  businessName: string;
  emailAddress: string;
  phone: string;
  businessAddress: string;
  security: string;
  securitySubtitle: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  updatePassword: string;
  notificationPreferences: string;
  notificationPreferencesSubtitle: string;
  emailNotifications: string;
  emailNotificationsDesc: string;
  paymentAlerts: string;
  paymentAlertsDesc: string;
  weeklyReports: string;
  weeklyReportsDesc: string;
  marketingEmails: string;
  marketingEmailsDesc: string;
  billingInformation: string;
  billingInformationDesc: string;
  billingInformationSubtitle: string;
  currentPlan: string;
  businessPlan: string;
  planBillingInfo: string;
  changePlan: string;
  paymentMethods: string;
  paymentMethodsSubtitle: string;
  addPaymentMethod: string;
  cardInfo: string;
  cardExpiry: string;
  address: string;
  billingAddress: string;
  country: string;
  selectCountry: string;
  unitedStates: string;
  canada: string;
  unitedKingdom: string;
  stateProvince: string;
  selectState: string;
  california: string;
  newYork: string;
  texas: string;
  zipCode: string;
  billingHistory: string;
  billingHistorySubtitle: string;
  downloadInvoice: string;
  saveChanges: string;
  cancel: string;
  success: string;
  copy: string;
  amount: string;
  status: string;
  editPlan: string;
  duplicate: string;
  monthly: string;
  yearly: string;
  filter: string;
  
  // NotFound page
  notFound: string;
  notFoundMessage: string;

  // Forms and Inputs
  save: string;
  confirm: string;
  required: string;
  optional: string;
  submit: string;
  loading: string;
  briefDescription: string;
  
  // Common
  returnToDashboard: string;
  noData: string;
  errorOccurred: string;
  tryAgain: string;
  welcome: string;
  today: string;
  yesterday: string;
  thisWeek: string;
  thisMonth: string;
  custom: string;
  projectNotFound: string;
  back: string;
  close: string;
  sort: string;
  search: string;
  clear: string;
  apply: string;
  
  // Client Import
  importClients: string;
  importClientsDescription: string;
  dragAndDropFile: string;
  supportedFormats: string;
  browseFiles: string;
  needTemplate: string;
  downloadTemplate: string;
  invalidFileType: string;
  fileTooLarge: string;

  // Error pages
  pageNotFound: string;
  pageNotFoundMessage: string;
  serverError: string;
  serverErrorMessage: string;
  goHome: string;

  // Accessibility
  mainContent: string;
  openMenu: string;
  closeMenu: string;
  previousPage: string;
  nextPage: string;
  moreInfo: string;
  refresh: string;
  readMore: string;
  
  // Project Switcher
  switchProject: string;
  selectProject: string;
};

// Map of language codes to their translation objects
const translationMap: Record<SupportedLanguage, Translations> = {
  en: enUS,
  fr: fr as unknown as Translations, // Type assertion to fix the compatibility issue
};

/**
 * Get translations by language code
 * @param lang - The language code ('en' or 'fr')
 * @returns The corresponding translation object
 */
export const getTranslationsByLanguage = (lang: SupportedLanguage): Translations => {
  return translationMap[lang] || enUS; // Fallback to English if language not found
};

/**
 * Get a list of supported languages with their display names
 * @returns Array of language objects with code and display name
 */
export const getSupportedLanguages = () => [
  { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
];
