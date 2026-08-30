import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Camera,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Home,
  User,
  ArrowLeft,
  Eye,
  ShieldAlert,
  CheckCircle2,
  Loader2,
  Radio,
  Plus,
  Globe,
  Users,
  Sparkles,
  Bell,
  BellRing,
  Check,
  Trash2,
  Lock,
  Navigation,
  Shield,
  Siren,
  PhoneCall,
  X,
  Pencil,
  Share2,
  Search,
  Heart,
} from "lucide-react";

// ============================== Fonts ==============================
function useFonts() {
  useEffect(() => {
    const l1 = document.createElement("link");
    l1.rel = "stylesheet";
    l1.href = "https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap";
    const l2 = document.createElement("link");
    l2.rel = "stylesheet";
    l2.href =
      "https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Nastaliq+Urdu:wght@500;700&display=swap";
    document.head.appendChild(l1);
    document.head.appendChild(l2);
    const style = document.createElement("style");
    style.textContent = `
      @keyframes khoj-pulse { 0% { transform: scale(0.9); opacity: 0.9; } 70% { transform: scale(2.2); opacity: 0; } 100% { transform: scale(2.2); opacity: 0; } }
      @keyframes khoj-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes khoj-ring { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.9); opacity: 0; } }
      .khoj-card-in { animation: khoj-rise 0.45s cubic-bezier(.2,.7,.3,1) both; }
      .khoj-nastaliq { font-family: 'Noto Nastaliq Urdu', serif; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(l1);
      document.head.removeChild(l2);
      document.head.removeChild(style);
    };
  }, []);
}

// ============================== Languages ==============================
const LANGS = [
  { code: "en", label: "English", script: "latin" },
  { code: "ur", label: "اردو", script: "urdu" },
  { code: "roman", label: "Roman Urdu", script: "latin" },
  { code: "pa", label: "پنجابی", script: "urdu" },
  { code: "ps", label: "پښتو", script: "urdu" },
  { code: "sd", label: "سنڌي", script: "urdu" },
];

const EN = {
  appName: "Khoj",
  tagline: "Community Missing Persons Network",
  activeCases: "Active",
  reunited: "Reunited",
  totalCases: "Total Cases",
  report: "Report",
  tabMissing: "Missing",
  tabFound: "History",
  tabAll: "All",
  emptyTitle: "No records in this view yet.",
  emptySub: "Every report here could be the one that brings someone home. Be the first to post.",
  loading: "Loading the board...",
  back: "Back to board",
  noSightings: "No sightings reported yet.",
  sightingsHeading: "Reported sightings",
  lastSeenOn: "Last seen on",
  homeAddress: "Home address",
  contact: "Contact",
  callNumber: "Call this number if found",
  iSawHim: "I Saw Him",
  iSawHer: "I Saw Her",
  iSawThem: "I Saw Them",
  markFound: "Mark as Found",
  statusMissing: "Missing",
  statusFound: "Reunited",
  reportFormTitle: "Report a Missing Person",
  reportFormSub: "Every detail you share brings them one step closer to home.",
  photo: "Photo",
  choosePhoto: "Choose photo",
  photoHint: "Required — a clear, recent photo helps identification.",
  fullName: "Full name",
  fullNamePh: "Enter full name",
  age: "Age",
  agePh: "e.g. 24",
  gender: "Gender",
  genderMale: "Male",
  genderFemale: "Female",
  genderOther: "Other",
  city: "City",
  cityPh: "e.g. Karachi",
  lastSeenLocation: "Last seen location",
  lastSeenLocationPh: "Area, street, landmark",
  lastSeenDate: "Last seen date",
  lastSeenTime: "Last seen time",
  homeAddressPh: "House / street / area address",
  description: "Physical description",
  descriptionPh: "Height, clothing, distinguishing marks...",
  yourContact: "Family contact number",
  yourContactPh: "So people can call if they spot them",
  cancel: "Cancel",
  submitReport: "Submit Report",
  submitting: "Submitting...",
  reportPosted: "Report posted to the board.",
  errRequired: "Please fill in all required fields.",
  errSave: "Could not save. Please try again.",
  disclaimer: "Khoj is a community board. For kidnapping or any crime, contact the police first.",
  sightingFormTitle: "Report a Sighting",
  sightingFormSubPre: "About",
  sightingFormSubPost: "— where did you see them?",
  seenLocation: "Where did you see them",
  seenLocationPh: "Area, street, landmark",
  seenCity: "City",
  seenDate: "Date seen",
  seenTime: "Time seen",
  notes: "Notes",
  notesPh: "Condition, clothing, who they were with...",
  yourName: "Your name",
  yourNamePh: "Your full name",
  optionalContact: "Your contact number",
  optionalContactPh: "So the family can call you",
  sendSighting: "Send Sighting",
  sightingSent: "Sighting reported — the family has been notified.",
  markedFound: "Marked as Reunited.",
  footerNote: "Khoj is community-run — every report is visible to all users. For danger or crime, contact police first.",
  notifTitle: "Notifications",
  notifEmpty: "No notifications yet.",
  notifClear: "Mark all read",
  follow: "Get updates on this case",
  following: "Getting updates",
  notifyFamily: "notified the family",
  eventNewCase: "New case reported:",
  eventSighting: "New sighting reported for",
  eventFound: "has been reported Reunited!",
  eventVerified: "has been verified and is now live on the board.",
  photoRequired: "A photo of the missing person is required.",
  pinLocation: "Missing person's last location (optional)",
  shareLocation: "Pin this location",
  locationShared: "Location attached",
  locationFailed: "Could not get location",
  viewOnMap: "View on map",
  callFamily: "Call Family",
  callReporter: "Call Reporter",
  callPolice: "Call Police",
  callAmbulance: "Call Ambulance",
  emergencyHelplines: "Emergency Helplines",
  verifyContactTitle: "Confirm it's you",
  verifyContactSub: "Enter the security PIN you set when filing this report to mark it Reunited.",
  verifyContactPh: "Enter your 4-6 digit PIN",
  verifyContinue: "Confirm & Mark Reunited",
  verifyWrong: "Incorrect PIN. Only the person who filed this report knows it.",
  reunionPin: "Set a security PIN",
  reunionPinPh: "Choose a 4-6 digit PIN",
  reunionPinHint: "Private — only you will know this. You'll need it later to mark this case Reunited. Do not share it publicly.",
  homePinLocation: "Missing person's house — pin location (optional)",
  pinHomeLocation: "Pin house location",
  adminLogin: "Admin",
  adminPasswordTitle: "Developer Access",
  adminPasswordSub: "Enter the admin password to manage all cases.",
  adminPasswordPh: "Password",
  adminEnter: "Enter",
  adminWrong: "Incorrect password.",
  adminNext: "Next",
  adminStep2Of: "Step 2 of 2",
  adminStep2Sub: "Enter the second security PIN to finish signing in.",
  adminStep2Ph: "Security PIN",
  adminChecking: "Checking...",
  adminServerError: "Couldn't reach the server. Please try again.",
  adminModeOn: "Admin mode active — you can manage all cases.",
  adminExit: "Exit admin",
  deleteCase: "Delete case",
  deleteSighting: "Delete",
  confirmDeleteCase: "Delete this case permanently? This cannot be undone.",
  confirmDeleteSighting: "Delete this sighting?",
  adminMarkFound: "Mark Reunited (admin)",
  timelineHeading: "Timeline",
  reportedMissingOn: "Reported missing",
  sightedAt: "Sighted at",
  useMyLocation: "Use my current location",
  confirmPin: "Confirm this location",
  tapToPin: "Tap or drag the pin to set the location",
  editCase: "Edit details",
  editSighting: "Edit",
  editReportTitle: "Edit Report",
  saveChanges: "Save Changes",
  editSaved: "Changes saved.",
  edited: "Edited",
  alreadyEdited: "You've already used your one edit for this sighting.",
  filterCity: "City",
  filterGender: "Gender",
  allCities: "All Cities",
  allGenders: "All Genders",
  photos: "Photos",
  photosHint: "Add 1 to 3 clear, recent photos — the first is used as the main photo.",
  addPhoto: "Add photo",
  maxPhotosNote: "Maximum 3 photos.",
  reunitedOn: "Reunited on",
  missingSince: "Missing since",
  reunitedNotice: "This person has been safely reunited with their family.",
  adminFilerLocation: "Here is the filer's location at the time of filing",
  adminSightingLocation: "Here is the reporter's location at the time of reporting",
  verifyEditTitle: "Confirm it's you",
  verifyEditSub: "Enter the security PIN you set when filing this report to edit it.",
  legalWarning: "Filing a false report or otherwise misusing this platform is a serious offence and may result in legal action.",
  locationPromptTitle: "Turn on your location",
  locationPromptBody: "Please allow location access to continue. It helps verify reports and can matter a great deal in an urgent situation.",
  continueBtn: "Continue",
  reunitedLocation: "Reunited near",
  lockedInfoTitle: "Contact & home location",
  lockedInfoMsg: "To protect the family's privacy, their contact number and home location are only shown to people who've reported a sighting for this case.",
  reportToUnlock: "Report a sighting to unlock",
  reportToContactMsg: "Report a sighting first to contact the family.",
  verifiedBadge: "Verified by Khoj Team",
  shareCase: "Share",
  shareText: "Missing:",
  shareHelp: "Please help find this person and share:",
  cooldownMsg: "Please wait a moment before submitting another report — this helps us prevent spam.",
  verifyFilerTitle: "Confirm it's you",
  verifyFilerSub: "Enter this case's security PIN to view sighting reporters' contact details.",
  viewReporterInfo: "Case filer? Verify to view reporter contact",
  reporterInfoLocked: "Reporter contact is only visible to the case filer.",
  foundLocationTitle: "Share where they were found?",
  foundLocationBody: "Optionally share the location where this person was found — it helps our team verify the case. This is completely optional; you can skip it.",
  skipBtn: "Skip",
  shareLocationBtn: "Share Location",
  statusPending: "Pending Review",
  tabPending: "Pending",
  pendingNotice: "This report is awaiting review by the Khoj team before it goes live.",
  pendingBanner: "Submitted! Your report will go live once our team reviews it — usually within a few hours.",
  searchLocationPh: "Search a place or address...",
  confirmBtn: "Confirm",
  editConfirmBtn: "Confirm & Edit",
  searchByName: "Search by name...",
  myPendingRequests: "My Pending Requests",
  myPendingEmpty: "You haven't filed any reports awaiting review.",
  foundLocationMapTitle: "Where was the person found? (optional)",
  adminLocSection1: "Filer's locations",
  adminLocSection2: "Missing person's pin locations",
  adminMarkFoundLocation: "Here is the filer's location at the time this case was marked as reunited",
  markedFoundByAdminNote: "This case was marked as reunited by an admin, so the filer's own location wasn't captured.",
  futureDateError: "The date cannot be in the future.",
  lastLocationByFiler: "Missing person's last location — by case filer",
  myPendingEmptyNew: "You haven't submitted any reports for review.",
  editLockedAfterVerify: "This report can no longer be edited — it has already been verified by the Khoj team.",
  editUntilVerified: "You can edit this report as many times as you like until it's verified by the Khoj team. Once verified, editing will be locked.",
  pendingReviewFriendly: "The Khoj team is reviewing your request. Once the review is complete, your case will be published live on the board.",
  searchUnavailable: "Search isn't available right now — try 'Use my current location' or tap directly on the map instead.",
  shareToHelpHer: "Share to help find her",
  shareToHelpHim: "Share to help find him",
  shareToHelpThem: "Share to help find them",
  today: "today",
  daysAbbrev: "d",
  heroHeadline: "Every hour matters.",
  heroSubline: "Help bring someone home.",
  heroSearching: "people are searching alongside you right now.",
  reunitedHighlight: "was found safe",
  reunitedHighlightSub: "Reunited through this registry.",
  reportedOn: "Reported on",
  sightingEncourage: "Even a small detail — what they were wearing, where you saw them — could be the one that helps.",
  shareEncourage: "The more people who see this, the sooner they come home.",
  timelineEncourage: "This isn't just a timeline — it's people refusing to give up.",
  pendingWaitingEncourage: "The moment this goes live, hundreds of eyes will start looking for them too.",
};

const UR = {
  tagline: "کمیونٹی مسنگ پرسنز نیٹ ورک",
  activeCases: "فعال",
  reunited: "مل گئے",
  totalCases: "کل کیسز",
  report: "رپورٹ",
  tabMissing: "لاپتہ",
  tabFound: "تاریخ",
  tabAll: "سب",
  emptyTitle: "ابھی کوئی ریکارڈ موجود نہیں۔",
  emptySub: "اگر کوئی لاپتہ ہے تو سب سے پہلے رپورٹ جمع کروائیں۔",
  loading: "لوڈ ہو رہا ہے...",
  back: "واپس بورڈ پر",
  noSightings: "ابھی تک کوئی سائٹنگ رپورٹ نہیں ہوئی۔",
  sightingsHeading: "رپورٹ شدہ سائٹنگز",
  lastSeenOn: "آخری بار دیکھا گیا",
  homeAddress: "گھر کا پتہ",
  contact: "رابطہ",
  callNumber: "ملنے پر اس نمبر پر کال کریں",
  iSawHim: "میں نے اسے دیکھا",
  iSawHer: "میں نے اسے دیکھا",
  iSawThem: "میں نے دیکھا ہے",
  markFound: "مل گیا",
  statusMissing: "لاپتہ",
  statusFound: "مل گیا",
  reportFormTitle: "لاپتہ فرد کی رپورٹ",
  reportFormSub: "درست تفصیلات کمیونٹی کو جلد مدد کرنے میں مدد دیتی ہیں۔",
  photo: "تصویر",
  choosePhoto: "تصویر منتخب کریں",
  photoHint: "اختیاری، مگر شناخت میں مدد دیتی ہے۔",
  fullName: "پورا نام",
  fullNamePh: "پورا نام لکھیں",
  age: "عمر",
  agePh: "مثلاً 24",
  gender: "جنس",
  genderMale: "مرد",
  genderFemale: "عورت",
  genderOther: "دیگر",
  city: "شہر",
  cityPh: "مثلاً کراچی",
  lastSeenLocation: "آخری بار کہاں دیکھا",
  lastSeenLocationPh: "علاقہ، سڑک، نشانی",
  lastSeenDate: "آخری تاریخ",
  lastSeenTime: "آخری وقت",
  homeAddressPh: "گھر / سڑک / علاقے کا پتہ",
  description: "حلیہ",
  descriptionPh: "قد، کپڑے، خاص نشانیاں...",
  yourContact: "خاندان کا رابطہ نمبر",
  yourContactPh: "تاکہ لوگ ملنے پر کال کر سکیں",
  cancel: "منسوخ کریں",
  submitReport: "رپورٹ جمع کروائیں",
  submitting: "جمع ہو رہا ہے...",
  reportPosted: "رپورٹ بورڈ پر پوسٹ ہو گئی۔",
  errRequired: "براہ کرم تمام ضروری خانے پُر کریں۔",
  errSave: "محفوظ نہیں ہو سکا۔ دوبارہ کوشش کریں۔",
  disclaimer: "خوج ایک کمیونٹی بورڈ ہے۔ اغوا یا کسی بھی جرم کی صورت میں پہلے پولیس سے رابطہ کریں۔",
  sightingFormTitle: "سائٹنگ رپورٹ",
  sightingFormSubPre: "کے بارے میں",
  sightingFormSubPost: "— آپ نے کہاں دیکھا؟",
  seenLocation: "کہاں دیکھا",
  seenLocationPh: "علاقہ، سڑک، نشانی",
  seenCity: "شہر",
  seenDate: "دیکھنے کی تاریخ",
  seenTime: "دیکھنے کا وقت",
  notes: "تفصیل",
  notesPh: "حالت، کپڑے، کس کے ساتھ تھا...",
  yourName: "آپ کا نام",
  yourNamePh: "اپنا پورا نام",
  optionalContact: "آپ کا رابطہ نمبر",
  optionalContactPh: "تاکہ خاندان آپ کو کال کر سکے",
  sendSighting: "سائٹنگ بھیجیں",
  sightingSent: "سائٹنگ رپورٹ ہو گئی — خاندان کو اطلاع دے دی گئی ہے۔",
  markedFound: "مل گیا کے طور پر نشان زد کر دیا گیا۔",
  footerNote: "خوج ایک کمیونٹی بورڈ ہے — ہر رپورٹ تمام صارفین کو نظر آتی ہے۔ خطرے یا جرم کی صورت میں پہلے پولیس سے رابطہ کریں۔",
  notifTitle: "اطلاعات",
  notifEmpty: "ابھی کوئی اطلاع نہیں۔",
  notifClear: "سب پڑھی ہوئی نشان زد کریں",
  follow: "اس کیس کی اپڈیٹس حاصل کریں",
  following: "اپڈیٹس مل رہی ہیں",
};

const ROMAN = {
  tagline: "Community Missing Persons Network",
  activeCases: "Laapta",
  reunited: "Mil Gaye",
  totalCases: "Kul Cases",
  report: "Report",
  tabMissing: "Laapta",
  tabFound: "Tareekh",
  tabAll: "Sab",
  emptyTitle: "Is list mein abhi koi record nahi.",
  emptySub: "Yahan har report kisi ko ghar wapas la sakti hai. Sabse pehli report post karein.",
  loading: "Board load ho raha hai...",
  back: "Board par wapis",
  noSightings: "Abhi tak koi sighting report nahi hui.",
  sightingsHeading: "Sightings",
  lastSeenOn: "Aakhri taareekh",
  homeAddress: "Ghar ka pata",
  contact: "Rabta",
  callNumber: "Milne par is number par call karein",
  iSawHim: "Maine Usay Dekha",
  iSawHer: "Maine Usay Dekha",
  iSawThem: "Maine Dekha Hai",
  markFound: "Mil Gaya",
  statusMissing: "Laapta",
  statusFound: "Mil Gaya",
  reportFormTitle: "Missing Person Report",
  reportFormSub: "Aapki di hui har detail unhein ghar ke ek qadam aur qareeb le jati hai.",
  photo: "Tasveer",
  choosePhoto: "Tasveer chunein",
  photoHint: "Zaroori hai — saaf aur haali tasveer pehchan mein madad karti hai.",
  fullName: "Poora naam",
  fullNamePh: "Poora naam likhein",
  age: "Umar",
  agePh: "jaise 24",
  gender: "Jins",
  genderMale: "Mard",
  genderFemale: "Aurat",
  genderOther: "Deegar",
  city: "Shehar",
  cityPh: "jaise Karachi",
  lastSeenLocation: "Aakhri baar kahan dekha",
  lastSeenLocationPh: "Ilaqa, sadak, nishaani",
  lastSeenDate: "Aakhri taareekh",
  lastSeenTime: "Aakhri waqt",
  homeAddressPh: "Ghar / sadak / ilaqe ka pata",
  description: "Hulia",
  descriptionPh: "Qad, kapre, khaas nishaniyan...",
  yourContact: "Khandan ka contact number",
  yourContactPh: "Taake log milne par call kar sakein",
  cancel: "Cancel",
  submitReport: "Report Submit Karein",
  submitting: "Submit ho raha hai...",
  reportPosted: "Report board par post ho gayi.",
  errRequired: "Tamam zaroori fields bharein.",
  errSave: "Save nahi hui. Dobara koshish karein.",
  disclaimer: "Khoj ek community board hai. Kidnapping ya kisi bhi jurm ki soorat mein pehle police ko report karein.",
  sightingFormTitle: "Sighting Report",
  sightingFormSubPre: "ke baare mein",
  sightingFormSubPost: "— aapne kahan dekha?",
  seenLocation: "Kahan dekha",
  seenLocationPh: "Ilaqa, sadak, nishaani",
  seenCity: "Shehar",
  seenDate: "Dekhne ki taareekh",
  seenTime: "Dekhne ka waqt",
  notes: "Tafseel",
  notesPh: "Halat, kapre, kis ke saath tha...",
  yourName: "Aapka naam",
  yourNamePh: "Your full name",
  optionalContact: "Aapka contact number",
  optionalContactPh: "Taake khandan aapko call kar sake",
  sendSighting: "Sighting Bhejein",
  sightingSent: "Sighting report ho gayi — khandan ko ittela de di gayi hai.",
  markedFound: "Mil Gaya mark kar diya gaya.",
  footerNote: "Khoj ek community-run board hai — har report tamam users ko nazar aati hai. Khatre ya jurm ki soorat mein pehle police se raabta karein.",
  notifTitle: "Notifications",
  notifEmpty: "Abhi koi notification nahi.",
  notifClear: "Sab parh li gayi mark karein",
  follow: "Is case ki updates hasil karein",
  following: "Updates mil rahi hain",
  photoRequired: "Laapta shaks ki tasveer lagana zaroori hai.",
  pinLocation: "Laapta shaks ki last location (optional)",
  shareLocation: "Ye location pin karein",
  locationShared: "Location attach ho gayi",
  locationFailed: "Location nahi mil saki",
  viewOnMap: "Map par dekhein",
  callFamily: "Khandan ko Call Karein",
  callReporter: "Reporter ko Call Karein",
  callPolice: "Police ko Call Karein",
  callAmbulance: "Ambulance ko Call Karein",
  emergencyHelplines: "Emergency Helplines",
  verifyContactTitle: "Tasdeeq karein ke yeh aap hain",
  verifyContactSub: "Report ko Reunited mark karne ke liye wohi security PIN likhein jo report file karte waqt set kiya tha.",
  verifyContactPh: "Apna 4-6 digit PIN likhein",
  verifyContinue: "Tasdeeq karein & Reunited Mark Karein",
  verifyWrong: "Ghalat PIN. Sirf jisne ye report file ki hai usay hi ye maloom hai.",
  reunionPin: "Security PIN set karein",
  reunionPinPh: "4-6 digit ka PIN chunein",
  reunionPinHint: "Private hai — sirf aapko maloom hoga. Baad mein case ko Reunited mark karne ke liye chahiye hoga. Kisi ke saath share na karein.",
  adminLogin: "Admin",
  adminPasswordTitle: "Developer Access",
  adminPasswordSub: "Tamam cases manage karne ke liye admin password likhein.",
  adminPasswordPh: "Password",
  adminEnter: "Enter Karein",
  adminWrong: "Ghalat password.",
  adminNext: "Agla",
  adminStep2Of: "Step 2 of 2",
  adminStep2Sub: "Sign in mukammal karne ke liye doosra security PIN likhein.",
  adminStep2Ph: "Security PIN",
  adminChecking: "Check ho raha hai...",
  adminServerError: "Server tak nahi pohanch saka. Dobara koshish karein.",
  adminModeOn: "Admin mode active hai — ab aap tamam cases manage kar sakte hain.",
  adminExit: "Admin se bahar niklein",
  deleteCase: "Case delete karein",
  deleteSighting: "Delete",
  confirmDeleteCase: "Ye case hamesha ke liye delete karna hai? Ye wapis nahi ho sakega.",
  confirmDeleteSighting: "Ye sighting delete karni hai?",
  adminMarkFound: "Reunited Mark Karein (admin)",
  timelineHeading: "Timeline",
  reportedMissingOn: "Laapta report hui",
  sightedAt: "Yahan dekha gaya",
  useMyLocation: "Meri current location use karein",
  confirmPin: "Ye location confirm karein",
  tapToPin: "Map par tap ya pin drag karke location set karein",
  editCase: "Details edit karein",
  editSighting: "Edit",
  editReportTitle: "Report Edit Karein",
  saveChanges: "Changes Save Karein",
  editSaved: "Changes save ho gayi.",
  edited: "Edit ho chuki hai",
  alreadyEdited: "Aap is sighting ka apna 1 edit use kar chuke hain.",
  filterCity: "Shehar",
  filterGender: "Jins",
  allCities: "Tamam Shehar",
  allGenders: "Tamam",
  photos: "Tasveerein",
  photosHint: "1 se 3 saaf, haali tasveerein lagayein — pehli wali main photo ban jayegi.",
  addPhoto: "Tasveer add karein",
  maxPhotosNote: "Zyada se zyada 3 tasveerein.",
  reunitedOn: "Reunited hua",
  missingSince: "Laapta hua",
  reunitedNotice: "Ye shaks apne khandan se surakhiyat mil chuka hai.",
  adminFilerLocation: "Filer ki location, jab report file ki thi",
  adminSightingLocation: "Reporter ki location, jab sighting report ki thi",
  verifyEditTitle: "Tasdeeq karein ke yeh aap hain",
  verifyEditSub: "Report edit karne ke liye wohi security PIN likhein jo file karte waqt set kiya tha.",
  legalWarning: "Jhoothi report file karna ya is platform ka ghalat istemal karna sangeen jurm hai aur is par qanooni karwai ho sakti hai.",
  locationPromptTitle: "Apni location on karein",
  locationPromptBody: "Aage barhne ke liye location access allow karein. Ye reports verify karne mein madad karti hai aur emergency mein bohat ahem sabit ho sakti hai.",
  continueBtn: "Aage Barhein",
  reunitedLocation: "Yahan ke qareeb reunited hua",
  lockedInfoTitle: "Contact aur ghar ki location",
  lockedInfoMsg: "Khandan ki privacy protect karne ke liye, unka contact number aur ghar ki location sirf unhi logon ko dikhti hai jinhon ne is case ke liye sighting report ki ho.",
  reportToUnlock: "Unlock karne ke liye sighting report karein",
  reportToContactMsg: "Khandan se raabta karne ke liye pehle sighting report karein.",
  verifiedBadge: "Khoj Team se Verified",
  shareCase: "Share Karein",
  shareText: "Laapta:",
  shareHelp: "Barah-e-meharbani is shaks ko dhoondhne mein madad karein aur share karein:",
  cooldownMsg: "Please thoda intezar karein doosri report submit karne se pehle — isse spam rokne mein madad milti hai.",
  verifyFilerTitle: "Tasdeeq karein ke yeh aap hain",
  verifyFilerSub: "Sighting reporters ka contact dekhne ke liye is case ka security PIN likhein.",
  viewReporterInfo: "Case filer hain? Reporter ka contact dekhne ke liye verify karein",
  reporterInfoLocked: "Reporter ka contact sirf case filer ko hi dikhta hai.",
  foundLocationTitle: "Jahan mile, wo location share karni hai?",
  foundLocationBody: "Optional taur pe wo location share karein jahan ye shaks mila tha — isse hamari team case verify karne mein madad milti hai. Ye bilkul optional hai, aap skip kar sakte hain.",
  skipBtn: "Skip Karein",
  shareLocationBtn: "Location Share Karein",
  statusPending: "Review Pending",
  tabPending: "Pending",
  pendingNotice: "Ye report abhi Khoj team ke review ka intezar kar rahi hai, live hone se pehle.",
  pendingBanner: "Submit ho gayi! Aapki report team ke review ke baad live hogi — usually kuch ghanton mein.",
  searchLocationPh: "Koi jagah ya address search karein...",
  confirmBtn: "Confirm",
  editConfirmBtn: "Confirm & Edit",
  searchByName: "Naam se search karein...",
  myPendingRequests: "Meri Pending Requests",
  myPendingEmpty: "Aapne koi report file nahi ki jo review ka intezar kar rahi ho.",
  adminMarkFoundLocation: "Filer ki location, jab case reunited mark hua",
  foundLocationMapTitle: "Shaks kahan mila? (optional)",
  adminLocSection1: "Filer ki locations",
  adminLocSection2: "Laapta shaks ki pin locations",
  markedFoundByAdminNote: "Ye case admin ne reunited mark kiya tha, is liye filer ki apni location capture nahi hui.",
  futureDateError: "Date future mein nahi ho sakti.",
  lastLocationByFiler: "Missing person's last location — case filer ki taraf se",
  myPendingEmptyNew: "Aapne review ke liye koi report submit nahi ki.",
  editLockedAfterVerify: "Ye report ab edit nahi ho sakti — Khoj team pehle hi ise verify kar chuki hai.",
  editUntilVerified: "Jab tak Khoj team verify nahi karti, aap ye report jitni baar chahen edit kar sakte hain. Verify hone ke baad editing lock ho jayegi.",
  pendingReviewFriendly: "Khoj team aapki request review kar rahi hai. Review mukammal hote hi aapka case board par live kar diya jayega.",
  searchUnavailable: "Search abhi available nahi hai — 'Use my current location' try karein ya seedha map par tap karein.",
  shareToHelpHer: "Unhein dhoondhne mein madad ke liye share karein",
  shareToHelpHim: "Unhein dhoondhne mein madad ke liye share karein",
  shareToHelpThem: "Unhein dhoondhne mein madad ke liye share karein",
  today: "aaj",
  daysAbbrev: "din",
  heroHeadline: "Har ghanta ahem hai.",
  heroSubline: "Kisi ko ghar wapas laane mein madad karein.",
  heroSearching: "log is waqt aapke saath dhoondh rahe hain.",
  reunitedHighlight: "surakhiyat mil gaya",
  reunitedHighlightSub: "Isi registry ke zariye reunited hua.",
  reportedOn: "Report hui",
  sightingEncourage: "Chhoti si detail bhi — unhon ne kya pehna tha, aapne unhein kahan dekha — wahi cheez unhein dhoondhne mein madadgar sabit ho sakti hai.",
  shareEncourage: "Jitne zyada log ye dekhenge, utni jaldi wo ghar wapas aa sakte hain.",
  timelineEncourage: "Ye sirf timeline nahi — ye wo log hain jo haar maanne se inkaar kar rahe hain.",
  pendingWaitingEncourage: "Live hote hi, sainkron nazrein bhi inhein dhoondhna shuru kar dengi.",
};

const PA = {
  tagline: "کمیونٹی مسنگ پرسنز نیٹ ورک",
  activeCases: "فعال",
  reunited: "مل گئے",
  totalCases: "کل کیس",
  report: "رپورٹ",
  tabMissing: "گم",
  tabFound: "تاریخ",
  tabAll: "سارے",
  emptyTitle: "ہالے کوئی ریکارڈ کائنی۔",
  emptySub: "جے کوئی گم اے تے سب توں پہلاں رپورٹ کرو۔",
  loading: "لوڈ ہو رہا اے...",
  back: "بورڈ تے واپس",
  noSightings: "ہالے کوئی سائٹنگ رپورٹ کائنی ہوئی۔",
  sightingsHeading: "سائٹنگز",
  lastSeenOn: "آخری واری ویکھیا",
  homeAddress: "گھر دا پتہ",
  contact: "رابطہ",
  callNumber: "لبھن تے ایس نمبر تے کال کرو",
  iSawHim: "میں اونوں ویکھیا",
  iSawHer: "میں اونوں ویکھیا",
  iSawThem: "میں ویکھیا اے",
  markFound: "مل گیا",
  statusMissing: "گم",
  statusFound: "مل گیا",
  reportFormTitle: "گم ہوئے شخص دی رپورٹ",
  reportFormSub: "درست تفصیلاں کمیونٹی نوں چھیتی مدد کرن دیندیاں نیں۔",
  photo: "تصویر",
  choosePhoto: "تصویر چُنو",
  photoHint: "اختیاری اے، پر پہچان وچ مدد کردی اے۔",
  fullName: "پورا ناں",
  fullNamePh: "پورا ناں لکھو",
  age: "عمر",
  agePh: "جیویں 24",
  gender: "جنس",
  genderMale: "مرد",
  genderFemale: "عورت",
  genderOther: "ہور",
  city: "شہر",
  cityPh: "جیویں لاہور",
  lastSeenLocation: "آخری واری کتھے ویکھیا",
  lastSeenLocationPh: "علاقہ، سڑک، نشانی",
  lastSeenDate: "آخری تاریخ",
  lastSeenTime: "آخری ویلا",
  homeAddressPh: "گھر / سڑک / علاقے دا پتہ",
  description: "حلیہ",
  descriptionPh: "قد، کپڑے، خاص نشانیاں...",
  yourContact: "خاندان دا نمبر",
  yourContactPh: "تاں لوک لبھن تے کال کر سکن",
  cancel: "منسوخ",
  submitReport: "رپورٹ جمع کرو",
  submitting: "جمع ہو رہا اے...",
  reportPosted: "رپورٹ بورڈ تے پوسٹ ہو گئی۔",
  errRequired: "سارے ضروری خانے بھرو۔",
  errSave: "محفوظ نئیں ہویا۔ دوبارہ کوشش کرو۔",
  disclaimer: "خوج اک کمیونٹی بورڈ اے۔ اغوا یا کسے جرم دی صورت وچ پہلاں پولیس نال رابطہ کرو۔",
  sightingFormTitle: "سائٹنگ رپورٹ",
  sightingFormSubPre: "دے بارے وچ",
  sightingFormSubPost: "— توسیں کتھے ویکھیا؟",
  seenLocation: "کتھے ویکھیا",
  seenLocationPh: "علاقہ، سڑک، نشانی",
  seenCity: "شہر",
  seenDate: "ویکھن دی تاریخ",
  seenTime: "ویکھن دا ویلا",
  notes: "تفصیل",
  notesPh: "حالت، کپڑے، کیہدے نال سی...",
  yourName: "تہاڈا ناں",
  yourNamePh: "اپنا پورا نام",
  optionalContact: "تہاڈا نمبر",
  optionalContactPh: "تاں خاندان کال کر سکے",
  sendSighting: "سائٹنگ بھیجو",
  sightingSent: "سائٹنگ رپورٹ ہو گئی — خاندان نوں دس دِتا گیا اے۔",
  markedFound: "مل گیا نشان زد کر دِتا گیا۔",
  footerNote: "خوج اک کمیونٹی بورڈ اے — ہر رپورٹ سارے صارفین نوں نظر آندی اے۔ خطرے دی صورت وچ پہلاں پولیس نال رابطہ کرو۔",
  notifTitle: "اطلاعاں",
  notifEmpty: "ہالے کوئی اطلاع کائنی۔",
  notifClear: "سب پڑھیاں نشان زد کرو",
  follow: "ایس کیس دیاں اپڈیٹس لوو",
  following: "اپڈیٹس مل رہیاں نیں",
};

const PS = {
  tagline: "د ټولنې د ورک شویو خلکو شبکه",
  activeCases: "فعال",
  reunited: "بیرته موندل شوي",
  totalCases: "ټول کیسونه",
  report: "راپور",
  tabMissing: "ورک شوی",
  tabFound: "تاریخ",
  tabAll: "ټول",
  emptyTitle: "تر اوسه کوم ریکارډ نشته.",
  emptySub: "که چا ورک شوی وي، لومړی راپور ورکړئ.",
  loading: "بار کیږي...",
  back: "بورډ ته بیرته",
  noSightings: "تر اوسه کومه لیدنه راپور شوې نه ده.",
  sightingsHeading: "لیدنې",
  lastSeenOn: "وروستی ځل ولیدل شو",
  homeAddress: "د کور پته",
  contact: "اړیکه",
  callNumber: "د موندلو په صورت کې دې شمېرې ته زنګ ووهئ",
  iSawHim: "ما هغه ولیدل",
  iSawHer: "ما هغه ولیدله",
  iSawThem: "ما ولیدل",
  markFound: "موندل شوی",
  statusMissing: "ورک شوی",
  statusFound: "موندل شوی",
  reportFormTitle: "د ورک شوي کس راپور",
  reportFormSub: "سمې تفصیلات د ټولنې لپاره ژر مرسته اسانوي.",
  photo: "انځور",
  choosePhoto: "انځور غوره کړئ",
  photoHint: "اختیاري دی، خو پیژندنه اسانوي.",
  fullName: "بشپړ نوم",
  fullNamePh: "بشپړ نوم ولیکئ",
  age: "عمر",
  agePh: "لکه 24",
  gender: "جنس",
  genderMale: "نارینه",
  genderFemale: "ښځینه",
  genderOther: "نور",
  city: "ښار",
  cityPh: "لکه پېښور",
  lastSeenLocation: "وروستی ځل چېرته ولیدل شو",
  lastSeenLocationPh: "سیمه، سړک، نښه",
  lastSeenDate: "وروستۍ نېټه",
  lastSeenTime: "وروستی وخت",
  homeAddressPh: "د کور / سړک / سیمې پته",
  description: "بڼه",
  descriptionPh: "قد، جامې، ځانګړې نښې...",
  yourContact: "د کورنۍ اړیکه شمېره",
  yourContactPh: "چې خلک د موندلو په صورت کې زنګ ووهي",
  cancel: "لغوه کول",
  submitReport: "راپور ولیږئ",
  submitting: "لیږل کیږي...",
  reportPosted: "راپور بورډ ته ولیږل شو.",
  errRequired: "مهرباني وکړئ ټول اړین ځایونه ډک کړئ.",
  errSave: "خوندي نشول. بیا هڅه وکړئ.",
  disclaimer: "خوج یو ټولنیز بورډ دی. د اختطاف یا هر ډول جرم په صورت کې لومړی پولیسو ته خبر ورکړئ.",
  sightingFormTitle: "د لیدنې راپور",
  sightingFormSubPre: "په اړه",
  sightingFormSubPost: "— تاسو چېرته ولیدل؟",
  seenLocation: "چېرته یې ولیدل",
  seenLocationPh: "سیمه، سړک، نښه",
  seenCity: "ښار",
  seenDate: "د لیدلو نېټه",
  seenTime: "د لیدلو وخت",
  notes: "یادښتونه",
  notesPh: "حالت، جامې، له چا سره و...",
  yourName: "ستاسو نوم",
  yourNamePh: "پنهنجو پورو نالو",
  optionalContact: "ستاسو شمېره",
  optionalContactPh: "چې کورنۍ تاسو ته زنګ ووهي",
  sendSighting: "لیدنه ولیږئ",
  sightingSent: "لیدنه راپور شوه — کورنۍ خبره شوه.",
  markedFound: "د موندل شوي په توګه نښه شو.",
  footerNote: "خوج یو ټولنیز بورډ دی — هر راپور ټولو کاروونکو ته ښکاري. د خطر یا جرم په صورت کې لومړی پولیسو ته خبر ورکړئ.",
  notifTitle: "خبرتیاوې",
  notifEmpty: "تر اوسه کومه خبرتیا نشته.",
  notifClear: "ټول لوستل شوي نښه کړئ",
  follow: "د دې کیس تازه معلومات ترلاسه کړئ",
  following: "تازه معلومات ترلاسه کیږي",
};

const SD = {
  tagline: "ڪميونٽي گم ٿيل ماڻهن نيٽ ورڪ",
  activeCases: "فعال",
  reunited: "مليل",
  totalCases: "ڪل ڪيس",
  report: "رپورٽ",
  tabMissing: "گم",
  tabFound: "تاريخ",
  tabAll: "سڀ",
  emptyTitle: "اڃا تائين ڪو رڪارڊ ناهي.",
  emptySub: "جيڪڏهن ڪو گم آهي ته پهرين رپورٽ ڏيو.",
  loading: "لوڊ ٿي رهيو آهي...",
  back: "بورڊ ڏانهن واپس",
  noSightings: "اڃا تائين ڪا سائٽنگ رپورٽ ناهي ٿي.",
  sightingsHeading: "سائٽنگون",
  lastSeenOn: "آخري ڀيرو ڏٺو ويو",
  homeAddress: "گهر جو پتو",
  contact: "رابطو",
  callNumber: "ملڻ تي هن نمبر تي ڪال ڪريو",
  iSawHim: "مون هن کي ڏٺو",
  iSawHer: "مون هن کي ڏٺو",
  iSawThem: "مون ڏٺو آهي",
  markFound: "ملي ويو",
  statusMissing: "گم",
  statusFound: "ملي ويو",
  reportFormTitle: "گم ٿيل شخص جي رپورٽ",
  reportFormSub: "صحيح تفصيل ڪميونٽي کي جلد مدد ڪرڻ ۾ مدد ڏين ٿا.",
  photo: "تصوير",
  choosePhoto: "تصوير چونڊيو",
  photoHint: "اختياري آهي، پر سڃاڻپ ۾ مدد ڪري ٿي.",
  fullName: "پورو نالو",
  fullNamePh: "پورو نالو لکو",
  age: "عمر",
  agePh: "مثال 24",
  gender: "جنس",
  genderMale: "مرد",
  genderFemale: "عورت",
  genderOther: "ٻيو",
  city: "شهر",
  cityPh: "مثال ڪراچي",
  lastSeenLocation: "آخري ڀيرو ڪٿي ڏٺو ويو",
  lastSeenLocationPh: "علائقو، روڊ، نشاني",
  lastSeenDate: "آخري تاريخ",
  lastSeenTime: "آخري وقت",
  homeAddressPh: "گهر / روڊ / علائقي جو پتو",
  description: "حليو",
  descriptionPh: "قد، ڪپڙا، خاص نشانيون...",
  yourContact: "خاندان جو نمبر",
  yourContactPh: "ته ماڻهو ملڻ تي ڪال ڪري سگهن",
  cancel: "رد ڪريو",
  submitReport: "رپورٽ جمع ڪريو",
  submitting: "جمع ٿي رهيو آهي...",
  reportPosted: "رپورٽ بورڊ تي پوسٽ ٿي وئي.",
  errRequired: "مهرباني ڪري سڀ ضروري خانا ڀريو.",
  errSave: "محفوظ نه ٿيو. ٻيهر ڪوشش ڪريو.",
  disclaimer: "خوج هڪ ڪميونٽي بورڊ آهي. اغوا يا ڪنهن به ڏوهه جي صورت ۾ پهريان پوليس سان رابطو ڪريو.",
  sightingFormTitle: "سائٽنگ رپورٽ",
  sightingFormSubPre: "جي باري ۾",
  sightingFormSubPost: "— توهان ڪٿي ڏٺو؟",
  seenLocation: "ڪٿي ڏٺو",
  seenLocationPh: "علائقو، روڊ، نشاني",
  seenCity: "شهر",
  seenDate: "ڏسڻ جي تاريخ",
  seenTime: "ڏسڻ جو وقت",
  notes: "تفصيل",
  notesPh: "حالت، ڪپڙا، ڪنهن سان هو...",
  yourName: "توهان جو نالو",
  yourNamePh: "پنهنجو پورو نالو",
  optionalContact: "توهان جو نمبر",
  optionalContactPh: "ته خاندان توهان کي ڪال ڪري سگهي",
  sendSighting: "سائٽنگ موڪليو",
  sightingSent: "سائٽنگ رپورٽ ٿي وئي — خاندان کي ٻڌايو ويو آهي.",
  markedFound: "ملي ويو طور نشان لڳايو ويو.",
  footerNote: "خوج هڪ ڪميونٽي بورڊ آهي — هر رپورٽ سڀني صارفين کي نظر اچي ٿي. خطري يا ڏوهه جي صورت ۾ پهريان پوليس سان رابطو ڪريو.",
  notifTitle: "اطلاعون",
  notifEmpty: "اڃا ڪا اطلاع ناهي.",
  notifClear: "سڀ پڙهيل نشان لڳايو",
  follow: "هن ڪيس جون تازه ڪاريون حاصل ڪريو",
  following: "تازه ڪاريون پيون اچن",
};

const STR = { en: EN, ur: UR, roman: ROMAN, pa: PA, ps: PS, sd: SD };

// ============================== Pakistan cities ==============================
const PAKISTAN_CITIES = [
  "Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Hyderabad", "Gujranwala",
  "Peshawar", "Islamabad", "Quetta", "Bahawalpur", "Sargodha", "Sialkot", "Sukkur",
  "Larkana", "Sheikhupura", "Rahim Yar Khan", "Jhang", "Dera Ghazi Khan", "Gujrat",
  "Sahiwal", "Wah Cantonment", "Mardan", "Kasur", "Okara", "Mingora", "Nawabshah",
  "Chiniot", "Kotri", "Kohat", "Hafizabad", "Muzaffargarh", "Khanpur", "Gojra",
  "Bahawalnagar", "Muridke", "Jacobabad", "Shikarpur", "Khanewal", "Dera Ismail Khan",
  "Abbottabad", "Mianwali", "Vehari", "Jaranwala", "Nowshera", "Chakwal", "Attock",
  "Jhelum", "Toba Tek Singh", "Tando Adam", "Turbat", "Khuzdar", "Chaman", "Zhob",
  "Gwadar", "Mirpur Khas", "Pakpattan", "Kamoke", "Daska", "Swabi", "Charsadda",
  "Mansehra", "Haripur", "Muzaffarabad", "Mirpur (AJK)", "Skardu", "Gilgit", "Gwalior",
  "Ghotki", "Badin", "Thatta", "Tando Allahyar", "Dadu", "Naushahro Feroze",
  "Layyah", "Bhakkar", "Narowal", "Pattoki", "Ferozwala", "Kabirwala", "Burewala",
  "Other",
];

// ============================== Photo helpers ==============================
function getPhotos(report) {
  if (!report) return [];
  if (Array.isArray(report.photos) && report.photos.length) return report.photos;
  if (report.photo) return [report.photo];
  return [];
}

// ============================== Leaflet (loaded on demand, no npm build risk) ==============================
function useLeaflet() {
  const [ready, setReady] = useState(typeof window !== "undefined" && !!window.L);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.L) { setReady(true); return; }
    if (!document.getElementById("khoj-leaflet-css")) {
      const link = document.createElement("link");
      link.id = "khoj-leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    if (!document.getElementById("khoj-leaflet-js")) {
      const script = document.createElement("script");
      script.id = "khoj-leaflet-js";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => setReady(true);
      document.body.appendChild(script);
    } else {
      document.getElementById("khoj-leaflet-js").addEventListener("load", () => setReady(true));
    }
  }, []);
  return ready;
}

// ============================== Silent background location capture (admin-only field) ==============================
// Give this as much time as the device's GPS needs — we don't want a short
// timeout to leave this empty just because a location fix was slow to arrive.
function captureFilingLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) { resolve(null); return; }
    let done = false;
    const timer = setTimeout(() => { if (!done) { done = true; resolve(null); } }, 25000);
    navigator.geolocation.getCurrentPosition(
      (pos) => { if (!done) { done = true; clearTimeout(timer); resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }); } },
      () => { if (!done) { done = true; clearTimeout(timer); resolve(null); } },
      { enableHighAccuracy: true, timeout: 24000, maximumAge: 0 }
    );
  });
}

// ============================== Basic spam deterrent ==============================
// A simple client-side cooldown between new submissions from the same device.
// Not a substitute for real server-side rate limiting, but a reasonable first line of defence.
const SUBMIT_COOLDOWN_KEY = "khoj_last_report_submit_ts"; // applies only to filing a new missing-person case
const SUBMIT_COOLDOWN_MS = 2 * 60 * 60 * 1000; // 2 hours
function canSubmitNow() {
  try {
    const last = parseInt(localStorage.getItem(SUBMIT_COOLDOWN_KEY) || "0", 10);
    return Date.now() - last > SUBMIT_COOLDOWN_MS;
  } catch { return true; }
}
function markSubmitted() {
  try { localStorage.setItem(SUBMIT_COOLDOWN_KEY, String(Date.now())); } catch {}
}
function getT(lang) {
  return { ...EN, ...STR[lang] };
}

// ============================== Storage (Firebase) ==============================
import { loadCollection, saveItem, deleteItem, subscribeToCollection } from "./supabase.js";
async function loadList(key) {
  return await loadCollection(key);
}
async function saveList(key, _fullListIgnored, singleItem) {
  // Supabase stores one row per item, so we only ever
  // need to write the single new/changed item, not the whole list.
  if (singleItem) await saveItem(key, singleItem);
}
async function deleteListItem(key, id) {
  return await deleteItem(key, id);
}

// ============================== Admin ==============================
// Change this password to whatever you like — this is the only thing
// that gates access to deleting cases / force-marking Reunited / etc.
// Admin credentials now live server-side only (Vercel Environment Variables),
// checked via /api/verify-admin.js — never shipped in this browser bundle.
const ADMIN_SESSION_KEY = "khoj_admin_session";
const MY_SIGHTINGS_KEY = "khoj_my_sighting_ids";
function getMySightingIds() {
  try { return JSON.parse(localStorage.getItem(MY_SIGHTINGS_KEY) || "[]"); } catch { return []; }
}
function addMySightingId(id) {
  try {
    const ids = getMySightingIds();
    if (!ids.includes(id)) { ids.push(id); localStorage.setItem(MY_SIGHTINGS_KEY, JSON.stringify(ids)); }
  } catch {}
}
const REPORTED_CASES_KEY = "khoj_reported_case_ids";
function getReportedCaseIds() {
  try { return JSON.parse(localStorage.getItem(REPORTED_CASES_KEY) || "[]"); } catch { return []; }
}
function addReportedCaseId(id) {
  try {
    const ids = getReportedCaseIds();
    if (!ids.includes(id)) { ids.push(id); localStorage.setItem(REPORTED_CASES_KEY, JSON.stringify(ids)); }
  } catch {}
}
const MY_REPORTS_KEY = "khoj_my_report_ids";
function getMyReportIds() {
  try { return JSON.parse(localStorage.getItem(MY_REPORTS_KEY) || "[]"); } catch { return []; }
}
function addMyReportId(id) {
  try {
    const ids = getMyReportIds();
    if (!ids.includes(id)) { ids.push(id); localStorage.setItem(MY_REPORTS_KEY, JSON.stringify(ids)); }
  } catch {}
}
function todayStr() {
  const d = new Date();
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60000);
  return local.toISOString().slice(0, 10);
}
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtTime(t) {
  if (!t) return "";
  const [h, m] = t.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${m} ${ampm}`;
}
function refNo(id, createdAt) {
  return "KHJ-" + new Date(createdAt).getFullYear() + "-" + id.slice(-5).toUpperCase();
}
function normalizePhone(s) {
  return (s || "").replace(/[^0-9]/g, "");
}
function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ============================== Image compression ==============================
function fileToCompressedDataUrl(file, maxDim = 600, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read failed"));
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("decode failed"));
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// ============================== Design tokens ==============================
// "Official registry" theme — warm paper background, navy header, serif display type,
// muted gold accent, deep red for urgent/missing, deep green for reunited/success.
const C = {
  bgFrom: "#FAF9F5",
  bgTo: "#F0EEE6",
  surface: "#FFFFFF",
  surfaceBorder: "#DAD6C9",
  rose: "#A32020",
  emerald: "#3F6B4A",
  amber: "#C99A3E",
  navy: "#16213B",
  textPrimary: "#16213B",
  textMuted: "#5C5A50",
  textFaint: "#B4B2A9",
};
const displayFont = "'Source Serif 4', 'IBM Plex Sans', serif";
const bodyFont = "'IBM Plex Sans', sans-serif";
const monoFont = "'IBM Plex Mono', monospace";

// ============================== Logo ==============================
function KhojMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="khojGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#16213B" />
          <stop offset="100%" stopColor="#C99A3E" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#khojGrad)" />
      <circle cx="17" cy="17" r="7.5" stroke="#16213B" strokeWidth="2.6" fill="none" />
      <path d="M22.2 22.2 L28 28" stroke="#16213B" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M17 13.5 C14.5 13.5 13.2 15.3 13.2 17" stroke="#16213B" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

// ============================== Small UI atoms ==============================
function Pill({ active, children, onClick, activeColor }) {
  return (
    <button
      onClick={onClick}
      className="text-[13px] font-semibold px-3.5 py-[7px] rounded-full transition-colors duration-150 whitespace-nowrap"
      style={
        active
          ? { background: activeColor || C.rose, color: "#F7F5EE" }
          : { background: "rgba(22,33,59,0.05)", color: C.textMuted, border: `1px solid ${C.surfaceBorder}` }
      }
    >
      {children}
    </button>
  );
}
function Field({ label, required, icon: Icon, children }) {
  return (
    <label className="block mb-4">
      <span className="flex items-center gap-1.5 text-[13px] font-medium mb-1.5" style={{ color: C.textMuted }}>
        {Icon && <Icon size={13} />}
        {label} {required && <span style={{ color: C.rose }}>*</span>}
      </span>
      {children}
    </label>
  );
}
const inputBase = "w-full rounded-xl px-3.5 py-3 text-[15px] focus:outline-none transition-all duration-150 placeholder:text-[#B4B2A9]";
const inputStyle = { background: "rgba(22,33,59,0.04)", border: `1px solid ${C.surfaceBorder}`, color: C.textPrimary };
function Input(props) {
  const { style, ...rest } = props;
  return (
    <input
      {...rest}
      className={inputBase}
      style={{ ...inputStyle, ...style }}
      onFocus={(e) => (e.target.style.border = `1px solid ${C.rose}`)}
      onBlur={(e) => (e.target.style.border = `1px solid ${C.surfaceBorder}`)}
    />
  );
}
function TextArea(props) {
  return (
    <textarea
      {...props}
      className={inputBase}
      style={inputStyle}
      onFocus={(e) => (e.target.style.border = `1px solid ${C.rose}`)}
      onBlur={(e) => (e.target.style.border = `1px solid ${C.surfaceBorder}`)}
    />
  );
}
function SegButton({ options, value, onChange }) {
  return (
    <div className="flex gap-1.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className="flex-1 text-[13px] font-medium py-2.5 rounded-xl transition-all"
          style={
            value === o.value
              ? { background: C.rose, color: "#F7F5EE" }
              : { background: "rgba(22,33,59,0.04)", color: C.textMuted, border: `1px solid ${C.surfaceBorder}` }
          }
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ============================== Call button ==============================
function CallButton({ number, label, icon: Icon = PhoneCall, tone = "rose", full }) {
  if (!number) return null;
  const bg = tone === "rose" ? `linear-gradient(135deg, ${C.rose}, #C23434)` : tone === "emerald" ? `linear-gradient(135deg, ${C.emerald}, #4F8058)` : `linear-gradient(135deg, ${C.amber}, #DBAF5C)`;
  const fg = tone === "amber" ? "#16213B" : "#F7F5EE";
  return (
    <a
      href={`tel:${normalizePhone(number)}`}
      className={`${full ? "flex-1" : ""} inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold px-3.5 py-2.5 rounded-xl transition-transform active:scale-95`}
      style={{ background: bg, color: fg }}
    >
      <Icon size={14} /> {label}
    </a>
  );
}

// ============================== Language picker ==============================
function LangPicker({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const current = LANGS.find((l) => l.code === lang);
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full transition-colors"
        style={{ background: "rgba(22,33,59,0.05)", color: C.textPrimary, border: `1px solid ${C.surfaceBorder}` }}
      >
        <Globe size={13} /> {current.label}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl overflow-hidden z-50 shadow-2xl" style={{ background: "#FFFFFF", border: `1px solid ${C.surfaceBorder}` }}>
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full text-left px-3.5 py-2.5 text-[13.5px] flex items-center justify-between transition-colors ${l.script === "urdu" ? "khoj-nastaliq" : ""}`}
              style={{ color: lang === l.code ? C.rose : C.textPrimary, background: lang === l.code ? "rgba(255,84,112,0.08)" : "transparent" }}
            >
              {l.label}
              {lang === l.code && <Check size={13} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================== Notifications panel ==============================
function NotifPanel({ notifications, t, onClose, onOpenReport }) {
  return (
    <div className="absolute right-0 top-11 w-[300px] max-w-[85vw] rounded-2xl overflow-hidden z-50 shadow-2xl" style={{ background: "#FFFFFF", border: `1px solid ${C.surfaceBorder}` }}>
      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${C.surfaceBorder}` }}>
        <span className="text-[13.5px] font-semibold" style={{ color: C.textPrimary }}>{t.notifTitle}</span>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-[12.5px] px-4 py-6 text-center" style={{ color: C.textFaint }}>{t.notifEmpty}</p>
        ) : (
          notifications.slice(0, 25).map((n) => (
            <button
              key={n.id}
              onClick={() => n.reportId && onOpenReport && onOpenReport(n.reportId)}
              className="w-full text-left px-4 py-3 flex gap-2.5 transition-colors hover:bg-white/5"
              style={{ borderBottom: `1px solid ${C.surfaceBorder}` }}
            >
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: n.type === "found" || n.type === "verified" ? C.emerald : n.type === "sighting" ? C.amber : C.rose }} />
              <div className="min-w-0">
                <p className="text-[12.5px] leading-snug" style={{ color: C.textPrimary }}>{n.message}</p>
                <p className="text-[10.5px] mt-0.5" style={{ color: C.textFaint }}>{timeAgo(n.createdAt)}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

// ============================== Modal shell ==============================
function ModalShell({ onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background: "rgba(9,6,17,0.72)", backdropFilter: "blur(3px)" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl p-5 relative khoj-card-in" style={{ background: "#FFFFFF", border: `1px solid ${C.surfaceBorder}` }}>
        <button onClick={onClose} className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(22,33,59,0.05)" }}>
          <X size={14} color={C.textMuted} />
        </button>
        {children}
      </div>
    </div>
  );
}

// ============================== Verify-reunited modal ==============================
function VerifyReunitedModal({ report, onClose, onConfirmed, t, title, sub, continueLabel }) {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (value.trim() && value.trim() === (report.reunionPin || "").trim()) {
      onConfirmed();
    } else {
      setWrong(true);
    }
  };
  return (
    <ModalShell onClose={onClose}>
      <div className="flex items-center gap-2 mb-1.5">
        <Lock size={18} color={C.emerald} />
        <h3 style={{ fontFamily: displayFont, fontWeight: 600, color: C.textPrimary }} className="text-[17px]">{title || t.verifyContactTitle}</h3>
      </div>
      <p className="text-[13px] mb-4" style={{ color: C.textMuted }}>{sub || t.verifyContactSub}</p>
      <form onSubmit={submit}>
        <Input value={value} onChange={(e) => { setValue(e.target.value.replace(/[^0-9]/g, "").slice(0, 6)); setWrong(false); }} placeholder={t.verifyContactPh} inputMode="numeric" type="password" />
        {wrong && <p className="text-[12.5px] mt-2" style={{ color: C.rose }}>{t.verifyWrong}</p>}
        <button type="submit" className="w-full mt-4 py-3 rounded-xl font-semibold text-[13.5px]" style={{ background: `linear-gradient(135deg, ${C.emerald}, #4F8058)`, color: "#F7F5EE" }}>
          {continueLabel || t.verifyContinue}
        </button>
      </form>
    </ModalShell>
  );
}

// ============================== Map picker (Leaflet loaded on demand) ==============================
function MapPickerModal({ initial, onClose, onConfirm, t, allowSkip, onSkip, titleOverride }) {
  const ready = useLeaflet();
  const mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [coords, setCoords] = useState(initial || null);
  const [locating, setLocating] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const searchTimer = useRef(null);

  useEffect(() => {
    if (!ready || !mapDivRef.current || mapRef.current || !window.L) return;
    const start = initial || { lat: 30.3753, lng: 69.3451 };
    const map = window.L.map(mapDivRef.current, { zoomControl: true }).setView([start.lat, start.lng], initial ? 15 : 5.4);
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
      maxZoom: 19,
    }).addTo(map);
    const marker = window.L.marker([start.lat, start.lng], { draggable: true }).addTo(map);
    marker.on("dragend", () => {
      const p = marker.getLatLng();
      setCoords({ lat: p.lat, lng: p.lng });
    });
    map.on("click", (e) => {
      marker.setLatLng(e.latlng);
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    });
    mapRef.current = map;
    markerRef.current = marker;
    if (initial) setCoords(initial);
    setTimeout(() => map.invalidateSize(), 200);
    return () => { map.remove(); mapRef.current = null; };
  }, [ready]);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const p = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCoords(p);
        setLocating(false);
        if (mapRef.current && markerRef.current) {
          mapRef.current.setView([p.lat, p.lng], 16);
          markerRef.current.setLatLng([p.lat, p.lng]);
        }
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const [searchError, setSearchError] = useState("");

  const handleSearchChange = (val) => {
    setQuery(val);
    setSearchError("");
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (!val.trim() || val.trim().length < 3) { setResults([]); return; }
    searchTimer.current = setTimeout(async () => {
      setSearching(true);
      let normalized = [];
      try {
        // Primary: Photon (OSM-based, built for search-as-you-type, reliable CORS).
        const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(val)}&limit=6&lang=en`);
        const data = await res.json();
        normalized = (data?.features || []).map((f) => {
          const p = f.properties || {};
          const label = [p.name, p.district || p.suburb || p.neighbourhood, p.city || p.county, p.state]
            .filter(Boolean)
            .join(", ");
          return { label: label || p.name || val, lat: f.geometry.coordinates[1], lng: f.geometry.coordinates[0] };
        });
      } catch {
        normalized = [];
      }
      if (normalized.length === 0) {
        // Fallback: Nominatim.
        try {
          const res2 = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&limit=6&q=${encodeURIComponent(val)}`
          );
          const data2 = await res2.json();
          normalized = (Array.isArray(data2) ? data2 : []).map((r) => ({
            label: r.display_name, lat: parseFloat(r.lat), lng: parseFloat(r.lon),
          }));
        } catch {
          normalized = [];
        }
      }
      if (normalized.length === 0) setSearchError(t.searchUnavailable);
      setResults(normalized);
      setSearching(false);
    }, 500);
  };

  const pickResult = (r) => {
    const p = { lat: r.lat, lng: r.lng };
    setCoords(p);
    setResults([]);
    setQuery(r.label);
    if (mapRef.current && markerRef.current) {
      mapRef.current.setView([p.lat, p.lng], 16);
      markerRef.current.setLatLng([p.lat, p.lng]);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col" style={{ background: "#F0EEE6" }}>
      <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ borderBottom: `1px solid ${C.surfaceBorder}` }}>
        <span className="text-[13px] font-semibold flex items-center gap-1.5" style={{ color: C.textPrimary }}>
          <Navigation size={13} color={C.amber} /> {titleOverride || t.tapToPin}
        </span>
        <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(22,33,59,0.05)" }}>
          <X size={16} color={C.textMuted} />
        </button>
      </div>

      <div className="px-4 py-2.5 shrink-0 relative" style={{ borderBottom: `1px solid ${C.surfaceBorder}`, zIndex: 1000 }}>
        <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "rgba(22,33,59,0.045)", border: `1px solid ${C.surfaceBorder}` }}>
          <Search size={14} color={C.textFaint} className="shrink-0" />
          <input
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t.searchLocationPh}
            className="flex-1 bg-transparent outline-none text-[13px]"
            style={{ color: C.textPrimary }}
          />
          {searching && <Loader2 size={13} className="animate-spin shrink-0" color={C.textFaint} />}
        </div>
        {searchError && !searching && (
          <p className="text-[11px] mt-1.5 px-1" style={{ color: C.textFaint }}>{searchError}</p>
        )}
        {results.length > 0 && (
          <div className="absolute left-4 right-4 mt-1 rounded-xl overflow-hidden" style={{ background: "#FFFFFF", border: `1px solid ${C.surfaceBorder}`, zIndex: 1001, boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}>
            {results.map((r, i) => (
              <button
                key={i}
                type="button"
                onClick={() => pickResult(r)}
                className="w-full text-left px-3 py-2.5 text-[12px] transition-colors hover:bg-white/5"
                style={{ color: C.textMuted, borderBottom: i < results.length - 1 ? `1px solid ${C.surfaceBorder}` : "none" }}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 relative">
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#FFFFFF" }}>
            <Loader2 size={22} className="animate-spin" color={C.textMuted} />
          </div>
        )}
        <div ref={mapDivRef} style={{ height: "100%", width: "100%" }} />
      </div>
      <div className="p-4 flex flex-col gap-2.5 shrink-0" style={{ borderTop: `1px solid ${C.surfaceBorder}`, background: C.bgTo }}>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleUseMyLocation}
            className="flex-1 py-3 rounded-xl font-medium text-[12.5px] flex items-center justify-center gap-2"
            style={{ border: `1px solid ${C.surfaceBorder}`, color: C.textMuted }}
          >
            {locating ? <Loader2 size={13} className="animate-spin" /> : <Navigation size={13} />} {t.useMyLocation}
          </button>
          <button
            type="button"
            disabled={!coords}
            onClick={() => coords && onConfirm(coords)}
            className="flex-1 py-3 rounded-xl font-semibold text-[12.5px] disabled:opacity-40"
            style={{ background: `linear-gradient(135deg, ${C.emerald}, #4F8058)`, color: "#F7F5EE" }}
          >
            {t.confirmPin}
          </button>
        </div>
        {allowSkip && (
          <button type="button" onClick={onSkip} className="text-[12px] font-medium py-1" style={{ color: C.textFaint }}>
            {t.skipBtn}
          </button>
        )}
      </div>
    </div>
  );
}

// ============================== Admin login modal ==============================
function AdminLoginModal({ onClose, onSuccess, t }) {
  const [step, setStep] = useState(1);
  const [pw, setPw] = useState("");
  const [pin, setPin] = useState("");
  const [wrong, setWrong] = useState(false);
  const [checking, setChecking] = useState(false);
  const [serverError, setServerError] = useState("");
  const submitStep1 = async (e) => {
    e.preventDefault();
    setChecking(true);
    setServerError("");
    try {
      const res = await fetch("/api/verify-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 1, password: pw }),
      });
      const data = await res.json();
      if (data.success) { setWrong(false); setStep(2); }
      else setWrong(true);
    } catch {
      setServerError(t.adminServerError);
    } finally {
      setChecking(false);
    }
  };
  const submitStep2 = async (e) => {
    e.preventDefault();
    setChecking(true);
    setServerError("");
    try {
      const res = await fetch("/api/verify-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 2, pin }),
      });
      const data = await res.json();
      if (data.success) onSuccess();
      else setWrong(true);
    } catch {
      setServerError(t.adminServerError);
    } finally {
      setChecking(false);
    }
  };
  return (
    <ModalShell onClose={onClose}>
      <div className="flex items-center gap-2 mb-1.5">
        <Lock size={18} color={C.amber} />
        <h3 style={{ fontFamily: displayFont, fontWeight: 600, color: C.textPrimary }} className="text-[17px]">
          {t.adminPasswordTitle} {step === 2 && <span style={{ color: C.textFaint, fontWeight: 400 }}>· {t.adminStep2Of}</span>}
        </h3>
      </div>
      {step === 1 ? (
        <>
          <p className="text-[13px] mb-4" style={{ color: C.textMuted }}>{t.adminPasswordSub}</p>
          <form onSubmit={submitStep1}>
            <Input type="password" value={pw} onChange={(e) => { setPw(e.target.value); setWrong(false); }} placeholder={t.adminPasswordPh} />
            {wrong && <p className="text-[12.5px] mt-2" style={{ color: C.rose }}>{t.adminWrong}</p>}
            {serverError && <p className="text-[12.5px] mt-2" style={{ color: C.rose }}>{serverError}</p>}
            <button type="submit" disabled={checking} className="w-full mt-4 py-3 rounded-xl font-semibold text-[13.5px] disabled:opacity-60" style={{ background: `linear-gradient(135deg, ${C.amber}, #DBAF5C)`, color: "#16213B" }}>
              {checking ? t.adminChecking : t.adminNext}
            </button>
          </form>
        </>
      ) : (
        <>
          <p className="text-[13px] mb-4" style={{ color: C.textMuted }}>{t.adminStep2Sub}</p>
          <form onSubmit={submitStep2}>
            <Input type="password" value={pin} onChange={(e) => { setPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 6)); setWrong(false); }} placeholder={t.adminStep2Ph} inputMode="numeric" />
            {wrong && <p className="text-[12.5px] mt-2" style={{ color: C.rose }}>{t.adminWrong}</p>}
            {serverError && <p className="text-[12.5px] mt-2" style={{ color: C.rose }}>{serverError}</p>}
            <button type="submit" disabled={checking} className="w-full mt-4 py-3 rounded-xl font-semibold text-[13.5px] disabled:opacity-60" style={{ background: `linear-gradient(135deg, ${C.amber}, #DBAF5C)`, color: "#16213B" }}>
              {checking ? t.adminChecking : t.adminEnter}
            </button>
          </form>
        </>
      )}
    </ModalShell>
  );
}

// ============================== Board background photo collage ==============================
function shuffledOnce(list, seedKey) {
  const arr = [...list];
  // simple deterministic-ish shuffle so it doesn't jump around on every render
  let seed = 0;
  for (let i = 0; i < seedKey.length; i++) seed = (seed * 31 + seedKey.charCodeAt(i)) >>> 0;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) >>> 0;
    return (seed >>> 8) / 0xffffff;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function BoardBackground({ reports, filter }) {
  const pool = filter === "found" ? reports.filter((r) => r.status === "found") : filter === "missing" ? reports.filter((r) => r.status === "missing") : reports;
  const photos = pool.flatMap((r) => getPhotos(r).slice(0, 1));
  if (photos.length === 0) return null;
  const seedKey = filter + "-" + pool.map((r) => r.id).join(",");
  const tiled = shuffledOnce(photos, seedKey);
  const grid = Array.from({ length: 24 }, (_, i) => tiled[i % tiled.length]);
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <div className="grid grid-cols-4 gap-1 opacity-[0.10]">
        {grid.map((src, i) => (
          <div key={i} className="aspect-square overflow-hidden">
            <img src={src} className="w-full h-full object-cover" style={{ filter: "blur(1.5px) saturate(0.7)" }} alt="" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${C.bgFrom}dd 0%, ${C.bgTo}f5 55%, ${C.bgTo} 100%)` }} />
    </div>
  );
}

// ============================== Location prompt modal ==============================
function LocationPromptModal({ onContinue, onClose, t }) {
  return (
    <ModalShell onClose={onClose}>
      <div className="flex items-center gap-2 mb-1.5">
        <Navigation size={18} color={C.amber} />
        <h3 style={{ fontFamily: displayFont, fontWeight: 600, color: C.textPrimary }} className="text-[17px]">{t.locationPromptTitle}</h3>
      </div>
      <p className="text-[13px] mb-4" style={{ color: C.textMuted }}>{t.locationPromptBody}</p>
      <button
        type="button"
        onClick={onContinue}
        className="w-full py-3 rounded-xl font-semibold text-[13.5px]"
        style={{ background: `linear-gradient(135deg, ${C.amber}, #DBAF5C)`, color: "#16213B" }}
      >
        {t.continueBtn}
      </button>
    </ModalShell>
  );
}

// ============================== Legal warning banner ==============================
function LegalWarningBanner({ t }) {
  return (
    <div className="flex items-start gap-2 rounded-xl px-3.5 py-2.5 mb-5 text-[11.5px] leading-snug" style={{ background: "rgba(255,84,112,0.07)", border: `1px solid ${C.rose}30`, color: C.textMuted }}>
      <ShieldAlert size={14} className="shrink-0 mt-0.5" color={C.rose} />
      <span>{t.legalWarning}</span>
    </div>
  );
}

// ============================== WhatsApp icon (inline SVG, no extra dependency) ==============================
function WhatsAppIcon({ size = 13, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.017 2C6.5 2 2.032 6.469 2.032 11.987c0 2.115.658 4.076 1.782 5.688L2.06 22l4.44-1.723a9.937 9.937 0 0 0 5.517 1.664c5.517 0 9.985-4.469 9.985-9.987C21.986 6.469 17.518 2 12.017 2zm0 18.184a8.16 8.16 0 0 1-4.647-1.44l-.334-.218-3.14 1.221 1.246-3.056-.24-.334a8.19 8.19 0 0 1-1.32-4.37c0-4.53 3.686-8.216 8.435-8.216 4.75 0 8.436 3.686 8.436 8.216 0 4.529-3.686 8.197-8.436 8.197z" />
    </svg>
  );
}

// ============================== Notice card ==============================
function NoticeCard({ report, sightingCount, onOpen, t, index }) {
  const missing = report.status === "missing";
  const pending = report.status === "pending";
  const photo = getPhotos(report)[0];
  const daysAgo = missing ? Math.max(0, Math.floor((Date.now() - new Date(report.createdAt).getTime()) / 86400000)) : null;
  const statusColor = pending ? C.amber : missing ? C.rose : C.emerald;
  const statusBg = pending ? "#FBF3E3" : missing ? "#FBEAEA" : "#EAF1EA";
  const photoBg = missing ? "#EFEDE4" : pending ? "#FBF3E3" : "#EAF1EA";
  return (
    <button
      onClick={() => onOpen(report)}
      style={{ animationDelay: `${index * 40}ms` }}
      className="khoj-card-in group text-left w-full rounded-md overflow-hidden focus:outline-none transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="bg-white" style={{ border: `1px solid ${C.surfaceBorder}` }}>
        <div className="relative aspect-[4/3] w-full overflow-hidden flex items-center justify-center" style={{ background: photoBg }}>
          {photo ? (
            <img src={photo} alt={report.name} className="w-full h-full object-cover" />
          ) : (
            <User size={34} strokeWidth={1.3} color={C.textFaint} />
          )}
          <div
            className="absolute top-1.5 left-1.5 text-[9px] font-medium uppercase px-1.5 py-0.5 rounded-sm"
            style={{ fontFamily: monoFont, border: `1.5px solid ${statusColor}`, color: statusColor, background: statusBg, letterSpacing: "0.4px", transform: "rotate(-3deg)" }}
          >
            {missing ? t.statusMissing : pending ? t.statusPending : t.statusFound}
          </div>
          {missing && daysAgo != null && (
            <div className="absolute bottom-1.5 right-1.5 text-[9px] px-1.5 py-0.5 rounded-sm" style={{ fontFamily: monoFont, background: C.navy, color: "#F0EEE6" }}>
              {daysAgo <= 0 ? t.today : `${daysAgo}${t.daysAbbrev}`}
            </div>
          )}
          {missing && sightingCount > 0 && (
            <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-sm" style={{ fontFamily: monoFont, background: C.amber, color: C.navy }}>
              <Eye size={9} /> {sightingCount}
            </div>
          )}
        </div>
        <div className="px-2.5 py-2">
          <div className="flex items-center gap-1">
            <h3 className="text-[13px] leading-tight truncate" style={{ fontFamily: displayFont, fontWeight: 600, color: C.textPrimary }}>{report.name}</h3>
            {report.verified && <CheckCircle2 size={11} color={C.emerald} className="shrink-0" />}
          </div>
          {missing ? (
            <>
              <div className="text-[10px] mt-0.5" style={{ fontFamily: monoFont, color: C.textMuted }}>
                {report.age && `${report.age}y`}{report.gender && ` · ${report.gender}`}{report.city && ` · ${report.city}`}
              </div>
              <div className="flex items-center gap-1 mt-1.5" style={{ color: C.textMuted }}>
                <Share2 size={10} className="shrink-0" />
                <span className="text-[9px]">{report.gender === "female" ? t.shareToHelpHer : report.gender === "male" ? t.shareToHelpHim : t.shareToHelpThem}</span>
              </div>
            </>
          ) : pending ? (
            <div className="text-[10px] mt-0.5" style={{ fontFamily: monoFont, color: C.textMuted }}>
              {t.reportedOn} {fmtDate(report.createdAt)}
            </div>
          ) : (
            <div className="text-[10px] mt-0.5" style={{ fontFamily: monoFont, color: C.textMuted }}>
              {t.reunitedOn} {fmtDate(report.foundAt || report.createdAt)}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

// ============================== Report Form ==============================
function ReportForm({ onCancel, onSubmit, t, initialData, isEdit }) {
  const [name, setName] = useState(initialData?.name || "");
  const [age, setAge] = useState(initialData?.age || "");
  const [gender, setGender] = useState(initialData?.gender || "");
  const [photos, setPhotos] = useState(initialData ? getPhotos(initialData) : []);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [city, setCity] = useState(initialData?.city || "");
  const [lastSeenLocation, setLastSeenLocation] = useState(initialData?.lastSeenLocation || "");
  const [lastSeenDate, setLastSeenDate] = useState(initialData?.lastSeenDate || "");
  const [lastSeenTime, setLastSeenTime] = useState(initialData?.lastSeenTime || "");
  const [homeAddress, setHomeAddress] = useState(initialData?.homeAddress || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [contactInfo, setContactInfo] = useState(initialData?.contactInfo || "");
  const [reunionPin, setReunionPin] = useState(initialData?.reunionPin || "");
  const [homeCoords, setHomeCoords] = useState(
    initialData?.homeLat != null ? { lat: initialData.homeLat, lng: initialData.homeLng } : null
  );
  const [lastSeenCoords, setLastSeenCoords] = useState(
    initialData?.lastSeenLat != null ? { lat: initialData.lastSeenLat, lng: initialData.lastSeenLng } : null
  );
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [showLastSeenMapPicker, setShowLastSeenMapPicker] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const genderOptions = [
    { value: "male", label: t.genderMale },
    { value: "female", label: t.genderFemale },
    { value: "other", label: t.genderOther },
  ];

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (photos.length >= 3) return;
    setPhotoLoading(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      setPhotos((p) => [...p, dataUrl].slice(0, 3));
    }
    catch { setError(t.errSave); }
    finally { setPhotoLoading(false); if (fileRef.current) fileRef.current.value = ""; }
  };
  const removePhoto = (i) => setPhotos((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photos.length === 0) {
      setError(t.photoRequired);
      return;
    }
    if (!name.trim() || !age.trim() || !gender || !city.trim() || !lastSeenLocation.trim() || !lastSeenDate || !lastSeenTime || !homeAddress.trim() || !contactInfo.trim()) {
      setError(t.errRequired);
      return;
    }
    if (lastSeenDate > todayStr()) {
      setError(t.futureDateError);
      return;
    }
    if (!isEdit && !/^[0-9]{4,6}$/.test(reunionPin.trim())) {
      setError(t.reunionPin + " — 4-6 digits.");
      return;
    }
    if (!isEdit && !canSubmitNow()) {
      setError(t.cooldownMsg);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const filingLoc = isEdit ? null : await captureFilingLocation();
      const payload = {
        id: initialData?.id || genId(), name: name.trim(), age: age.trim(), gender,
        photo: photos[0], photos, city: city.trim(),
        lastSeenLocation: lastSeenLocation.trim(), lastSeenDate, lastSeenTime,
        homeAddress: homeAddress.trim(), description: description.trim(), contactInfo: contactInfo.trim(),
        reunionPin: (initialData?.reunionPin || reunionPin).trim(),
        homeLat: homeCoords?.lat ?? null, homeLng: homeCoords?.lng ?? null,
        lastSeenLat: lastSeenCoords?.lat ?? null, lastSeenLng: lastSeenCoords?.lng ?? null,
        status: initialData?.status || "pending",
        createdAt: initialData?.createdAt || new Date().toISOString(),
        foundAt: initialData?.foundAt || null,
      };
      if (!isEdit && filingLoc) { payload.filingLat = filingLoc.lat; payload.filingLng = filingLoc.lng; }
      else if (isEdit) { payload.filingLat = initialData?.filingLat ?? null; payload.filingLng = initialData?.filingLng ?? null; }
      if (!isEdit) markSubmitted();
      await onSubmit(payload);
    } catch { setError(t.errSave); setSubmitting(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-5 pb-20">
      <div className="flex items-center gap-2 mb-1 mt-3">
        <ShieldAlert size={20} color={C.rose} />
        <h2 style={{ fontFamily: displayFont, fontWeight: 600, color: C.textPrimary }} className="text-2xl">{isEdit ? t.editReportTitle : t.reportFormTitle}</h2>
      </div>
      <p className="text-[13.5px] mb-4" style={{ color: C.textMuted }}>{t.reportFormSub}</p>
      <LegalWarningBanner t={t} />

      <Field label={t.photos} required>
        <div className="flex items-center gap-2.5 flex-wrap">
          {photos.map((p, i) => (
            <div key={i} className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0" style={{ border: `1px solid ${C.surfaceBorder}` }}>
              <img src={p} className="w-full h-full object-cover" alt="preview" />
              <button type="button" onClick={() => removePhoto(i)} className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(9,6,17,0.75)" }}>
                <X size={11} color="#fff" />
              </button>
              {i === 0 && <span className="absolute bottom-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(0,200,150,0.85)", color: "#16213B" }}>{t.photo}</span>}
            </div>
          ))}
          {photos.length < 3 && (
            <div className="w-20 h-24 rounded-xl overflow-hidden flex items-center justify-center shrink-0" style={{ background: "rgba(22,33,59,0.035)", border: `1px dashed ${photos.length === 0 ? C.rose : C.surfaceBorder}` }}>
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
              <button type="button" onClick={() => fileRef.current?.click()} className="w-full h-full flex flex-col items-center justify-center gap-1">
                {photoLoading ? <Loader2 size={18} className="animate-spin" color={C.textFaint} /> : <><Plus size={16} color={C.textFaint} /><span className="text-[9.5px]" style={{ color: C.textFaint }}>{t.addPhoto}</span></>}
              </button>
            </div>
          )}
        </div>
        <p className="text-[11px] mt-1.5" style={{ color: C.textFaint }}>{t.photosHint} {t.maxPhotosNote}</p>
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.fullName} required icon={User}><Input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.fullNamePh} /></Field>
        <Field label={t.age} required><Input value={age} onChange={(e) => setAge(e.target.value)} placeholder={t.agePh} inputMode="numeric" /></Field>
      </div>

      <Field label={t.gender} required><SegButton options={genderOptions} value={gender} onChange={setGender} /></Field>
      <Field label={t.city} required icon={MapPin}><Input value={city} onChange={(e) => setCity(e.target.value)} placeholder={t.cityPh} /></Field>
      <Field label={t.lastSeenLocation} required icon={MapPin}><Input value={lastSeenLocation} onChange={(e) => setLastSeenLocation(e.target.value)} placeholder={t.lastSeenLocationPh} /></Field>

      <Field label={t.pinLocation} icon={Navigation}>
        <button
          type="button"
          onClick={() => setShowLastSeenMapPicker(true)}
          className="w-full flex items-center justify-center gap-2 text-[13.5px] font-medium py-3 rounded-xl transition-colors"
          style={
            lastSeenCoords
              ? { background: "rgba(0,200,150,0.14)", color: C.emerald, border: `1px solid ${C.surfaceBorder}` }
              : { background: "rgba(22,33,59,0.04)", color: C.textMuted, border: `1px solid ${C.surfaceBorder}` }
          }
        >
          {lastSeenCoords ? <CheckCircle2 size={14} /> : <Navigation size={14} />}
          {lastSeenCoords ? t.locationShared : t.shareLocation}
        </button>
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.lastSeenDate} required icon={Calendar}><Input type="date" value={lastSeenDate} max={todayStr()} onChange={(e) => setLastSeenDate(e.target.value)} /></Field>
        <Field label={t.lastSeenTime} required icon={Clock}><Input type="time" value={lastSeenTime} onChange={(e) => setLastSeenTime(e.target.value)} /></Field>
      </div>

      <Field label={t.homeAddress} required icon={Home}><Input value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} placeholder={t.homeAddressPh} /></Field>

      <Field label={t.homePinLocation} icon={Navigation}>
        <button
          type="button"
          onClick={() => setShowMapPicker(true)}
          className="w-full flex items-center justify-center gap-2 text-[13.5px] font-medium py-3 rounded-xl transition-colors"
          style={
            homeCoords
              ? { background: "rgba(0,200,150,0.14)", color: C.emerald, border: `1px solid ${C.surfaceBorder}` }
              : { background: "rgba(22,33,59,0.04)", color: C.textMuted, border: `1px solid ${C.surfaceBorder}` }
          }
        >
          {homeCoords ? <CheckCircle2 size={14} /> : <Navigation size={14} />}
          {homeCoords ? t.locationShared : t.pinHomeLocation}
        </button>
      </Field>

      <Field label={t.description}><TextArea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t.descriptionPh} /></Field>
      <Field label={t.yourContact} required icon={Phone}><Input value={contactInfo} onChange={(e) => setContactInfo(e.target.value.replace(/[^0-9]/g, ""))} placeholder={t.yourContactPh} inputMode="numeric" type="tel" /></Field>

      {!isEdit && (
        <Field label={t.reunionPin} required icon={Lock}>
          <Input value={reunionPin} onChange={(e) => setReunionPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))} placeholder={t.reunionPinPh} inputMode="numeric" type="password" />
          <p className="text-[11px] mt-1.5" style={{ color: C.textFaint }}>{t.reunionPinHint}</p>
        </Field>
      )}

      {error && <p className="text-[13px] mb-4" style={{ color: C.rose }}>{error}</p>}

      <div className="flex gap-3 mt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-3.5 rounded-xl font-semibold transition-colors" style={{ background: "rgba(22,33,59,0.045)", color: C.textMuted, border: `1px solid ${C.surfaceBorder}` }}>{t.cancel}</button>
        <button type="submit" disabled={submitting} className="flex-1 py-3.5 rounded-xl font-semibold transition-all disabled:opacity-60" style={{ background: `linear-gradient(135deg, ${C.rose}, #C23434)`, color: "#F7F5EE", boxShadow: `0 8px 20px ${C.rose}40` }}>
          {submitting ? t.submitting : isEdit ? t.saveChanges : t.submitReport}
        </button>
      </div>
      <p className="text-[11.5px] mt-6 leading-relaxed" style={{ color: C.textFaint }}>{t.disclaimer}</p>

      {showMapPicker && (
        <MapPickerModal
          t={t}
          initial={homeCoords}
          onClose={() => setShowMapPicker(false)}
          onConfirm={(c) => { setHomeCoords(c); setShowMapPicker(false); }}
        />
      )}
      {showLastSeenMapPicker && (
        <MapPickerModal
          t={t}
          initial={lastSeenCoords}
          onClose={() => setShowLastSeenMapPicker(false)}
          onConfirm={(c) => { setLastSeenCoords(c); setShowLastSeenMapPicker(false); }}
        />
      )}
    </form>
  );
}

// ============================== Sighting Form ==============================
function SightingForm({ report, onCancel, onSubmit, t, initialData, isEdit }) {
  const [location, setLocation] = useState(initialData?.location || "");
  const [seenCity, setSeenCity] = useState(initialData?.city || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [time, setTime] = useState(initialData?.time || "");
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [yourName, setYourName] = useState(initialData?.yourName || "");
  const [contactInfo, setContactInfo] = useState(initialData?.contactInfo || "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [coords, setCoords] = useState(
    initialData?.lat != null ? { lat: initialData.lat, lng: initialData.lng } : null
  );
  const [showMapPicker, setShowMapPicker] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim() || !seenCity.trim() || !date || !time || !yourName.trim() || !contactInfo.trim()) {
      setError(t.errRequired);
      return;
    }
    if (date > todayStr()) {
      setError(t.futureDateError);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const filingLoc = isEdit ? null : await captureFilingLocation();
      const payload = {
        id: initialData?.id || genId(), reportId: report.id, location: location.trim(), city: seenCity.trim(),
        date, time, notes: notes.trim(), yourName: yourName.trim(), contactInfo: contactInfo.trim(),
        lat: coords?.lat ?? null, lng: coords?.lng ?? null,
        createdAt: initialData?.createdAt || new Date().toISOString(),
        edited: isEdit ? true : (initialData?.edited || false),
      };
      if (!isEdit && filingLoc) { payload.filingLat = filingLoc.lat; payload.filingLng = filingLoc.lng; }
      else if (isEdit) { payload.filingLat = initialData?.filingLat ?? null; payload.filingLng = initialData?.filingLng ?? null; }
      await onSubmit(payload);
    } catch { setError(t.errSave); setSubmitting(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-5 pb-20">
      <div className="flex items-center gap-2 mb-1 mt-3">
        <Eye size={20} color={C.amber} />
        <h2 style={{ fontFamily: displayFont, fontWeight: 600, color: C.textPrimary }} className="text-2xl">{isEdit ? t.editSighting : t.sightingFormTitle}</h2>
      </div>
      <p className="text-[13.5px] mb-4" style={{ color: C.textMuted }}>
        {t.sightingFormSubPre} <span style={{ color: C.textPrimary, fontWeight: 600 }}>{report.name}</span> {t.sightingFormSubPost}
      </p>
      <LegalWarningBanner t={t} />

      <Field label={t.seenLocation} required icon={MapPin}><Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder={t.seenLocationPh} /></Field>
      <Field label={t.seenCity} required icon={MapPin}><Input value={seenCity} onChange={(e) => setSeenCity(e.target.value)} placeholder={t.cityPh} /></Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.seenDate} required icon={Calendar}><Input type="date" value={date} max={todayStr()} onChange={(e) => setDate(e.target.value)} /></Field>
        <Field label={t.seenTime} required icon={Clock}><Input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></Field>
      </div>

      <Field label={t.notes}><TextArea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t.notesPh} /></Field>

      <Field label={t.pinLocation} icon={Navigation}>
        <button
          type="button"
          onClick={() => setShowMapPicker(true)}
          className="w-full flex items-center justify-center gap-2 text-[13.5px] font-medium py-3 rounded-xl transition-colors"
          style={
            coords
              ? { background: "rgba(0,200,150,0.14)", color: C.emerald, border: `1px solid ${C.surfaceBorder}` }
              : { background: "rgba(22,33,59,0.04)", color: C.textMuted, border: `1px solid ${C.surfaceBorder}` }
          }
        >
          {coords ? <CheckCircle2 size={14} /> : <Navigation size={14} />}
          {coords ? t.locationShared : t.shareLocation}
        </button>
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.yourName} required icon={User}><Input value={yourName} onChange={(e) => setYourName(e.target.value)} placeholder={t.yourNamePh} /></Field>
        <Field label={t.optionalContact} required icon={Phone}><Input value={contactInfo} onChange={(e) => setContactInfo(e.target.value.replace(/[^0-9]/g, ""))} placeholder={t.optionalContactPh} inputMode="numeric" type="tel" /></Field>
      </div>

      {error && <p className="text-[13px] mb-4" style={{ color: C.rose }}>{error}</p>}

      <div className="flex gap-3 mt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-3.5 rounded-xl font-semibold transition-colors" style={{ background: "rgba(22,33,59,0.045)", color: C.textMuted, border: `1px solid ${C.surfaceBorder}` }}>{t.cancel}</button>
        <button type="submit" disabled={submitting} className="flex-1 py-3.5 rounded-xl font-semibold transition-all disabled:opacity-60" style={{ background: `linear-gradient(135deg, ${C.amber}, #DBAF5C)`, color: "#16213B", boxShadow: `0 8px 20px ${C.amber}40` }}>
          {submitting ? t.submitting : isEdit ? t.saveChanges : t.sendSighting}
        </button>
      </div>

      {showMapPicker && (
        <MapPickerModal
          t={t}
          initial={coords}
          onClose={() => setShowMapPicker(false)}
          onConfirm={(c) => { setCoords(c); setShowMapPicker(false); }}
        />
      )}
    </form>
  );
}

// ============================== Detail View ==============================
function DetailView({ report, sightings, onBack, onReportSighting, onMarkFound, onFollow, isFollowing, t, isAdmin, onDeleteCase, onDeleteSighting, onEditReport, onEditSighting, onLockedNotice, onToggleVerified }) {
  const mySightings = sightings.filter((s) => s.reportId === report.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const missing = report.status === "missing";
  const pending = report.status === "pending";
  const seeLabel = report.gender === "male" ? t.iSawHim : report.gender === "female" ? t.iSawHer : t.iSawThem;
  const [verifyMode, setVerifyMode] = useState(null); // 'markFound' | 'edit' | 'viewFiler' | null
  const [filerVerified, setFilerVerified] = useState(false);
  const [showFoundLocationPrompt, setShowFoundLocationPrompt] = useState(false);
  const photos = getPhotos(report);
  const [heroIdx, setHeroIdx] = useState(0);
  const [myIds, setMyIds] = useState([]);
  const [reportedCaseIds, setReportedCaseIds] = useState([]);
  useEffect(() => { setMyIds(getMySightingIds()); setReportedCaseIds(getReportedCaseIds()); }, []);
  const hasContactAccess = isAdmin || reportedCaseIds.includes(report.id);
  const isMyOwnReport = getMyReportIds().includes(report.id);

  // ---- Pending review — hidden from everyone except admin and the case filer themselves ----
  if (pending && !isAdmin && !isMyOwnReport) {
    return (
      <div className="max-w-lg mx-auto px-5 pb-20">
        <div className="flex items-center mt-3 mb-4">
          <button onClick={onBack} className="flex items-center gap-1.5 text-[13px] transition-colors" style={{ color: C.textMuted }}>
            <ArrowLeft size={15} /> {t.back}
          </button>
        </div>
        <div className="rounded-2xl p-6 text-center" style={{ background: C.surface, border: `1px solid ${C.surfaceBorder}` }}>
          <Lock size={26} color={C.amber} className="mx-auto mb-3" />
          <p className="text-[13.5px]" style={{ color: C.textPrimary }}>{t.pendingNotice}</p>
        </div>
      </div>
    );
  }

  // ---- Restricted privacy view for reunited cases (non-admin) ----
  if (report.status === "found" && !isAdmin) {
    return (
      <div className="max-w-lg mx-auto px-5 pb-20">
        <div className="flex items-center mt-3 mb-4">
          <button onClick={onBack} className="flex items-center gap-1.5 text-[13px] transition-colors" style={{ color: C.textMuted }}>
            <ArrowLeft size={15} /> {t.back}
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden mb-5" style={{ border: `1px solid ${C.surfaceBorder}` }}>
          <div className="relative aspect-[16/10] w-full" style={{ background: "linear-gradient(160deg,#2A3548,#16213B)" }}>
            {photos[0] ? <img src={photos[0]} alt={report.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><User size={40} color={C.textFaint} /></div>}
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,8,24,0) 45%, rgba(13,8,24,0.95) 100%)" }} />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wide flex items-center gap-1" style={{ background: C.emerald, color: "#F7F5EE" }}>
              <CheckCircle2 size={11} /> {t.statusFound}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h2 style={{ fontFamily: displayFont, fontWeight: 600 }} className="text-[26px] text-white leading-tight">{report.name}</h2>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-5 text-center" style={{ background: C.surface, border: `1px solid ${C.surfaceBorder}` }}>
          <CheckCircle2 size={28} color={C.emerald} className="mx-auto mb-2" />
          <p className="text-[13.5px] mb-4" style={{ color: C.textPrimary }}>{t.reunitedNotice}</p>
          <div className="flex items-start justify-center gap-6 text-[12.5px]" style={{ color: C.textMuted }}>
            <div>
              <div className="text-[10.5px] uppercase tracking-wide mb-0.5" style={{ color: C.textFaint }}>{t.missingSince}</div>
              {fmtDate(report.createdAt)}
              {(report.lastSeenLocation || report.city) && (
                <div className="flex items-center gap-1 mt-1 text-[11px] justify-center" style={{ color: C.textFaint }}>
                  <MapPin size={10} className="shrink-0" /><span>{report.lastSeenLocation}{report.city && report.lastSeenLocation ? `, ${report.city}` : report.city}</span>
                </div>
              )}
            </div>
            <div className="w-px self-stretch" style={{ background: C.surfaceBorder }} />
            <div>
              <div className="text-[10.5px] uppercase tracking-wide mb-0.5" style={{ color: C.textFaint }}>{t.reunitedOn}</div>
              {fmtDate(report.foundAt || report.createdAt)}
              {report.foundLat != null && report.foundLng != null && (
                <a
                  href={`https://www.google.com/maps?q=${report.foundLat},${report.foundLng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 mt-1 text-[11px] justify-center font-medium"
                  style={{ color: C.amber }}
                >
                  <MapPin size={10} className="shrink-0" /><span>{t.reunitedLocation}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/case/${report.id}`;
    const msg = `${t.shareHelp}\n\n${t.shareText} ${report.name} (${report.age || "?"}y)\n${report.city || ""}${report.city && report.lastSeenLocation ? " — " : ""}${report.lastSeenLocation || ""}\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="max-w-lg mx-auto px-5 pb-20">
      <div className="flex items-center justify-between mt-3 mb-4">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[13px] transition-colors" style={{ color: C.textMuted }}>
          <ArrowLeft size={15} /> {t.back}
        </button>
        <div className="flex items-center gap-2">
          {missing && report.verified && (
            <button onClick={handleShare} aria-label={t.shareCase} className="flex items-center gap-1 px-2.5 py-1.5 rounded-full transition-colors"
              style={{ background: "rgba(37,211,102,0.14)", border: `1px solid ${C.surfaceBorder}` }}>
              <WhatsAppIcon size={14} color="#25D366" />
              <Share2 size={11} color="#25D366" />
            </button>
          )}
          {missing && (
            <button onClick={() => onFollow(report)} className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full transition-colors"
              style={{ background: isFollowing ? "rgba(0,200,150,0.15)" : "rgba(22,33,59,0.05)", color: isFollowing ? C.emerald : C.textMuted, border: `1px solid ${C.surfaceBorder}` }}>
              {isFollowing ? <BellRing size={13} /> : <Bell size={13} />} {isFollowing ? t.following : t.follow}
            </button>
          )}
        </div>
      </div>

      {missing && report.verified && (
        <p className="text-[11.5px] italic mb-4 -mt-2" style={{ color: C.textMuted, fontFamily: displayFont }}>{t.shareEncourage}</p>
      )}

      {!missing && isAdmin && (
        <div className="mb-4 rounded-xl p-3 flex items-center gap-2 text-[11.5px]" style={{ background: "rgba(201,154,62,0.14)", color: "#8A6416", border: `1px solid ${C.surfaceBorder}` }}>
          <Lock size={12} /> Admin view — full details visible (hidden from public since this case is Reunited).
        </div>
      )}

      {pending && (isAdmin || isMyOwnReport) && (
        <div className="mb-4 rounded-xl p-3 flex items-start gap-2 text-[11.5px]" style={{ background: "rgba(201,154,62,0.14)", color: "#8A6416", border: `1px solid ${C.surfaceBorder}` }}>
          <Clock size={12} className="shrink-0 mt-0.5" />
          <div>
            <p>{t.pendingReviewFriendly}</p>
            {isMyOwnReport && !isAdmin && <p className="mt-1.5 italic" style={{ color: C.textMuted, fontFamily: displayFont }}>{t.pendingWaitingEncourage}</p>}
            {isMyOwnReport && !isAdmin && <p className="mt-1.5" style={{ color: C.textFaint }}>{t.editUntilVerified}</p>}
          </div>
        </div>
      )}

      {report.verified && isMyOwnReport && !isAdmin && (
        <div className="mb-4 rounded-xl p-3 flex items-center gap-2 text-[11.5px]" style={{ background: "rgba(0,200,150,0.1)", color: C.emerald, border: `1px solid ${C.surfaceBorder}` }}>
          <Lock size={12} className="shrink-0" /> {t.editLockedAfterVerify}
        </div>
      )}

      <div className="rounded-2xl overflow-hidden mb-2.5" style={{ border: `1px solid ${C.surfaceBorder}` }}>
        <div className="relative aspect-[16/10] w-full" style={{ background: "linear-gradient(160deg,#2A3548,#16213B)" }}>
          {photos[heroIdx] ? <img src={photos[heroIdx]} alt={report.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><User size={40} color={C.textFaint} /></div>}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,8,24,0) 45%, rgba(13,8,24,0.95) 100%)" }} />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wide" style={{ background: pending ? C.amber : missing ? C.rose : C.emerald, color: pending ? "#16213B" : "#F7F5EE" }}>
            {pending ? t.statusPending : missing ? t.statusMissing : t.statusFound}
          </div>
          {report.verified && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: C.emerald, color: "#F7F5EE" }}>
              <CheckCircle2 size={11} /> {t.verifiedBadge}
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 style={{ fontFamily: displayFont, fontWeight: 600 }} className="text-[26px] text-white leading-tight">{report.name}</h2>
            <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.7)" }}>{report.age && `${report.age}y`}{report.gender && ` · ${report.gender}`}</p>
            <p className="font-mono text-[10.5px] mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{refNo(report.id, report.createdAt)}</p>
          </div>
        </div>
      </div>

      {photos.length > 1 && (
        <div className="flex gap-2 mb-5">
          {photos.map((p, i) => (
            <button key={i} type="button" onClick={() => setHeroIdx(i)} className="w-14 h-16 rounded-lg overflow-hidden shrink-0" style={{ border: `2px solid ${i === heroIdx ? C.rose : "transparent"}`, opacity: i === heroIdx ? 1 : 0.55 }}>
              <img src={p} className="w-full h-full object-cover" alt="" />
            </button>
          ))}
        </div>
      )}
      {photos.length <= 1 && <div className="mb-5" />}

      <div className="space-y-2.5 text-[14px] mb-5 rounded-2xl p-4" style={{ background: C.surface, border: `1px solid ${C.surfaceBorder}`, color: C.textPrimary }}>
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex gap-2.5"><MapPin size={15} className="mt-0.5 shrink-0" color={C.textMuted} /><span>{report.city ? `${report.city} — ` : ""}{report.lastSeenLocation}</span></div>
          {report.lastSeenLat != null && report.lastSeenLng != null && (
            <a href={`https://www.google.com/maps?q=${report.lastSeenLat},${report.lastSeenLng}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11.5px] font-medium shrink-0" style={{ color: C.amber }}>
              <MapPin size={11} /> {t.viewOnMap}
            </a>
          )}
        </div>
        {(report.lastSeenDate || report.lastSeenTime) && (
          <div className="flex gap-2.5"><Calendar size={15} className="mt-0.5 shrink-0" color={C.textMuted} /><span>{t.lastSeenOn} {fmtDate(report.lastSeenDate) || "—"}{report.lastSeenTime && `, ${fmtTime(report.lastSeenTime)}`}</span></div>
        )}
        {report.description && <div className="pt-2 border-t" style={{ borderColor: C.surfaceBorder }}>{report.description}</div>}

        {hasContactAccess ? (
          <>
            {report.homeAddress && (
              <div className="flex items-start justify-between gap-2.5 pt-2 border-t" style={{ borderColor: C.surfaceBorder }}>
                <div className="flex gap-2.5"><Home size={15} className="mt-0.5 shrink-0" color={C.textMuted} /><span>{report.homeAddress}</span></div>
                {report.homeLat != null && report.homeLng != null && (
                  <a href={`https://www.google.com/maps?q=${report.homeLat},${report.homeLng}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11.5px] font-medium shrink-0" style={{ color: C.amber }}>
                    <MapPin size={11} /> {t.viewOnMap}
                  </a>
                )}
              </div>
            )}
            <div className="flex items-center justify-between gap-2.5 pt-2 border-t" style={{ borderColor: C.surfaceBorder }}>
              <div className="flex gap-2.5 min-w-0">
                <Phone size={15} className="mt-0.5 shrink-0" color={C.textMuted} />
                <div className="min-w-0"><div className="truncate">{report.contactInfo}</div><div className="text-[11px]" style={{ color: C.textFaint }}>{t.callNumber}</div></div>
              </div>
              <CallButton number={report.contactInfo} label={t.callFamily} tone="emerald" />
            </div>
          </>
        ) : (
          <div className="pt-2 border-t" style={{ borderColor: C.surfaceBorder }}>
            <div className="flex gap-2.5 mb-2.5">
              <Lock size={15} className="mt-0.5 shrink-0" color={C.textFaint} />
              <div>
                <div className="text-[13px] font-medium mb-0.5" style={{ color: C.textMuted }}>{t.lockedInfoTitle}</div>
                <div className="text-[12px] leading-relaxed" style={{ color: C.textFaint }}>{t.lockedInfoMsg}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onLockedNotice && onLockedNotice(t.reportToContactMsg)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 text-[12.5px] font-medium px-3 py-2.5 rounded-xl"
                style={{ background: "rgba(22,33,59,0.035)", color: C.textFaint, border: `1px solid ${C.surfaceBorder}` }}
              >
                <Phone size={12} /> {t.callFamily}
              </button>
              {missing && (
                <button
                  type="button"
                  onClick={() => onReportSighting(report)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-[12.5px] font-semibold px-3 py-2.5 rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${C.amber}, #DBAF5C)`, color: "#16213B" }}
                >
                  <Eye size={12} /> {t.reportToUnlock}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {isAdmin && (report.filingLat != null || report.markFoundLat != null || report.markFoundByAdmin) && (
        <div className="mb-3 rounded-xl p-3.5 space-y-2" style={{ background: "rgba(255,182,39,0.08)", border: `1px dashed ${C.amber}55` }}>
          <div className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: "#8A6416" }}><Lock size={11} /> {t.adminLocSection1}</div>
          {report.filingLat != null && (
            <a
              href={`https://www.google.com/maps?q=${report.filingLat},${report.filingLng}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-2 rounded-xl"
              style={{ background: "rgba(201,154,62,0.16)", color: "#8A6416" }}
            >
              <MapPin size={12} className="shrink-0" /> {t.adminFilerLocation}
            </a>
          )}
          {report.markFoundLat != null && !report.markFoundByAdmin && (
            <a
              href={`https://www.google.com/maps?q=${report.markFoundLat},${report.markFoundLng}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-2 rounded-xl"
              style={{ background: "rgba(201,154,62,0.16)", color: "#8A6416" }}
            >
              <MapPin size={12} className="shrink-0" /> {t.adminMarkFoundLocation}
            </a>
          )}
          {report.markFoundByAdmin && (
            <p className="text-[11px] px-1" style={{ color: C.textFaint }}>{t.markedFoundByAdminNote}</p>
          )}
        </div>
      )}

      {isAdmin && (report.homeLat != null || report.lastSeenLat != null || report.foundLat != null) && (
        <div className="mb-5 rounded-xl p-3.5 space-y-2" style={{ background: "rgba(255,182,39,0.08)", border: `1px dashed ${C.amber}55` }}>
          <div className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: "#8A6416" }}><MapPin size={11} /> {t.adminLocSection2}</div>
          {report.lastSeenLat != null && (
            <a
              href={`https://www.google.com/maps?q=${report.lastSeenLat},${report.lastSeenLng}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-2 rounded-xl"
              style={{ background: "rgba(201,154,62,0.16)", color: "#8A6416" }}
            >
              <MapPin size={12} className="shrink-0" /> {t.lastLocationByFiler}
            </a>
          )}
          {report.homeLat != null && (
            <a
              href={`https://www.google.com/maps?q=${report.homeLat},${report.homeLng}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-2 rounded-xl"
              style={{ background: "rgba(201,154,62,0.16)", color: "#8A6416" }}
            >
              <MapPin size={12} className="shrink-0" /> {t.homePinLocation}
            </a>
          )}
          {report.foundLat != null && (
            <a
              href={`https://www.google.com/maps?q=${report.foundLat},${report.foundLng}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-2 rounded-xl"
              style={{ background: "rgba(201,154,62,0.16)", color: "#8A6416" }}
            >
              <MapPin size={12} className="shrink-0" /> {t.reunitedLocation}
            </a>
          )}
        </div>
      )}

      {missing && (
        <div className="flex gap-3 mb-2.5">
          <button onClick={() => onReportSighting(report)} className="flex-1 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2" style={{ background: `linear-gradient(135deg, ${C.amber}, #DBAF5C)`, color: "#16213B" }}>
            <Eye size={16} /> {seeLabel}
          </button>
          <button
            onClick={() => (isAdmin ? setShowFoundLocationPrompt(true) : setVerifyMode("markFound"))}
            className="py-3.5 px-4 rounded-xl font-medium transition-colors flex items-center gap-2"
            style={{ border: `1px solid ${C.surfaceBorder}`, color: C.textMuted }}
          >
            <CheckCircle2 size={16} /> {t.markFound}
          </button>
        </div>
      )}

      {missing && (
        <p className="text-[11.5px] leading-relaxed mb-4 italic" style={{ color: C.textMuted, fontFamily: displayFont }}>{t.sightingEncourage}</p>
      )}

      {(isAdmin || (pending && isMyOwnReport && !report.verified) || (missing && !report.verified)) && (
        <button
          onClick={() => (isAdmin ? onEditReport(report) : setVerifyMode("edit"))}
          className="w-full mb-6 py-2.5 rounded-xl font-medium text-[12.5px] flex items-center justify-center gap-1.5"
          style={{ border: `1px solid ${C.surfaceBorder}`, color: C.textMuted }}
        >
          <Pencil size={12} /> {t.editCase}
        </button>
      )}

      {isAdmin && (
        <div className="flex gap-3 mb-3 -mt-3">
          <button
            onClick={() => { if (window.confirm(t.confirmDeleteCase)) onDeleteCase(report); }}
            className="flex-1 py-2.5 rounded-xl font-semibold text-[12.5px] flex items-center justify-center gap-1.5"
            style={{ background: "rgba(255,84,112,0.12)", color: C.rose, border: `1px solid ${C.surfaceBorder}` }}
          >
            <Trash2 size={13} /> {t.deleteCase}
          </button>
        </div>
      )}

      {isAdmin && (
        <button
          onClick={() => onToggleVerified(report)}
          className="w-full mb-6 py-2.5 rounded-xl font-semibold text-[12.5px] flex items-center justify-center gap-1.5"
          style={
            report.verified
              ? { background: "rgba(0,200,150,0.14)", color: C.emerald, border: `1px solid ${C.surfaceBorder}` }
              : { background: "rgba(22,33,59,0.045)", color: C.textMuted, border: `1px solid ${C.surfaceBorder}` }
          }
        >
          <CheckCircle2 size={13} /> {report.verified ? `✓ ${t.verifiedBadge}` : t.verifiedBadge}
        </button>
      )}

      {verifyMode && (
        <VerifyReunitedModal
          report={report}
          t={t}
          title={verifyMode === "edit" ? t.verifyEditTitle : verifyMode === "viewFiler" ? t.verifyFilerTitle : undefined}
          sub={verifyMode === "edit" ? t.verifyEditSub : verifyMode === "viewFiler" ? t.verifyFilerSub : undefined}
          continueLabel={verifyMode === "edit" ? t.editConfirmBtn : verifyMode === "viewFiler" ? t.confirmBtn : undefined}
          onClose={() => setVerifyMode(null)}
          onConfirmed={() => {
            const mode = verifyMode;
            setVerifyMode(null);
            if (mode === "markFound") setShowFoundLocationPrompt(true);
            else if (mode === "edit") onEditReport(report);
            else if (mode === "viewFiler") setFilerVerified(true);
          }}
        />
      )}

      {showFoundLocationPrompt && (
        <MapPickerModal
          t={t}
          initial={null}
          allowSkip
          titleOverride={t.foundLocationMapTitle}
          onClose={() => setShowFoundLocationPrompt(false)}
          onSkip={() => { setShowFoundLocationPrompt(false); onMarkFound(report, { foundCoords: null, byAdmin: isAdmin }); }}
          onConfirm={(coords) => { setShowFoundLocationPrompt(false); onMarkFound(report, { foundCoords: coords, byAdmin: isAdmin }); }}
        />
      )}

      <div className="flex items-center justify-between mb-1 gap-2">
        <h3 className="text-[14px] font-semibold flex items-center gap-1.5" style={{ color: C.textPrimary }}>
          <Radio size={14} /> {t.timelineHeading} ({mySightings.length})
        </h3>
        {missing && !isAdmin && !filerVerified && mySightings.length > 0 && (
          <button onClick={() => setVerifyMode("viewFiler")} className="flex items-center gap-1 text-[10.5px] font-medium shrink-0" style={{ color: C.amber }}>
            <Lock size={10} /> {t.viewReporterInfo}
          </button>
        )}
      </div>
      <p className="text-[11.5px] italic mb-3" style={{ color: C.textMuted, fontFamily: displayFont }}>{t.timelineEncourage}</p>
      <div className="relative pl-5">
          <div className="absolute left-[7px] top-1.5 bottom-1.5 w-[1.5px]" style={{ background: C.surfaceBorder }} />
          {mySightings.length === 0 && <p className="text-[13.5px] mb-4" style={{ color: C.textFaint }}>{t.noSightings}</p>}
          {mySightings
            .slice()
            .sort((a, b) => {
              const ta = new Date(`${a.date || a.createdAt.slice(0, 10)}T${a.time || "00:00"}`).getTime() || new Date(a.createdAt).getTime();
              const tb = new Date(`${b.date || b.createdAt.slice(0, 10)}T${b.time || "00:00"}`).getTime() || new Date(b.createdAt).getTime();
              return tb - ta;
            })
            .map((s) => {
              const canEdit = myIds.includes(s.id) && !s.edited;
              const canSeeReporter = isAdmin || filerVerified;
              return (
              <div key={s.id} className="relative mb-4 last:mb-0">
                <span className="absolute -left-5 top-1 w-3 h-3 rounded-full border-2" style={{ background: C.amber, borderColor: C.bgTo }} />
                <div className="rounded-xl p-3.5" style={{ background: C.surface, border: `1px solid ${C.surfaceBorder}` }}>
                  <div className="flex items-center justify-between gap-2 mb-1 text-[11.5px]" style={{ color: C.textMuted }}>
                    <div className="flex items-center gap-2"><Calendar size={11} /><span>{t.sightedAt} {fmtDate(s.date) || fmtDate(s.createdAt)}{s.time && `, ${fmtTime(s.time)}`}</span></div>
                    {s.edited && <span className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0" style={{ background: "rgba(22,33,59,0.05)", color: C.textFaint }}>{t.edited}</span>}
                  </div>
                  <div className="flex items-center gap-1.5 text-[14px] font-semibold mb-1" style={{ color: C.textPrimary }}>
                    <MapPin size={13} color={C.amber} className="shrink-0" />
                    <span>{s.location}{s.city && `, ${s.city}`}</span>
                  </div>
                  {s.notes && <p className="text-[13.5px] mb-1" style={{ color: C.textPrimary }}>{s.notes}</p>}
                  {canSeeReporter ? (
                    (s.yourName || s.contactInfo) && (
                      <p className="text-[11.5px]" style={{ color: C.textFaint }}>
                        {s.yourName && s.yourName} {s.contactInfo && `· ${t.contact}: ${s.contactInfo}`}
                      </p>
                    )
                  ) : (
                    <p className="flex items-center gap-1 text-[11px]" style={{ color: C.textFaint }}>
                      <Lock size={9} /> {t.reporterInfoLocked}
                    </p>
                  )}
                  {s.lat != null && s.lng != null && (
                    <a href={`https://www.google.com/maps?q=${s.lat},${s.lng}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11.5px] mt-1.5 font-medium" style={{ color: C.amber }}>
                      <MapPin size={11} /> {t.viewOnMap}
                    </a>
                  )}
                  {isAdmin && s.filingLat != null && (
                    <a
                      href={`https://www.google.com/maps?q=${s.filingLat},${s.filingLng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-[11px] font-medium mt-2 px-2.5 py-1.5 rounded-lg"
                      style={{ background: "rgba(201,154,62,0.16)", color: "#8A6416" }}
                    >
                      <Lock size={10} className="shrink-0" /> {t.adminSightingLocation}
                    </a>
                  )}
                  <div className="flex items-center gap-2 mt-2.5">
                    {canSeeReporter && s.contactInfo && <CallButton number={s.contactInfo} label={t.callReporter} tone="amber" />}
                    {canEdit && (
                      <button
                        onClick={() => onEditSighting(s)}
                        className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-2 rounded-xl"
                        style={{ background: "rgba(201,154,62,0.16)", color: "#8A6416" }}
                      >
                        <Pencil size={12} /> {t.editSighting}
                      </button>
                    )}
                    {isAdmin && (
                      <button
                        onClick={() => { if (window.confirm(t.confirmDeleteSighting)) onDeleteSighting(s); }}
                        className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-2 rounded-xl"
                        style={{ background: "rgba(255,84,112,0.1)", color: C.rose }}
                      >
                        <Trash2 size={12} /> {t.deleteSighting}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              );
            })}
          <div className="relative">
            <span className="absolute -left-5 top-1 w-3 h-3 rounded-full border-2" style={{ background: C.rose, borderColor: C.bgTo }} />
            <div className="rounded-xl p-3.5 flex items-center gap-2.5" style={{ background: "rgba(255,84,112,0.06)", border: `1px solid ${C.surfaceBorder}` }}>
              <ShieldAlert size={14} color={C.rose} className="shrink-0" />
              <div className="text-[12.5px]" style={{ color: C.textMuted }}>
                <span style={{ color: C.textPrimary, fontWeight: 600 }}>{t.reportedMissingOn}</span> — {fmtDate(report.createdAt)}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

// ============================== Main App ==============================
export default function App() {
  useFonts();
  const [lang, setLang] = useState("en");
  const t = getT(lang);
  const isUrduScript = LANGS.find((l) => l.code === lang)?.script === "urdu";
  const [reports, setReports] = useState([]);
  const [sightings, setSightings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [followed, setFollowed] = useState({});
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("board");
  const [activeReport, setActiveReport] = useState(null);
  const [filter, setFilter] = useState("missing");
  const [searchQuery, setSearchQuery] = useState("");
  const [myReportIds, setMyReportIds] = useState([]);
  useEffect(() => { setMyReportIds(getMyReportIds()); }, []);
  const [cityFilter, setCityFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [toast, setToast] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(() => {
    try { return localStorage.getItem(ADMIN_SESSION_KEY) === "1"; } catch { return false; }
  });
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [editingSighting, setEditingSighting] = useState(null);
  const [locationPromptFor, setLocationPromptFor] = useState(null); // null | 'report' | { sighting: report }

  const requestLocationThen = (proceed) => {
    if (navigator.geolocation) {
      try { navigator.geolocation.getCurrentPosition(() => {}, () => {}, { timeout: 1000 }); } catch {}
    }
    proceed();
  };

  const refresh = useCallback(async () => {
    const [r, s, n] = await Promise.all([loadList("khoj-reports"), loadList("khoj-sightings"), loadList("khoj-notifications")]);
    r.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    n.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setReports(r); setSightings(s); setNotifications(n); setLoading(false);
    try {
      const params = new URLSearchParams(window.location.search);
      const caseId = params.get("case");
      if (caseId) {
        const match = r.find((rep) => rep.id === caseId);
        if (match) { setActiveReport(match); setView("detail"); }
      }
    } catch {}
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  // Live updates: reflect changes from any user, in real time, no refresh needed.
  useEffect(() => {
    const unsubReports = subscribeToCollection("khoj-reports", {
      onInsertOrUpdate: (item) => {
        setReports((prev) => {
          const exists = prev.some((r) => r.id === item.id);
          const next = exists ? prev.map((r) => (r.id === item.id ? item : r)) : [item, ...prev];
          return next.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        });
      },
      onDelete: (id) => setReports((prev) => prev.filter((r) => r.id !== id)),
    });
    const unsubSightings = subscribeToCollection("khoj-sightings", {
      onInsertOrUpdate: (item) => {
        setSightings((prev) => {
          const exists = prev.some((s) => s.id === item.id);
          return exists ? prev.map((s) => (s.id === item.id ? item : s)) : [item, ...prev];
        });
      },
      onDelete: (id) => setSightings((prev) => prev.filter((s) => s.id !== id)),
    });
    const unsubNotifs = subscribeToCollection("khoj-notifications", {
      onInsertOrUpdate: (item) => {
        setNotifications((prev) => {
          if (prev.some((n) => n.id === item.id)) return prev;
          return [item, ...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        });
      },
    });
    return () => { unsubReports(); unsubSightings(); unsubNotifs(); };
  }, []);

  useEffect(() => {
    const onDoc = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3200); };

  const pushNotification = async (message, reportId, type) => {
    const entry = { id: genId(), message, reportId, type, createdAt: new Date().toISOString() };
    setNotifications((prev) => [entry, ...prev]);
    await saveList("khoj-notifications", null, entry);
  };

  const handleSubmitReport = async (report) => {
    await saveList("khoj-reports", null, report);
    setReports((prev) => [report, ...prev]);
    addMyReportId(report.id);
    setMyReportIds((prev) => (prev.includes(report.id) ? prev : [...prev, report.id]));
    setView("board"); setFilter("missing");
    showToast(report.status === "pending" ? t.pendingBanner : t.reportPosted);
    pushNotification(`${t.eventNewCase} ${report.name}`, report.id, "new");
  };
  const handleSubmitSighting = async (sighting) => {
    await saveList("khoj-sightings", null, sighting);
    setSightings((prev) => (prev.some((s) => s.id === sighting.id) ? prev.map((s) => (s.id === sighting.id ? sighting : s)) : [sighting, ...prev]));
    addMySightingId(sighting.id);
    addReportedCaseId(sighting.reportId);
    setView("detail");
    showToast(t.sightingSent);
    const report = reports.find((r) => r.id === sighting.reportId);
    pushNotification(`${t.eventSighting} ${report?.name || ""}`, sighting.reportId, "sighting");
  };
  const handleMarkFound = async (report, options = {}) => {
    // Silently capture the marker's own location — only meaningful when the
    // case filer themselves is the one marking it found (via PIN), not admin.
    const markerLoc = options.byAdmin ? null : await captureFilingLocation();
    // The optional, manually-picked location of where the missing person was found (shown publicly).
    const foundLoc = options.foundCoords || null;
    const updatedReport = {
      ...report, status: "found", foundAt: new Date().toISOString(),
      foundLat: foundLoc?.lat ?? null, foundLng: foundLoc?.lng ?? null,
      markFoundLat: markerLoc?.lat ?? null, markFoundLng: markerLoc?.lng ?? null,
      markFoundByAdmin: !!options.byAdmin,
    };
    await saveList("khoj-reports", null, updatedReport);
    setReports((prev) => prev.map((r) => (r.id === report.id ? updatedReport : r)));
    setActiveReport(updatedReport);
    showToast(t.markedFound);
    pushNotification(`${report.name} ${t.eventFound}`, report.id, "found");
  };
  const handleUpdateReport = async (report) => {
    await saveList("khoj-reports", null, report);
    setReports((prev) => prev.map((r) => (r.id === report.id ? report : r)));
    setActiveReport(report);
    setEditingReport(null);
    setView("detail");
    showToast(t.editSaved);
  };
  const handleUpdateSighting = async (sighting) => {
    await saveList("khoj-sightings", null, sighting);
    setSightings((prev) => prev.map((s) => (s.id === sighting.id ? sighting : s)));
    setEditingSighting(null);
    setView("detail");
    showToast(t.editSaved);
  };
  const handleToggleVerified = async (report) => {
    const turningOn = !report.verified;
    const wasPending = report.status === "pending";
    const updated = {
      ...report,
      verified: turningOn,
      // Un-verifying only un-publishes a live "missing" case back to pending review.
      // A "found"/reunited case keeps its status either way — it just loses the badge.
      status: turningOn ? (wasPending ? "missing" : report.status) : (report.status === "missing" ? "pending" : report.status),
    };
    await saveList("khoj-reports", null, updated);
    setReports((prev) => prev.map((r) => (r.id === report.id ? updated : r)));
    setActiveReport(updated);
    if (turningOn && wasPending) {
      pushNotification(`${report.name} ${t.eventVerified}`, report.id, "verified");
    }
  };
  const handleFollow = (report) => {
    setFollowed((f) => ({ ...f, [report.id]: !f[report.id] }));
  };
  const openDetail = (report) => { setActiveReport(report); setView("detail"); };

  const handleDeleteCase = async (report) => {
    await deleteListItem("khoj-reports", report.id);
    setReports((prev) => prev.filter((r) => r.id !== report.id));
    setView("board");
  };
  const handleDeleteSighting = async (sighting) => {
    await deleteListItem("khoj-sightings", sighting.id);
    setSightings((prev) => prev.filter((s) => s.id !== sighting.id));
  };
  const handleAdminSuccess = () => {
    setIsAdmin(true);
    setShowAdminLogin(false);
    try { localStorage.setItem(ADMIN_SESSION_KEY, "1"); } catch {}
  };
  const handleAdminExit = () => {
    setIsAdmin(false);
    try { localStorage.removeItem(ADMIN_SESSION_KEY); } catch {}
  };

  const filtered = reports.filter((r) => {
    if (r.status === "pending" && !(isAdmin && filter === "pending")) return false;
    if (filter !== "all" && filter !== "pending" && r.status !== filter) return false;
    if (filter === "pending" && r.status !== "pending") return false;
    if (cityFilter !== "all" && (r.city || "").trim().toLowerCase() !== cityFilter.toLowerCase()) return false;
    if (genderFilter !== "all" && r.gender !== genderFilter) return false;
    if (searchQuery.trim() && !r.name.toLowerCase().includes(searchQuery.trim().toLowerCase())) return false;
    return true;
  });
  const sightingCountFor = (id) => sightings.filter((s) => s.reportId === id).length;
  const activeCount = reports.filter((r) => r.status === "missing").length;
  const foundCount = reports.filter((r) => r.status === "found").length;
  const pendingCount = reports.filter((r) => r.status === "pending").length;

  return (
    <div dir={isUrduScript ? "rtl" : "ltr"} className={"min-h-screen w-full " + (isUrduScript ? "khoj-nastaliq" : "")} style={{ background: C.bgFrom, fontFamily: isUrduScript ? undefined : bodyFont }}>
      <header className="sticky top-0 z-30" style={{ background: C.bgFrom, borderBottom: `2px solid ${C.navy}` }}>
        <div className="max-w-lg mx-auto px-5 pt-4 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <KhojMark size={38} />
            <div>
              <h1 style={{ fontFamily: displayFont, fontWeight: 700, color: C.textPrimary }} className="text-[19px] leading-none">{t.appName}</h1>
              <p className="text-[10px] mt-0.5 uppercase" style={{ fontFamily: monoFont, letterSpacing: "0.5px", color: C.textMuted }}>{t.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("myPending")}
              className="relative flex items-center gap-1.5 text-[11.5px] font-semibold px-3 h-8 rounded-full transition-colors"
              style={{ background: "rgba(22,33,59,0.05)", border: `1px solid ${C.surfaceBorder}`, color: C.textPrimary }}
            >
              <Clock size={13} />
              <span className="hidden xs:inline">{t.myPendingRequests}</span>
              {reports.some((r) => myReportIds.includes(r.id) && r.status === "pending") && (
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.amber }} />
              )}
            </button>
            <div className="relative" ref={notifRef}>
              <button onClick={() => setNotifOpen((v) => !v)} className="relative w-8 h-8 rounded-full flex items-center justify-center transition-colors" style={{ background: "rgba(22,33,59,0.05)", border: `1px solid ${C.surfaceBorder}` }}>
                <Bell size={15} color={C.textPrimary} />
                {notifications.length > 0 && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full" style={{ background: C.rose, border: "2px solid #F0EEE6" }} />}
              </button>
              {notifOpen && (
                <NotifPanel
                  notifications={notifications}
                  t={t}
                  onClose={() => setNotifOpen(false)}
                  onOpenReport={(reportId) => {
                    const r = reports.find((x) => x.id === reportId);
                    if (r) { setActiveReport(r); setView("detail"); setNotifOpen(false); }
                  }}
                />
              )}
            </div>
            <LangPicker lang={lang} setLang={setLang} />
          </div>
        </div>

        {view === "board" && !loading && (
          <div style={{ background: C.navy }}>
            <div className="max-w-lg mx-auto px-5 py-4">
              <h2 style={{ fontFamily: displayFont, fontWeight: 600, color: "#F7F5EE" }} className="text-[19px] leading-snug">
                {t.heroHeadline}<br />{t.heroSubline}
              </h2>
              <p className="text-[11.5px] mt-1.5 leading-relaxed" style={{ color: "#B9BDC9" }}>
                {activeCount > 0 ? `${activeCount} ${activeCount === 1 ? t.activeCases.replace(/s$/, "") : t.activeCases} ${t.heroSearching}` : t.heroSearching}
              </p>
              <button
                onClick={() => setLocationPromptFor("report")}
                className="mt-3 text-[12px] font-medium px-3.5 py-2 rounded"
                style={{ background: C.amber, color: "#3A2B08", fontFamily: bodyFont }}
              >
                {t.report}
              </button>
            </div>
          </div>
        )}

        {view === "board" && !loading && (
          <div className="flex items-center gap-4 px-5 py-2" style={{ background: C.bgTo, borderBottom: `1px solid ${C.surfaceBorder}` }}>
            <div className="max-w-lg mx-auto w-full flex items-center gap-4">
              <a href="tel:15" className="flex items-center gap-1.5" style={{ color: C.rose }}>
                <Shield size={13} />
                <span className="text-[11.5px]" style={{ fontFamily: monoFont, color: C.textPrimary }}>{t.callPolice} 15</span>
              </a>
              <div className="w-px h-3.5" style={{ background: C.surfaceBorder }} />
              <a href="tel:1122" className="flex items-center gap-1.5" style={{ color: C.rose }}>
                <Siren size={13} />
                <span className="text-[11.5px]" style={{ fontFamily: monoFont, color: C.textPrimary }}>{t.callAmbulance} 1122</span>
              </a>
            </div>
          </div>
        )}

        {view === "board" && !loading && (
          <div className="flex" style={{ borderBottom: `1px solid ${C.surfaceBorder}` }}>
            <div className="max-w-lg mx-auto w-full flex">
              <button onClick={() => setFilter("missing")} className="flex-1 py-2.5 text-center transition-colors" style={{ borderRight: `1px solid ${C.surfaceBorder}`, background: filter === "missing" ? "rgba(163,32,32,0.07)" : "transparent" }}>
                <div style={{ fontFamily: monoFont, fontWeight: 600, fontSize: "16px", color: C.rose }}>{activeCount}</div>
                <div className="text-[9.5px] uppercase" style={{ color: C.textMuted, letterSpacing: "0.4px" }}>{t.activeCases}</div>
              </button>
              <button onClick={() => setFilter("found")} className="flex-1 py-2.5 text-center transition-colors" style={{ borderRight: `1px solid ${C.surfaceBorder}`, background: filter === "found" ? "rgba(63,107,74,0.07)" : "transparent" }}>
                <div style={{ fontFamily: monoFont, fontWeight: 600, fontSize: "16px", color: C.emerald }}>{foundCount}</div>
                <div className="text-[9.5px] uppercase" style={{ color: C.textMuted, letterSpacing: "0.4px" }}>{t.reunited}</div>
              </button>
              <button onClick={() => setFilter("all")} className="flex-1 py-2.5 text-center transition-colors" style={{ background: filter === "all" ? "rgba(22,33,59,0.05)" : "transparent" }}>
                <div style={{ fontFamily: monoFont, fontWeight: 600, fontSize: "16px", color: C.textPrimary }}>{reports.length}</div>
                <div className="text-[9.5px] uppercase" style={{ color: C.textMuted, letterSpacing: "0.4px" }}>{t.totalCases}</div>
              </button>
            </div>
          </div>
        )}

        {view === "board" && !loading && (() => {
          const recentReunited = reports
            .filter((r) => r.status === "found")
            .sort((a, b) => new Date(b.foundAt || b.createdAt) - new Date(a.foundAt || a.createdAt))[0];
          if (!recentReunited) return null;
          return (
            <div style={{ background: "#EAF1EA", borderBottom: `1px solid #C7DAC9` }}>
              <div className="max-w-lg mx-auto px-5 py-2.5 flex items-center gap-2.5">
                <Heart size={17} color={C.emerald} className="shrink-0" fill={C.emerald} />
                <div className="min-w-0">
                  <div className="text-[11px] font-medium truncate" style={{ color: "#254A30" }}>
                    {recentReunited.name}{recentReunited.age ? `, ${recentReunited.age},` : ""} {t.reunitedHighlight}{recentReunited.city ? ` ${recentReunited.city === "in" ? "" : "in " + recentReunited.city}` : ""}
                  </div>
                  <div className="text-[10px] mt-0.5" style={{ color: C.textMuted }}>{t.reunitedHighlightSub}</div>
                </div>
              </div>
            </div>
          );
        })()}
      </header>

      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 px-4 py-2.5 rounded-full text-[13px] font-semibold shadow-2xl flex items-center gap-1.5" style={{ background: C.textPrimary, color: "#F7F5EE" }}>
          <Sparkles size={13} /> {toast}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24" style={{ color: C.textFaint }}>
          <Loader2 className="animate-spin mb-2" size={22} />
          <p className="text-[13px]">{t.loading}</p>
        </div>
      ) : view === "report" ? (
        <ReportForm onCancel={() => setView("board")} onSubmit={handleSubmitReport} t={t} />
      ) : view === "editReport" && editingReport ? (
        <ReportForm
          onCancel={() => { setEditingReport(null); setView("detail"); }}
          onSubmit={handleUpdateReport}
          t={t}
          initialData={editingReport}
          isEdit
        />
      ) : view === "sighting" && activeReport ? (
        <SightingForm report={activeReport} onCancel={() => setView("detail")} onSubmit={handleSubmitSighting} t={t} />
      ) : view === "editSighting" && editingSighting && activeReport ? (
        <SightingForm
          report={activeReport}
          onCancel={() => { setEditingSighting(null); setView("detail"); }}
          onSubmit={handleUpdateSighting}
          t={t}
          initialData={editingSighting}
          isEdit
        />
      ) : view === "myPending" ? (
        <div className="max-w-lg mx-auto px-5 pt-5 pb-20">
          <button onClick={() => setView("board")} className="flex items-center gap-1.5 text-[13px] mb-4" style={{ color: C.textMuted }}>
            <ArrowLeft size={15} /> {t.back}
          </button>
          <h2 style={{ fontFamily: displayFont, fontWeight: 600, color: C.textPrimary }} className="text-2xl mb-4 flex items-center gap-2">
            <Clock size={20} color={C.amber} /> {t.myPendingRequests}
          </h2>
          {(() => {
            const myPending = reports.filter((r) => myReportIds.includes(r.id) && r.status === "pending");
            if (myPending.length === 0) {
              return <p className="text-[13.5px]" style={{ color: C.textFaint }}>{t.myPendingEmptyNew}</p>;
            }
            return (
              <div className="grid grid-cols-2 gap-3.5">
                {myPending.map((r, i) => <NoticeCard key={r.id} report={r} sightingCount={sightingCountFor(r.id)} onOpen={(rep) => { setActiveReport(rep); setView("detail"); }} t={t} index={i} />)}
              </div>
            );
          })()}
        </div>
      ) : view === "detail" && activeReport ? (
        <DetailView
          report={reports.find((r) => r.id === activeReport.id) || activeReport}
          sightings={sightings}
          onBack={() => setView("board")}
          onReportSighting={(r) => setLocationPromptFor({ sighting: r })}
          onMarkFound={handleMarkFound}
          onFollow={handleFollow}
          isFollowing={!!followed[activeReport.id]}
          t={t}
          isAdmin={isAdmin}
          onDeleteCase={handleDeleteCase}
          onDeleteSighting={handleDeleteSighting}
          onEditReport={(r) => { setEditingReport(r); setView("editReport"); }}
          onEditSighting={(s) => { setEditingSighting(s); setView("editSighting"); }}
          onLockedNotice={(msg) => showToast(msg)}
          onToggleVerified={handleToggleVerified}
        />
      ) : (
        <div className="max-w-lg mx-auto px-5 pt-5 relative">
          {/* Background photo collage removed — cleaner paper-registry look */}
          <div className="flex gap-2 mb-2.5 overflow-x-auto relative z-10">
            <Pill active={filter === "missing"} onClick={() => setFilter("missing")} activeColor={C.rose}>{t.tabMissing}</Pill>
            <Pill active={filter === "found"} onClick={() => setFilter("found")} activeColor={C.emerald}>{t.tabFound}</Pill>
            {isAdmin && (
              <Pill active={filter === "pending"} onClick={() => setFilter("pending")} activeColor={C.amber}>
                {t.tabPending}{pendingCount > 0 ? ` (${pendingCount})` : ""}
              </Pill>
            )}
          </div>
          <div className="flex items-center gap-2 mb-3 px-3.5 py-[7px] rounded-full relative z-10" style={{ background: "rgba(22,33,59,0.05)", border: `1px solid ${C.surfaceBorder}` }}>
            <Search size={13} color={C.textFaint} className="shrink-0" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchByName}
              className="bg-transparent outline-none text-[13px] w-full"
              style={{ color: C.textPrimary }}
            />
          </div>

          <div className="relative z-10"><LegalWarningBanner t={t} /></div>

          <div className="flex gap-2 mb-6 relative z-10">
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="flex-1 text-[12.5px] rounded-xl px-3 py-2 outline-none"
              style={{ background: C.surface, border: `1px solid ${C.surfaceBorder}`, color: C.textPrimary }}
            >
              <option value="all">{t.allCities}</option>
              {PAKISTAN_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="flex-1 text-[12.5px] rounded-xl px-3 py-2 outline-none"
              style={{ background: C.surface, border: `1px solid ${C.surfaceBorder}`, color: C.textPrimary }}
            >
              <option value="all">{t.allGenders}</option>
              <option value="male">{t.genderMale}</option>
              <option value="female">{t.genderFemale}</option>
              <option value="other">{t.genderOther}</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="relative z-10 text-center py-20">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: C.surface, border: `1px solid ${C.surfaceBorder}` }}>
                <Users size={24} color={C.textFaint} />
              </div>
              <p className="text-[14px] mb-1" style={{ color: C.textMuted }}>{t.emptyTitle}</p>
              <p className="text-[12.5px]" style={{ color: C.textFaint }}>{t.emptySub}</p>
            </div>
          ) : (
            <div className="relative z-10 grid grid-cols-2 gap-3.5 pb-24">
              {filtered.map((r, i) => <NoticeCard key={r.id} report={r} sightingCount={sightingCountFor(r.id)} onOpen={openDetail} t={t} index={i} />)}
            </div>
          )}
        </div>
      )}

      {showAdminLogin && <AdminLoginModal t={t} onClose={() => setShowAdminLogin(false)} onSuccess={handleAdminSuccess} />}

      {locationPromptFor && (
        <LocationPromptModal
          t={t}
          onClose={() => setLocationPromptFor(null)}
          onContinue={() => {
            const target = locationPromptFor;
            setLocationPromptFor(null);
            requestLocationThen(() => {
              if (target === "report") {
                setView("report");
              } else if (target && target.sighting) {
                setActiveReport(target.sighting);
                setView("sighting");
              }
            });
          }}
        />
      )}

      <footer className="max-w-lg mx-auto px-5 pb-24 pt-4 text-center">
        <p className="text-[10.5px] leading-relaxed mb-3" style={{ color: "#B4B2A9" }}>{t.footerNote}</p>
        {isAdmin ? (
          <button onClick={handleAdminExit} className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full" style={{ background: "rgba(0,200,150,0.12)", color: C.emerald }}>
            <Lock size={11} /> {t.adminModeOn} · {t.adminExit}
          </button>
        ) : (
          <button onClick={() => setShowAdminLogin(true)} className="inline-flex items-center gap-1 text-[10.5px]" style={{ color: "#B4B2A9" }}>
            <Lock size={10} /> {t.adminLogin}
          </button>
        )}
      </footer>
    </div>
  );
}
