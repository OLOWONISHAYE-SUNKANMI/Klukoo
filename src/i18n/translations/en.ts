import PredictiveAlertScreen from '@/components/screens/PredictiveAlertScreen';
import { set } from 'date-fns';
import { P } from 'node_modules/framer-motion/dist/types.d-Cjd591yU';
import { permission } from 'process';

export const en = {
  // App general
  appName: 'Klukoo',
  appDescription: '',
  appSlogan:
    'The first smart application in Africa that helps diabetic patients live better, anticipate better, and respond better.',

  // Navigation
  nav: {
    home: 'Home',
    charts: 'Data',
    doses: 'Doses',
    teleconsultation: 'TeleHealth',
    chat: 'Chat',
    assistant: 'Assistant',
    journal: 'Journal',
    blog: 'Blog',
    family: 'Family',
    profile: 'Profile',
    reminders: 'Reminders',
    insulin: 'Insulin Dose Sheet',
    biomarker: 'Biomarker Tracker',
  },

  // Journal Screen
  journal: {
    title: 'Logbook',
    subtitle: 'Detailed tracking of your blood sugar and injections',
    glucose: 'Blood sugar',
    insulin: 'Insulin',
    newEntry: 'New entry',
    insulinReminder: 'Insulin reminder',
    target: 'In target',
    slightlyHigh: 'Slightly high',
    high: 'High',
    low: 'Low',
    normal: 'Normal',
    meal: 'Meal',
    activity: 'Activity',
    medication: 'Medication',
    filters: {
      today: 'Today',
      week: '7 days',
      month: '30 days',
    },
    context: {
      beforeMeal: 'Before meal',
      afterMeal: 'After meal',
      fasting: 'Fasting',
      bedtime: 'Bedtime',
    },
    status: {
      target: 'In target',
      slightlyHigh: 'Slightly high',
      high: 'High',
      low: 'Low',
    },
    weeklyStats: {
      title: 'Weekly summary',
      inTarget: 'In target',
      onTimeInjections: 'On-time injections',
      avgGlucose: 'Average blood sugar',
    },
    advice: {
      title: '💡 Personalized Klukoo advice',
      example:
        'Excellent adherence this week! Your blood sugar levels in the late afternoon are slightly high. Consider adjusting your 3 PM snack or taking your Humalog injection 10 minutes earlier.',
    },
    injected: 'Injected at',
    missed: 'Missed injection',
    noEntries: 'No Entries',
  },
  charts: {
    title: 'Charts',
    subtitle: 'Analysis of your glucose data',

    // Sections
    glucose: 'Blood Glucose',
    meals: 'Meals Carbs',
    activities: 'Activities',
    medications: 'Medications',

    glucoseAnalysis: 'Glucose Analysis',
    timeInRange: 'Time in Range',
    weeklyTrends: 'Weekly Trends',
    last7Days: 'Last 7 days',

    zones: {
      veryHigh: 'High',
      high: 'Borderline',
      target: 'Target',
      low: 'Low',
    },

    stats: {
      average: 'Average',
      variability: 'Variability',
      estimatedHbA1c: 'Estimated HbA1c',
      latest: 'Latest',
      peakMax: 'Max Peak',
    },

    objective: 'Goal: >70% in target',
    percentageByDay: 'Percentage of time in target per day',

    latest: 'Latest',
    average: 'Average',
    highest: 'Highest',

    trend: {
      title: 'Trends',
      message: 'Percentage of time in range this week',
    },
    inRange: 'In Range',
  },

  // Doses Screen
  doses: {
    title: 'Doses',
    subtitle: 'Manage your insulin doses',
    lantus: 'Lantus (Basal)',
    humalog: 'Humalog (Rapid)',
    active: 'Active',
    pending: 'Pending',
    usualDose: 'Usual dose',
    scheduledTime: 'Scheduled time',
    lastInjection: 'Last injection',
    markAsInjected: 'Mark as injected',
    currentGlucose: 'Current blood sugar (mg/dL)',
    mealCarbs: 'Meal carbs',
    calculatedDose: 'Calculated dose',
    correction: 'Correction',
    meal: 'Meal',
    total: 'Total',
    scheduleInjection: 'Schedule injection',
    missedInjection: 'Missed injection',
    ignore: 'Ignore',
    injectNow: 'Inject now',
    history7Days: '7-day history',
    adherence: 'Adherence',
    injectionMarked: 'Injection marked',
    injectionSuccess: 'Marked as injected successfully',
    injectionsPer: 'Injections done / scheduled per day',
  },

  // Reminders Screen
  reminders: {
    title: 'My Reminders',
    subtitle: 'Manage your reminders for insulin, medication, tests and more',
    newReminder: 'New Reminder',
    upcomingReminders: 'Upcoming reminders (2h)',
    today: 'Today',
    allReminders: 'All reminders',
    noReminders: 'No reminders set',
    noRemindersDesc:
      'Create your first reminder to never forget your treatments',
    createReminder: 'Create a reminder',
    dose: 'Dose',
    soon: 'Soon',
    done: 'Done',
    deleteConfirm: 'Are you sure you want to delete this reminder?',
    days: {
      everyday: 'Everyday',
      weekdays: 'Mon-Fri',
      monday: 'Mon',
      tuesday: 'Tue',
      wednesday: 'Wed',
      thursday: 'Thu',
      friday: 'Fri',
      saturday: 'Sat',
      sunday: 'Sun',
    },
  },

  // Blog/News Screen - COMPLETE
  blog: {
    title: 'Klukoo News',
    subtitle: 'News and advice on diabetes',
    readMore: 'Read',
    readFull: 'Read full article',
    author: 'Author',
    source: 'Source',
    publishedOn: 'Published on',
    saveArticle: 'Save article',
    search: 'Search...',
    all: 'All',
    categories: {
      all: 'All',
      research: 'Research',
      nutrition: 'Nutrition',
      mental: 'Mental',
      innovation: 'Innovation',
      testimonials: 'Testimonials',
      technology: 'Technology',
      lifestyle: 'Lifestyle',
      treatment: 'Treatment',
    },
    readingTime: 'min',
    trending: 'Trending',
    internationalNews: 'International diabetes news',
    searchNews: 'Search news...',
    by: 'By',
    saveArticleBtn: 'Save',
    fullSource: 'Full source',
    reliableSources: 'Reliable sources',
    verifiedNews:
      'All our news is verified and comes from internationally recognized medical sources',
  },

  // Activities
  activities: {
    walking: 'Walking',
    running: 'Running/Jogging',
    cycling: 'Cycling',
    dancing: 'Dancing',
    weightlifting: 'Weightlifting',
    swimming: 'Swimming',
    soccer: 'Soccer',
    basketball: 'Basketball',
    selectActivity: 'Select an activity',
    intensity: {
      light: 'Light',
      moderate: 'Moderate',
      intense: 'Intense',
    },
    duration: 'Duration (minutes)',
    caloriesBurned: 'Calories burned',
    addActivity: 'Add activity',
    activityRecorded: 'Activity recorded',
  },

  // Glucose contexts
  glucoseContext: {
    fasting: 'Fasting',
    beforeMeal: 'Before meal',
    afterMeal: 'After meal',
    bedtime: 'Before bed',
    random: 'Random',
    exercise: 'After exercise',
  },

  // Modals and forms
  modals: {
    selectValue: 'Select a value',
    enterValue: 'Please enter a blood sugar value',
    time: 'Time',
    now: 'Now',
    custom: 'Custom',
    context: 'Context',
    notes: 'Notes (optional)',
    duration: 'Duration',
    minutes: 'minutes',
    scanProduct: 'Scan a Product',
    productScanSimulation: 'Product scan simulation',
    takePhoto: 'Take a Photo',
    aiMealAnalysis: 'AI Meal Analysis',
    manualEntry: 'Manual Entry',
    enterInformation: 'Enter the information',
    followCarbs: 'Track your carbs easily',
  },

  // Authentication
  auth: {
    signIn: 'Sign in',
    signUp: 'Sign up',
    signOut: 'Sign out',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm password',
    forgotPassword: 'Forgot password?',
    noAccount: 'No account?',
    hasAccount: 'Already have an account?',
    loading: 'Loading...',
    signInTitle: 'Login',
    signUpTitle: 'Registration',
    description: 'Access your Klukoo account',
    appSlogan: 'African Diabetes & Resources of Excellence',
    patient: 'Patient',
    professional: 'Professional',
    family: 'Family',
    firstName: 'First name',
    lastName: 'Last name',
    professionalCode: 'Professional Code',
    patientCode: 'Patient Code',
    familyAccess: 'Access family space',
    professionalAccess: 'Access professional space',
    codeProvidedByPatient: 'Code provided by the patient',
    professionalNotRegistered: 'Not registered yet?',
    requestProfessionalAccess: 'Request professional access',
    needHelp: 'Need help?',
    familyAccessGuide: 'Family access guide',
    termsAcceptance: 'By signing in, you accept our',
    termsOfUse: 'Terms of use',
    privacyPolicy: 'Privacy policy',
    and: 'and our',
    support: 'Support',
    passwordMinLength: 'Minimum 6 characters',
    confirmPasswordPlaceholder: 'Confirm your password',
    emailPlaceholder: 'your@email.com',
    professionalCodePlaceholder: 'Professional access code',
    patientCodePlaceholder: 'Patient access code',
    connecting: 'Connecting...',
    registering: 'Registering...',
    signInButton: 'Login',
    signUpButton: 'Register',
    // Error messages
    invalidCredentials: 'Incorrect email or password',
    emailNotConfirmed: 'Please confirm your email before logging in',
    userAlreadyExists: 'An account already exists with this email address',
    passwordMismatch: 'Passwords do not match',
    passwordTooShort: 'Password must be at least 6 characters',
    invalidPatientCode: 'Please enter a valid patient code',
    invalidOrExpiredCode: 'Invalid or expired patient code',
    connectionError: 'An error occurred while connecting',
    registrationError: 'An error occurred during registration',
    // Success messages
    loginSuccess: 'Login successful!',
    welcomePatient: 'Welcome to your patient space.',
    registrationSuccess: 'Registration successful!',
    choosePlan: 'Choose your Klukoo plan',
    confirmEmail: 'Check your email to confirm your account.',
    familyAccessGranted: 'Family access granted!',
    welcomeFamily: 'Welcome to the Klukoo family space.',
    professionalLoginSuccess: 'Professional login successful!',
    welcomeProfessional: 'Welcome to your professional space.',
  },

  // Home screen
  home: {
    welcome: 'Welcome',
    latestGlucose: 'Latest blood sugar',
    addGlucose: 'Add blood sugar',
    quickActions: 'Quick actions',
    todayStats: 'Today’s stats',
    medicationReminder: 'Medication reminder',
    upcomingAppointment: 'Upcoming appointment',
  },

  // Glucose
  glucose: {
    level: 'Blood sugar level',
    normal: 'Normal',
    low: 'Low',
    high: 'High',
    addReading: 'Add a reading',
    beforeMeal: 'Before meal',
    afterMeal: 'After meal',
    bedtime: 'Bedtime',
    morning: 'Morning',
    comment: 'Comment',
  },

  // Medications
  medication: {
    title: 'Medications',
    addMedication: 'Add medication',
    dosage: 'Dosage',
    frequency: 'Frequency',
    time: 'Time',
    taken: 'Taken',
    missed: 'Missed',
    insulin: 'Insulin',
    metformin: 'Metformin',
  },

  // Professional
  professional: {
    dashboard: 'Professional dashboard',
    patients: 'Patients',
    consultations: 'Consultations',
    earnings: 'Earnings',
    schedule: 'Schedule',
    startConsultation: 'Start consultation',
    endConsultation: 'End consultation',
    consultationNotes: 'Consultation notes',
    fee: 'Fee',
    payment: 'Payment',
    pending: 'Pending',
    completed: 'Completed',
    duration: 'Duration',
    patientCode: 'Patient code',
    patientInformation: 'Patient information',
    stackTrace: 'Stack trace',
  },

  // Chat and Community
  chat: {
    title: 'Community chat',
    typeMessage: 'Type your message...',
    send: 'Send',
    glucoseShare: 'Blood sugar share',
    mealShare: 'Diabetes-friendly meal',
    progress: 'Celebration',
    estimatedCarbs: 'Estimated carbs',
  },

  // Common
  common: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    close: 'Close',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This week',
    thisMonth: 'This month',
    mg_dl: 'mg/dL',
    mmol_l: 'mmol/L',
    send: 'Send',
    sending: 'Sending...',
    enable: 'Enable',
    disable: 'Disable',
  },

  // Notifications
  notifications: {
    medicationTime: 'Time to take your medication',
    glucoseReminder: 'Don’t forget to check your blood sugar',
    appointmentReminder: 'Appointment in 1 hour',
    dataShared: 'Data shared successfully',
    accessGranted: 'Access granted to healthcare professional',
    accessDenied: 'Access denied to healthcare professional',
  },

  // Home Screen
  homeScreen: {
    mission: 'Klukoo Mission',
    darePackage: 'Klukoo Package',
    completePlan: 'Complete Klukoo',
    premium: 'PREMIUM',
    monthlyPrice: 'F CFA/month',
    healthPriceless: 'Your health is priceless',
    unlimitedLogbook: 'Unlimited blood sugar logbook',
    smartReminders: 'Smart insulin reminders',
    clarityCharts: 'Clarity-style charts',
    advancedCalculator: 'Advanced dose calculator',
    familySupport: 'Family support',
    aiAssistant: 'Klukoo AI Assistant',
    startTracking: 'Start my Klukoo tracking',
    freeTrial: '✨ 7-day free trial',
    cancelAnytime: 'Cancelable anytime • Support included',
    lastReading: 'Today 14:30',
    diabetes: 'Diabetes',
    management: 'Management',
    awareness: 'Awareness',
    education: 'Education',
    routine: 'Routine',
    daily: 'Daily',
    empowerment: 'Empowerment',
    control: 'Control',
  },

  // Profile Screen
  profileScreen: {
    years: 'years',
    yearsWithDare: 'Years with Klukoo',
    glucoseMeasures: 'Blood sugar measurements',
    height: 'Height',
    personalInfo: 'Personal Information',
    fullName: 'Full name',
    dateOfBirth: 'Date of birth',
    age: 'Age',
    phone: 'Phone',
    city: 'City',
    profession: 'Profession',
    medicalTeam: 'Medical Team',
    doctor: 'Attending physician • Diabetologist',
    followUpCenter: 'Follow-up center',
    consultant: 'Consulting endocrinologist',
    currentTreatment: 'Insulin Dosage',
    insulins: 'Insulins',
    keepCool: 'Stored cool (clay pot)',
    oralMedications: 'Oral medications',
    price: 'Price',
    glucoseTarget: 'Blood sugar target',
    adaptedClimate: 'Adapted to tropical climate',
    emergencyContact: 'Emergency contact',
    spouse: 'Spouse',
    call: 'Call',
    sms: 'SMS',
    settings: 'Settings',
    notifications: 'Notifications',
    dataSharing: 'Data sharing',
    darkMode: 'Dark mode',
    editProfile: 'Edit profile',
    exportData: 'Export data',
    privacy: 'Privacy',
    signOut: 'Sign out',
    verified: '✓ Verified Profile',
  },

  booklet: {
    downloadGuideTitle: 'Diabetes Guide',
    downloadGuideDescription:
      'Download the Diabates guide in your preferred language:',
    downloadFrench: 'Download in French',
    downloadEnglish: 'Download in English',
  },

  // Chat Screen
  chatScreen: {
    title: 'Klukoo Chat',
    membersConnected: 'members connected',
    successesThisWeek: '💚 142 successes this week',
    inTargetZone: '🎯 89% in target zone',
    newMembers: '👥 12 new members',
    kindness: '💚 Kindness',
    mutualHelp: '🤝 Mutual help',
    sharedMotivation: '🎯 Shared motivation',
    typingMessage: 'Write your support message...',
    typing: 'typing...',
    messageSent: 'Message sent',
    messageShared: 'Your message has been shared with the Klukoo community',
  },

  // Professional Access
  professionalAccess: {
    title: 'Professional Access Request',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    profession: 'Profession',
    selectProfession: 'Select your profession',
    doctor: 'Doctor',
    nurse: 'Nurse',
    diabetologist: 'Diabetologist',
    nutritionist: 'Nutritionist',
    pharmacist: 'Pharmacist',
    other: 'Other',
    licenseNumber: 'License Number',
    institution: 'Institution',
    motivation: 'Motivation',
    motivationPlaceholder: 'Explain why you want to access Klukoo...',
    requestSent: 'Request sent',
    requestSentDescription:
      'Your professional access request has been successfully sent',
    requestError: 'Error while sending the request',
  },

  // Onboarding
  onboarding: {
    step: 'Step',
    of: 'of',
    getStarted: 'Get started',
    languageSelection: {
      title: 'Choose your language',
      description: 'Select your preferred language to use Klukoo',
    },
    welcome: {
      title: 'Welcome to Klukoo',
      subtitle: 'The first African diabetes management platform',
      description: 'We are delighted to support you on your health journey',
    },
    profile: {
      title: 'Set up your profile',
      subtitle: 'Help us personalize your Klukoo experience',
      description:
        'This information will allow us to offer you tailored support',
      namePlaceholder: 'Enter your first name',
      userType: 'I am a...',
    },
    privacy: {
      title: 'Privacy and preferences',
      subtitle: 'Control your data and notifications',
      description: 'Set up your privacy preferences',
      notifications: 'Push notifications',
      notificationsDesc: 'Receive reminders for your medications and checks',
      dataSharing: 'Anonymous data sharing',
      dataSharingDesc: 'Contribute to diabetes research (optional)',
      reminders: 'Smart reminders',
      remindersDesc: 'Adaptive reminders based on your habits',
    },
    features: {
      title: 'Discover Klukoo',
      subtitle: 'All the features to manage your diabetes',
      description: 'Here’s what Klukoo can do for you',
      glucose: 'Glucose tracking',
      reminders: 'Smart reminders',
      consultation: 'Teleconsultations',
      community: 'Support community',
      tracking: 'Complete tracking',
      trackingDesc: 'Glucose, medications, activities and more',
      ai: 'AI Assistant',
      aiDesc: 'Personalized advice based on your data',
      telehealth: 'Telemedicine',
      telehealthDesc: 'Consultations with certified professionals',
      support: 'Community',
      supportDesc: 'Connect with other people with diabetes',
    },
    completion: {
      title: 'Setup complete!',
      description: 'Your Klukoo account is ready to use',
    },
  },

  // Legal
  legal: {
    termsTitle: 'Terms of Use',
    termsDescription: 'Please read our terms of use carefully',
    privacyTitle: 'Privacy Policy',
    privacyDescription: 'Learn how we protect your personal data',
    termsContent: `
    <h3>1. Acceptance of Terms</h3>
    <p>By using Klukoo (African Diabetes & Excellence Resources), you agree to these terms of use.</p>
    
    <h3>2. Service Description</h3>
    <p>Klukoo is the first diabetes management and monitoring platform in Africa, offering:</p>
    <ul>
      <li>Personalized glucose tracking</li>
      <li>Medication management and reminders</li>
      <li>Teleconsultations with healthcare professionals</li>
      <li>Support community</li>
      <li>Analysis and prediction tools</li>
    </ul>
    
    <h3>3. User Account</h3>
    <p>You are responsible for maintaining the confidentiality of your account and password.</p>
    
    <h3>4. Acceptable Use</h3>
    <p>You agree to:</p>
    <ul>
      <li>Provide accurate information</li>
      <li>Respect other users</li>
      <li>Not share others’ medical information</li>
      <li>Use the platform for legal purposes only</li>
    </ul>
    
    <h3>5. Health Data</h3>
    <p>Your health data is strictly confidential and only shared with your explicit consent.</p>
    
    <h3>6. Teleconsultations</h3>
    <p>Medical consultations are provided by certified professionals. They do not replace emergency care.</p>
    
    <h3>7. Limitation of Liability</h3>
    <p>Klukoo provides tools to assist with diabetes management but does not replace professional medical advice.</p>
    
    <h3>8. Termination</h3>
    <p>You may delete your account at any time. We reserve the right to suspend accounts in case of violations.</p>
    
    <h3>9. Modifications</h3>
    <p>We reserve the right to modify these terms with prior notice.</p>
    
    <h3>10. Contact</h3>
    <p>For any questions: support@Klukoo-africa.com</p>
  `,
    privacyContent: `
    <h3>1. Data Collection</h3>
    <p>We collect the data you provide:</p>
    <ul>
      <li>Registration information (name, email, phone)</li>
      <li>Health data (glucose, medications, symptoms)</li>
      <li>Platform usage data</li>
    </ul>
    
    <h3>2. Data Use</h3>
    <p>Your data is used to:</p>
    <ul>
      <li>Personalize your experience</li>
      <li>Provide analysis and recommendations</li>
      <li>Facilitate teleconsultations</li>
      <li>Improve our services</li>
    </ul>
    
    <h3>3. Data Protection</h3>
    <p>We use advanced encryption technologies and comply with GDPR and ISO 27001 standards.</p>
    
    <h3>4. Data Sharing</h3>
    <p>Your data is NEVER sold. It can only be shared:</p>
    <ul>
      <li>With your explicit consent</li>
      <li>With healthcare professionals you authorize</li>
      <li>When legally required</li>
    </ul>
    
    <h3>5. Anonymized Data</h3>
    <p>We may use anonymized data for medical research and improving diabetes care in Africa.</p>
    
    <h3>6. Your Rights</h3>
    <p>You have the right to:</p>
    <ul>
      <li>Access your data</li>
      <li>Correct incorrect information</li>
      <li>Delete your account and data</li>
      <li>Export your data</li>
      <li>Limit the use of your data</li>
    </ul>
    
    <h3>7. Data Retention</h3>
    <p>Your data is retained while your account is active, then deleted within 30 days of closure.</p>
    
    <h3>8. Cookies</h3>
    <p>We use essential cookies for platform operation and analytics cookies with your consent.</p>
    
    <h3>9. International Transfers</h3>
    <p>Your data is hosted in Africa. Any international transfers comply with data protection agreements.</p>
    
    <h3>10. DPO Contact</h3>
    <p>For any questions about your data: dpo@Klukoo-africa.com</p>
    
    <p><strong>Last updated:</strong> December 2024</p>
  `,
  },

  // Admin sections
  admin: {
    notifications: '🔔 Admin Notifications',
    noNotifications: 'No notifications',
    newActivities: 'New activities will appear here',
    clearAll: 'Clear all',
    applications: 'Professional application management',
    totalApplications: 'Total applications',
    pending: 'Pending',
    allStatuses: 'All statuses',
    approve: 'Approve',
    reject: 'Reject',
    viewDetails: 'View details',
    applicationSubmitted: 'Application submitted',
    documents: 'Documents',
    actions: 'Actions',
    license: 'License',
    city: 'City',
    institution: 'Institution',
    noDocuments: 'No documents',
    notSpecified: 'Not specified',
  },

  // Form labels
  forms: {
    email: 'Email',
    phone: 'Phone',
    time: 'Time',
    now: 'Now',
    context: 'Measurement context',
    measurementTime: 'Measurement time',
    title: 'Reminder title',
    reminderType: 'Reminder type',
    mealName: 'Meal name',
    mealTime: 'Meal time',
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snack: 'Snack',
    calories: 'Calories',
    profilePhoto: 'Profile photo',
  },

  // Activities
  activityTypes: {
    walking: 'Walking',
    running: 'Running',
    cycling: 'Cycling',
    swimming: 'Swimming',
    weightlifting: 'Weightlifting',
    other: 'Other',
    light: 'Light',
    moderate: 'Moderate',
    intense: 'Intense',
    estimation: 'Estimation',
  },

  // Medications
  medicationTypes: {
    rapidInsulin: 'Rapid insulin',
    slowInsulin: 'Slow insulin',
    metformin: 'Metformin',
  },

  // Error messages
  errors: {
    error: 'Error',
    cannotLoadPlans: 'Unable to load plans',
    codeNotFound: 'Missing code',
    genericError: 'An error occurred',
  },

  nativeHeader: {
    title: 'Diabetes Assistant',
    greetings: 'Hello',
    question: 'How is your diabetes today?',
  },

  bloodSugar: {
    title: 'Current Blood Sugar',
    state: 'Within normal range',
    measurement: 'Last measurement',
    noReading: 'No Reading',
  },

  Actions: {
    actions: 'Quick Actions',
    addMeal: 'Add Meal',
    addMedication: 'Add Medication',
    addActivity: 'Add Activity',
    reminders: 'Add Reminders',
    glucoseSaved: 'Blood sugar saved',
    mealSaved: 'Meal saved',
    medicationSaved: 'Medication saved',
    actionsPopover: {
      bloodSugar: {
        increment: 'Add Blood Sugar',
      },
      title: 'New Glucose Measurement',
      input1: 'Blood Sugar',
      notes: 'optional',
      comments: 'Comments...',
    },
    button: 'Save',
  },

  Journal: {
    title: 'Meal Log',
    media: {
      scanner: 'Scan Barcode',
      photo: 'Photo + AI',
    },
    manualEntry: 'or manual entry',
    title1: 'Food Name',
    title2: 'Carbohydrates',
    optional: 'optional',
    button: 'Add',
  },

  Medication: {
    title: 'Medications',
    subtitle: 'Save Medication',
    title2: 'Type of medication',
    select: {
      title: 'Select a Medication',
      option: {
        one: 'Ultra-rapid insulin',
        two: 'Humalog (Lispro)',
        three: 'NovoRapid (Aspart)',
        four: 'Apidra (Glulisine)',
        five: 'Fiasp (Ultra-rapid Aspart)',
        six: 'Rapid insulin',
        seven: 'Actrapid',
        eight: 'Humulin R',
        nine: 'Insuman Rapid',
        ten: 'Intermediate insulin',
        eleven: 'Insulatard (NPH)',
        twelve: 'Humulin N (NPH)',
        thirteen: 'Insuman Basal (NPH)',
        fourteen: 'Long-acting insulin',
        fifteen: 'Lantus (Glargine)',
        sixteen: 'Levemir (Detemir)',
        seventeen: 'Toujeo (Glargine U300)',
        eighteen: 'Tresiba (Degludec)',
        nineteen: 'Abasaglar (Glargine)',
        twenty: 'Mixed insulin',
        twentyone: 'NovoMix 30 (Aspart + NPH)',
        twentytwo: 'Humalog Mix 25/50 (Lispro + NPH)',
        twentythree: 'Humulin 70/30 (Rapid + NPH)',
        twentyfour: 'Insuman Comb (Rapid + NPH)',
        twentyfive: 'Metformin',
        twentysix: 'Glucophage (Metformin)',
        twentyseven: 'Stagid (Metformin)',
        twentyeight: 'Gliclazide',
        twentynine: 'Diamicron (Gliclazide)',
        thirty: 'Victoza (Liraglutide)',
        thirtyone: 'Ozempic (Semaglutide)',
        thirtytwo: 'Trulicity (Dulaglutide)',
        thirtythree: 'Januvia (Sitagliptin)',
        thirtyfour: 'Forxiga (Dapagliflozin)',
        thirtyfive: 'Other',
      },
    },
    dose: 'Dose',
    unit: 'unit',
    button: 'Save',
  },

  Activity: {
    title: 'Activity',
    subtitle: 'Physical Activity',
    type: 'Type of activity',
    select: 'Select an activity',
    Popover: {
      one: 'Walking',
      two: 'Running',
      three: 'Cycling',
      four: 'Swimming',
      five: 'Weightlifting',
      six: 'Other',
    },
    duration: 'Duration',
    button: 'Save',
  },

  Alerts: {
    title: 'AI Predictive Alerts',
    total: 'Total',
    urgent: 'Urgent',
    monitor: 'To monitor',
    good: 'All good!',
    message: 'No predictive alerts detected at the moment.',
  },

  analyze: {
    title: 'Continuous AI Analysis',
    message:
      'The system continuously analyzes your data to detect risk patterns',
    buttons: {
      enter: 'Check My Predictions',
    },
  },

  mission: {
    title: 'Mission',
    message:
      'Klukoo watches over your diabetes, predicting hypo and hyper risks before they happen.',
  },

  analysis: {
    title: 'Glucose Analysis',
    days: 'Last 7 days',
    time: {
      midnight: 'Midnight',
      noon: 'Noon',
    },
    context: {
      fasting: 'Fasting',
      postMeal: 'Post-meal',
      morning: 'Morning',
      breakfast: 'Breakfast',
      activity: 'Activity',
      lunch: 'Lunch',
      snack: 'Snack',
      dinner: 'Dinner',
      evening: 'Evening',
    },
    state: {
      one: 'High',
      two: 'Borderline',
      three: 'Target',
      four: 'Low',
    },
    contextChart: 'Context',
  },

  target: {
    title: 'Time in Range',
    goal: 'Goal',
    target: 'in range',
  },

  mode: {
    average: 'Average',
    variability: 'Variability',
    estimated: 'Estimated',
  },

  trend: {
    title: 'Weekly Trends',
    message: 'Percentage of time in range per day',
  },

  reminder: {
    writeup: 'Insulin Reminder - 7:00 PM Lantus 20UI',
  },

  lantus: {
    dose: 'Usual dose',
    time: 'Scheduled time',
    injection: 'Last injection: Today 07:45',
    button: 'Mark as injected',
  },

  humalog: {
    title: 'Humalog (Rapid)',
    glucose: 'Current Blood Sugar',
    pending: 'Pending',
    carbs: 'Meal Carbs',
    dose: 'Calculated Dose',
    meal: 'Meal',
    button: 'Schedule Injection',
  },

  injection: {
    title: 'Missed Injection',
    time: 'Yesterday 19:00 - Humalog 6 IU',
    administer: 'Not Administered',
    button1: 'Ignore',
    button2: 'Inject Now',
  },

  history: {
    title: '7-Day History',
    message: 'Injections Completed / Scheduled per Day',
  },

  consultation: {
    title: 'Consultation Request',
    subtitle: 'Consult a healthcare professional specialized in diabetes',
    request: {
      title: 'New Consultation Request',
      subtitle: 'Select a professional and describe your need',
      input1: {
        title: 'Healthcare Professional *',
        writeup: 'Choose a professional',
      },
      input2: {
        title: 'Reason for Consultation *',
        writeup: {
          title: 'Select a reason',
          options: {
            one: 'Routine Check-up',
            two: 'Urgent Consultation',
            three: 'Blood Sugar Management',
            four: 'Treatment Adjustment',
            five: 'Nutritional Advice',
            six: 'Psychological Support',
            seven: 'Diabetes Complications',
            eight: 'Post-Consultation Follow-up',
          },
        },
      },
      input3: {
        title: 'Message for the Professional (Optional)',
        writeup: 'Describe your situation, symptoms, or questions...',
      },
    },
    button: 'Send Request',
  },

  consultationRequest: {
    title: 'My Consultation Requests',
    subtitle: 'History of your requests and their status',
    request: {
      noRequest: 'No consultation requests',
      procedure: 'Your requests will appear here once sent',
    },
  },

  reminderScreen: {
    title: 'My Reminders',
    subtitle: 'Manage reminders for insulin, medications, tests, and more',
    newReminder: {
      title: 'All Reminders',
      reminderSet: 'No reminders set',
      writeup: 'Create your first reminder to never miss your treatments',
    },
    button1: 'Create Reminder',
    button2: 'New Reminder',
  },

  chatTestimonial: {
    firstMessage:
      'Hello everyone! I managed to keep my blood sugar in the target zone all week 🎉',
    secondMessage:
      'Congratulations Marie! That’s exactly the kind of progress we love to see. Keep it up!',
    thirdMessage:
      'I have a question about rapid insulin before meals. Can anyone share their experience?',
  },

  journalEntries: {
    id1: {
      date: 'Friday',
      glucoseStatus: 'Slightly High',
      context: 'After Thieboudienne',
    },
    id2: {
      date: 'Friday',
      glucoseStatus: 'In Target',
      context: 'Fasting',
    },
    id3: {
      date: 'Thursday',
      glucoseStatus: 'High',
      context: 'Before Dinner',
    },
    id4: {
      date: 'Thursday',
      glucoseStatus: 'In Target',
      context: 'Post-Lunch',
    },
    id5: {
      date: 'Wednesday',
      glucoseStatus: 'In Target',
      context: 'After Bissap (No Sugar)',
    },
  },

  blogScreen: {
    article: {
      id7: {
        category: 'Guides',
        title: 'Nutrition Guide for People with Diabetes',
        excerpt:
          'A complete guide to balanced eating adapted to diabetes. Discover recommended foods, portion sizes, and nutritional strategies...',
        authorTitle: 'Nutritionist.',
      },
      id8: {
        category: 'Guides',
        title: 'Comprehensive Guide to Type 1 and Type 2 Diabetes',
        excerpt:
          'Everything you need to know about diabetes: definitions, symptoms, treatments, complications, and daily management...',
        authorTitle: 'Endocrinologist.',
      },
      id1: {
        category: 'Research',
        title:
          'Breakthrough: 83% of Type 1 Diabetics Freed from Insulin Thanks to Zimislecel',
        excerpt:
          'A revolutionary stem cell therapy allows 83% of patients to stop insulin injections after one year…',
      },
      id2: {
        category: 'Innovation',
        title:
          '“Smart” Gel Revolutionizes Healing: Diabetic Wounds Healed in Days',
        excerpt:
          'A new gel restores blood flow and dramatically accelerates the healing of chronic diabetic wounds...',
      },
      id3: {
        category: 'Research',
        title:
          'First Transplant of Genetically Modified Islets Without Immunosuppression',
        excerpt:
          'For the first time, genetically edited pancreatic islet cells were successfully transplanted without anti-rejection drugs…',
      },
      id4: {
        category: 'Innovation',
        title: 'Smart Insulin: First Clinical Trials Successful',
        excerpt:
          'An insulin that automatically adapts to blood glucose levels shows promising results in early tests...',
      },
      id5: {
        category: 'Testimonials',
        title:
          'Running a Marathon with Diabetes: The Achievement of James Thompson at 65',
        excerpt:
          'Diabetic for 30 years, James Thompson completed the Boston Marathon and inspired thousands of people...',
      },
      id6: {
        category: 'Innovation',
        title: 'Predictive AI 2025: Preventing Hypoglycemia with 97% Accuracy',
        excerpt:
          'The next generation of medical AI achieves 97% accuracy in predicting crises, with alerts 45 minutes in advance…',
      },
    },
    sources: {
      title: 'Reliable Sources',
      subtitle:
        'All our news is verified and comes from internationally recognized medical sources',
    },
    button: 'Read',
  },

  familyScreen: {
    heading: {
      title: 'Family',
      subtitle: 'Your Care Circle',
    },
    familySharingCode: {
      title: 'Family Sharing Code',
      subtitle: 'Share this code with your loved ones so they can support you.',
      copyButton: 'Copy Code', // when a code exists
      generateButton: 'Generate Invite', // when no code exists yet
    },

    numOfPatients: {
      patients: 'Care Partners',
      first: 'Alerts',
      second: 'Connected Days',
    },
    familyMembers: {
      title: 'Family Members',
      patientOne: {
        role: 'Wife',
        permission: 'Full Access',
        lastSeen: 'Online',
      },
      patientTwo: {
        role: 'Primary Doctor',
        permission: 'Emergencies + Data',
        lastSeen: '2 hours ago',
      },
      patientThree: {
        role: 'Son',
        permission: 'Read-Only',
        lastSeen: '1 hour ago',
      },
    },
    recentActivity: {
      firstOne: {
        title: 'Recent Activity',
        action: 'Fatou viewed your latest glucose readings.',
        time: '10 minutes ago',
      },
      secondOne: {
        action: 'Dr. Kane added a medical note.',
        time: '2 hours ago',
      },
      thirdOne: {
        action: 'Ibrahim received an alert for a missed injection.',
        time: 'Yesterday at 7:30 PM',
      },
      fourthOne: {
        action: 'Fatou confirmed your Humalog injection.',
        time: 'Yesterday at 3:00 PM',
      },
    },
    button1: 'Invite a Care Partner',
    button2: 'Manage Permissions',
    emergencyContact: 'Emergency Contact',
  },

  toastMessage: {
    title: 'New Entry',
    description: 'Feature coming soon',
    copy: 'Copied!',
    copyDescription: 'The access code has been copied to your clipboard.',
  },

  // Invite Partner Modal
  invitePartnerModal: {
    title: 'Invite a Care Partner',
    form: {
      name: 'Family Name',
      phone: 'Phone Number',
      code: 'Patient Code',
      permission: 'Access Level',
    },
    permissionOptions: {
      read: 'Read Only',
      full: 'Full Access',
    },
    button1: 'Cancel',
    button2: 'Send Code',
  },

  manageAccessModal: {
    title: 'Manage Access',
    radio1: 'Read only',
    radio2: 'Full Access',
    radio3: 'Remove Access',
    button1: 'Cancel',
    button2: 'Save',
  },
  professionalLoginCard: {
    title: 'Healthcare Professional',
    subtitle: 'Access professional tools',
    button: 'Go to Professional Space',
    testAccess: 'Test Professional Access',
    loginButton: 'Login',
  },

  //professionalDashboard
  professionalDashboard: {
    loading: 'Loading...',
    toast: {
      logout: {
        title: 'Logout',
        description: 'You have been logged out of demo mode',
      },
    },
    title: 'Professional',
    study: 'Endocrinology',
    mode: 'Demo Mode',
    logout: 'Logout',
    stats: {
      title1: 'Active Patients',
      title2: 'Upcoming Appointments',
      title3: 'Consultation Completed',
      title4: 'Average time / consultation',
      compared: 'vs last month',
    },

    tableHeaderSections: {
      revenue: 'Revenue',
      settings: 'Settings',
    },

    overview: {
      heading: 'Overview',
      recentPatients: {
        title: 'Recent Patients',
        firstPatient: {
          lastvisit: '2 hours ago',
          status: 'stable',
        },
        secondPatient: {
          lastvisit: 'Yesterday',
          status: 'improving',
        },
        ThirdPatient: {
          lastvisit: '3 days ago',
          status: 'improving',
        },
        button: 'View all patients',
      },

      quickActions: {
        title: 'Quick Actions',
        scheduleAppointment: {
          title: 'Schedule an appointment',
          subtitle: 'Schedule an appointment',
          patient: {
            placeholder: 'Select a patient',
          },
          date: {
            placeholder: 'Choose a date',
          },
          time: {
            title: 'Time',
            placeholder: 'Select time',
          },
          consultationType: {
            title: 'Consultation type',
            placeholder: {
              title: 'Select type',
              routine: 'Routine follow-up',
              urgent: 'Urgent consultation',
              teleconsultation: 'Teleconsultation',
              first: 'First consultation',
            },
          },
          notes: {
            title: 'optional',
            placeholder: 'Consultation notes...',
          },
          button1: 'Cancel',
          button2: 'Schedule',
        },

        reportGenerator: {
          title: 'Generate a report',
          subtitle: 'Generate a report',
          reportType: {
            title: 'Report type',
            placeholder: {
              title: 'Select type',
              monthly: 'Monthly report',
              patient: 'Patient report',
              financial: 'Financial report',
              activity: 'Activity report',
            },
          },
          timeframe: {
            title: 'Timeframe',
            placeholder: {
              title: 'Select timeframe',
              lastWeek: 'Last week',
              lastMonth: 'Last month',
              lastQuarter: 'Last quarter',
              custom: 'Custom period',
            },
          },
          format: {
            placeholder: 'Select format',
          },
          button1: 'Close',
          button2: 'Generate',
        },

        addPatient: {
          title: 'Add a patient',
          subtitle: 'Add a new patient',
          name: {
            firstName: 'First Name',
            lastName: 'Last Name',
          },
          number: 'Phone',

          diabetesTypes: {
            title: 'Diabetes type',
            placeholder: {
              title: 'Select type',
              type1: 'Type 1',
              type2: 'Type 2',
              gestational: 'Gestational',
            },
          },
          medicalNotes: {
            title: 'Medical notes',
            placeholder: 'Medical history, allergies, etc.',
          },
          button1: 'Close',
          button2: 'Add',
        },

        accountSetting: {
          title: 'Account settings',
          currentStatus: {
            title: 'Availability',
            placeholder: 'Current status',
            options: {
              available: 'Available',
              busy: 'Busy',
              offline: 'Offline',
            },
          },

          notifications: {
            placeholder: 'Notification preferences',
            options: {
              all: 'All notifications',
              important: 'Important only',
              none: 'No notifications',
            },
          },

          consultationFee: 'Consultation fee',
          button1: 'Close',
          button2: 'Save',
        },
      },
    },

    patients: {
      calendar: 'Calendar',
      title: 'Patient list',
      tableHeading: {
        first: 'Patient',
        second: 'Diabetes type',
        third: 'Last consultation',
        fourth: 'Last blood glucose',
        fifth: 'Status',
      },
      lastBloodGlucose: {
        first: 'Stable',
        second: 'improving',
        third: 'warning',
        fourth: 'Stable',
      },
      recentNotes: {
        title: 'Recent notes',
        people: {
          first:
            'Blood glucose well controlled. Continue current treatment. Next consultation in 1 week.',
          second:
            'Significant improvement in HbA1c. Recommended insulin dose reduction.',
          third: 'Frequent glucose spikes. Review diet and adjust treatment.',
          fourth: '',
        },
      },
      dropdownOptions: {
        first: 'View record',
        second: 'Send a message',
        third: 'Teleconsultation',
        fourth: 'Call',
        fifth: 'Edit profile',
      },

      planning: {
        title: 'Consultation schedule',
        tableHeading: {
          time: 'Time',
          duration: 'Duration',
          status: 'Status',
        },
        type: {
          followUp: 'Routine follow-up',
          urgent: 'Urgent consultation',
          teleconsultation: 'Teleconsultation',
          first: 'First consultation',
        },
        status: {
          scheduled: 'Scheduled',
          completed: 'Completed',
          cancelled: 'Cancelled',
        },
        actions: {
          start: 'Start consultation',
          view: 'View details',
          edit: 'Edit',
          cancel: 'Cancel',
        },
      },

      calendarScreen: {
        title: 'Calendar',
        consulationOf: 'Consultations of',
        scheduled: 'No consultations scheduled for today',
      },
    },

    consultations: {
      title: 'My consultations',
      placeholder: {
        title: 'Filter by status',
        options: {
          all: 'All',
          pending: 'Pending',
          active: 'Active',
          completed: 'Completed',
        },
      },
      loading: 'Loading consultations...',
    },

    revenue: {
      title: 'Revenue',
      thisMonth: 'This month',
      revenueThisMonth: 'Net revenue this month',
      tableHeader: {
        grossAmount: 'Gross Amount',
        status: 'Status',
      },
      consultationType: {
        one: 'Endocrinology consultation',
        two: 'Diabetes follow-up',
        three: 'Endocrinology consultation',
        four: 'Teleconsultation',
        five: 'Endocrinology consultation',
        six: 'Hormonal follow-up',
      },
      status: {
        paid: 'Paid',
        processing: 'Processing',
        pending: 'Pending',
      },
      consultationRevenue: {
        title: 'Revenue per consultation',
        writeup:
          'Revenue is automatically calculated based on the profession-specific rates defined in the system. Each completed consultation adds the corresponding amount to your revenue.',
      },
    },

    accountSettings: {
      title: 'Account settings',
      writeup: 'Account settings under development...',
    },
  },

  //fixes
  getGlucoseStatus: {
    status_low: 'Low blood sugar',
    status_normal: 'Within normal range',
    status_high: 'High blood sugar',
  },

  foodNamePlaceholder: {
    placeholder_foodName: 'Ex: Apple, Rice, Salad...',
  },

  mealType: {
    label_mealType: 'Meal type',
    option_breakfast: 'Breakfast',
    option_lunch: 'Lunch',
    option_dinner: 'Dinner',
    option_snack: 'Snack',
  },

  foodDetailsPlaceholder: {
    placeholder_foodDetails: 'Ex: With chicken, light sauce...',
  },

  blogScreenFixes: {
    title_diabetesNews: 'International Diabetes News',
    placeholder_searchNews: 'Search news...',
    loading_news: 'Loading news...',
    no_articles_found: 'No articles found.',
    categories: {
      all: 'All',
      guides: 'Guides',
      research: 'Research',
      nutrition: 'Nutrition',
      mental: 'Mental',
      innovation: 'Innovation',
      testimonials: 'Testimonials',
    },
  },

  profileScreenFixes: {
    status_unverifiedProfile: 'Unverified profile',
    label_weight: 'Weight',
    label_professionalLicense: 'Professional license',
    label_specialty: 'Specialty',
    action_editProfile: 'Edit profile',
    label_firstName: 'First name',
    label_lastName: 'Last name',
    label_phone: 'Phone',
  },

  professionalNotification: {
    title_consultationRequests: 'Consultation requests',
    message_noRequests: 'No requests',
    time_justNow: 'Just now',
    time_oneHour: '1 hour ago',
    time_hours: '{{count}} hours ago',
    time_day: '{{count}} day ago',
    time_days: '{{count}} days ago',
    toast_accessGranted_title: 'Access granted',
    toast_accessGranted_description:
      '✅ Access granted to healthcare professional for 24h',
    toast_accessDenied_title: 'Access denied',
    toast_accessDenied_description:
      '❌ Access denied to healthcare professional',
    toast_error_title: 'Error',
    toast_error_description: 'Error while responding to request',
    section_glucose: 'Blood glucose',
    section_medications: 'Medications',
    section_meals: 'Meals',
    section_activities: 'Activities',
    section_notes: 'Personal notes',
    section_reports: 'Medical reports',
    title_dataAccessRequest: '🔐 Request for Access to Your Data',
    label_professionalCode: 'Professional code:',
    label_maxConsultations: 'Max consultations:',
    label_requested: 'Requested:',
    title_requestedData: '📋 Requested data:',
    button_deny: '❌ Deny',
    button_approve: '✅ Approve (24h)',
  },

  applicationCard: {
    professional_endocrinologist: 'Endocrinologist',
    professional_diabetologist: 'Diabetologist',
    professional_nutritionist: 'Nutritionist',
    professional_generalPractitioner: 'General practitioner',
    professional_nurse: 'Specialized nurse',
    professional_pharmacist: 'Pharmacist',
    professional_psychologist: 'Psychologist',
    professional_podiatrist: 'Podiatrist',
    badge_pending: 'Pending',
    notSpecified: 'Not specified',
    application_submitted: 'Application submitted',
    button_approve: 'Approve',
    button_reject: 'Reject',
    personalInfo_title: 'Personal information',
    personalInfo_email: 'Email:',
    personalInfo_phone: 'Phone:',
    personalInfo_location: 'Location:',
    professionalQualifications_title: 'Professional qualifications',
    professionalQualifications_licenseNumber: 'License No:',
    professionalQualifications_institution: 'Institution:',
    documents_title: 'Supporting documents',
    documents_label: 'Document',
    button_view: 'View',
    noDocument: 'No document',
    application_submitted_on: 'Application submitted on',
  },

  documentUploader: {
    file_too_large: '{{fileName}}: File too large (max 10MB)',
    file_unsupported_type: '{{fileName}}: Unsupported file type',
    max_files_allowed: 'Maximum {{maxFiles}} files allowed',
    file_already_added: '{{fileName}}: File already added',
    documents_title: 'Supporting documents',
    documents_count: '{{current}}/{{max}} files',
    dropzone_dragFiles: 'Drag your documents here',
    dropzone_orClick: 'or',
    dropzone_clickToSelect: 'click to select',
    dropzone_fileInfo: '{{types}} - Max {{maxFiles}} files - 10MB per file',
    documents_added: 'Documents added:',
    requiredDocuments_title: '📋 Required documents:',
    requiredDocuments_item1: '• Medical degree or professional certification',
    requiredDocuments_item2: '• Valid practice license',
    requiredDocuments_item3:
      '• Certificate of registration with the medical board',
    requiredDocuments_item4: '• Detailed professional CV',
    requiredDocuments_item5: '• Identity document (optional but recommended)',
  },

  errorBoundary: {
    error_occurred: 'Oops! An error occurred',
    unexpected_error_message:
      'An unexpected error occurred in the Klukoo application. Our technical team has been automatically notified.',
    button_restart: 'Restart',
    button_home: 'Home',
    footer_text: '💪 Klukoo - Klukoo to overcome diabetes together',
  },

  onboardingFlow: {
    language_selected_title: 'Language selected',
    language_selected_description: 'French selected successfully',
    choose_language_title: 'Choose your language',
    choose_language_description: 'Select your preferred language to continue',
  },

  planSelection: {
    loading_plans: 'Loading plans...',
    plans_error_title: 'Error',
    plans_error_description: 'Unable to load plans',
    choose_plan_title: 'Choose your Klukoo plan',
    choose_plan_description: 'Select the plan that best suits your needs',
    badge_recommended_family: 'Recommended for family',
    per_month: 'per month',
    selected: 'Selected',
    choose_this_plan: 'Choose this plan',
    payment_secure: '💳 Secure payment via Flutterwave',
    payment_method_card: '• Bank cards (Visa, Mastercard, etc.)',
    payment_method_mobile: '• Mobile Money (Orange Money, MTN, Wave, etc.)',
    payment_method_bank: '• Local bank transfers',
    payment_method_patient_code:
      '• Patient code automatically generated after payment',
    cancel: 'Cancel',
    continue: 'Continue',
    patient_description:
      'Individuals living with diabetes (Type 1 or Type 2) who want continous, personalized monitoring.',
    family_description:
      'Families managing diabetes together, especially for children or multiple diabetic members.',
    includeFeatures: 'Included Features:',
    patientFeatures: {
      predictiveAlert: 'AI predictive alert',
      glucoseTracking: 'Glucose tracking',
      insights: 'Personalized Insight & Report',
      consulations: '10 Monthly Consultation',
      chat: 'Klukoo Chat',
      blog: 'Klukoo News & Education Hub',
      reminder: 'Medication & Insulin Reminders',
      mood: 'Daily Mood & Activity Log',
    },
    familyFeatures: {
      allFeatures: 'All features from Klukoo Patient',
      dataSharing: 'Data Sharing for up to 3 Family Members',
      alert: 'Family Alert',
      dashboard: 'Family Dashboard',
      family: 'TeleMedicine for Family',
      coaching: 'Family Coaching',
      support: 'Priority Medical Support',
      report: 'Monthly Progress Report',
    },
  },

  professionalCodeManager: {
    code_generated_title: 'Code generated successfully',
    code_generated_description:
      'Your professional identification code is ready',
    code_error_title: 'Error',
    code_error_description: 'Unable to generate professional code',
    code_copied_title: 'Code copied',
    code_copied_description: 'Code copied to clipboard',
    missing_code_title: 'Missing code',
    missing_code_description: 'Please enter a patient access code',
    meal_fasting: 'Fasting',
    meal_after_meal: 'After meal',
    meal_before_dinner: 'Before dinner',
    access_granted_title: 'Access granted',
    access_granted_description: 'Patient data retrieved successfully',
    access_denied_title: 'Access denied',
    access_denied_description: 'Invalid access code or patient not found',
    professional_id_code: 'Professional identification code',
    professional_code_description:
      'Generate your unique code to access Klukoo patient data',
    generate_professional_code: 'Generate my professional code',
    generated_on: 'Generated on',
    badge_active: 'Active',
    professional_code_warning:
      'Important: This code is personal and confidential. Never share it. It allows you to access sensitive patient data.',
    patient_data_access_title: 'Patient data access',
    patient_data_access_description:
      'Use your professional code to access a patient’s data',
    patient_code_label: 'Patient access code',
    patient_code_placeholder: 'Enter the patient code...',
    all_access_tracked: 'All access is tracked and secured',
    secure_patient_data_title: 'Patient Data - Secure Access',
    secure_patient_data_description:
      'Sensitive medical information - Strictly professional use',
    patient_information: 'Patient information',
    last_name: 'Last name',
    first_name: 'First name',
    diabetes_type: 'Diabetes type',
    recent_glucose_readings: 'Recent glucose readings',
    confidentiality_notice:
      'Confidentiality: This data is strictly confidential and protected by medical secrecy. Any unauthorized use is subject to sanctions.',
  },

  blogScreenRead: {
    nutrition_guide_content_one: `# Nutrition Guide for People with Diabetes

## Introduction
A balanced diet is the cornerstone of diabetes management. This guide provides the basics to help you adopt healthy eating habits that will assist you in controlling your blood sugar while maintaining an optimal quality of life.

## Basic Principles

### 1. Macronutrient Distribution
- **Carbohydrates**: 45–65% of total energy intake  
- **Proteins**: 15–20% of total energy intake  
- **Fats**: 20–35% of total energy intake  

### 2. Glycemic Index
Prioritize foods with a low or moderate glycemic index:
- **Low GI (<55)**: Green vegetables, legumes, quinoa, oats  
- **Moderate GI (55–70)**: Wholemeal bread, brown rice, sweet potato  
- **High GI (>70)**: Limit – white bread, potato, sugar  

## Recommended Foods

### Vegetables (unlimited)
- Broccoli, spinach, zucchini, eggplant  
- Tomatoes, peppers, cucumbers  
- Cauliflower, green beans, asparagus  

### Quality Proteins
- Fatty fish: salmon, mackerel, sardines  
- Skinless poultry: chicken, turkey  
- Legumes: lentils, chickpeas, beans  
- Eggs (in moderation)  
- Tofu and soy-based products  

### Complex Carbohydrates
- Quinoa, oats, barley  
- Wholemeal bread, whole wheat pasta  
- Brown rice, legumes  
- Sweet potato (in moderation)  

### Healthy Fats
- Olive oil, avocado  
- Nuts, almonds, seeds  
- Fatty fish  

## Foods to Limit

### Simple Sugars
- Sweets, pastries, sodas  
- Very sweet fruits in excess  
- Honey, maple syrup (occasionally)  

### Saturated Fats
- Fatty meats, deli meats  
- Fatty cheeses, excessive butter  
- Fried foods, fast food  

## Practical Strategies

### Meal Planning
1. **Plate Method**:
   - 1/2 plate: non-starchy vegetables  
   - 1/4 plate: lean protein  
   - 1/4 plate: complex carbohydrates  

2. **Regular meal times**: 3 meals + 1–2 snacks if needed  

3. **Portion control**:
   - Use smaller plates  
   - Weigh food at first to learn  
   - Listen to satiety signals  

### Craving Management
- Drink water before meals  
- Include fiber at every meal  
- Prepare healthy snacks in advance  
- Eat slowly and mindfully  

## Tips by Diabetes Type

### Type 1
- Carb counting to adjust insulin  
- Beware of hypoglycemia during exercise  
- Proper resugaring if hypoglycemia occurs  

### Type 2
- Weight loss if necessary (5–10%)  
- Regular physical activity after meals  
- Monitor blood pressure  

## Hydration
- 1.5 to 2 liters of water daily  
- Avoid sugary drinks  
- Unsweetened tea and coffee allowed  
- Be cautious with alcohol (moderation, never on an empty stomach)  

## Supplements & Vitamins
Consult your doctor before taking:
- Vitamin D (often deficient)  
- Magnesium  
- Omega-3  
- Chromium (scientifically controversial)  

## Conclusion
A diabetes-appropriate diet is not restrictive but balanced. It allows you to enjoy food while keeping blood sugar stable. Consult a specialized nutritionist for a personalized plan.`,

    nutrition_guide_content_two: `# Complete Guide on Type 1 and Type 2 Diabetes

## What is Diabetes?

Diabetes is a chronic disease characterized by hyperglycemia (high blood sugar) due to a defect in insulin secretion or action. There are several types, but type 1 and type 2 are the most common.

## Type 1 Diabetes

### Definition
Type 1 diabetes is an autoimmune disease where the immune system destroys pancreatic beta cells that produce insulin. It accounts for 5–10% of diabetes cases.

### Features
- **Onset**: Usually before age 30, often in childhood  
- **Progression**: Rapid, within weeks or months  
- **Heredity**: Low genetic component (3–5% family risk)  
- **Weight**: Often normal weight or thin  

### Symptoms
The classic "4Ps":
- **Polyuria**: frequent urination  
- **Polydipsia**: intense thirst  
- **Polyphagia**: excessive hunger  
- **Weight loss**: rapid and unexplained  

Other symptoms:
- Extreme fatigue  
- Blurred vision  
- Recurrent infections  
- Fruity breath (ketosis)  

### Diagnosis
- **Fasting glucose** ≥ 126 mg/dL (7 mmol/L) on two occasions  
- **Random glucose** ≥ 200 mg/dL (11.1 mmol/L) with symptoms  
- **HbA1c** ≥ 6.5%  
- **Glucose tolerance test**: ≥ 200 mg/dL at 2h  

### Treatment
**Insulin therapy required**:
- Basal insulin (long-acting): covers baseline needs  
- Prandial insulin (rapid-acting): covers meals  
- Methods: pens, insulin pump  

**Monitoring**:
- Glucose 4–6 times/day minimum  
- HbA1c every 3 months (goal < 7%)  
- Monitoring for complications  

## Type 2 Diabetes

### Definition
Type 2 diabetes results from insulin resistance and/or reduced insulin secretion. It accounts for 90–95% of cases.

### Features
- **Onset**: Generally after 40 (increasingly younger)  
- **Progression**: Gradual, often asymptomatic at first  
- **Heredity**: Strong genetic component (30–40% family risk)  
- **Weight**: Often overweight/obese (80% of cases)  

### Risk Factors
- Age > 45  
- Overweight/obesity (BMI > 25)  
- Family history  
- Sedentary lifestyle  
- Hypertension  
- Dyslipidemia  
- Gestational diabetes history  
- PCOS  
- Certain ethnicities (African, Hispanic, Asian)  

### Symptoms
Often asymptomatic initially, then:  
- Fatigue  
- Moderate thirst  
- Frequent urination  
- Recurrent infections  
- Slow healing wounds  
- Blurred vision  

### Diagnosis
Same criteria as type 1, but slower progression.  

### Treatments
**1. Lifestyle modifications**  
- Weight loss (5–10%)  
- Balanced diet  
- Regular exercise (150 min/week)  
- Quit smoking  

**2. Oral medications**  
- **Metformin**: first-line  
- **Sulfonylureas**: stimulate insulin secretion  
- **Glinides**: rapid insulin stimulation  
- **Alpha-glucosidase inhibitors**: slow carb absorption  
- **Thiazolidinediones**: improve sensitivity  
- **DPP-4 inhibitors**: increase insulin, reduce glucagon  
- **GLP-1 agonists**: injectable, appetite control  

**3. Insulin (if others fail)**  

## Common Complications
**Acute**:  
- Hypoglycemia (<70 mg/dL)  
- Severe hyperglycemia (DKA, HHS)  

**Chronic**:  
- Retinopathy  
- Nephropathy  
- Neuropathy  
- Cardiovascular diseases  
- Diabetic foot  

## Living with Diabetes
- Balanced diet  
- Daily activity  
- Stress management  
- Good sleep  

**Special situations**: travel, illness, pregnancy, sport  

**Education**: self-management, support groups, psychological care  

## Innovations
- Continuous glucose monitoring  
- Smart insulin pumps  
- Artificial pancreas  
- Mobile apps  

**Research**: cell therapies, immunotherapies, new drugs  

## Conclusion
Diabetes is complex but manageable. Early, adapted care plus healthy lifestyle helps prevent complications and ensures good quality of life. Patient education and medical support are essential.`,

    nutrition_guide_content_three: `A major medical breakthrough was just announced: the stem cell therapy Zimislecel enabled 83% of patients with severe type 1 diabetes to completely stop insulin injections after a single infusion.

The study, published this month, followed 12 volunteers for a year. Ten no longer needed insulin, and the other two drastically reduced their doses. No severe hypoglycemia episodes were reported.

"This is revolutionary," said Dr. Jennifer Martinez, lead investigator. "We may be witnessing the end of daily insulin injections for these patients."

The treatment uses stem cells engineered into pancreatic islet cells, which produce insulin. This represents the culmination of decades of regenerative medicine research.

The FDA is currently reviewing this treatment for accelerated approval, potentially revolutionizing type 1 diabetes care by 2026.`,

    nutrition_guide_content_four: `A major innovation in diabetic wound care has been unveiled: a "smart" gel combining microscopic healing vesicles with a specialized hydrogel, restoring blood flow and accelerating healing dramatically.

This therapy, developed by an international team, uses healing messengers encapsulated in nanovesicles that release gradually upon contact with the wound. The gel stimulates new blood vessel formation while protecting the injured area.

Clinical results are impressive:
- Healing 5x faster than conventional treatments  
- Complete blood flow restoration in 72h  
- 85% reduction in amputation risk  
- No major side effects reported  

"This technology will save thousands of limbs every year," said Dr. Sarah Chen, dermatologist. "We are moving from weeks of treatment to just a few days."

The gel will be available in European hospitals by September 2025, pending regulatory approval.`,

    nutrition_guide_content_five: `An international research team has developed "smart insulin" that automatically adapts to blood sugar fluctuations. This could revolutionize diabetes treatment by eliminating hypoglycemia risks.

It works with nanoparticles that release insulin only when glucose is high. Early trials on 45 type 1 diabetes patients show remarkable results:

- 75% fewer hypoglycemia episodes  
- Time in target range up to 95%  
- Simplified treatment (one injection per week)  

"This is the Holy Grail of diabetes treatment," said Dr. Li Wei, study lead. "This insulin 'thinks' for the patient."

Commercialization could begin by 2026 after phase III trials.`,

    nutrition_guide_content_six: `An international research team has developed "smart insulin" that automatically adapts to blood sugar fluctuations. This could revolutionize diabetes treatment by eliminating hypoglycemia risks.

It works with nanoparticles that release insulin only when glucose is high. Early trials on 45 type 1 diabetes patients show remarkable results:

- 75% fewer hypoglycemia episodes  
- Time in target range up to 95%  
- Simplified treatment (one injection per week)  

"This is the Holy Grail of diabetes treatment," said Dr. Li Wei, study lead. "This insulin 'thinks' for the patient."

Commercialization could begin by 2026 after phase III trials.`,

    nutrition_guide_content_seven: `At 65 years old and living with diabetes for 30 years, James Thompson achieved the feat of completing the prestigious Boston Marathon in 3h42min. His journey now inspires thousands worldwide.

"When I was diagnosed at 35, I thought my athletic life was over," James shared. "I was wrong. Diabetes is not a limit, it’s a challenge."

His training routine included:
- Glucose checks every 30 minutes during exercise  
- Nutrition strategy tailored with his endocrinologist  
- 18 months of progressive training  
- Medical support team during the race  

"James proves well-managed diabetes blocks no dream," said his doctor. His story is now the subject of a documentary and an upcoming book.

He is now preparing for the Ironman in Hawaii at age 66.`,

    nutrition_guide_content_eight: `Medical AI takes a new leap in 2025: the latest predictive algorithm developed by Google Health and Stanford University reaches 97% accuracy in hypoglycemia prevention, with alerts up to 45 minutes in advance.

This next-gen AI analyzes over 150 biomarkers in real time:
- Micro-glycemic variations via ultra-sensitive sensors  
- Voice analysis and emotion recognition  
- Sleep patterns and stress signals  
- Weather data and geolocated activity  
- Food history via image recognition  

Deployed on 15,000 patients across 12 countries, the AI shows exceptional results:
- 97% predictive accuracy (vs 94% in 2024)  
- 82% reduction in severe hypoglycemia  
- Alerts up to 45 minutes ahead  
- Native integration with all glucose sensors  

"We are entering the era of total prevention," said Dr. Lisa Wang, director of Google Health Diabetes. "Severe hypoglycemia is becoming avoidable."

The Klukoo AI app will be the first to integrate this technology by September 2025, with CE and FDA certification.`,

    save: 'Save',
    fullSource: 'Full Source',
    all: 'All',
    newsSearchPlaceholder: 'Search news...',
  },

  adminDashboardScreen: {
    applicationApprovedTitle: 'Application approved!',
    applicationApprovedDescription:
      '{{firstName}} {{lastName}} has been approved',
    errorTitle: 'Error',
    applicationApproveError: 'Unable to approve application',
    applicationLoadError: 'Unable to load applications',
    reasonRequiredTitle: 'Reason required',
    reasonRequiredDescription: 'Please provide the reason for rejection',
    applicationRejectedTitle: 'Application rejected',
    applicationRejectedDescription:
      '{{firstName}} {{lastName}} has been rejected',
    applicationRejectError: 'Unable to reject application',
    statusPending: 'Pending',
    statusApproved: 'Approved',
    statusRejected: 'Rejected',
    adminTitle: '🏥 Klukoo Administration',
    adminSubtitle: 'Professional applications management',
    totalApplications: 'Total applications',
    searchPlaceholder: 'Search by name, email, or specialty...',
    allStatuses: 'All statuses',
    filterByStatus: 'Filter by status',
    noApplicationsFound: 'No applications found',
    tabDetails: 'Details',
    phoneLabel: 'Phone',
    licenseLabel: 'License',
    cityLabel: 'City',
    institutionLabel: 'Institution',
    notSpecified: 'Not specified',
    documentLabel: 'Document {{number}}',
    viewButton: 'View',
    noDocuments: 'No documents',
    rejectionReasonPlaceholder: 'Rejection reason (required)',
    applicationAlreadyProcessed: 'Application already processed',
    processedOn: 'Processed on {{date}}',
    selectApplication: 'Select an application',
    selectApplicationHint: 'to view details',
  },

  adminApplicationReview: {
    applicationApprovedTitle: 'Application approved!',
    applicationApprovedDescription:
      '{{firstName}} {{lastName}} has been approved',
    errorTitle: 'Error',
    applicationApproveError: 'Unable to approve application',
    reasonRequiredTitle: 'Reason required',
    reasonRequiredDescription: 'Please provide the reason for rejection',
    applicationRejectedTitle: 'Application rejected',
    applicationRejectedDescription:
      '{{firstName}} {{lastName}} has been rejected',
    applicationRejectError: 'Unable to reject application',
    loadingApplications: 'Loading applications...',
    adminApplicationsTitle: '🔧 Klukoo Admin - Applications',
    pendingApplications: '{{count}} application(s) pending review',
    refresh: 'Refresh',
    noPending: {
      title: 'No pending applications',
      description:
        'All applications have been processed. New applications will appear here automatically.',
    },
    refreshCheck: 'Check for new applications',
    rejectionReason: {
      title: 'Rejection reason',
      placeholder: 'Explain why this application is being rejected...',
    },
    actions: {
      confirmReject: 'Confirm rejection',
    },
    applications: {
      noSelectionTitle: 'No selection',
      noSelectionDescription:
        'Click on "Review" to see the details of an application',
    },
  },

  adminDashboard: {
    dashboard: {
      loadErrorTitle: 'Loading error',
      loadErrorDescription: 'Unable to load dashboard metrics.',
      loadingAdmin: 'Loading admin dashboard...',
    },
    title: '🔧 Klukoo Administration',
    subtitle: 'Healthcare professionals management',
    metrics: {
      paymentsThisMonth: 'Payments this month',
      activeProfessionals: 'Active professionals',
      monthlyConsultations: 'Consultations this month',
      pendingApplications: 'Pending applications',
    },
  },

  chatScreenFixes: {
    typingIndicator: '{{users}} typing...',
  },

  consultationRequestFixes: {
    errors: {
      loadProfessionals: 'Error loading professionals:',
      loadRequests: 'Error loading requests:',
      professionalNotFound: 'Professional not found',
      sendRequestConsole: 'Error sending request:',
      sendRequestToastTitle: 'Error',
      sendRequestToastDescription: 'Unable to send request',
    },
    fieldsRequiredTitle: 'Required fields',
    fieldsRequiredDescription:
      'Please select a professional and a consultation reason.',
    requestSentTitle: 'Request sent!',
    requestSentDescription:
      'The professional will receive a notification and reply soon.',
    status: {
      pending: 'Pending',
      accepted: 'Accepted',
      rejected: 'Rejected',
      completed: 'Completed',
    },
    professionals: {
      endocrinologist: 'Endocrinologist',
      general_practitioner: 'General Practitioner',
      psychologist: 'Psychologist',
      nurse: 'Nurse',
      nutritionist: 'Nutritionist',
    },
    consultationFee: 'Consultation fee',
    monthlyPackagePercentage: '({percentage}% of monthly package)',
    consultation: {
      button: 'Send',
      sending: 'Sending...',
      request: {
        title: 'My consultation requests',
        subtitle: 'Track all your consultation requests here',
        reason: 'Reason:',
        requestedOn: 'Requested on:',
        professionalResponse: "Professional's response:",
        join: 'Join',
      },
    },
  },

  doctorDashboard: {
    consultationReasonDefault: 'Diabetes follow-up consultation',
    consultationAcceptedTitle: 'Consultation accepted',
    consultationAcceptedDescription:
      'The consultation has been confirmed. The patient will be notified.',
    errors: {
      acceptConsultationTitle: 'Error',
      acceptConsultationDescription: 'Unable to accept consultation.',
      declineConsultationTitle: 'Error',
      declineConsultationDescription: 'Unable to decline consultation.',
    },
    consultationDeclinedTitle: 'Consultation declined',
    consultationDeclinedDescription:
      'The consultation has been canceled. The patient will be notified.',
    statusToggle: {
      onlineTitle: 'You are now online',
      onlineDescription: 'You can receive new consultations',
      offlineTitle: 'You are now offline',
      offlineDescription: 'You will no longer receive new requests',
    },
    dashboard: {
      loading: 'Loading dashboard...',
    },
    doctor: {
      title: 'Dr. Mamadou Kane',
      subtitle: 'Endocrinologist • Klukoo Pro',
    },
    earningsToday: "Today's earnings",
    statusButton: {
      online: '🟢 Online',
      offline: '🔴 Offline',
    },
    settingsButton: 'Settings',
    stats: {
      pendingPatients: 'Pending patients',
      monthlyRevenue: 'Revenue this month',
      todayConsultations: "Today's consultations",
      averageConsultationTime: 'Average consultation time',
    },
    pendingConsultations: 'Pending consultations',
    pendingBadge: '{{count}} pending',
    noPendingConsultations: 'No pending consultations',
    newRequestsInfo: 'New requests will appear here',
  },

  healthProfessionalScreen: {
    acceptanceRequiredTitle: 'Acceptance Required',
    acceptanceRequiredDescription:
      'You must accept the terms of use and the code of ethics',
    registration: {
      submittedTitle: 'Registration Submitted',
      submittedDescription:
        'Your registration request will be reviewed within 24h',
      accessDeniedTitle: 'Access Denied',
      accessDeniedDescription:
        'Acceptance of the Klukoo code of ethics is mandatory',
    },
    teleconsultation: {
      startedTitle: 'Teleconsultation Initiated',
      startedDescription: 'Connecting with patient in progress...',
    },
    consultationTypes: {
      diabetesFollowUp: 'Diabetes Follow-up',
      urgentConsultation: 'Urgent Consultation',
      bloodSugarCheck: 'Blood Sugar Check',
    },
    consultationStatuses: {
      pending: 'Pending',
      inProgress: 'In Progress',
      scheduled: 'Scheduled',
    },
    professionalPortal: {
      title: 'Klukoo Professional Portal',
      description:
        'Join our network of healthcare professionals and provide specialized diabetes teleconsultations',
    },
    formLabels: {
      firstName: 'First Name *',
      lastName: 'Last Name *',
      specialty: 'Specialty *',
      specialtyPlaceholder: 'Select your specialty',

      specialties: {
        endocrinologist: 'Endocrinologist',
        generalPractitioner: 'General Practitioner',
        diabetologist: 'Diabetologist',
        nutritionist: 'Nutritionist',
        diabetesNurse: 'Diabetes Nurse',
      },
      license: 'CNI Number *',
      licensePlaceholder: 'Ex: A1234567890',
      hospital: 'Institution',
      hospitalPlaceholder: 'Hospital or clinic',
      email: 'Professional Email *',
      phone: 'Phone *',
      terms: 'I accept the terms of use',
      charter: 'I accept the Klukoo code of ethics (mandatory)',
      submitApplication: 'Submit my application',
    },
    professionalBenefits: {
      title: 'Professional Benefits:',
      list: {
        one: '• 500 FCFA per teleconsultation',
        two: '• Automatic monthly payment',
        three: '• Secure and certified platform',
        four: '• Access to real-time glucose data',
        five: '• 24/7 technical support',
      },
    },
    professionalInfo: {
      verified: 'Verified',
      endocrinologist: 'Endocrinologist',
    },
    tabs: {
      overview: 'Overview',
      consultations: 'Consultations',
      earnings: 'Earnings',
      patients: 'Patients',
      access_codes: 'Access Codes',
      settings: 'Settings',
    },
    labels: {
      patients_tracked: 'Patients Tracked',
      today_consultations: "Today's Consultations",
      today_earnings: "Today's Earnings",
      average_rating: 'Average Rating',
      upcoming_consultations: 'Upcoming Consultations',
    },
    consultation: {
      status: {
        en_cours: 'In Progress',
        terminée: 'Completed',
        annulée: 'Cancelled',
      },
    },
    dashboard: {
      consultations_management: {
        title: 'Consultation Management',
        description:
          'Schedule and manage your teleconsultations with Klukoo patients',
        available_slots: 'Available Slots',
        manage_slots: 'Manage My Slots',
      },
      free_slots: {
        title: 'Free Slots',
        subtitle: 'This week',
      },
      scheduled_consultations: {
        title: 'Scheduled Consultations',
        subtitle: 'This week',
      },
      earnings: {
        detailed_title: 'Detailed Earnings',
        today: 'Today',
        week: 'This week',
        month: 'This month',
        pending: 'Pending Payment',
      },
      auto_payments: {
        title: 'Automatic Payments',
        description: 'Your earnings are automatically transferred each month',
        last_transfer: 'Last Transfer',
        next_transfer: 'Next Transfer',
        january: 'January',
      },
      patients: {
        title: 'My Patients',
        description: 'Monitoring of diabetic patients assigned to you',
        type: 'Diabetes Type',
        lastGlucose: 'Last Glucose',
        record: 'Record',
        contact: 'Contact',
      },
    },
    dialog: {
      codeOfConduct: {
        title: 'Klukoo Code of Ethics',
        description:
          'Please read carefully and accept our code of ethics to join Klukoo',
      },
    },
    codeOfConductFull: `
Article 1 - Professional Commitment
The healthcare professional agrees to respect the ethical principles of their profession and to keep their skills up to date in the field of diabetes.

Article 2 - Quality of Care
All care provided via Klukoo must meet the highest quality standards. The professional commits to providing complete consultations tailored to the specific needs of each diabetic patient.

Article 3 - Confidentiality and Data Protection
The professional commits to strictly respecting patient data confidentiality and never disclosing medical information without express authorization. All data is protected under GDPR standards.

Article 4 - Availability and Punctuality
The professional commits to respecting their consultation slots and being punctual. In case of impediment, they must notify at least 2 hours in advance.

Article 5 - Medical Responsibility
The professional remains fully responsible for their medical actions and diagnoses. Klukoo only provides the technological platform; medical responsibility lies entirely with the healthcare professional.

Article 6 - Continuing Education
The professional commits to participating in Klukoo-provided training and keeping their knowledge up to date with new practices in diabetology.

Article 7 - Sanctions
Failure to comply with this charter may result in temporary or permanent suspension of access to the Klukoo platform, without notice or compensation.
`,
  },
  charterFooter: {
    note: 'By accepting this charter, you confirm that you have read, understood, and agree to comply with all the articles above.',
    buttons: {
      decline: 'Decline',
      accept: 'Accept and Continue',
    },
  },

  healthProfessionalSignupScreen: {
    professionals: {
      endocrinologist: {
        name: 'Endocrinologist',
        rate: '630 F CFA/consultation (35%)',
        description: 'Diabetes and hormone specialist',
      },
      general_practitioner: {
        name: 'General Practitioner',
        rate: '520 F CFA/consultation (29%)',
        description: 'General medicine with a focus on diabetes',
      },
      psychologist: {
        name: 'Psychologist',
        rate: '430 F CFA/session (24%)',
        description: 'Psychological support for diabetes',
      },
      nurse: {
        name: 'Nurse',
        rate: '120 F CFA/follow-up (7%)',
        description: 'Therapeutic education and follow-up',
      },
      nutritionist: {
        name: 'Nutritionist',
        rate: '100 F CFA/consultation (5%)',
        description: 'Personalized dietary advice',
      },
    },
    toastMissingFields: {
      title: 'Missing Required Fields',
      description: 'Please fill in all required fields.',
    },
    toastApplicationSubmitted: {
      title: 'Application Submitted!',
      description:
        'Your application has been sent for review. You will receive a response within 24-48h.',
    },
    toastSubmissionError: {
      title: 'Error',
      description: 'An error occurred during submission.',
      variant: 'destructive',
    },
    professionalPortal: {
      title: '🏥 Klukoo Pro - Healthcare Professionals',
      subtitle:
        'Join the Klukoo network and monetize your telemedicine consultations',
      benefits: {
        freeRegistration: 'Free Registration',
        validatedWithin48h: 'Validated within 48h',
        securePayment: 'Secure Payment',
      },
    },
    registrationSteps: {
      step1: {
        title: '1. Select your specialty',
        description: 'Choose the specialty that matches your expertise',
      },
      step2: {
        title: '2. Professional Information - {{name}}',
        description: 'Provide your professional information for verification',
        firstName: 'First Name *',
        firstNamePlaceholder: 'Your first name',
        lastName: 'Last Name *',
        lastNamePlaceholder: 'Your last name',
        email: 'Professional Email *',
        emailPlaceholder: 'professional@hospital.com',
        phone: 'Phone',
        phonePlaceholder: '+221 XX XXX XX XX',
        licenseNumber: 'License/Order Number *',
        licenseNumberPlaceholder: 'Registration number with the order',
        institution: 'Institution/Hospital',
        institutionPlaceholder: 'Your institution name',
        city: 'City',
        cityPlaceholder: 'Dakar, Thiès, etc.',
        country: 'Country',
        countryPlaceholder: 'Select your country',
        countries: {
          senegal: 'Senegal',
          mali: 'Mali',
          burkina: 'Burkina Faso',
          cote_ivoire: 'Ivory Coast',
          guinea: 'Guinea',
          mauritania: 'Mauritania',
        },
        experience: 'Years of Experience',
        experiencePlaceholder: 'Select your experience',
        experienceOptions: {
          '0-2': '0-2 years',
          '3-5': '3-5 years',
          '6-10': '6-10 years',
          '11-15': '11-15 years',
          '15+': 'More than 15 years',
        },
        biography: 'Professional Biography',
        biographyPlaceholder:
          'Describe your background and expertise in the field of diabetes...',
      },
      step3: {
        title: 'Supporting Documents',
        description:
          'Upload your documents for verification (diplomas, licenses, CV)',
        selectedDocuments: 'Selected Documents',
      },
    },
    dareProCompensation: {
      title: 'New Compensation System (1800 F/patient/month):',
      endocrinologue: 'Endocrinologist: 630 F (35%)',
      medecinGeneraliste: 'General Practitioner: 520 F (29%)',
      psychologue: 'Psychologist: 430 F (24%)',
      infirmier: 'Nurse: 120 F (7%)',
      nutritionniste: 'Nutritionist: 100 F (5%)',
      paiementsAutomatiques: 'Automatic Monthly Payments',
    },
    applicationForm: {
      submitButton: {
        default: 'Submit my application',
        loading: 'Submitting...',
      },
      disclaimer:
        'By submitting this application, you agree to our terms of use and privacy policy.',
    },
  },

  patientAccessScreen: {
    status: {
      pending: 'Pending',
      approved: 'Approved',
      denied: 'Denied',
      expired: 'Expired',
      default: '{{status}}',
    },
    loading: {
      accessRequests: 'Loading access requests...',
    },
    access: {
      title: 'Professional Access',
      subtitle: 'Manage requests to access your medical data',
      refresh: 'Refresh',
      history: '📋 Access History',
      emptyHistory: 'No access history for now',
      requestedOn: 'Requested on:',
      respondedOn: 'Responded on:',
      authorizedData: 'Authorized data:',
      noRequestTitle: 'No access requests',
      noRequestDescription:
        'Healthcare professionals can request access to your medical data. You will receive a notification for each request.',
    },
    requests: {
      pending: '⏳ Pending requests ({{count}})',
    },
  },

  paymentScreen: {
    subscription: {
      defaultDescription: 'Monthly Klukoo Premium Subscription',
      period: 'Period',
      oneMonth: '1 month',
    },
    toasts: {
      missingInfo: {
        title: 'Missing Information',
        description: 'Please fill in all required fields',
      },
    },
    payment: {
      simulationLog: 'Flutterwave Payment Simulation:',
      simulationError: 'Payment failure simulation',
      toastErrorTitle: 'Payment Failed (Test)',
      toastErrorDescription: 'Payment failure simulation. Please retry.',
      secure: 'Secure Payment',
      perMonth: 'per month',
      infoTitle: 'Payment Information',
      secureInfo: 'Secure payment via Flutterwave',
      fullNameLabel: 'Full Name *',
      fullNamePlaceholder: 'Your full name',
      secureByFlutterwave: 'Secure payment by Flutterwave',
      processing: 'Processing...',
      pay: 'Pay {{amount}}',
    },
    paymentSuccess: {
      title: 'Payment Confirmed!',
      welcome: 'Welcome to Klukoo Premium. Your subscription is now active.',
      activated: 'Klukoo Premium Activated',
      access: 'Full access to all features',
    },
    form: {
      emailLabel: 'Email Address *',
      phoneLabel: 'Phone Number *',
    },
    paymentMethods: {
      title: 'Accepted Payment Methods',
      mobileMoney: '📱 Mobile Money (MTN, Airtel, M-Pesa, etc.)',
      cardPayments: '💳 Card Payments (Visa, Mastercard, Verve)',
      bankTransfers: '🏦 Bank Transfers',
      ussd: '🔢 USSD',
      barter: '💲 Barter by Flutterwave',
      paypal: '🌍 PayPal (via Flutterwave)',
    },
    subscriptionInfo: {
      securePayment: 'Secure payment • Cancel anytime',
      support: 'Technical support included',
    },
    localCurrency: 'Local Currency',
  },

  paymentSuccess: {
    toast: {
      paymentConfirmed: {
        title: 'Payment Confirmed!',
        description: 'Your Klukoo subscription is now active (Test Mode).',
      },
      copyCode: {
        title: 'Code Copied!',
        description: 'The patient code {{code}} has been copied to clipboard.',
      },
    },
    errors: {
      missingSessionId: 'Missing Session ID',
    },
    payment: {
      successTitle: 'Payment Confirmed!',
      successDescription: 'Your Klukoo subscription is now active.',
      verifyError: 'Payment verification failed',
      verifyErrorToast: 'Unable to verify payment',
      verifying: 'Verifying payment...',
      errorTitle: 'Payment Error',
      backToAuth: 'Back to Authentication',
      errorMessage: '{{error}}',
      successMessage:
        'Congratulations! Your Klukoo subscription is now active.',
    },
    patient: {
      codeTitle: 'Your Klukoo Patient Code',
      codeUsage:
        'Use this code to access your features and share it with your family',
    },
    subscription: {
      status: 'Subscription Status',
      active: 'Active',
    },
    account: {
      email: 'Account Email',
    },
    billing: {
      next: 'Next Billing',
    },
    benefits: {
      title: '🎉 Your Klukoo Benefits',
      list: {
        fullAccess: 'Full access to all Klukoo features',
        consultations: '10 teleconsultations per month',
        chatNews: 'Klukoo Chat and Klukoo News',
        alerts: 'Personalized alerts and glucose monitoring',
      },
    },
    confirmationEmail: {
      title: 'Confirmation Email Sent',
      message:
        'An email with your patient code and all important information has been sent to {{email}}',
    },
    buttons: {
      completeProfile: 'Complete My Profile',
      accessApp: 'Access Klukoo',
    },
  },

  predictiveAlertsScreen: {
    aiSystem: {
      title: 'Predictive AI System',
      subtitle: 'Artificial Intelligence • Machine Learning • Real-Time Alerts',
    },
    aiFeatures: {
      multiFactorAnalysis: {
        title: 'Multi-Factor Analysis',
        description: 'Glucose, Meals, Insulin, Age, Activities',
      },
      predictiveAI: {
        title: 'Predictive AI',
        description: 'Early risk detection',
      },
      familyAlerts: {
        title: 'Family Alerts',
        description: 'Simultaneous notifications',
      },
    },
  },

  professionalMainDashboard: {
    errorLoadingHistory: 'Error loading history',
    codeRequired: '⚠️ Code required',
    patientCodeRequired: 'Please enter a patient code',
    accessAuthorized: '✅ Access authorized',
    accessGranted: 'Data for {{firstName}} {{lastName}} accessible',
    accessDenied: '❌ Access denied',
    accessDeniedDescription:
      '{{error}} or invalid patient code or unauthorized access',
    patientAccessError: 'Patient access error:',
    noPatientSelectedTitle: '❌ Error',
    noPatientSelectedDescription: 'No patient selected',
    consultationStartedTitle: '🩺 Consultation Started',
    consultationStartedDescription:
      'Consultation with {{firstName}} {{lastName}}',
    consultationStartErrorTitle: '❌ Error',
    consultationStartErrorDescription: 'Unable to start consultation',
    consultationStartError: 'Consultation start error: {{error}}',
    verifiedStatus: '🟢 Verified',
    validity: 'Validity: {{date}}',
    patientDataAccess: '🔍 Patient Data Access',
    patientCode: 'Klukoo Patient Code',
    access: 'Access',
    scan_qr_code: 'Scan Patient QR Code',
    last_glucose: 'Last Glucose',
    remaining_consultations: 'Remaining Consultations',
    start_consultation: 'Start Consultation',
    close_access: 'Close Access',
    consultation_notes: 'Consultation Notes',
    consultation_notes_placeholder: 'Enter your observations...',
    status: {
      completed: '✅ Completed',
      started: '🔄 In Progress',
      pending: '⏳ Pending',
    },
    recentAccess: {
      title: '📋 Recent Access',
      refresh: '🔄 Refresh',
      duration: 'Duration: {{minutes}} min',
      none: 'No recent access',
      info: 'Your consultations will appear here',
    },
  },

  professionalRegistrationScreen: {
    profession: {
      endocrinologist: 'Endocrinologist',
      general_practitioner: 'General Practitioner',
      diabetologist: 'Diabetologist',
      nutritionist: 'Nutritionist',
      nurse: 'Specialized Nurse',
      pharmacist: 'Pharmacist',
      psychologist: 'Psychologist',
      podiatrist: 'Podiatrist',
    },
    toast: {
      required_field_title: 'Required field',
      required_field_description: 'Please fill in the field: {{field}}',
      required_documents_title: 'Required documents',
      required_documents_description:
        'Please add at least one supporting document',
      application_submitted_title: 'Application submitted!',
      application_submitted_description:
        'Your application has been successfully sent',
      error: 'Submission error:',
    },
    application: {
      submitted_success: '🎉 Application successfully submitted!',
      reference: 'Reference number:',
      nextSteps: {
        title: '⏰ Next steps:',
        review: {
          title: 'Review of your file',
          description: 'Our team will verify your qualifications (48-72h)',
        },
        documents: {
          title: 'Document verification',
          description: 'Checking your certifications',
        },
        emailNotification: {
          title: 'Email notification',
          description: 'You will receive our decision',
        },
        accountActivation: {
          title: 'Account activation',
          description: 'If approved, you will receive your access codes',
        },
      },
      submitting: '📤 Sending...',
      submit: '🚀 Submit my application',
    },
    registration: {
      confirmationEmail: 'A confirmation email has been sent to {{email}}',
    },
    buttons: {
      backToHome: 'Back to home',
      login: 'Login',
    },
    apply: {
      title: 'Klukoo Pro Application',
      subtitle: 'Join the diabetes consultation platform',
    },
    personalInfo: {
      title: 'Personal Information',
      firstNameLabel: 'First name *',
      firstNamePlaceholder: 'Your first name',
      lastNameLabel: 'Last name *',
      lastNamePlaceholder: 'Your last name',
      emailLabel: 'Professional email *',
      phoneLabel: 'Phone *',
    },
    professionalInfo: {
      header: 'Professional Information',
      typeLabel: 'Type of professional *',
      typePlaceholder: 'Select your specialty',
      licenseLabel: 'License number *',
      licensePlaceholder: 'Registration number with the board',
      institutionLabel: 'Institution / Hospital',
      institutionPlaceholder: 'Name of your establishment',
    },
    professionalTypes: {
      endocrinologist: 'Endocrinologist',
      general_practitioner: 'General Practitioner',
      diabetologist: 'Diabetologist',
      nutritionist: 'Nutritionist',
      nurse: 'Specialized Nurse',
      pharmacist: 'Pharmacist',
      psychologist: 'Psychologist',
      podiatrist: 'Podiatrist',
    },
    location: {
      header: 'Location',
      countryLabel: 'Country *',
      countryPlaceholder: 'Select your country',
      cityLabel: 'City *',
      cityPlaceholder: 'Your practice city',
    },
    documents: {
      title: 'Supporting documents',
    },
    terms: {
      title: 'Terms of use',
      agreement:
        'By submitting this application, you agree to the Klukoo platform terms of use and commit to respecting the professional and ethical charter.',
      privacy:
        'Your personal data will be processed in accordance with our privacy policy.',
    },
  },

  professionalRequestDashboard: {
    requests: {
      accepted: 'Request accepted',
      rejected: 'Request rejected',
      rescheduled: 'New date proposed',
      new_slot: 'New slot: {{date}} at {{time}}',
    },
  },

  remindersScreen: {
    status: {
      upcoming: 'Upcoming',
    },
    reminder: {
      delete_confirmation: 'Are you sure you want to delete this reminder?',
      upcoming: 'Upcoming reminders ',
      today: 'Today ',
      markDone: 'Done',
    },
  },

  teleconsultationBooking: {
    toast: {
      missing_info: {
        title: 'Missing information',
        description: 'Please select a professional, a date, and a time.',
      },
      consultation_booked: {
        title: 'Consultation booked!',
        description:
          'Your consultation with {{firstName}} {{lastName}} is confirmed for {{date}} at {{time}}.',
      },
      booking_error: {
        title: 'Booking error',
        description: 'An error occurred while booking.',
      },
    },
    professions: {
      endocrinologist: 'Endocrinologist',
      psychologist: 'Psychologist',
      nutritionist: 'Nutritionist',
      nurse: 'Nurse',
      diabetologist: 'Diabetologist',
      general_practitioner: 'General Practitioner',
    },
    teleconsultation_title: 'Teleconsultation',
    teleconsultation_description:
      'Book a consultation with a healthcare professional specialized in diabetes',
    search_filters: 'Search filters',
    search_label: 'Search',
    specialty_label: 'Specialty',
    all_specialties: 'All specialties',
    endocrinologist: 'Endocrinologist',
    diabetologist: 'Diabetologist',
    nutritionist: 'Nutritionist',
    psychologist: 'Psychologist',
    nurse: 'Nurse',
    general_practitioner: 'General Practitioner',
    city_label: 'City',
    city_placeholder: 'Dakar, Thiès...',
    available_professionals: 'Available professionals',
    next_slot: 'Next slot:',
    book_consultation: 'Book a consultation',
    select_professional: 'Select a professional to book',
    consultation_date_label: 'Consultation date',
    available_time_slots: 'Available time slots',
    summary: 'Summary',
    professional_label: 'Professional',
    date_label: 'Date',
    time_label: 'Time',
    rate_label: 'Rate',
    booking_loading: 'Booking...',
    book_and_pay: 'Book and pay',
  },

  teleconsultationInterface: {
    patient_message_thanks: 'Thank you doctor, I feel better today.',
    consultation_completed_title: 'Consultation completed',
    consultation_completed_description: '{amount} F CFA added to your earnings',
    consultation_extended_title: 'Consultation extended',
    consultation_extended_description: '15 extra minutes added (+250 F CFA)',
    audio_enabled: 'Audio enabled',
    audio_disabled: 'Audio disabled',
    video_enabled: 'Video enabled',
    video_disabled: 'Video disabled',
    prescription_title: 'Prescription',
    prescription_description: 'Prescription module under development',
    consultation_with: 'Consultation with',
    started_since: 'Started since',
    audio_button: 'Audio',
    video_button: 'Video',
    prescribe_button: 'Prescribe',
    consultation_notes_title: 'Consultation notes',
    consultation_notes_placeholder:
      'Note your observations, diagnoses, recommendations...',
    end_consultation_button: 'End Consultation ({amount} F CFA added)',
    extend_consultation_button: 'Extend (+250 F)',
  },

  activityModal: {
    activity_walking: 'Walking',
    activity_running: 'Running/Jogging',
    activity_cycling: 'Cycling',
    activity_dancing: 'Dancing',
    activity_weightlifting: 'Weightlifting',
    activity_swimming: 'Swimming',
    intensity_light: 'Light',
    intensity_moderate: 'Moderate',
    intensity_intense: 'Intense',
    activity_type_error_title: 'Error',
    activity_type_error_description: 'Please select an activity type',
    activity_saved_title: 'Activity saved',
    activity_saved_description:
      '{activityName} ({duration}min, {intensity}) added to log',
    save_activity: 'Save Physical Activity',
    activity_type_label: 'Activity type',
    activity_type_placeholder: 'Select an activity',
    duration_label: 'Duration: {duration} minutes',
    duration_min: '15 min',
    duration_max: '120 min',
    intensity_label: 'Intensity: {intensity}',
    estimation_title: 'Estimation',
    estimation_duration: 'Duration:',
    estimation_intensity: 'Intensity:',
    estimation_calories: 'Estimated calories burned:',
    cancel_button: 'Cancel',
    save_button: 'Save',
  },

  addGlucoseModal: {
    blood_sugar_error_title: 'Error',
    blood_sugar_error_description: 'Please enter a blood sugar value',
    context_fasting: 'Fasting',
    context_before_meal: 'Before meal',
    context_after_meal_1h: 'After meal (1h)',
    context_after_meal_2h: 'After meal (2h)',
    context_bedtime: 'Before bedtime',
    context_night: 'Nighttime',
    new_blood_sugar_measure: 'New Blood Sugar Measurement',
    glucose_label: 'Blood sugar value (mg/dL)',
    glucose_placeholder: 'Ex: 120',
    measurement_time_label: 'Measurement time',
    time_now: 'Now',
    time_custom: 'Custom time',
    measurement_context_label: 'Measurement context',
    notes_label: 'Notes (optional)',
    notes_placeholder: 'Add your observations...',
    cancel_button: 'Cancel',
    save_button: 'Save',
  },

  barcodeScanModal: {
    camera_prompt_header: 'Scan the barcode',
    camera_prompt_photo: 'Take a photo',
    camera_prompt_gallery: 'Choose from gallery',
    food_name_apple: 'Golden Apple - 1 medium unit',
    barcode_scanned_title: 'Barcode scanned',
    barcode_scanned_description: 'Product: {productName}',
    barcode_scan_error_title: 'Error',
    barcode_scan_error_description: 'Unable to scan the barcode',
    scan_error_log: 'Error during scan:',
    scanner_modal_title: '📱 Barcode Scanner',
    scanner_button_scanning: 'Scanning...',
    scanner_button_start: 'Start scan',
    scanner_detected_label: 'Barcode detected:',
    food_found_title: 'Product found:',
    food_name_label: 'Name:',
    food_carbs_label: 'Carbohydrates:',
    add_to_journal_button: 'Add to journal',
    manual_code_label: 'Or enter the code manually:',
    manual_code_placeholder: 'Ex: 1234567890123',
  },

  completeMealModal: {
    painDeMieComplet: 'Whole wheat bread',
    yaourtNature: 'Plain yogurt',
    toast: {
      barcodeScanned: 'Barcode scanned ✓',
      productAdded: '{{product}} successfully added',
      scanErrorTitle: 'Error',
      scanErrorDescription: 'Unable to scan the barcode',
      productFoundTitle: 'Product found',
      productFoundDescription: '{{product}} added',
      productNotFoundTitle: 'Product not found',
      productNotFoundDescription: 'Unrecognized barcode',
      apiErrorTitle: 'Error',
      apiErrorDescription: 'Unable to fetch information',
      photoErrorTitle: 'Error',
      photoErrorDescription: 'Unable to capture photo',
      imageAnalyzed: {
        title: 'Image analyzed by AI ✓',
        description: '{{meal}} detected',
      },
      formError: {
        title: 'Error',
        description: 'Please fill in all required fields',
      },
      mealSaved: {
        title: 'Meal saved',
        description: '{{meal}} - {{carbs}}g carbs',
      },
    },
    product: {
      unknown: 'Unknown product',
    },
    mealTypes: {
      saladeCesar: 'Caesar Salad',
      patesBolognaise: 'Spaghetti Bolognese',
      sandwichJambon: 'Ham Sandwich',
      rizLegumes: 'Rice with vegetables',
      pizzaMargherita: 'Margherita Pizza',
    },
    headings: {
      mealJournal: '🍽️ Meal Journal',
      scanBarcode: 'Scan Barcode',
      takePhoto: 'Take a Photo',
      manualEntry: 'Manual Entry',
    },
    texts: {
      addMealQuestion: 'How would you like to add your meal?',
      scanSimulation: 'Product scan simulation',
      mealAiAnalysis: 'AI meal analysis',
      enterInformation: 'Enter the information',
    },
    images: {
      meal: 'Meal',
    },
    form: {
      mealName: {
        label: 'Meal name',
        placeholder: 'Ex: Caesar Salad',
      },
      mealTime: {
        label: 'Meal time',
        placeholder: 'Select',
        options: {
          breakfast: 'Breakfast',
          lunch: 'Lunch',
          snack: 'Snack',
          dinner: 'Dinner',
        },
      },
    },
    nutrition: {
      title: 'Nutritional values (for {{portion}}g)',
      fields: {
        carbs: 'Carbohydrates (g)',
        calories: 'Calories',
      },
      carbsEvaluation: {
        title: 'Carbohydrate Evaluation:',
        impact: 'Moderate impact on blood sugar',
      },
    },
    buttons: {
      back: 'Back',
      save: 'Save',
    },
    loading: {
      scannerInit: {
        main: 'Initializing scanner...',
        sub: 'Searching in database',
      },
      aiAnalysis: {
        main: 'AI analysis in progress...',
        sub: 'Identifying foods',
      },
      processing: {
        main: 'Processing...',
        sub: 'Please wait',
      },
    },
  },

  createReminderModal: {
    reminders: {
      types: {
        insulin: {
          label: 'Insulin',
          description: 'Insulin injection',
        },
        medication: {
          label: 'Medication',
          description: 'Take medication',
        },
        glucose_test: {
          label: 'Blood sugar test',
          description: 'Blood sugar measurement',
        },
        meal: {
          label: 'Meal',
          description: 'Meal reminder',
        },
        activity: {
          label: 'Activity',
          description: 'Physical exercise',
        },
      },
    },
    days: {
      '1': { label: 'Monday', short: 'Mon' },
      '2': { label: 'Tuesday', short: 'Tue' },
      '3': { label: 'Wednesday', short: 'Wed' },
      '4': { label: 'Thursday', short: 'Thu' },
      '5': { label: 'Friday', short: 'Fri' },
      '6': { label: 'Saturday', short: 'Sat' },
      '7': { label: 'Sunday', short: 'Sun' },
    },
    placeholders: {
      selectType: 'Select a type',
      reminderTitle: 'Ex: Humalog before lunch',
    },
    form: {
      description: {
        label: 'Description (optional)',
        placeholder: 'Additional information...',
      },
      time: 'Time',
      unit: 'Unit',
      units: {
        ui: 'IU',
        ml: 'mL',
        mg: 'mg',
        g: 'g',
        tablet: 'tablet(s)',
        capsule: 'capsule(s)',
      },
      repeatDays: 'Repeat days',
      repeatOptions: {
        all: 'Every day',
        weekdays: 'Mon-Fri',
        weekends: 'Weekend',
      },
    },
    buttons: {
      cancel: 'Cancel',
      create: 'Create',
      edit: 'Edit',
    },
    reminderType: 'Reminder Type',
    title: 'Title',
    reminder: {
      new: 'New Reminder',
      edit: 'Edit Reminder',
    },
  },

  injectionInsulinModal: {
    toast: {
      error: 'Error',
      fillRequired: 'Please fill in all required fields',
      injectionSaved: 'Injection saved',
      injectionDescription: '{{insulinType}} {{dose}}IU injected',
    },
    insulin: {
      newInjection: 'New Insulin Injection',
      types: {
        lantus: 'Lantus (long-acting insulin)',
        humalog: 'Humalog (fast-acting)',
        novolog: 'NovoLog (fast-acting)',
        levemir: 'Levemir (long-acting)',
        tresiba: 'Tresiba (ultra-long acting)',
        other: 'Other',
      },
      sites: {
        abdomen: 'Abdomen',
        thigh: 'Thigh',
        arm: 'Arm',
        buttock: 'Buttock',
      },
      typeLabel: 'Insulin type *',
      typePlaceholder: 'Select insulin type',
      injectionTimeLabel: 'Injection time',
      timeOptions: {
        now: 'Now',
        custom: 'Custom time',
      },
    },
    form: {
      notes: {
        label: 'Notes (optional)',
        placeholder: 'Observations, site rotation, etc...',
      },
    },
    buttons: {
      cancel: 'Cancel',
      save: 'Save',
    },
  },

  medicationModal: {
    medication: {
      injectionDone: 'Injection completed',
      injectionSiteLabel: 'Injection site',
      timeLabel: 'Administration time',
      typeLabel: 'Medication type',
      typePlaceholder: 'Select a medication',
      logTitle: 'Record Medication Intake',
      options: {
        lantus: 'Lantus (long-acting insulin)',
        humalog: 'Humalog (fast-acting insulin)',
        novorapid: 'NovoRapid (fast-acting insulin)',
        metformine: 'Metformin',
        other: 'Other medication',
      },
      units: {
        ui: 'IU',
        mg: 'mg',
      },
      sites: {
        arm: 'Arm',
        thigh: 'Thigh',
        abdomen: 'Abdomen',
      },
    },
    toast: {
      error: 'Error',
      fillRequiredFields: 'Please fill in all required fields',
      selectInjectionSite: 'Please select the injection site',
      medicationSaved: 'Medication saved',
      medicationSavedDescription:
        '{{medicationName}} ({{dose}}{{unit}}) added to log',
    },
    buttons: {
      cancel: 'Cancel',
      confirm: 'Confirm',
    },
  },

  photoAnalysisModal: {
    camera: {
      mealPhotoHeader: 'Meal photo',
      takePhoto: 'Take a photo',
      chooseFromGallery: 'Choose from gallery',
    },
    toast: {
      photoCaptured: 'Photo captured',
      photoCapturedDescription: 'You can now analyze this image',
      error: 'Error',
      photoCaptureFailed: 'Unable to take photo',
      analysisComplete: 'Analysis complete',
      analysisCompleteDescription: 'AI successfully analyzed your meal',
      analysisFailed: 'Unable to analyze the image',
    },
    console: {
      photoCaptureError: 'Error during photo capture:',
      console: {
        analysisError: 'Error during analysis:',
      },
    },
    ai: {
      analyzeFoodPrompt:
        'Analyze this food image and estimate:\n1. Main dish/food name\n2. Approximate carbs in grams\n3. A brief description of what you see\n\nRespond in JSON format: {"name": "dish name", "carbs": number, "analysis": "description"}',
      mockResult: {
        name: 'Plate of pasta with tomato sauce',
        carbs: 45,
        analysis:
          'I see a plate of pasta with tomato sauce. The portion looks about 100g of cooked pasta, roughly 45g carbs.',
      },
    },
    modal: {
      header: '📸 Photo + AI Analysis',
      instructions:
        'Take a photo of your meal so AI can estimate carbs automatically.',
      takePhoto: 'Take a photo',
      chooseFromGallery: 'Choose from gallery',
      change: 'Change',
      analyzeAI: '🤖 Analyze with AI',
      analyzing: 'Analyzing...',
      analysisResult: 'AI Analysis Result:',
      dishIdentified: 'Dish identified:',
      estimatedCarbs: 'Estimated carbs:',
      analysis: 'Analysis:',
      addToJournal: 'Add to journal',
    },
  },

  photoUploadModal: {
    profilePhoto: {
      title: 'Profile photo',
      description: 'Add or update your profile picture',
      choosePhoto: 'Choose a photo',
      removePhoto: 'Remove photo',
    },
    buttons: {
      cancel: 'Cancel',
      save: 'Save',
    },
  },

  scanMealModal: {
    toast: {
      productScanned: '✅ Product scanned',
      productDetected: '{{productName}} detected',
      mealSaved: '🍽️ Meal saved',
      mealSavedDescription: '{{food}} ({{carbs}}g carbs) added to log',
      productScanned1: 'Product successfully scanned',
    },
    food: {
      petitEcolierBiscuits: 'Lu Petit Écolier biscuits',
    },
    foods: {
      rice: 'Cooked white rice',
      bread: 'Sandwich bread',
      pasta: 'Cooked pasta',
      apple: 'Apple',
      banana: 'Banana',
      plainYogurt: 'Plain yogurt',
    },
    mealTimes: {
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      snack: 'Snack',
      dinner: 'Dinner',
    },
    dailyMealDialog: {
      title: '🍽️ Daily Meals',
      description: 'Easily track your carbs',
    },
    foodInfo: {
      industrialProducts: 'Industrial and packaged products',
      exactNutrition: '• Exact nutritional info',
    },
    searchFood: {
      title: '🔍 Search for Food',
      subtitle: 'Complete database',
      note: '• Fresh and cooked foods',
    },
    manualAdd: {
      title: '✏️ Add Manually',
      subtitle: 'Create your own entry',
      note: '• Custom recipes',
    },
    activeOptions: {
      barcode: 'Scan Barcode',
      search: 'Search Food',
      custom: 'Add Manually',
    },
    meal: {
      mealTimeLabel: '⏰ Meal time',
      consumedPortion: '⚖️ Consumed portion',
    },
    scanner: {
      scanning: 'Scanning...',
      positionBarcode: 'Position the barcode inside the frame',
    },
    search: {
      label: '🔍 Search food',
      placeholder: 'Ex: apple, rice, bread...',
    },
    popularFoods: {
      label: '💡 Popular foods',
    },
    manualFood: {
      nameLabel: '✏️ Food name',
      namePlaceholder: "Ex: Mom's cake, fruit salad...",
    },
    nutrition: {
      estimatedCarbs: 'Estimated carbs',
    },
    buttons: {
      cancel: 'Cancel',
      addToJournal: 'Add to log',
    },
  },

  simpleActivityModal: {
    toast: {
      error: 'Error',
      fillAllFields: 'Please fill in all fields',
      activitySaved: '{{activity}} for {{duration}} minutes',
    },
    activity: {
      header: '🏃 Physical Activity',
      typeLabel: 'Activity type',
      typePlaceholder: 'Select an activity',
      options: {
        walking: 'Walking',
        running: 'Running',
        cycling: 'Cycling',
        swimming: 'Swimming',
        strength: 'Strength training',
        other: 'Other',
      },
      durationLabel: 'Duration (minutes)',
    },
    buttons: {
      cancel: 'Cancel',
      save: 'Save',
    },
  },

  simpleGlucoseModal: {
    toast: {
      errorTitle: 'Error',
      invalidGlucose: 'Please enter a valid blood sugar value',
      glucoseAdded: 'Your blood sugar has been successfully recorded',
      glucoseAddedTitle: 'Measurement added',
    },
    glucose: {
      header: '📊 New Blood Sugar Measurement',
      label: 'Blood sugar (mg/dL)',
      notesPlaceholder: 'Comments...',
    },
    buttons: {
      cancel: 'Cancel',
      save: 'Save',
    },
  },

  simpleMealModal: {
    toast: {
      foodNameRequired: 'Please enter a food name',
      mealAdded: '{{foodName}} has been added to your log',
      mealAddedTitle: 'Meal added',
    },
    mealJournal: {
      header: '🍽️ Meal Journal',
    },
    food: {
      label: 'Food name',
      placeholder: 'Ex: Apple, Rice, Salad...',
    },
    nutrition: {
      carbsLabel: 'Carbohydrates (g) - optional',
      carbsPlaceholder: 'Ex: 25',
      cancel: 'Cancel',
      add: 'Add',
    },
  },

  simpleMedicationModal: {
    toast: {
      errorTitle: 'Error',
      errorFillFields: 'Please fill in all fields',
      medicationSavedTitle: 'Medication saved',
      medicationSavedDesc: '{{medication}} - {{dose}} units successfully taken',
    },
    medication: {
      recordHeader: '💊 Record Medication Intake',
      typeLabel: 'Medication type',
      placeholder: 'Select a medication',
      options: {
        fastInsulin: 'Fast-acting insulin',
        slowInsulin: 'Long-acting insulin',
        metformin: 'Metformin',
        other: 'Other',
      },
    },
    dose: {
      label: 'Dose (units)',
      placeholder: 'Ex: 5',
    },
    buttons: {
      cancel: 'Cancel',
      confirm: 'Confirm',
    },
  },

  weightModal: {
    weightModal: {
      invalidWeight: {
        title: 'Error',
        description: 'Please enter a valid weight (between 1 and 300 kg)',
      },
      success: {
        title: 'Weight Updated',
        description: 'Your weight has been recorded: {{weight}} kg',
      },
      title: 'Body Weight',
      description: 'Record your current weight for optimal tracking',
      inputLabel: 'Weight (kg)',
      placeholder: 'Ex: 75.5',
      tip: '💡 Tip: Always weigh yourself at the same time, preferably in the morning before eating, for consistent measurements.',
      cancel: 'Cancel',
      save: 'Save',
    },
  },

  actionsRapides: {
    toast: {
      error: {
        title: 'Error',
        description: 'Please enter a valid blood glucose value',
      },
    },
    errorAddGlucose: 'Error adding glucose:',
    toastErrorTitle: 'Error',
    toastErrorDescription: 'Unable to save your measurement',
    toastFoodNameError: 'Please enter a food name',
    toastMealAddedTitle: 'Meal added',
    toastMealAddedDescription: '{{foodName}} has been added to your log',
    toastMealAddError: 'Unable to add the meal',
    toastFillAllFields: 'Please fill in all fields',
    toastMedicationSavedTitle: 'Medication saved',
    toastMedicationSavedDescription:
      '{{medication}} - {{dose}} units taken successfully',
    toastMedicationAddError: 'Unable to add the medication',
    toastActivitySavedTitle: 'Activity saved',
    toastActivitySavedDescription: '{{activity}} for {{duration}} minutes',
    toastActivityAddError: 'Unable to add the activity',
    Actions: {
      button: 'Save',
    },
    loadingSave: 'Saving...',
    Journal: {
      button: 'Add meal',
    },
    loadingAdd: 'Adding...',
    Medication: {
      subtitle: 'Add medication',
      title2: 'Medication',
      select: {
        title: 'Select a medication',
        option: {
          one: 'Ultra-rapid insulin',
          two: 'Humalog',
          three: 'NovoRapid',
          four: 'Apidra',
          five: 'Fiasp',
          six: 'Rapid insulin',
          seven: 'Actrapid',
          eight: 'Humulin R',
          nine: 'Insuman Rapid',
          ten: 'Intermediate insulin',
          eleven: 'Insulatard',
          twelve: 'Humulin N',
          thirteen: 'Insuman Basal',
          fourteen: 'Long-acting insulin',
          fifteen: 'Lantus',
          sixteen: 'Levemir',
          seventeen: 'Toujeo',
          eighteen: 'Tresiba',
          nineteen: 'Abasaglar',
          twenty: 'Mixed insulin',
          twentyone: 'NovoMix',
          twentytwo: 'Humalog Mix',
          twentythree: 'Humulin Mix',
          twentyfour: 'Insuman Comb',
          twentyfive: 'Metformin',
          twentysix: 'Glucophage',
          twentyseven: 'Stagid',
          twentyeight: 'Gliclazide',
          twentynine: 'Diamicron',
          thirty: 'Victoza',
          thirtyone: 'Ozempic',
          thirtytwo: 'Trulicity',
          thirtythree: 'Januvia',
          thirtyfour: 'Forxiga',
          thirtyfive: 'Other',
        },
      },
      dose: 'Dose',
      unit: 'units',
      button: 'Save medication',
    },
    Food: {
      barcode: {
        title: 'Product added',
        description: '{{food}} - {{carbs}}g of carbs',
      },
      photo: {
        title: 'Analysis complete',
        description: '{{food}} - {{carbs}}g of estimated carbs',
      },
    },
    mealModal: {
      title: '🍽 Meal Journal',
      barcodeScan: 'Scan barcode',
      photoAI: 'Photo + AI',
      manualEntry: 'or manual entry',
      foodNameLabel: 'Food name',
      foodNamePlaceholder: 'e.g. Apple, Rice, Salad...',
      carbsLabel: 'Carbohydrates (g) - optional',
      carbsPlaceholder: 'e.g. 25',
      addButton: 'Add',
    },
  },

  adminTabs: {
    Applications: {
      status: {
        pending: 'Pending',
        approved: 'Approved',
        rejected: 'Rejected',
      },
      fields: {
        first_name: 'First name',
        last_name: 'Last name',
        email: 'Email',
        professional_type: 'Professional type',
        institution: 'Institution',
        license_number: 'License number',
        country: 'Country',
        city: 'City',
        created_at: 'Application date',
        documents: 'Documents',
      },
      institutions: {
        hopital_principal: 'Principal Hospital of Dakar',
        clinique_pasteur: 'Pasteur Clinic',
      },
      pendingTitle: 'Pending Applications',
      pendingCount: 'pending',
      none: 'No applications',
      noneDescription: 'New professional applications will appear here',
    },
    toast: {
      approved: {
        title: 'Application approved',
        description:
          'The professional has been approved and can now use Klukoo Pro.',
      },
      rejected: {
        title: 'Application rejected',
        description: 'The application has been rejected.',
      },
    },
    status: {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
    },
    Dashboard: {
      tabs: {
        applications: 'Applications',
        consultations: 'Consultations',
        payments: 'Payments',
        analytics: 'Analytics',
      },
    },
    Consultations: {
      recent: 'Recent Consultations',
    },
    Payments: {
      title: 'Payment Management',
      module: 'Payment Module',
      description: 'Manage payments to professionals and commissions',
    },
    Analytics: {
      title: 'Analytics',
      module: 'Analytics Dashboard',
      description: 'Detailed statistics and performance reports',
    },
  },

  applicationCardFixes: {
    Document: {
      title: 'Document',
      description: 'Viewing {{name}} - Feature in development',
      default: 'document',
    },
    Status: {
      approved: 'Approved',
      rejected: 'Rejected',
      pending: 'Pending',
    },
    Application: {
      specialty: 'Specialty',
      location: 'Location',
      institution: 'Institution',
      notSpecified: 'Not specified',
      license: 'License No.',
      email: 'Email',
      date: 'Application Date',
    },
    Actions: {
      reject: 'Reject',
      approve: 'Approve',
    },
    Documents: {
      title: 'Submitted Documents:',
      default: 'Document {{index}}',
      none: 'No document uploaded',
    },
  },

  autoMessageCard: {
    Badge: {
      sent: 'Sent',
    },
    Reactions: {
      label: 'Reactions',
    },
    Metadata: {
      source: 'Source',
      manual: 'Manual',
      automatic: 'Automatic',
      type: 'Type',
    },
    Actions: {
      resend: 'Resend',
    },
  },

  badgeDisplay: {
    Badges: {
      earnedOn: 'Earned on',
    },
  },

  chatInterface: {
    Consultation: {
      title: 'Consultation with {{name}}',
      startConversation: 'Start the conversation with your patient',
      suggestions: 'Starter suggestions:',
      messages: {
        feel: 'Hello, how are you feeling today?',
        concerns: 'Do you have any particular concerns?',
        glycemia: 'How have your blood sugar levels been recently?',
      },
    },
    Chat: {
      inputPlaceholder: 'Type your message...',
    },
  },

  communityChallengeCard: {
    Status: {
      completed: 'Completed',
      active: 'In progress',
      upcoming: 'Upcoming',
    },
    Challenge: {
      participants: '{{count}} participant',
      participants_plural: '{{count}} participants',
      goal: 'Goal: {{value}} {{unit}}',
      endsIn: 'Ends {{time}}',
      yourProgress: 'Your Progress',
      completed: 'Completed',
      finished: 'Challenge completed!',
      reward: 'Reward',
      join: 'Join the challenge',
      finishedMessage:
        'This challenge is completed. Stay tuned for upcoming challenges!',
    },
  },

  communityInsightDashboard: {
    Community: {
      insights: 'Community Insights',
      anonymizedData: 'Anonymized community data - Updated on {{date}}',
      avgTimeInTarget: 'Average Time in Target',
      globalCommunity: 'Global Community',
      mostActiveRegion: 'Most Active Region',
      moreCommunityEngagement: 'Higher community engagement',
      popularMealTimes: 'Popular Meal Times',
      commonChallenges: 'Common Challenges',
      anonymizedDataNotice:
        'Data is anonymized and aggregated to protect user privacy',
    },
    Actions: {
      retry: 'Retry',
    },
  },

  consultationBilling: {
    History: {
      loadError: 'Error loading history:',
    },
    Payment: {
      requiredTitle: '💳 Payment Required',
      processingDescription: '{{amount}} - Payment processing...',
      errorTitle: '❌ Payment Error',
      errorDescription: 'Unable to process payment of {{amount}}',
    },
    Consultation: {
      startedTitle: '✅ Consultation Started',
      paymentConfirmed:
        'Payment of {{amount}} confirmed - Session {{sessionId}}',
      completedTitle: '✅ Consultation Completed',
      completedDescription: 'Payment processed automatically',
      errorTitle: '❌ Error',
      errorDescription: 'Unable to complete the consultation',
      inProgress: 'Consultation in Progress',
      session: 'Session',
      started: 'Started',
      amount: 'Amount',
      paymentStatus: 'Payment Status',
      notesPlaceholder: 'Consultation notes...',
      processing: '⏳ Processing...',
      endButton: '🔚 End Consultation',
      newTitle: 'New Consultation - {{amount}}',
      fee: 'Fee',
      feePerSession: '{{amount}} per consultation',
      payment: 'Payment',
      paymentMethod: 'Automatic before consultation',
      dareCommission: 'Klukoo Commission',
      commissionRate: '10% (50 FCFA)',
      patientCodePlaceholder: 'Patient code (ex: PAT001)',
      processingPayment: '⏳ Processing payment...',
      startButton: '💳 Start Consultation ({{amount}})',
      historyTitle: 'Consultation History',
      noHistory: 'No consultations yet',
      patient: 'Patient',
      date: 'Date',
      status: 'Status',
      notes: 'Notes',
    },
    PaymentStatus: {
      paid: 'Paid',
      pending: 'Pending',
      failed: 'Failed',
    },
  },

  ConsultationCard: {
    years: 'years',
    diabetesType: 'Diabetes Type',
    requestedAgo: 'Requested {{time}} ago',
    consultation: 'Consultation',
    viewData: 'View Data',
    accept: 'Accept',
    reason: 'Reason',
  },

  consultationChat: {
    Chat: {
      errorTitle: 'Connection Error',
      errorDescription: 'Unable to connect to the chat',
      initError: 'Chat initialization error:',
      title: 'Consultation Chat',
      input: {
        placeholder: 'Type your message...',
      },
    },
    messages: {
      initialPatientMessage:
        'Hello doctor, I have a question about my blood sugar',
    },
    toast: {
      sentTitle: 'Message sent',
      sentDescription: 'Your message has been successfully sent',
    },
    Consultation: {
      start: {
        successTitle: 'Consultation Started',
        successDescription: 'The consultation is now active',
        errorLog: 'Error starting consultation:',
        errorTitle: 'Error',
        errorDescription: 'Unable to start the consultation',
      },
      complete: {
        successTitle: 'Consultation Completed',
        successDescription: 'The consultation has been marked as completed',
      },
      errorTitle: 'Error',
      errorDescription: 'Unable to complete the consultation',
      button: {
        start: 'Start Consultation',
        end: 'End',
      },
      status: {
        finished: 'This consultation is finished',
      },
    },
    Connection: {
      status: {
        connected: 'Connected',
        disconnected: 'Disconnected',
      },
    },
  },

  countrySelector: {
    Settings: {
      countryCurrency: {
        title: 'Select Country & Currency',
        detecting: 'Detecting your country...',
        detected: 'Detected country',
        use: 'Use',
        selectCountry: 'Choose your country:',
        selectPlaceholder: 'Select a country...',
      },
    },
  },

  dataSharingSettings: {
    Settings: {
      sharePrefs: {
        successTitle: 'Preferences Updated',
        successDescription: 'Your sharing settings have been saved.',
        errorTitle: 'Error',
        errorDescription: 'Unable to update your preferences.',
      },
      privacy: {
        title: 'Privacy Settings',
        anonymousData: {
          title: 'Anonymous Data Sharing',
          description:
            'Help improve the community by sharing your data anonymously',
        },
        shareStats: {
          title: 'Share my statistics',
          description: 'Average glucose and time in range',
        },
        shareRegion: {
          title: 'Share my region',
          description: 'Geographical region for local statistics',
        },
        shareAge: {
          title: 'Share my age group',
          description: 'Age group for demographic comparisons',
        },
        shareDiabetesType: {
          title: 'Share my diabetes type',
          description: 'Diabetes type for specialized insights',
        },
        guarantee: {
          title: 'Privacy Guaranteed',
          description:
            'All shared data is anonymized and cannot be linked to your identity. It is used solely to improve the community experience.',
        },
      },
    },
  },

  gamificationDashboard: {
    Profile: {
      reputation: {
        points: 'Reputation Points',
      },
      badges: {
        earned: 'Badges earned',
        progression: 'Badge Progress',
        description: 'Unlock new badges by participating in the community',
        earned1: 'Badges earned ({{count}})',
        available: 'Badges to unlock ({{count}})',
        locked: 'To unlock',
        viewAll: 'View all badges (+{{remaining}})',
      },
      messages: {
        sent: 'Messages sent',
      },
      points: {
        title: 'Earn points',
        description:
          'Participate in these activities to increase your reputation',
        message: {
          title: 'Helpful messages',
          description: '+{{points}} points each',
          button: 'Write a message',
        },
        mentoring: {
          title: 'Mentoring',
          description: '+{{points}} points per person',
          button: 'Become a mentor',
        },
        challenges: {
          title: 'Challenges',
          description: '+{{points}} points per participation',
          button: 'Join a challenge',
        },
        dataSharing: {
          title: 'Data Sharing',
          description: '+{{points}} points per share',
          button: 'Share Data',
        },
      },
    },
  },

  glucoseShareMessage: {
    Profile: {
      points: {
        glucoseSharing: {
          title: 'Glucose Sharing',
        },
      },
    },
  },

  groupCard: {
    Profile: {
      points: {
        glucoseSharing: {
          joinButton: 'Join',
        },
      },
    },
  },

  lazyImage: {
    common: {
      imageUnavailable: 'Image not available',
    },
  },

  liveSessions: {
    sessions: {
      qaWithDoctor: 'Q&A with {{doctor}}',
      diabetesCookingWorkshop: 'Diabetes Cooking Workshop',
      meditationStressManagement: 'Meditation & Stress Management',
      todayAt: 'Today at {{time}}',
      tomorrowAt: 'Tomorrow at {{time}}',
      onDayAt: '{{day}} at {{time}}',
      duration: '{{duration}}',
    },
  },

  mealPhotoMessage: {
    meal: {
      diabetesFriendly: 'Diabetes-friendly meal',
      sharedMeal: 'Shared meal',
      estimatedCarbs: 'Estimated carbs',
    },
  },

  messageBubble: {
    meal: {
      carbs: 'carbs',
    },
    metrics: {
      Glucose: 'Glucose',
      Insulin: 'Insulin',
      period: 'Period',
    },
  },

  nativeHeaderFixes: {
    notifications: {
      inDevelopment: 'Notifications - Feature in development',
    },
    settings: {
      inDevelopment: 'Settings - Feature in development',
    },
  },

  networkStatus: {
    network: {
      online: 'Connection restored',
      offline: 'No internet connection - Offline mode enabled',
    },
  },

  networkStatusIndicator: {
    networkStatus: {
      verySlow: 'Very slow network',
      slow: 'Slow network',
      moderate: 'Moderate network',
      fast: 'Good network',
      unknown: 'Unknown network',
    },
    badges: {
      saveData: 'Save data',
      optimizedMode: 'Optimized mode enabled',
    },
  },

  patientAccessHistory: {
    professionalType: {
      endocrinologist: 'Endocrinologist',
      generalPractitioner: 'General Practitioner',
      nutritionist: 'Nutritionist',
      unknown: 'Unknown',
    },
    actions: {
      view: 'Viewed',
      consultation: 'Consultation',
      viewData: 'View Data',
      download: 'Download',
      exportData: 'Export Data',
      access: 'Access',
    },
    data: {
      glucose: 'Glucose',
      medications: 'Medications',
      overview: 'Overview',
      meals: 'Meals',
      activities: 'Activities',
    },
    errors: {
      loadingHistory: 'Error loading history',
      retry: 'Retry',
      downloadFullReport: '📄 Download Full Report',
    },
    time: {
      agoMinutes: '{{count}} min ago',
      agoHours: '{{count}}h ago',
      yesterday: 'Yesterday',
      agoDays: '{{count}} days ago',
    },
    report: {
      generatingTitle: '📄 Generating Report',
      generatingDesc: 'Preparing the access report...',
      successTitle: '✅ Report Generated',
      successDesc: 'The access report has been downloaded successfully',
      errorTitle: '❌ Error',
      errorDesc: 'Unable to generate the report',
    },
    history: {
      loadingError: 'Loading Error',
      accessTitle: '🔍 Access History to My Data',
      accessSubtitle: 'All access to your data is tracked and secured',
      noRecentAccess: 'No recent access to your data',
      suspect: '⚠️ Suspect',
      code: 'Code',
      sectionsAccessed: 'Sections Accessed',
    },
  },

  patientAccessInterface: {
    injection: {
      doseUnits: '{{count}} units',
    },
    meal: {
      totalCarbs: '{{count}}g carbohydrates',
    },
  },

  patientDataPanel: {
    patient: {
      infoTitle: 'Patient Information',
      age: 'Age',
      years: 'years',
      type: 'Type',
      diabetesType: 'Diabetes Type {{type}}',
      diagnosis: 'Diagnosis',
      targetBelow: 'target <',
      recentGlucose: 'Recent Glucose Readings',
      treatment: 'Current Treatment',
      alerts: 'Alerts',
    },
    actions: {
      viewFullGraphs: 'View Full Graphs',
      consultationHistory: 'Consultation History',
      adjustInsulinDoses: 'Adjust Insulin Doses',
    },
  },

  patientDataTabs: {
    tabs: {
      overview: '📊 Overview',
      glucose: '🩸 Glucose',
      medications: '💊 Medications',
      meals: '🍽️ Nutrition',
      activities: '🏃 Activities',
      history: '📋 History',
    },
    access: {
      sectionNotAccessibleTitle: 'Section Not Accessible',
      sectionNotAccessibleDesc:
        'You do not have permission to access the data for {{section}}.',
    },
    medications: {
      metformin: 'Metformin',
      lantus: 'Lantus',
      humalog: 'Humalog',
      current: 'Current Medications',
    },
    alerts: {
      hba1cAboveTarget: 'HbA1c > target',
      threeHypoglycemiasWeek: '3 hypoglycemic events this week',
      followUpAppointment: 'Follow-up appointment scheduled',
      title: 'Active Alerts',
      count: 'alerts',
    },
    glycemicControl: {
      title: 'Glycemic Control',
      currentHbA1c: 'Current HbA1c',
      target: 'Target',
      timeInRange: 'Time in Range',
    },
    treatment: {
      title: 'Treatment',
      activeMedications: 'active medications',
    },
    latestMeasures: {
      title: 'Latest Measurements',
      current: 'Current',
      sevenDayAvg: '7-day Average',
      variability: 'Variability',
    },
    activity: {
      title: 'Activity',
      today: 'Today',
      thisWeek: 'This Week',
      target: 'Target',
      progress: '{{percent}}% of goal',
    },
    nutrition: {
      title: 'Nutrition',
      carbsToday: 'Carbs Today',
      mealsLogged: 'Meals Logged',
      avgGI: 'Average GI',
      giModerate: 'Moderate',
      todayMeals: 'Meals & Nutrition - Today',
      carbs: 'g carbs',
      dailySummary: 'Daily Summary',
      totalCarbs: 'Total Carbs',
      totalCalories: 'Total Calories',
      avgGlycemicIndex: 'Average Glycemic Index',
      gi: {
        low: 'Low',
        moderate: 'Moderate',
        high: 'High',
      },
    },
    charts: {
      sevenDayGlucose: '7-Day Glucose Levels',
      patientGlucoseGraph: 'Patient Glucose Chart',
      last7DaysData: 'Data from the last 7 days',
    },
    glucose: {
      context: {
        fasting: 'Fasting',
        postMeal: 'Post-meal',
        snack: 'Snack',
        afterDinner: 'After Dinner',
      },
      trend: {
        stable: 'Stable',
        up: 'Rising',
        down: 'Falling',
      },
    },
    glycemia: {
      todayData: 'Glycemic Data - Today',
      last: 'Last',
      level: {
        high: 'High',
        low: 'Low',
        normal: 'Normal',
      },
    },
    medication: {
      frequency: {
        twiceDaily: '2x/day',
        onceDaily: '1x/day',
        beforeMeal: 'Before meal',
      },
      time: {
        morningEvening: 'Morning/Evening',
        evening: 'Evening',
        variable: 'Variable',
      },
    },
    meals: {
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
    },
    activities: {
      walk: 'Walk',
      cycling: 'Cycling',
      intensity: {
        low: 'Low',
        moderate: 'Moderate',
        high: 'High',
      },
      todayActivities: 'Physical Activities - Today',
      minutes: 'minutes',
      summary: 'Summary',
      totalTime: 'Total Time',
      caloriesBurned: 'Calories Burned',
      weeklyGoal: 'Weekly Goal',
    },
    consultations: {
      historyTitle: 'Consultation History',
      consultation: 'Consultation',
      teleconsultation: 'Teleconsultation',
      notes: {
        adjustInsulin: 'Insulin adjustment',
        glycemiaFollowUp: 'Glycemia follow-up',
        quarterlyCheck: 'Quarterly check-up',
      },
    },
  },

  patientManagement: {
    patientCodeModal: {
      title: 'Patient Code Required',
      description: 'Please enter the patient code to access secure information',
      enterCodeFor:
        'Enter patient code to access information for {{patientName}}',
      placeholder: 'Patient code (e.g., ABC123)',
      cancel: 'Cancel',
      access: 'Access',
    },
    patientFile: {
      title: 'Patient File - {{patientName}}',
      description: 'Full consultation of the medical record',
      name: 'Patient Name',
      diabetesType: 'Diabetes Type',
      lastGlucose: 'Last Glucose',
      status: 'Status',
      medicalNotes: 'Medical Notes',
      lastConsultation: 'Last Consultation',
      nextAppointment: 'Next Appointment',
      close: 'Close',
    },
    messageModal: {
      title: 'Send a message to {{patientName}}',
      description: 'Secure patient-professional messaging',
      subject: 'Subject',
      subjectPlaceholder: 'Message subject',
      content: 'Message',
      contentPlaceholder: 'Type your message here...',
      cancel: 'Cancel',
      send: 'Send',
    },
    teleconsultation: {
      title: 'Teleconsultation with {{patientName}}',
      description: 'Secure video consultation interface',
      interfaceTitle: 'Video Interface',
      interfaceSubtitle: 'The video consultation would appear here',
      patientLabel: 'Patient',
      durationLabel: 'Planned duration',
      durationValue: '{{minutes}} minutes',
      notesLabel: 'Consultation notes',
      notesPlaceholder: 'Write important consultation points...',
      close: 'Close',
      audioOnly: 'Audio only',
      startVideo: 'Start Video',
    },
    call: {
      title: 'Call {{patientName}}',
      description: 'Phone call interface',
      ready: 'Ready to dial',
      notesLabel: 'Call notes',
      notesPlaceholder: 'Write the purpose of the call...',
      cancel: 'Cancel',
      dial: 'Dial',
    },
    editProfile: {
      title: 'Edit Profile - {{patientName}}',
      description: 'Edit patient information',
      name: 'Patient Name',
      diabetesType: 'Diabetes Type',
      status: 'Status',
      statusOptions: {
        stable: 'Stable',
        attention: 'Attention',
        improving: 'Improving',
      },
      lastGlucose: 'Last Glucose',
      notes: 'Medical Notes',
      nextAppointment: 'Next Appointment',
      cancel: 'Cancel',
      save: 'Save Changes',
    },
  },

  paymentRow: {
    payment: {
      successTitle: 'Payment Processed',
      successDescription:
        'Payment of {{amount}} F CFA processed for {{doctor}}',
      errorTitle: 'Error',
      errorDescription: 'Unable to process the payment',
      pay: 'Pay',
      receipt: 'Receipt',
    },
    status: {
      paid: 'Paid',
      processing: 'Processing',
      pending: 'Pending',
    },
  },

  predictiveAlerts: {
    aiAnalysis: {
      inProgress: 'AI Analysis in progress...',
      patternDetection: 'Detecting glycemic patterns',
    },
    notifications: {
      markAllRead: 'Mark all as read',
    },
    alerts: {
      prediction: 'Prediction',
      inApproxMinutes: 'in ~{{minutes}} min',
    },
    recommendations: {
      actions: 'Recommended Actions',
    },
    predictive: {
      confidence: 'Confidence',
      label: 'AI Prediction',
    },
  },

  professionalConsultationDashboard: {
    professionalDashboard: {
      consultations: {
        title: 'Consultations',
        status: {
          scheduled: 'Scheduled',
          confirmed: 'Confirmed',
          in_progress: 'In Progress',
          completed: 'Completed',
          cancelled: 'Cancelled',
          no_show: 'No Show',
        },
      },
    },
    consultation: {
      back_to_list: 'Back to consultations',
      number: 'Consultation #{{id}}',
      none_found: 'No consultations found',
      none_found_description: 'Consultations will appear here once created',
      duration: 'Duration',
      minutes: 'minutes',
      start: 'Start',
      resume: 'Resume',
    },
  },

  professionalCredentials: {
    qrcode: {
      error_title: 'QR Code Error',
      error_description: 'Unable to generate the QR Code',
    },
    certificate: {
      title: 'Klukoo - Professional Certificate',
      institution: 'Institution',
      license: 'License',
      approved_at: 'Approval Date',
      validity: 'Validity',
      validity_period: '1 year from the date of issue',
      platform: 'Platform',
      not_specified: 'Not specified',
      approval_statement:
        "This certificate confirms the professional's approval on the Klukoo platform.",
      verification_contact:
        'For verification, contact support@Klukoo-health.com',
      download_success_title: '✅ Certificate Downloaded',
      download_success_description:
        'The professional certificate has been successfully downloaded',
      download_error_title: '❌ Download Error',
      download_error_description: 'Unable to generate the certificate',
    },
    email: {
      sent_title: '✅ Email sent',
      sent_description: 'Credentials have been sent to {{email}}',
      error_title: '❌ Sending error',
      error_description: 'Unable to send the email',
      console_error: 'Email sending error:',
    },
    approval: {
      congratulations: 'Congratulations Dr. {{name}}!',
      message:
        'Your application has been approved. Here are your Klukoo Pro credentials.',
    },
    identification: {
      title: '🔑 Your Identification Code',
    },
    professional: {
      type: 'Type',
      country: 'Country',
      validity: 'Validity',
      validity_period: '{{years}} year',
      institution: 'Institution',
    },
    actions: {
      generating: 'Generating...',
      download_certificate: 'Download Certificate',
      sending: 'Sending...',
      send_by_email: 'Send by Email',
    },
    instructions: {
      title: 'Usage Instructions',
      use_code: 'Use this code to identify yourself on Klukoo Pro',
      request_patient_code: 'Request the patient code to access their data',
      consultation_fee: 'Each consultation is automatically paid 500 F CFA',
      keep_code_safe: 'Keep this code securely',
      qr_verification: 'The QR Code allows quick verification of your identity',
    },
  },

  professionalDashboardNew: {
    dashboard: {
      error_title: 'Error',
      error_description: 'Unable to load dashboard data',
      totalPatients: 'Patients monitored',
      today: 'Today',
      monthlyEarnings: 'Monthly Earnings',
      averageRating: 'Average Rating',
      recentRequests: 'Recent Requests',
      consultationRequests: 'Consultation Requests',
      manageConsultationRequests: "Manage patients' consultation requests",
      patient: 'Patient',
      patientMessage: 'Patient message',
      viewData: 'View data',
      complete: 'Complete',
      noRequests: 'No consultation requests',
    },
    requests: {
      accepted_title: 'Request Accepted',
      accepted_description: 'The patient has been notified of your acceptance',
      error_title: 'Error',
      error_description: 'Unable to accept the request',
      request_rejected_title: 'Request Rejected',
      request_rejected_description:
        'The patient has been notified of your rejection',
      refusal_error_title: 'Error',
      refusal_error_description: 'Unable to reject the request: {{message}}',
      accept: {
        title: 'Accept Consultation Request',
        description: 'You can add a message for the patient',
        messageLabel: 'Message (optional)',
        messagePlaceholder: 'I am available for your consultation...',
      },
      reject: {
        title: 'Reject Consultation Request',
        description: 'Please provide a reason for rejection',
        messageLabel: 'Rejection Reason *',
        messagePlaceholder: 'Unfortunately, I am not available because...',
      },
    },
    consultation: {
      notes_saved_title: 'Notes saved',
      notes_saved_description:
        'Consultation notes have been added to the patient record',
      notes_error_title: 'Error',
      notes_error_description: 'Unable to save notes: {{message}}',
      notes: {
        title: 'Consultation Notes',
        description:
          "Add your notes which will be saved in the patient's record",
        notesLabel: 'Consultation Notes *',
        notesPlaceholder:
          'Observations, diagnosis, discussions with the patient...',
        recommendationsLabel: 'Recommendations',
        recommendationsPlaceholder:
          'Advice, treatment modifications, follow-up...',
        nextAppointmentLabel: 'Next Appointment',
      },
    },
    status: {
      pending: 'Pending',
      accepted: 'Accepted',
      rejected: 'Rejected',
      completed: 'Completed',
      verified: 'Verified',
    },
    reason: {
      routine_checkup: 'Routine Checkup',
      urgent_consultation: 'Urgent Consultation',
      glucose_management: 'Glucose Management',
      medication_adjustment: 'Medication Adjustment',
      diet_counseling: 'Diet Counseling',
      psychological_support: 'Psychological Support',
      complications: 'Diabetes Complications',
      follow_up: 'Follow-up',
    },
    professional_account: {
      not_approved: 'Your professional account has not been approved yet.',
    },
    notifications: {
      pendingRequests: 'You have {{count}} pending request',
      pendingRequests_plural: 'You have {{count}} pending requests',
    },
    tabs: {
      dashboard: 'Dashboard',
      requests: 'Requests ({{count}})',
      requests_plural: 'Requests ({{count}})',
      patients: 'My Patients',
      earnings: 'Earnings',
    },
    patients: {
      title: 'My Patients',
      description: 'History of consulted patients',
      placeholder: 'Patient list under development',
    },
    earnings: {
      title: 'Detailed Earnings',
      description: 'Track your gains and payments',
      monthly: 'This Month',
      pending: 'Pending',
      yearly: 'Total Year',
    },
    common: {
      cancel: 'Cancel',
      accept: 'Accept',
      reject: 'Reject',
      save: 'Save',
      close: 'Close',
    },
    patientData: {
      title: 'Patient Data',
      description: 'Access the patient’s health data (excluding Klukoo Chat)',
      glycemic: {
        title: 'Glycemic Data',
        description:
          'Full access to blood glucose records, trends, and analysis',
        button: 'View Data',
      },
      medicalProfile: {
        title: 'Medical Profile',
        description: 'Medical information, treatments, and history',
        button: 'View Profile',
      },
      nutrition: {
        title: 'Nutrition',
        description: 'Food journal and nutritional analysis',
        button: 'View Nutrition',
      },
      activity: {
        title: 'Physical Activity',
        description: 'Activity tracking and impact on blood glucose',
        button: 'View Activity',
      },
      restrictedAccess: {
        title: 'Restricted Access',
        description:
          'The Klukoo Chat interface is not accessible to professionals to protect the patient’s personal communication confidentiality.',
      },
    },
  },

  professionalNotificationCenter: {
    consultationReasons: {
      routine_checkup: 'Routine checkup',
      urgent_consultation: 'Urgent consultation',
      glucose_management: 'Glucose management',
      medication_adjustment: 'Medication adjustment',
      diet_counseling: 'Diet counseling',
      psychological_support: 'Psychological support',
      complications: 'Diabetes complications',
      follow_up: 'Follow-up consultation',
    },
    consultation: {
      response: {
        acceptedTitle: 'Consultation accepted',
        rejectedTitle: 'Consultation rejected',
        acceptedDescription: 'The patient can now start the chat',
        rejectedDescription: 'The patient has been notified of your response',
        errorLog: 'Error responding:',
        errorTitle: 'Error',
        errorDescription: 'Unable to process the response',
      },
    },
    professionalNotification: {
      title_consultationRequests: 'Consultation Requests',
      newRequests_one: '{{count}} new request',
      newRequests_other: '{{count}} new requests',
      message_noRequests: 'There are no consultation requests avalaible',
    },
    consultationStatus: {
      pending: 'Pending',
      accepted: 'Accepted',
      rejected: 'Rejected',
    },
    consultationActions: {
      accept: 'Accept',
      reschedule: 'Reschedule',
      startChat: 'Start Chat',
    },
    consultationDetails: {
      reason: 'Reason',
      fee: 'Fee',
      message: 'Message',
    },
    consultationResponse: {
      acceptTitle: 'Accept consultation',
      rescheduleTitle: 'Reschedule consultation',
      proposedDate: 'Proposed date',
      proposedTime: 'Proposed time',
      message: 'Message',
      optional: '(optional)',
      forPatient: 'for the patient',
      confirmationPlaceholder: 'Confirmation message...',
      reschedulePlaceholder:
        'Explain why you are rescheduling and propose a new date...',
      accept: 'Accept',
      reschedule: 'Reschedule',
    },
    common: {
      cancel: 'Cancel',
      processing: 'Processing...',
    },
  },

  progressMessage: {
    celebration: {
      title: 'Celebration',
      achievements: {
        first_consultation: 'First Consultation',
        milestone_reached: 'Milestone Reached',
      },
      descriptions: {
        first_consultation:
          'You have successfully completed your first consultation!',
        milestone_reached:
          'Congratulations on reaching this important milestone.',
      },
    },
  },

  quickActions: {
    actions: {
      scheduleConsultation: {
        title: 'Consultation Scheduled',
        description: 'The consultation has been added to the schedule',
      },
      generateReport: {
        title: 'Report Generated',
        description: 'The report has been generated successfully',
      },
      addPatient: {
        title: 'Patient Added',
        description: 'The new patient has been added to your list',
      },
    },
  },

  quickActionsGrid: {
    quickActions: {
      glucose: 'Add Glucose',
      meal: 'Meal Journal',
      medication: 'Medications',
      activity: 'Activity',
      reminders: 'Reminders',
      title: 'Quick Actions',
    },
  },

  reputationCard: {
    communityReputation: {
      title: 'Community Reputation',
      description: 'Your contribution to the Klukoo community',
      progressTowards: 'Progress towards {{nextLevel}}',
      pointsToNext: '{{points}} points left for the next level',
      levels: {
        beginner: 'Beginner',
        active: 'Active',
        contributor: 'Contributor',
        expert: 'Expert',
        legend: 'Legend',
      },
      stats: {
        helpfulMessages: 'Helpful messages',
        positiveReactions: 'Positive reactions',
        dataShares: 'Data shares',
        mentoredUsers: 'Mentored people',
      },
    },

    badges: {
      title: 'Earned Badges ({{count}})',
      engagement: 'Engagement',
      expertise: 'Expertise',
      invite: 'Join the community to earn your first badges!',
    },
  },

  revenueDistribution: {
    title: 'Revenue Distribution',
    description:
      'Automatic system based on your Premium (€8) and Family (€10) plans',
    refresh: 'Refresh',
    plan: 'Plan {{planName}}',
    autoDistribution: 'Automatic distribution for {{amount}} per subscription',
    professionals: 'Professionals',
    appMaintenance: 'App & Maintenance',
    paymentPlatform: 'Payment Platform',
    netProfit: 'Net Profit',
    reinvestment: 'Reinvestment',
    toast: {
      errorTitle: 'Error',
      configLoadError: 'Unable to load distribution configuration',
      loadError: 'Unable to load {{item}}',
      monthlyDistribution: 'monthly distribution',
    },
    specialities: {
      endocrinologist: 'Endocrinologist',
      general_practitioner: 'General Practitioner',
    },
    status: {
      pending: 'Pending',
      approved: 'Approved',
      paid: 'Paid',
      distributed: 'Distributed',
    },
    distribution: {
      approved: {
        title: 'Distribution approved',
        description: 'The revenue distribution has been successfully approved',
      },
      error: 'Unable to process distribution',
    },
    error: {
      title: 'Error',
    },
    distributionCards: {
      totalRevenue: 'Total Revenue',
      subscriptions: '{{count}} subscriptions',
      professionals: 'Professionals',
      toRedistribute: 'To redistribute',
      netProfit: 'Net Profit',
      fixedShare: 'Your fixed share: {{amount}} F CFA',
      reinvesment: 'Reinvestment',
      marketingDevelopment: 'Marketing & Development',
      title: 'Distribution of {{month}}',
      description: 'Current status of the automatic monthly distribution',
      appFees: 'App & Maintenance Fees',
      platformFees: 'Payment Platform Fees',
      progress: 'Progress',
      distributionStatus: 'Distribution',
      toProfessionals: 'to professionals',
      approveDistribution: 'Approve Distribution',
    },
    earningsCard: {
      title: 'Earnings per Professional',
      description: 'Detailed payments to healthcare professionals',
      professional: 'Professional',
      speciality: 'Speciality',
      consultations: 'Consultations',
      patients: 'Patients',
      grossAmount: 'Gross Amount',
      platformFee: 'Commission',
      netAmount: 'Net to Pay',
      status: 'Status',
    },
    actions: {
      exportPDF: 'Export PDF',
      reportExcel: 'Excel Report',
      sendEmail: 'Send by Email',
      history: 'History',
    },
  },

  roleProgressCard: {
    memberStatus: {
      title: 'Member Status',
    },
    userStats: {
      sentMessages: 'Sent Messages',
      receivedReactions: 'Received Reactions',
      activeDays: 'Active Days',
      warnings: 'Warnings',
      nextLevelProgress: 'Progress towards next level',
    },
    status: {
      validated: 'Validated',
    },
    roleManagement: {
      title: 'Role Management',
      verifiedMember: 'Verified Member',
      expert: 'Expert',
      moderator: 'Moderator',
      demote: 'Demote',
    },
    userProgress: {
      maxLevelNotice:
        'You have reached the maximum available level or your progression requires manual validation.',
    },
  },

  simplifiedPredictiveAlerts: {
    riskLevel: {
      veryHigh: 'Very High',
      high: 'High',
      moderate: 'Moderate',
      low: 'Low',
    },
    advancedAI: {
      title: 'Advanced AI Analysis...',
      subtitle: 'Machine Learning • Multi-factor Prediction',
      glycemicPatternAnalysis: 'Glycemic Pattern Analysis',
    },
    multiFactorAI: {
      title: 'Multi-factor Predictive AI',
      features: 'Glucose • Meals • Insulin • Age • Activities',
      analyze: 'Analyze',
      dismissAll: 'Dismiss All',
      alerts: 'AI Alerts',
      critical: 'Critical',
      high: 'High',
      medium: 'Monitor',
      age: 'Age',
      type: 'Type',
      ratio: 'G/I Ratio',
      target: 'Target',
    },
    emergencyCard: {
      title: 'Family SOS',
      subtitle: 'Immediate emergency alert',
      alertFamily: 'Alert Family',
    },
    familyCard: {
      title: 'Family Notified ({{count}})',
      lastNotification: 'Last notification: {{time}}',
      noNotifications: 'No notifications yet',
    },
    iaCard: {
      title: '🤖 Full AI Analysis',
      description: 'No foreseeable risk detected at the moment.',
      patternsOk: 'Patterns OK',
      stablePredictions: 'Stable Predictions',
      familyNotified: 'Family Notified',
    },
    alert: {
      riskLevel: 'Risk Level:',
      confidence: 'AI Confidence:',
      iaPrediction: '🤖 AI Prediction:',
      inApprox: 'in ~{{minutes}} min',
    },
    ai: {
      recommendedActions: 'Recommended Actions by AI',
      version: 'AI {{version}}',
    },
    badge: {
      familyNotified: 'Family Notified',
    },
    predictiveSystem: {
      active: 'Predictive AI System Active',
      description:
        'Continuous monitoring • Real-time family notifications • Machine Learning',
      nextAnalysisLabel: 'Next analysis',
      nextAnalysisTime: 'in {{time}}',
    },
  },

  SOSButton: {
    emergency: {
      sosButton: '🆘 Need urgent help',
      dialogTitle: 'Emergency Assistance Request',
      dialogDescription:
        'This will send a priority notification to online experts. For immediate medical emergencies, call 911.',
      contactNumbers: 'Emergency Numbers',
      samu: 'SAMU',
      sosDoctors: 'SOS Doctors',
      poisonCenter: 'Poison Control Center',
      messageLabel: 'Briefly describe your situation (optional)',
      messagePlaceholder: 'Ex: Severe hypoglycemia, need urgent advice...',
      onlineExperts: 'Available Experts',
      expertCount: '{{count}} expert(s) online · Avg response < 5 min',
      cancel: 'Cancel',
      sending: 'Sending...',
      sendRequest: 'Send Emergency Request',
    },
  },

  supportDashboard: {
    error: {
      retry: 'Retry',
    },
    communitySupport: {
      title: 'Community Support',
      description: 'Peer help, group sessions, and community challenges',
      refresh: 'Refresh',
    },
    emergencySupport: {
      title: 'Emergency Support',
      description: 'Need immediate help? Our experts are available 24/7',
      warning: 'Click only in case of a real assistance need',
      availableExperts: 'Experts Available',
      averageResponse: 'Average response time: < 5 minutes',
    },
    communityTabs: {
      sessions: 'Sessions',
      challenges: 'Challenges',
      buddies: 'Buddies',
      experts: 'Experts',
    },
    community: {
      sessions: {
        title: 'Support Sessions',
        description: 'Join our themed sessions led by experts',
        noSessions: 'No sessions scheduled at the moment',
      },
      challenges: {
        title: 'Community Challenges',
        description: 'Join challenges and earn recognition badges',
        noChallenges: 'No challenges available at the moment',
      },
    },
    peerSupport: {
      title: 'Peer Support System',
      description: 'Find a mentor or guide a new member',
      mentorship: 'Mentorship Relation',
      active: 'Active',
      startedOn: 'Started on {{date}}',
      noPairs: "You don't have any assigned peer yet",
      becomeMentor: 'Become a Mentor',
      findMentor: 'Find a Mentor',
    },
    expertsOnline: {
      title: 'Online Experts',
      description: 'Diabetes experts available to help you',
      available: 'Expert Available',
      specialties: 'Specialties',
      responseTime: 'Response Time',
      minutes: 'min',
      totalResponses: 'responses given',
      noneAvailable: 'No experts available at the moment',
    },
  },

  supportSessionCard: {
    sessionType: {
      group: 'Group Session',
      mentoring: 'Mentoring',
      emergency: 'Emergency Support',
      challenge: 'Challenge Group',
    },
    userStatus: {
      registered: 'Registered',
    },
    session: {
      moderatedBy: 'Hosted by {{name}}',
      recurring: 'Recurring session · {{pattern}}',
      past: 'Session passed',
      leave: 'Leave',
      join: 'Join',
      full: 'Full',
      enter: 'Enter',
      full_waitlist: 'This session is full. You can join the waitlist.',
    },
  },

  thematicGroups: {
    groups: {
      newcomers: {
        name: '🌱 New Diabetics',
        description: 'Support for beginners',
      },
      parents: {
        name: '👨‍👩‍👧‍👦 Parents of Diabetic Children',
        description: 'Parental advice',
      },
      nutrition: {
        name: '🍽️ African Nutrition',
        description: 'Local cuisine adapted',
      },
      active: {
        name: '🏃 Diabetes & Sports',
        description: 'Physical activity',
      },
    },
    community: {
      groupsTitle: 'Thematic Groups',
    },
  },

  userRoleBadge: {
    roles: {
      member: 'Member',
      verified_member: 'Verified',
      expert: 'Expert',
      moderator: 'Moderator',
    },
  },

  virtualizedList: {
    virtualizedList: {
      empty: 'No items to display',
      loading: 'Loading...',
    },
  },

  authFixes: {
    error: 'Error',
    plan_selection: {
      failed: 'Unable to process plan selection',
    },
    test_mode: {
      enabled_title: '🧪 Test Mode Enabled',
      enabled_description: 'Family access granted in test mode',
    },
    demo_mode: {
      enabled_title: '🚀 Demo Mode Enabled',
      enabled_description: 'Redirecting to the professional interface',
    },
    logout: {
      success: {
        title: 'Signed out successfully',
        description: 'You are now signed out',
      },
      error: {
        title: 'Error',
        description: 'Unable to sign out',
        catch_description: 'An error occurred while signing out',
      },
      button: 'Sign out',
      loading: 'Signing out...',
    },
    auth: {
      codeProvidedByPatient: 'Code provided by patient',
      testModeHint: '🧪 In test mode, any code works',
      connecting: 'Connecting',
      familyAccess: 'Access Family',
    },
  },

  index: {
    loading: {
      charts: 'Loading charts...',
      blog: 'Loading blog...',
      journal: 'Loading journal...',
      family: 'Loading family...',
      chat: 'Loading chat...',
      consultation: 'Loading consultation...',
      alerts: 'Loading alerts...',
    },
  },

  notFound: {
    links: {
      dashboard: 'Dashboard',
      glucoseTracking: 'Glucose Tracking',
      medicationReminders: 'Medication Reminders',
    },
    errors: {
      pageNotFound: 'Page not found',
      pageNotFoundDescription:
        'The page you are looking for does not exist or has been moved.',
    },
    buttons: {
      back: 'Back',
      home: 'Home',
    },
    footer: {
      tagline: '💪 DARE - Your diabetes companion',
    },
  },

  editProfileModalChanges: {
    common: {
      saving: 'Saving...',
      saveChanges: 'Save Changes',
    },
  },

  app: {
    status: {
      offline: '📡 Offline Mode - Some features are limited',
    },
  },

  insulinDosage: {
    title: 'Insulin Dosage',
    mealGuidance: {
      breakfast: {
        range1: 'Treat hypoglycemia first. When corrected give this dose.',
        range5: 'Check for ketones',
      },
      lunch: {
        range1: 'Treat hypoglycemia first. When corrected give this dose.',
        range5: 'Check for ketones',
      },
      supper: {
        range1: 'Treat hypoglycemia first. When corrected give this dose.',
        range5: 'Check for ketones',
      },
    },
    glucoseRanges: {
      mgdl: {
        range1: '70 or less',
        range2: '72 - 144',
        range3: '145 - 216',
        range4: '217 - 306',
        range5: '307 or more',
        snackBreakfast: '72 or more',
        snackLunch: '72 or more',
        snackSupper: '108 or more',
      },
      mmol: {
        range1: '3.9 or less',
        range2: '4.0 - 8.0',
        range3: '8.1 - 12.0',
        range4: '12.1 - 17.0',
        range5: '17.1 or more',
        snackBreakfast: '4.0 or more',
        snackLunch: '4.0 or more',
        snackSupper: '6.0 or more',
      },
    },
    share: {
      title: 'INSULIN DOSE SHEET',
      patient: 'Patient',
      patientFallback: 'Patient',
      date: 'Date',
      units: 'Units',
      unitsLabel: 'units',
      breakfast: 'BREAKFAST',
      lunch: 'LUNCH',
      supper: 'SUPPER',
      bedtime: 'BEDTIME',
      basalInsulin: 'Basal insulin',
      snack: 'Snack',
      notSet: 'Not set',
      healthcareProvider: 'HEALTHCARE PROVIDER',
      doctor: 'Doctor',
      notSpecified: 'Not specified',
      doctorNotes: "DOCTOR'S NOTES",
      recommendations: 'Recommendations',
      specialInstructions: 'Special Instructions',
      nextAppointment: 'Next Appointment',
      generatedFrom: 'Generated from Diabetes Management System',
      copySuccess:
        '✅ Insulin dose sheet copied to clipboard!\n\nYou can now paste it in:\n• Email to your doctor\n• WhatsApp/SMS message\n• Medical app or portal',
    },
    slidingScale: {
      insulinText: 'Sliding scale for clear rapid-acting insulin',
      penColour: 'pen colour',
      typePlaceholder: 'type',
      colorPlaceholder: 'color',
    },
    insulinTable: {
      bloodSugar: 'Blood sugar',
      units: 'Units',
      specialNotes: 'Special notes',
      unitsPlaceholder: 'units',
      specialNotesPlaceholder: 'Add special instructions...',
    },
    snackSection: {
      title: 'Snack',
      fixedDoseText: 'Fixed dose clear rapid-acting insulin',
      penColour: 'pen colour _______',
      bloodSugar: 'Blood sugar',
      units: 'Units',
      unitsPlaceholder: 'units',
    },
    insulinSheet: {
      title: 'Insulin Dose Sheet',
      rapidActing: 'Rapid-acting insulin',
      patientName: 'Patient Name',
      patientNamePlaceholder: 'Enter patient name',
      glucoseUnits: 'Glucose Units:',
      switchUnits: 'Click to switch units',
      measurements: 'For blood glucose measurements in {{unit}}',
    },
    meals: {
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      supper: 'Supper',
      bedtime: 'Bedtime',
    },
    insulin: {
      fixedDoseClear: 'Fixed dose clear basal-acting insulin',
      penColour: 'pen colour',
    },
    placeholders: {
      type: 'type',
      color: 'color',
      units: 'units',
    },
    units: {
      label: 'Units',
    },
    notes: {
      doctorsNotes: "Doctor's Notes & Recommendations",
      patientCondition: "Patient's current condition, general observations...",
      generalNotes: 'General Notes',
      bloodGlucosePatterns:
        'Blood glucose patterns, HbA1c levels, symptoms observed...',
      clinicalObservations: 'Clinical Observations',
      emergencyContact: 'Emergency Contact Instructions',
      emergencyContactPlaceholder:
        'When to call emergency services, doctor contact info...',
      treatmentRecommendations: 'Treatment Recommendations',
      treatmentRecommendationsPlaceholder:
        'Dietary recommendations, exercise guidelines, medication adjustments...',
      specialInstructions: 'Special Instructions',
      specialInstructionsPlaceholder:
        'Sick day management, travel instructions, special situations...',
      followUpAppointment: 'Next Follow-up Appointment',
    },
    quickReference: {
      title: 'Quick Reference Guidelines',
      hypoTitle: 'Hypoglycemia Signs',
      hypoSigns: 'Sweating, shaking, confusion, rapid heartbeat',
      hyperTitle: 'Hyperglycemia Signs',
      hyperSigns: 'Excessive thirst, frequent urination, fatigue',
      ketoneTitle: 'Ketone Testing',
      ketoneInstruction: 'Test when blood sugar > 250 mg/dL (13.9 mmol/L)',
    },
    caregiverTraining: {
      message:
        "Parents/caregivers have received training to adjust the insulin. They are skilled in changing insulin dosages according to the patient's needs.",
    },
    doctorSection: {
      healthProfessional: 'Health care professional',
      nameInPrint: 'Name in print letters',
      signature: 'Signature',
      dateFormat: 'Date DD/MM/YYYY',
      doctor: 'Doctor',
      enterName: 'Enter name',
      keepSheetAccessible:
        'Keep this sheet accessible at all times - For medical reference only',
      printSheet: 'Print Sheet',
      saveData: 'Save Data',
      shareWithDoctor: 'Share with Doctor',
    },
    shareInfo: {
      title: 'Share with Doctor:',
      description:
        'Copies your insulin doses and notes to clipboard, then paste in email, WhatsApp, or text message to your healthcare provider.',
    },
    dashboard: {
      title: 'Diabetes Management System',
      subtitle: 'Real-time glucose monitoring with AI-powered predictions',
      tabs: {
        monitoring: 'Monitoring',
        dosage: 'Insulin Dose Sheet',
      },
    },
    patient: {
      manualInput: 'Patient Manual Input',
      currentGlucose: 'Current Glucose (mg/dL)',
      insulinUnits: 'Insulin (units)',
      carbsGrams: 'Carbs (grams)',
      activityMinutes: 'Activity (minutes)',
      addReadingGeneratePrediction: 'Add Reading & Generate Prediction',
    },
    alerts: {
      title: 'Alert Settings',
      lowThreshold: 'Low Threshold (mg/dL)',
      highThreshold: 'High Threshold (mg/dL)',
    },
    aiPrediction: {
      title: 'AI Prediction Engine',
      nextPrediction: 'Next 30-minute prediction:',
      basedOn: 'Based on time-series analysis + rule-based factors',
    },
    doctorNotes: {
      recommendations: 'Treatment Recommendations',
      specialInstructions: 'Special Instructions',
      nextAppointment: 'Next Appointment:',
    },
    monitoring: {
      realTimeGlucose: 'Real-Time Blood Glucose',
      actualReadings: 'Actual readings',
      aiPredictions: 'AI predictions',
    },
    alertsSystem: {
      title: 'Alerts System',
      noActiveAlerts: 'No active alerts',
    },
    historicalDatabase: {
      title: 'Historical Database',
      totalReadings: 'Total Readings',
      dataPointsToday: 'Data Points Today',
    },
  },

  biomarkerTracker: {
    title: 'Biomarker tracker',
    bmi: {
      notSet: 'Not set',
      underweight: 'Underweight',
      normal: 'Normal',
      overweight: 'Overweight',
      obese: 'Obese',
    },
    doctorNotes: {
      recommendations: 'Continue current medication and diet.',
      specialInstructions: 'Monitor glucose before bedtime.',
    },
    alerts: {
      hypo: 'Glucose dropped below {{threshold}} mg/dL',
      hyper: 'Glucose exceeded {{threshold}} mg/dL',
    },
    hba1cTitle: 'HbA1c (Glycated Hemoglobin)',
    hba1cPlaceholder: '7.5',
    hba1cUnit: '%',
    hba1cTarget: 'Target: <7% for most adults',
    bloodPressureTitle: 'Blood Pressure',
    bloodPressureSystolicPlaceholder: '120',
    bloodPressureDiastolicPlaceholder: '80',
    bloodPressureUnit: 'mmHg',
    bloodPressureTarget: 'Target: <130/80 mmHg',
    weightBmiTitle: 'Weight & BMI',
    weightPlaceholder: '70',
    weightUnit: 'kg',
    heightPlaceholder: '170',
    heightUnit: 'cm',
    bmiLabel: 'BMI',
    cholesterolProfileTitle: 'Cholesterol Profile',
    cholesterolPlaceholderTotal: 'Total',
    cholesterolPlaceholderHDL: 'HDL',
    cholesterolPlaceholderLDL: 'LDL',
    cholesterolPlaceholderTriglycerides: 'Triglycerides',
    cholesterolUnit: 'mg/dL',
    cholesterolTargets: 'Targets: LDL <100, HDL >40♂/50♀, TG <150',
    kidneyFunctionTitle: 'Kidney Function',
    creatininePlaceholder: '1.0',
    creatinineUnit: 'mg/dL',
    microalbuminPlaceholder: 'Microalbumin',
    microalbuminUnit: 'mg/g',
    screeningExamsTitle: 'Screening Exams',
    lastEyeExamLabel: 'Last Eye Exam',
    lastFootExamLabel: 'Last Foot Exam',
    screeningExamsNote: 'Annual eye & foot exams recommended',
    quickSummaryTitle: 'Quick Summary',
    hba1cLabel: 'HbA1c',
    bpLabel: 'BP',
    ldlLabel: 'LDL',
    notSet: 'Not set',
    aiPredictionEngineTitle: 'AI Prediction Engine',
    nextPredictionLabel: 'Next 30-minute prediction:',
    predictionUnit: '{{value}} mg/dL',
    predictionNote: 'Based on time-series analysis + rule-based factors',
    doctorsRecommendations: "Doctor's Recommendations",
    treatmentRecommendations: 'Treatment Recommendations',
    specialInstructions: 'Special Instructions',
    nextAppointment: 'Next Appointment:',
    realTimeBloodGlucose: 'Real-Time Blood Glucose',
    glucoseLegend: {
      actualReadings: 'Actual readings',
      aiPredictions: 'AI predictions',
    },
    alertsSystem: {
      title: 'Alerts System',
      noAlerts: 'No active alerts',
      hypoAlert: 'Hypoglycemia Alert',
      hyperAlert: 'Hyperglycemia Alert',
      alertMessage: '{{message}}',
    },
    historicalDatabase: {
      title: 'Historical Database',
      totalReadings: 'Total Readings',
      dataPointsToday: 'Data Points Today',
    },
  },

  predictiveAlertHeader: {
    title: 'Predictive Alert',
  },

  predictiveAlertScreenFixes: {
    predictiveAlert: {
      title: 'Predictive Alert!',
      risk: 'Risk of Hypoglycemia (prob={{probability}}%)',
      forecast: 'Forecast: BG may drop to {{bg}} mg/dL in {{minutes}} min',
      suggestion: 'Suggestion: Re-check BG in {{minutes}} min',
    },
    currentBG: {
      label: 'Current BG',
      value: '{{value}} {{unit}}',
    },
    enterFood: {
      title: 'Enter Food',
      food: {
        name: 'Rice',
        carbs: '{{amount}}g carbs',
      },
      insulin: {
        name: 'Rapid',
        dose: '{{units}} units',
      },
    },
    activityCard: {
      title: 'Activity',
      description: 'Yes Moderate 30 min',
    },
    predictiveAlerts: {
      title: 'Predictive AI Alerts',
      status: 'Status: {{state}}',
      forecast: 'Next 30 min forecast: {{trend}} ({{change}})',
    },
    nextForecast: {
      label: 'Next 30 min forecast: Stable (',
      change: '↓ 2 mg/dL',
    },
  },

  predictiveCard: {
    predictiveAlert: {
      title: 'Predictive Alert!',
      dismissAria: 'Dismiss',
      loading: 'Loading...',
      moreInfo: 'More info',
    },
    aiSummary: {
      error: 'Error getting summary.',
    },
  },

  useReminders: {
    toast: {
      errorTitle: 'Error',
      remindersLoadError: 'Failed to load reminders',
      reminderCreatedTitle: '✅ Reminder Created',
      reminderScheduled: '{{title}} has been scheduled',
      reminderCreateError: 'Unable to create reminder',
      reminderUpdatedTitle: '✅ Reminder Updated',
      reminderUpdatedDescription: 'Changes have been saved',
      reminderUpdateErrorDescription: 'Unable to update reminder',
      reminderDeletedTitle: '🗑️ Reminder deleted',
      reminderDeletedDescription: 'The reminder has been deleted',
      reminderDeleteErrorDescription: 'Unable to delete the reminder',
      reminderActionTitle: '{{emoji}} Reminder {{status}}',
      reminderActionDescription: '{{notes, default=Action saved}}',
      reminderActionErrorDescription: 'Unable to save action',
      reminderStatus: {
        completed: 'completed',
        snoozed: 'snoozed',
        missed: 'marked missed',
      },
    },
    typeMap: {
      insulin: {
        name: 'Insulin',
      },
      medication: {
        name: 'Medication',
      },
      glucose_test: {
        name: 'Glucose Test',
      },
      meal: {
        name: 'Meal',
      },
      activity: {
        name: 'Activity',
      },
    },
  },

  paymentPlan: {
    patientPlan: {
      title: 'Klukoo Patient',
      subtitle: 'Complete patient plan with consultations',
      pricePerMonth: 'per month',
      features: {
        allFeatures: 'All features',
        consultationsPerMonth: '10 consultations per month',
        chat: 'Klukoo Chat',
        news: 'Klukoo News',
        personalizedAlerts: 'Personalized alerts',
        glucoseTracking: 'Glucose tracking',
      },
      cta: 'Select',
    },

    familyPlan: {
      title: 'Klukoo Family',
      subtitle: 'Family plan with data sharing',
      pricePerMonth: 'per month',
      features: {
        allFeatures: 'All features',
        consultationsPerMonth: '10 consultations per month',
        chat: 'Klukoo Chat',
        news: 'Klukoo News',
        familySharing: 'Share with 3 family members',
        familyAlerts: 'Family alerts',

        glucoseTracking: 'Glucose tracking',
      },
      cta: 'Choose this plan',
    },
  },
};
