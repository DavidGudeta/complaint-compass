export type Language = 'en' | 'am' | 'om';

export const languageNames: Record<Language, string> = {
  en: 'English',
  am: 'አማርኛ',
  om: 'Afan Oromo',
};

const translations = {
  // Header
  'header.title': {
    en: 'MOR Complaints Portal',
    am: 'MOR የቅሬታ ፖርታል',
    om: 'MOR Poortaala Komii',
  },
  'header.subtitle': {
    en: 'Ministry of Revenues',
    am: 'የገቢዎች ሚኒስቴር',
    om: 'Ministeera Galii',
  },
  'header.suggestions': {
    en: 'Suggestions',
    am: 'ጥቆማዎች',
    om: 'Yaadota',
  },
  'header.staffLogin': {
    en: 'Staff Login',
    am: 'የሠራተኛ መግቢያ',
    om: 'Seensa Hojjataa',
  },

  // Hero
  'hero.title': {
    en: 'Ethiopia Ministry of Revenues\nComplaints Portal',
    am: 'የኢትዮጵያ የገቢዎች ሚኒስቴር\nየቅሬታ ፖርታል',
    om: 'Ministeera Galii Itoophiyaa\nPoortaala Komii',
  },
  'hero.subtitle': {
    en: 'Submit and track your complaints with ease. We are committed to resolving your concerns promptly and transparently.',
    am: 'ቅሬታዎን በቀላሉ ያስገቡ እና ይከታተሉ። ችግሮችዎን በፍጥነት እና በግልፅ ለመፍታት ቁርጠኞች ነን።',
    om: 'Komii keessan salphaatti galchaa fi hordofaa. Dhimma keessan ariitiin fi iftoominaan furuuf kutannoo qabna.',
  },
  'hero.submit': {
    en: 'Submit a Complaint',
    am: 'ቅሬታ ያስገቡ',
    om: 'Komii Galchaa',
  },
  'hero.track': {
    en: 'Track Complaint',
    am: 'ቅሬታ ይከታተሉ',
    om: 'Komii Hordofaa',
  },

  // Features
  'feature.easySubmission': {
    en: 'Easy Submission',
    am: 'ቀላል ማስገባት',
    om: 'Galchuu Salphaa',
  },
  'feature.easySubmissionDesc': {
    en: 'Submit your complaint online in minutes with our simple form.',
    am: 'ቅሬታዎን በቀላል ቅጽ በደቂቃዎች ውስጥ በመስመር ላይ ያስገቡ።',
    om: 'Komii keessan unka salphaatiin daqiiqaa keessatti sarara irratti galchaa.',
  },
  'feature.realTimeTracking': {
    en: 'Real-time Tracking',
    am: 'በቀጥታ መከታተል',
    om: 'Hordoffii Yeroo Dhugaa',
  },
  'feature.realTimeTrackingDesc': {
    en: 'Track your complaint status with our visual progress tracker.',
    am: 'የቅሬታዎን ሁኔታ በእይታ ግስጋሴ ማሳያ ይከታተሉ።',
    om: 'Haala komii keessanii hordoffii mul\'ataa keenyaan hordofaa.',
  },
  'feature.transparentProcess': {
    en: 'Transparent Process',
    am: 'ግልፅ ሂደት',
    om: 'Adeemsa Iftoomina',
  },
  'feature.transparentProcessDesc': {
    en: 'Every step is documented and visible for full accountability.',
    am: 'ሙሉ ተጠያቂነት ለማግኘት ሁሉም ደረጃ ተመዝግቧል።',
    om: 'Tarkaanfiin hundi galmaa\'ee mul\'ataadha.',
  },

  // Submit form
  'submit.title': {
    en: 'Submit a Complaint',
    am: 'ቅሬታ ያስገቡ',
    om: 'Komii Galchaa',
  },
  'submit.tinPrompt': {
    en: 'First, verify your TIN (Tax Identification Number) to proceed.',
    am: 'ለመቀጠል የTIN (የግብር መለያ ቁጥር) ያረጋግጡ።',
    om: 'Itti fufuuf TIN (Lakk. Addaa Gibiraa) keessan mirkaneessaa.',
  },
  'submit.enterTin': {
    en: 'Enter your TIN...',
    am: 'TIN ያስገቡ...',
    om: 'TIN keessan galchaa...',
  },
  'submit.verify': {
    en: 'Verify',
    am: 'ያረጋግጡ',
    om: 'Mirkaneessaa',
  },
  'submit.tinVerified': {
    en: 'TIN Verified',
    am: 'TIN ተረጋግጧል',
    om: 'TIN Mirkanaa\'eera',
  },
  'submit.fullName': {
    en: 'Full Name',
    am: 'ሙሉ ስም',
    om: 'Maqaa Guutuu',
  },
  'submit.contact': {
    en: 'Contact Number',
    am: 'ስልክ ቁጥር',
    om: 'Lakk. Bilbilaa',
  },
  'submit.details': {
    en: 'Complaint Details',
    am: 'የቅሬታ ዝርዝር',
    om: 'Ibsa Komii',
  },
  'submit.attachments': {
    en: 'Attachments (optional, max 5 files, 5MB each)',
    am: 'አባሪዎች (አማራጭ፣ ቢበዛ 5 ፋይሎች፣ 5ሜባ)',
    om: 'Dabaleewwan (filannoo, faayilii 5, 5MB)',
  },
  'submit.clickToSelect': {
    en: 'Click to select files',
    am: 'ፋይሎችን ለመምረጥ ይጫኑ',
    om: 'Faayilii filuuf tuqaa',
  },
  'submit.fileTypes': {
    en: 'PDF, Images, Documents — up to 5MB each',
    am: 'PDF፣ ምስሎች፣ ሰነዶች — እስከ 5ሜባ',
    om: 'PDF, Suuraa, Sanadoota — hanga 5MB',
  },
  'submit.button': {
    en: 'Submit Complaint',
    am: 'ቅሬታ ያስገቡ',
    om: 'Komii Galchaa',
  },
  'submit.success': {
    en: 'Complaint submitted! Your tracking ID',
    am: 'ቅሬታ ገብቷል! የመከታተያ ቁጥርዎ',
    om: 'Komiin galmeeffameera! Lakk. hordoffii keessan',
  },

  // Track form
  'track.title': {
    en: 'Track Your Complaint',
    am: 'ቅሬታዎን ይከታተሉ',
    om: 'Komii Keessan Hordofaa',
  },
  'track.prompt': {
    en: 'Enter your Complaint Code to view your complaint status.',
    am: 'የቅሬታዎን ሁኔታ ለማየት የቅሬታ ኮድ ያስገቡ።',
    om: 'Haala komii keessanii ilaaluuf koodii komii galchaa.',
  },
  'track.placeholder': {
    en: 'e.g. CMP-2026-001',
    am: 'ለምሳሌ CMP-2026-001',
    om: 'fkn. CMP-2026-001',
  },
  'track.search': {
    en: 'Search',
    am: 'ፈልግ',
    om: 'Barbaadi',
  },
  'track.enterCode': {
    en: 'Please enter a complaint code',
    am: 'የቅሬታ ኮድ ያስገቡ',
    om: 'Koodii komii galchaa',
  },
  'track.notFound': {
    en: 'No complaint found with that code. Please check and try again.',
    am: 'በዚህ ኮድ ቅሬታ አልተገኘም። እባክዎ ያረጋግጡና ዳግም ይሞክሩ።',
    om: 'Koodii kanaan komiin hin argamne. Mirkaneessaatii irra deebi\'aa yaali.',
  },
  'track.complainant': {
    en: 'Complainant',
    am: 'አቤቱታ አቅራቢ',
    om: 'Komii Dhiyeessaa',
  },
  'track.category': {
    en: 'Category',
    am: 'ምድብ',
    om: 'Gosa',
  },
  'track.pending': {
    en: 'Pending',
    am: 'በመጠባበቅ ላይ',
    om: 'Eeggataa',
  },
  'track.submitted': {
    en: 'Submitted',
    am: 'የገባበት ቀን',
    om: 'Guyyaa Galme',
  },
  'track.lastUpdated': {
    en: 'Last Updated',
    am: 'መጨረሻ የተዘመነ',
    om: 'Yeroo Dhumaa Haaromfame',
  },
  'track.progress': {
    en: 'Complaint Progress',
    am: 'የቅሬታ ግስጋሴ',
    om: 'Adeemsa Komii',
  },
  'track.details': {
    en: 'Complaint Details',
    am: 'የቅሬታ ዝርዝር',
    om: 'Ibsa Komii',
  },
  'track.uploadTitle': {
    en: 'Upload Additional Documents',
    am: 'ተጨማሪ ሰነዶች ይስቀሉ',
    om: 'Sanadoota Dabalataa Olkaa\'aa',
  },
  'track.uploadDesc': {
    en: 'Upload supporting documents for this complaint (max 5 files, 5MB each).',
    am: 'ለዚህ ቅሬታ ደጋፊ ሰነዶችን ይስቀሉ (ቢበዛ 5 ፋይሎች፣ 5ሜባ)።',
    om: 'Sanadoota deeggarsa komii kanaaf olkaa\'aa (faayilii 5, 5MB).',
  },
  'track.uploadButton': {
    en: 'Upload',
    am: 'ይስቀሉ',
    om: 'Olkaa\'i',
  },
  'track.uploadSuccess': {
    en: 'document(s) uploaded successfully',
    am: 'ሰነድ(ዶች) በተሳካ ሁኔታ ተሰቅሏል',
    om: 'sanadoot(n)i milkaa\'inaan olkaa\'ameera',
  },

  // Common
  'common.filesAttached': {
    en: 'files attached',
    am: 'ፋይሎች ተያይዘዋል',
    om: 'faayiliin qabsiifame',
  },
  'common.exceeds5MB': {
    en: 'exceeds 5MB limit',
    am: '5ሜባ ገደብ ያልፋል',
    om: 'daangaa 5MB darbee',
  },
  'common.maxFiles': {
    en: 'Maximum 5 files allowed',
    am: 'ቢበዛ 5 ፋይሎች ይፈቀዳሉ',
    om: 'Faayilii 5 qofa hayyamamee',
  },
  'common.selectFile': {
    en: 'Please select at least one file to upload',
    am: 'ቢያንስ አንድ ፋይል ይምረጡ',
    om: 'Yoo xiqqaate faayilii tokko filaa',
  },
  'common.invalidTin': {
    en: 'Please enter a valid TIN (at least 5 digits)',
    am: 'ትክክለኛ TIN ያስገቡ (ቢያንስ 5 ቁጥሮች)',
    om: 'TIN sirrii galchaa (yoo xiqqaate lakk. 5)',
  },
  'common.cancel': {
    en: 'Cancel',
    am: 'ሰርዝ',
    om: 'Haquu',
  },

  // Footer
  'footer.rights': {
    en: '© 2026 MOR Complaints Portal. All rights reserved.',
    am: '© 2026 MOR የቅሬታ ፖርታል። መብቱ በህግ የተጠበቀ ነው።',
    om: '© 2026 MOR Poortaala Komii. Mirgi seeraan eegame.',
  },

  // Staff Login
  'login.title': {
    en: 'Staff Login',
    am: 'የሠራተኛ መግቢያ',
    om: 'Seensa Hojjataa',
  },
  'login.subtitle': {
    en: 'Sign in to your complaints portal account',
    am: 'ወደ ቅሬታ ፖርታል መለያዎ ይግቡ',
    om: 'Gara herrega poortaala komii keessanitti seenaa',
  },
  'login.email': {
    en: 'Email',
    am: 'ኢሜይል',
    om: 'Imeelii',
  },
  'login.password': {
    en: 'Password',
    am: 'የይለፍ ቃል',
    om: 'Jecha Darbii',
  },
  'login.enterEmail': {
    en: 'Enter your email',
    am: 'ኢሜይልዎን ያስገቡ',
    om: 'Imeelii keessan galchaa',
  },
  'login.enterPassword': {
    en: 'Enter your password',
    am: 'የይለፍ ቃልዎን ያስገቡ',
    om: 'Jecha darbii keessan galchaa',
  },
  'login.signIn': {
    en: 'Sign In',
    am: 'ይግቡ',
    om: 'Seeni',
  },
  'login.demoAccounts': {
    en: 'Demo Accounts',
    am: 'የማሳያ መለያዎች',
    om: 'Herrega Agarsiisaa',
  },
  'login.welcome': {
    en: 'Welcome back!',
    am: 'እንኳን ደህና መጡ!',
    om: 'Baga nagaan dhufte!',
  },
  'login.invalid': {
    en: 'Invalid credentials',
    am: 'ልክ ያልሆነ መረጃ',
    om: 'Ragaa sirrii miti',
  },

  // Dashboard Header
  'dashboard.portal': {
    en: 'Complaints Portal',
    am: 'የቅሬታ ፖርታል',
    om: 'Poortaala Komii',
  },
  'dashboard.notifications': {
    en: 'Notifications',
    am: 'ማሳወቂያዎች',
    om: 'Beeksisa',
  },
  'dashboard.markAllRead': {
    en: 'Mark all read',
    am: 'ሁሉንም እንደተነበበ ምልክት አድርግ',
    om: 'Hunda dubbifame godhii',
  },
  'dashboard.noNotifications': {
    en: 'No notifications',
    am: 'ምንም ማሳወቂያ የለም',
    om: 'Beeksisni hin jiru',
  },
  'dashboard.editProfile': {
    en: 'Edit Profile',
    am: 'መገለጫ ያስተካክሉ',
    om: 'Profaayilii Sirreessi',
  },
  'dashboard.changePassword': {
    en: 'Change Password',
    am: 'የይለፍ ቃል ይቀይሩ',
    om: 'Jecha Darbii Jijjiiri',
  },
  'dashboard.logout': {
    en: 'Logout',
    am: 'ውጣ',
    om: 'Ba\'i',
  },
  'dashboard.profileUpdated': {
    en: 'Profile updated successfully',
    am: 'መገለጫ በተሳካ ሁኔታ ተዘምኗል',
    om: 'Profaayiliin milkaa\'inaan haaromfame',
  },
  'dashboard.passwordChanged': {
    en: 'Password changed successfully',
    am: 'የይለፍ ቃል በተሳካ ሁኔታ ተቀይሯል',
    om: 'Jechni darbii milkaa\'inaan jijjiirame',
  },
  'dashboard.passwordMismatch': {
    en: 'Passwords do not match',
    am: 'የይለፍ ቃሎች አይመሳሰሉም',
    om: 'Jechooti darbii wal hin simne',
  },
  'dashboard.passwordTooShort': {
    en: 'Password must be at least 6 characters',
    am: 'የይለፍ ቃል ቢያንስ 6 ቁምፊ መሆን አለበት',
    om: 'Jechni darbii yoo xiqqaate arfii 6 ta\'uu qaba',
  },
  'dashboard.fullName': {
    en: 'Full Name',
    am: 'ሙሉ ስም',
    om: 'Maqaa Guutuu',
  },
  'dashboard.role': {
    en: 'Role',
    am: 'ሚና',
    om: 'Gahee',
  },
  'dashboard.saveChanges': {
    en: 'Save Changes',
    am: 'ለውጦችን ያስቀምጡ',
    om: 'Jijjiirama Olkaa\'i',
  },
  'dashboard.currentPassword': {
    en: 'Current Password',
    am: 'የአሁኑ የይለፍ ቃል',
    om: 'Jecha Darbii Ammaa',
  },
  'dashboard.newPassword': {
    en: 'New Password',
    am: 'አዲስ የይለፍ ቃል',
    om: 'Jecha Darbii Haaraa',
  },
  'dashboard.confirmPassword': {
    en: 'Confirm New Password',
    am: 'አዲስ የይለፍ ቃል ያረጋግጡ',
    om: 'Jecha Darbii Haaraa Mirkaneessi',
  },
  'dashboard.updatePassword': {
    en: 'Update Password',
    am: 'የይለፍ ቃል ያዘምኑ',
    om: 'Jecha Darbii Haaromsi',
  },

  // Sidebar
  'nav.navigation': {
    en: 'Navigation',
    am: 'ሜኑ',
    om: 'Qajeelfama',
  },
  'nav.dashboard': {
    en: 'Dashboard',
    am: 'ዳሽቦርድ',
    om: 'Daashboordii',
  },
  'nav.users': {
    en: 'Users',
    am: 'ተጠቃሚዎች',
    om: 'Fayyadamtoota',
  },
  'nav.roles': {
    en: 'Roles',
    am: 'ሚናዎች',
    om: 'Gaheelee',
  },
  'nav.userStatus': {
    en: 'User Status',
    am: 'የተጠቃሚ ሁኔታ',
    om: 'Haala Fayyadamtootaa',
  },
  'nav.cases': {
    en: 'Cases',
    am: 'ጉዳዮች',
    om: 'Dhimmoota',
  },
  'nav.allComplaints': {
    en: 'All Complaints',
    am: 'ሁሉም ቅሬታዎች',
    om: 'Komii Hundaa',
  },
  'nav.allAssessments': {
    en: 'All Assessments',
    am: 'ሁሉም ግምገማዎች',
    om: 'Madaallii Hundaa',
  },
  'nav.allResponses': {
    en: 'All Responses',
    am: 'ሁሉም ምላሾች',
    om: 'Deebii Hundaa',
  },
  'nav.allApprovals': {
    en: 'All Approvals',
    am: 'ሁሉም ማፅደቂያዎች',
    om: 'Hayyama Hundaa',
  },
  'nav.reports': {
    en: 'Reports',
    am: 'ሪፖርቶች',
    om: 'Gabaasaalee',
  },
  'nav.complaintsReports': {
    en: 'Complaints Reports',
    am: 'የቅሬታ ሪፖርቶች',
    om: 'Gabaasa Komii',
  },
  'nav.assessmentReports': {
    en: 'Assessment Reports',
    am: 'የግምገማ ሪፖርቶች',
    om: 'Gabaasa Madaallii',
  },
  'nav.responseReports': {
    en: 'Response Reports',
    am: 'የምላሽ ሪፖርቶች',
    om: 'Gabaasa Deebii',
  },
  'nav.feedbackReports': {
    en: 'Feedback Reports',
    am: 'የአስተያየት ሪፖርቶች',
    om: 'Gabaasa Yaada',
  },
  'nav.performanceReports': {
    en: 'Performance Reports',
    am: 'የአፈፃፀም ሪፖርቶች',
    om: 'Gabaasa Raawwii',
  },
  'nav.settings': {
    en: 'Settings',
    am: 'ቅንብሮች',
    om: 'Qindaa\'ina',
  },
  'nav.categorySubcategory': {
    en: 'Category & Subcategory',
    am: 'ምድብ እና ንኡስ ምድብ',
    om: 'Gosa fi Gosa Xiqqaa',
  },
  'nav.complaintStatus': {
    en: 'Complaint Status',
    am: 'የቅሬታ ሁኔታ',
    om: 'Haala Komii',
  },
  'nav.manage': {
    en: 'Manage',
    am: 'አስተዳድር',
    om: 'Bulchi',
  },
  'nav.reopenedComplaints': {
    en: 'Re-opened Complaints',
    am: 'ዳግም የተከፈቱ ቅሬታዎች',
    om: 'Komii Irra Deebi\'amee Baname',
  },
  'nav.assignComplaints': {
    en: 'Assign Complaints',
    am: 'ቅሬታ ይመድቡ',
    om: 'Komii Ramadaa',
  },
  'nav.unassignedComplaints': {
    en: 'Unassigned Complaints',
    am: 'ያልተመደቡ ቅሬታዎች',
    om: 'Komii Hin Ramadamne',
  },
  'nav.closedComplaints': {
    en: 'Closed Complaints',
    am: 'የተዘጉ ቅሬታዎች',
    om: 'Komii Cufame',
  },
  'nav.myComplaints': {
    en: 'My Complaints',
    am: 'የእኔ ቅሬታዎች',
    om: 'Komii Koo',
  },
  'nav.myAssessments': {
    en: 'My Assessments',
    am: 'የእኔ ግምገማዎች',
    om: 'Madaallii Koo',
  },
  'nav.myResponses': {
    en: 'My Responses',
    am: 'የእኔ ምላሾች',
    om: 'Deebii Koo',
  },
  'nav.approvedResponses': {
    en: 'Approved Responses',
    am: 'የፀደቁ ምላሾች',
    om: 'Deebii Hayyamame',
  },
  'nav.incomingComplaints': {
    en: 'Incoming Complaints',
    am: 'የገቡ ቅሬታዎች',
    om: 'Komii Dhufaa',
  },
  'nav.assessments': {
    en: 'Assessments',
    am: 'ግምገማዎች',
    om: 'Madaalliiwwan',
  },
  'nav.responses': {
    en: 'Responses',
    am: 'ምላሾች',
    om: 'Deebii',
  },

  // Role labels
  'role.admin': {
    en: 'Administrator',
    am: 'አስተዳዳሪ',
    om: 'Bulchaa',
  },
  'role.director': {
    en: 'Director',
    am: 'ዳይሬክተር',
    om: 'Daayreektara',
  },
  'role.team_leader': {
    en: 'Team Leader',
    am: 'ቡድን መሪ',
    om: 'Hogganaa Garee',
  },
  'role.officer': {
    en: 'Officer',
    am: 'ኦፊሰር',
    om: 'Qondaala',
  },
  'role.directorate': {
    en: 'Directorate',
    am: 'ዳይሬክቶሬት',
    om: 'Daayreektooreeti',
  },
} as const;

export type TranslationKey = keyof typeof translations;

export const t = (key: TranslationKey, lang: Language): string => {
  const entry = translations[key];
  return entry?.[lang] || entry?.['en'] || key;
};

export default translations;
