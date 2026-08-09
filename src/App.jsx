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
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Nastaliq+Urdu:wght@500;700&family=JetBrains+Mono:wght@400;600&display=swap";
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
  emptySub: "If someone is missing, be the first to post a report.",
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
  reportFormSub: "Accurate details help the community respond faster.",
  photo: "Photo",
  choosePhoto: "Choose photo",
  photoHint: "Optional, but helps identification.",
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
  yourNamePh: "Optional",
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
  yourNamePh: "اختیاری",
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
  emptySub: "Agar kisi ki khabar nahi mil rahi, sabse pehli report post karein.",
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
  reportFormSub: "Sahi maloomat community ko jaldi madad karne mein madad deti hain.",
  photo: "Tasveer",
  choosePhoto: "Tasveer chunein",
  photoHint: "Optional hai, lekin pehchan mein madad karti hai.",
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
  yourNamePh: "Optional",
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
  yourNamePh: "اختیاری",
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
  yourNamePh: "اختیاري",
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
  yourNamePh: "اختياري",
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
function getT(lang) {
  return { ...EN, ...STR[lang] };
}

// ============================== Storage (Firebase) ==============================
import { loadCollection, saveItem } from "./supabase.js";
async function loadList(key) {
  return await loadCollection(key);
}
async function saveList(key, _fullListIgnored, singleItem) {
  // Firestore stores one document per item, so we only ever
  // need to write the single new/changed item, not the whole list.
  if (singleItem) await saveItem(key, singleItem);
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
const C = {
  bgFrom: "#1B1032",
  bgTo: "#0D0818",
  surface: "rgba(255,255,255,0.045)",
  surfaceBorder: "rgba(255,255,255,0.09)",
  rose: "#FF5470",
  emerald: "#00C896",
  amber: "#FFB627",
  textPrimary: "#F5F3FA",
  textMuted: "#9A93B3",
  textFaint: "#5E5578",
};
const displayFont = "'Clash Display', 'Inter', sans-serif";

// ============================== Logo ==============================
function KhojMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="khojGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF5470" />
          <stop offset="100%" stopColor="#FFB627" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#khojGrad)" />
      <circle cx="17" cy="17" r="7.5" stroke="#1B1032" strokeWidth="2.6" fill="none" />
      <path d="M22.2 22.2 L28 28" stroke="#1B1032" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M17 13.5 C14.5 13.5 13.2 15.3 13.2 17" stroke="#1B1032" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

// ============================== Small UI atoms ==============================
function Pill({ active, children, onClick, activeColor }) {
  return (
    <button
      onClick={onClick}
      className="text-[13px] font-semibold px-3.5 py-[7px] rounded-full transition-all duration-200 whitespace-nowrap"
      style={
        active
          ? { background: activeColor || C.rose, color: "#1B1032", boxShadow: `0 4px 14px ${(activeColor || C.rose)}55` }
          : { background: "rgba(255,255,255,0.06)", color: C.textMuted, border: `1px solid ${C.surfaceBorder}` }
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
const inputBase = "w-full rounded-xl px-3.5 py-3 text-[15px] focus:outline-none transition-all duration-150 placeholder:text-[#5E5578]";
const inputStyle = { background: "rgba(255,255,255,0.045)", border: `1px solid ${C.surfaceBorder}`, color: C.textPrimary };
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
              ? { background: C.rose, color: "#1B1032" }
              : { background: "rgba(255,255,255,0.045)", color: C.textMuted, border: `1px solid ${C.surfaceBorder}` }
          }
        >
          {o.label}
        </button>
      ))}
    </div>
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
        style={{ background: "rgba(255,255,255,0.06)", color: C.textPrimary, border: `1px solid ${C.surfaceBorder}` }}
      >
        <Globe size={13} /> {current.label}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl overflow-hidden z-50 shadow-2xl" style={{ background: "#1C1330", border: `1px solid ${C.surfaceBorder}` }}>
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
function NotifPanel({ notifications, t, onClose }) {
  return (
    <div className="absolute right-0 top-11 w-[300px] max-w-[85vw] rounded-2xl overflow-hidden z-50 shadow-2xl" style={{ background: "#1C1330", border: `1px solid ${C.surfaceBorder}` }}>
      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${C.surfaceBorder}` }}>
        <span className="text-[13.5px] font-semibold" style={{ color: C.textPrimary }}>{t.notifTitle}</span>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-[12.5px] px-4 py-6 text-center" style={{ color: C.textFaint }}>{t.notifEmpty}</p>
        ) : (
          notifications.slice(0, 25).map((n) => (
            <div key={n.id} className="px-4 py-3 flex gap-2.5" style={{ borderBottom: `1px solid ${C.surfaceBorder}` }}>
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: n.type === "found" ? C.emerald : n.type === "sighting" ? C.amber : C.rose }} />
              <div className="min-w-0">
                <p className="text-[12.5px] leading-snug" style={{ color: C.textPrimary }}>{n.message}</p>
                <p className="text-[10.5px] mt-0.5" style={{ color: C.textFaint }}>{timeAgo(n.createdAt)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============================== Notice card ==============================
function NoticeCard({ report, sightingCount, onOpen, t, index }) {
  const missing = report.status === "missing";
  return (
    <button
      onClick={() => onOpen(report)}
      style={{ animationDelay: `${index * 40}ms` }}
      className="khoj-card-in group relative text-left w-full rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5470] transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden" style={{ background: "linear-gradient(160deg,#241a3d,#150f24)", border: `1px solid ${C.surfaceBorder}` }}>
        {report.photo ? (
          <img src={report.photo} alt={report.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center"><User size={36} strokeWidth={1.3} color={C.textFaint} /></div>
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,8,24,0) 40%, rgba(13,8,24,0.92) 100%)" }} />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide"
          style={{ background: missing ? "rgba(255,84,112,0.18)" : "rgba(0,200,150,0.18)", color: missing ? C.rose : C.emerald, backdropFilter: "blur(6px)" }}>
          {missing && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-80" style={{ background: C.rose, animation: "khoj-pulse 1.8s cubic-bezier(0,0,0.2,1) infinite" }} />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: C.rose }} />
            </span>
          )}
          {missing ? t.statusMissing : t.statusFound}
        </div>
        {sightingCount > 0 && (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold" style={{ background: "rgba(255,182,39,0.2)", color: C.amber, backdropFilter: "blur(6px)" }}>
            <Eye size={10} /> {sightingCount}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-[17px] leading-tight text-white" style={{ fontFamily: displayFont, fontWeight: 600 }}>{report.name}</h3>
          <div className="flex items-center gap-2 mt-0.5 text-[11px]" style={{ color: "rgba(255,255,255,0.65)" }}>
            {report.age && <span>{report.age}y</span>}
            {report.gender && <span>· {report.gender}</span>}
          </div>
          <div className="flex items-center gap-1 mt-1.5 text-[11.5px]" style={{ color: "rgba(255,255,255,0.75)" }}>
            <MapPin size={11} className="shrink-0" />
            <span className="truncate">{report.city || report.lastSeenLocation}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

// ============================== Report Form ==============================
function ReportForm({ onCancel, onSubmit, t }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [city, setCity] = useState("");
  const [lastSeenLocation, setLastSeenLocation] = useState("");
  const [lastSeenDate, setLastSeenDate] = useState("");
  const [lastSeenTime, setLastSeenTime] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState("");
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
    setPhotoLoading(true);
    try { setPhoto(await fileToCompressedDataUrl(file)); }
    catch { setError(t.errSave); }
    finally { setPhotoLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !age.trim() || !gender || !city.trim() || !lastSeenLocation.trim() || !contactInfo.trim()) {
      setError(t.errRequired);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await onSubmit({
        id: genId(), name: name.trim(), age: age.trim(), gender, photo, city: city.trim(),
        lastSeenLocation: lastSeenLocation.trim(), lastSeenDate, lastSeenTime,
        homeAddress: homeAddress.trim(), description: description.trim(), contactInfo: contactInfo.trim(),
        status: "missing", createdAt: new Date().toISOString(),
      });
    } catch { setError(t.errSave); setSubmitting(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-5 pb-20">
      <div className="flex items-center gap-2 mb-1 mt-3">
        <ShieldAlert size={20} color={C.rose} />
        <h2 style={{ fontFamily: displayFont, fontWeight: 600, color: C.textPrimary }} className="text-2xl">{t.reportFormTitle}</h2>
      </div>
      <p className="text-[13.5px] mb-6" style={{ color: C.textMuted }}>{t.reportFormSub}</p>

      <Field label={t.photo}>
        <div className="flex items-center gap-3">
          <div className="w-20 h-24 rounded-xl overflow-hidden flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.04)", border: `1px dashed ${C.surfaceBorder}` }}>
            {photoLoading ? <Loader2 size={20} className="animate-spin" color={C.textFaint} /> : photo ? <img src={photo} className="w-full h-full object-cover" alt="preview" /> : <Camera size={20} color={C.textFaint} />}
          </div>
          <div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
            <button type="button" onClick={() => fileRef.current?.click()} className="text-[13px] font-semibold px-3.5 py-2 rounded-full transition-colors" style={{ background: "rgba(255,84,112,0.14)", color: C.rose }}>
              {t.choosePhoto}
            </button>
            <p className="text-[11px] mt-1.5" style={{ color: C.textFaint }}>{t.photoHint}</p>
          </div>
        </div>
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.fullName} required icon={User}><Input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.fullNamePh} /></Field>
        <Field label={t.age} required><Input value={age} onChange={(e) => setAge(e.target.value)} placeholder={t.agePh} inputMode="numeric" /></Field>
      </div>

      <Field label={t.gender} required><SegButton options={genderOptions} value={gender} onChange={setGender} /></Field>
      <Field label={t.city} required icon={MapPin}><Input value={city} onChange={(e) => setCity(e.target.value)} placeholder={t.cityPh} /></Field>
      <Field label={t.lastSeenLocation} required icon={MapPin}><Input value={lastSeenLocation} onChange={(e) => setLastSeenLocation(e.target.value)} placeholder={t.lastSeenLocationPh} /></Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.lastSeenDate} icon={Calendar}><Input type="date" value={lastSeenDate} onChange={(e) => setLastSeenDate(e.target.value)} /></Field>
        <Field label={t.lastSeenTime} icon={Clock}><Input type="time" value={lastSeenTime} onChange={(e) => setLastSeenTime(e.target.value)} /></Field>
      </div>

      <Field label={t.homeAddress} icon={Home}><Input value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} placeholder={t.homeAddressPh} /></Field>
      <Field label={t.description}><TextArea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t.descriptionPh} /></Field>
      <Field label={t.yourContact} required icon={Phone}><Input value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} placeholder={t.yourContactPh} /></Field>

      {error && <p className="text-[13px] mb-4" style={{ color: C.rose }}>{error}</p>}

      <div className="flex gap-3 mt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-3.5 rounded-xl font-semibold transition-colors" style={{ background: "rgba(255,255,255,0.05)", color: C.textMuted, border: `1px solid ${C.surfaceBorder}` }}>{t.cancel}</button>
        <button type="submit" disabled={submitting} className="flex-1 py-3.5 rounded-xl font-semibold transition-all disabled:opacity-60" style={{ background: `linear-gradient(135deg, ${C.rose}, #FF7B54)`, color: "#1B1032", boxShadow: `0 8px 20px ${C.rose}40` }}>
          {submitting ? t.submitting : t.submitReport}
        </button>
      </div>
      <p className="text-[11.5px] mt-6 leading-relaxed" style={{ color: C.textFaint }}>{t.disclaimer}</p>
    </form>
  );
}

// ============================== Sighting Form ==============================
function SightingForm({ report, onCancel, onSubmit, t }) {
  const [location, setLocation] = useState("");
  const [seenCity, setSeenCity] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [yourName, setYourName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim()) { setError(t.errRequired); return; }
    setSubmitting(true);
    setError("");
    try {
      await onSubmit({
        id: genId(), reportId: report.id, location: location.trim(), city: seenCity.trim(),
        date, time, notes: notes.trim(), yourName: yourName.trim(), contactInfo: contactInfo.trim(),
        createdAt: new Date().toISOString(),
      });
    } catch { setError(t.errSave); setSubmitting(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-5 pb-20">
      <div className="flex items-center gap-2 mb-1 mt-3">
        <Eye size={20} color={C.amber} />
        <h2 style={{ fontFamily: displayFont, fontWeight: 600, color: C.textPrimary }} className="text-2xl">{t.sightingFormTitle}</h2>
      </div>
      <p className="text-[13.5px] mb-6" style={{ color: C.textMuted }}>
        {t.sightingFormSubPre} <span style={{ color: C.textPrimary, fontWeight: 600 }}>{report.name}</span> {t.sightingFormSubPost}
      </p>

      <Field label={t.seenLocation} required icon={MapPin}><Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder={t.seenLocationPh} /></Field>
      <Field label={t.seenCity} icon={MapPin}><Input value={seenCity} onChange={(e) => setSeenCity(e.target.value)} placeholder={t.cityPh} /></Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.seenDate} icon={Calendar}><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></Field>
        <Field label={t.seenTime} icon={Clock}><Input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></Field>
      </div>

      <Field label={t.notes}><TextArea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t.notesPh} /></Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.yourName} icon={User}><Input value={yourName} onChange={(e) => setYourName(e.target.value)} placeholder={t.yourNamePh} /></Field>
        <Field label={t.optionalContact} icon={Phone}><Input value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} placeholder={t.optionalContactPh} /></Field>
      </div>

      {error && <p className="text-[13px] mb-4" style={{ color: C.rose }}>{error}</p>}

      <div className="flex gap-3 mt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-3.5 rounded-xl font-semibold transition-colors" style={{ background: "rgba(255,255,255,0.05)", color: C.textMuted, border: `1px solid ${C.surfaceBorder}` }}>{t.cancel}</button>
        <button type="submit" disabled={submitting} className="flex-1 py-3.5 rounded-xl font-semibold transition-all disabled:opacity-60" style={{ background: `linear-gradient(135deg, ${C.amber}, #FFD166)`, color: "#1B1032", boxShadow: `0 8px 20px ${C.amber}40` }}>
          {submitting ? t.submitting : t.sendSighting}
        </button>
      </div>
    </form>
  );
}

// ============================== Detail View ==============================
function DetailView({ report, sightings, onBack, onReportSighting, onMarkFound, onFollow, isFollowing, t }) {
  const mySightings = sightings.filter((s) => s.reportId === report.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const missing = report.status === "missing";
  const seeLabel = report.gender === "male" ? t.iSawHim : report.gender === "female" ? t.iSawHer : t.iSawThem;
  return (
    <div className="max-w-lg mx-auto px-5 pb-20">
      <div className="flex items-center justify-between mt-3 mb-4">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[13px] transition-colors" style={{ color: C.textMuted }}>
          <ArrowLeft size={15} /> {t.back}
        </button>
        {missing && (
          <button onClick={() => onFollow(report)} className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full transition-colors"
            style={{ background: isFollowing ? "rgba(0,200,150,0.15)" : "rgba(255,255,255,0.06)", color: isFollowing ? C.emerald : C.textMuted, border: `1px solid ${C.surfaceBorder}` }}>
            {isFollowing ? <BellRing size={13} /> : <Bell size={13} />} {isFollowing ? t.following : t.follow}
          </button>
        )}
      </div>

      <div className="rounded-2xl overflow-hidden mb-5" style={{ border: `1px solid ${C.surfaceBorder}` }}>
        <div className="relative aspect-[16/10] w-full" style={{ background: "linear-gradient(160deg,#241a3d,#150f24)" }}>
          {report.photo ? <img src={report.photo} alt={report.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><User size={40} color={C.textFaint} /></div>}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,8,24,0) 45%, rgba(13,8,24,0.95) 100%)" }} />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wide" style={{ background: missing ? "rgba(255,84,112,0.2)" : "rgba(0,200,150,0.2)", color: missing ? C.rose : C.emerald, backdropFilter: "blur(6px)" }}>
            {missing ? t.statusMissing : t.statusFound}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 style={{ fontFamily: displayFont, fontWeight: 600 }} className="text-[26px] text-white leading-tight">{report.name}</h2>
            <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.7)" }}>{report.age && `${report.age}y`}{report.gender && ` · ${report.gender}`}</p>
            <p className="font-mono text-[10.5px] mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{refNo(report.id, report.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 text-[14px] mb-5 rounded-2xl p-4" style={{ background: C.surface, border: `1px solid ${C.surfaceBorder}`, color: C.textPrimary }}>
        <div className="flex gap-2.5"><MapPin size={15} className="mt-0.5 shrink-0" color={C.textMuted} /><span>{report.city ? `${report.city} — ` : ""}{report.lastSeenLocation}</span></div>
        {(report.lastSeenDate || report.lastSeenTime) && (
          <div className="flex gap-2.5"><Calendar size={15} className="mt-0.5 shrink-0" color={C.textMuted} /><span>{t.lastSeenOn} {fmtDate(report.lastSeenDate) || "—"}{report.lastSeenTime && `, ${fmtTime(report.lastSeenTime)}`}</span></div>
        )}
        {report.homeAddress && <div className="flex gap-2.5"><Home size={15} className="mt-0.5 shrink-0" color={C.textMuted} /><span>{report.homeAddress}</span></div>}
        {report.description && <div className="pt-2 border-t" style={{ borderColor: C.surfaceBorder }}>{report.description}</div>}
        <div className="flex gap-2.5 pt-2 border-t" style={{ borderColor: C.surfaceBorder }}>
          <Phone size={15} className="mt-0.5 shrink-0" color={C.textMuted} />
          <div><div>{report.contactInfo}</div><div className="text-[11px]" style={{ color: C.textFaint }}>{t.callNumber}</div></div>
        </div>
      </div>

      {missing && (
        <div className="flex gap-3 mb-6">
          <button onClick={() => onReportSighting(report)} className="flex-1 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2" style={{ background: `linear-gradient(135deg, ${C.amber}, #FFD166)`, color: "#1B1032" }}>
            <Eye size={16} /> {seeLabel}
          </button>
          <button onClick={() => onMarkFound(report)} className="py-3.5 px-4 rounded-xl font-medium transition-colors flex items-center gap-2" style={{ border: `1px solid ${C.surfaceBorder}`, color: C.textMuted }}>
            <CheckCircle2 size={16} /> {t.markFound}
          </button>
        </div>
      )}

      <h3 className="text-[14px] font-semibold mb-3 flex items-center gap-1.5" style={{ color: C.textPrimary }}>
        <Radio size={14} /> {t.sightingsHeading} ({mySightings.length})
      </h3>
      {mySightings.length === 0 ? (
        <p className="text-[13.5px]" style={{ color: C.textFaint }}>{t.noSightings}</p>
      ) : (
        <div className="space-y-3">
          {mySightings.map((s) => (
            <div key={s.id} className="rounded-xl p-3.5" style={{ background: C.surface, border: `1px solid ${C.surfaceBorder}` }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[13.5px] font-medium flex items-center gap-1.5" style={{ color: C.textPrimary }}>
                  <MapPin size={12} color={C.amber} /> {s.location}{s.city && `, ${s.city}`}
                </span>
                <span className="text-[11px]" style={{ color: C.textFaint }}>{fmtDate(s.createdAt)}</span>
              </div>
              {(s.date || s.time) && <p className="text-[11.5px] mb-1" style={{ color: C.textMuted }}>{fmtDate(s.date)}{s.time && `, ${fmtTime(s.time)}`}</p>}
              {s.notes && <p className="text-[13.5px]" style={{ color: C.textPrimary }}>{s.notes}</p>}
              {(s.yourName || s.contactInfo) && (
                <p className="text-[11.5px] mt-1" style={{ color: C.textFaint }}>
                  {s.yourName && s.yourName} {s.contactInfo && `· ${t.contact}: ${s.contactInfo}`}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
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
  const [toast, setToast] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const refresh = useCallback(async () => {
    const [r, s, n] = await Promise.all([loadList("khoj-reports"), loadList("khoj-sightings"), loadList("khoj-notifications")]);
    r.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    n.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setReports(r); setSightings(s); setNotifications(n); setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);
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
    setView("board"); setFilter("missing");
    showToast(t.reportPosted);
    pushNotification(`${t.eventNewCase} ${report.name}`, report.id, "new");
  };
  const handleSubmitSighting = async (sighting) => {
    await saveList("khoj-sightings", null, sighting);
    setSightings((prev) => [sighting, ...prev]);
    setView("detail");
    showToast(t.sightingSent);
    const report = reports.find((r) => r.id === sighting.reportId);
    pushNotification(`${t.eventSighting} ${report?.name || ""}`, sighting.reportId, "sighting");
  };
  const handleMarkFound = async (report) => {
    const updatedReport = { ...report, status: "found" };
    await saveList("khoj-reports", null, updatedReport);
    setReports((prev) => prev.map((r) => (r.id === report.id ? updatedReport : r)));
    setActiveReport(updatedReport);
    showToast(t.markedFound);
    pushNotification(`${report.name} ${t.eventFound}`, report.id, "found");
  };
  const handleFollow = (report) => {
    setFollowed((f) => ({ ...f, [report.id]: !f[report.id] }));
  };
  const openDetail = (report) => { setActiveReport(report); setView("detail"); };

  const filtered = reports.filter((r) => (filter === "all" ? true : r.status === filter));
  const sightingCountFor = (id) => sightings.filter((s) => s.reportId === id).length;
  const activeCount = reports.filter((r) => r.status === "missing").length;
  const foundCount = reports.filter((r) => r.status === "found").length;

  return (
    <div dir={isUrduScript ? "rtl" : "ltr"} className={"min-h-screen w-full " + (isUrduScript ? "khoj-nastaliq" : "")} style={{ background: `radial-gradient(1100px 500px at 50% -8%, ${C.bgFrom} 0%, ${C.bgTo} 60%)`, fontFamily: isUrduScript ? undefined : "'Inter', sans-serif" }}>
      <header className="sticky top-0 z-30" style={{ background: "rgba(13,8,24,0.78)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${C.surfaceBorder}` }}>
        <div className="max-w-lg mx-auto px-5 pt-4 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <KhojMark size={38} />
            <div>
              <h1 style={{ fontFamily: displayFont, fontWeight: 700, color: C.textPrimary }} className="text-[19px] leading-none">{t.appName}</h1>
              <p className="text-[10.5px] mt-0.5" style={{ color: C.textFaint }}>{t.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative" ref={notifRef}>
              <button onClick={() => setNotifOpen((v) => !v)} className="relative w-8 h-8 rounded-full flex items-center justify-center transition-colors" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${C.surfaceBorder}` }}>
                <Bell size={15} color={C.textPrimary} />
                {notifications.length > 0 && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full" style={{ background: C.rose, border: "2px solid #0D0818" }} />}
              </button>
              {notifOpen && <NotifPanel notifications={notifications} t={t} onClose={() => setNotifOpen(false)} />}
            </div>
            <LangPicker lang={lang} setLang={setLang} />
          </div>
        </div>

        {view === "board" && !loading && (
          <div className="max-w-lg mx-auto px-5 pb-3 flex items-center gap-4 overflow-x-auto">
            <div className="flex items-center gap-1.5 text-[12px] whitespace-nowrap" style={{ color: C.textMuted }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.rose }} />
              <span style={{ color: C.textPrimary, fontWeight: 600 }}>{activeCount}</span> {t.activeCases}
            </div>
            <div className="flex items-center gap-1.5 text-[12px] whitespace-nowrap" style={{ color: C.textMuted }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.emerald }} />
              <span style={{ color: C.textPrimary, fontWeight: 600 }}>{foundCount}</span> {t.reunited}
            </div>
            <div className="flex items-center gap-1.5 text-[12px] whitespace-nowrap" style={{ color: C.textMuted }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.amber }} />
              <span style={{ color: C.textPrimary, fontWeight: 600 }}>{reports.length}</span> {t.totalCases}
            </div>
          </div>
        )}
      </header>

      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 px-4 py-2.5 rounded-full text-[13px] font-semibold shadow-2xl flex items-center gap-1.5" style={{ background: C.textPrimary, color: "#1B1032" }}>
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
      ) : view === "sighting" && activeReport ? (
        <SightingForm report={activeReport} onCancel={() => setView("detail")} onSubmit={handleSubmitSighting} t={t} />
      ) : view === "detail" && activeReport ? (
        <DetailView
          report={reports.find((r) => r.id === activeReport.id) || activeReport}
          sightings={sightings}
          onBack={() => setView("board")}
          onReportSighting={(r) => { setActiveReport(r); setView("sighting"); }}
          onMarkFound={handleMarkFound}
          onFollow={handleFollow}
          isFollowing={!!followed[activeReport.id]}
          t={t}
        />
      ) : (
        <div className="max-w-lg mx-auto px-5 pt-5 relative">
          <div className="flex gap-2 mb-6 overflow-x-auto">
            <Pill active={filter === "missing"} onClick={() => setFilter("missing")} activeColor={C.rose}>{t.tabMissing}</Pill>
            <Pill active={filter === "found"} onClick={() => setFilter("found")} activeColor={C.emerald}>{t.tabFound}</Pill>
            <Pill active={filter === "all"} onClick={() => setFilter("all")} activeColor={C.amber}>{t.tabAll}</Pill>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: C.surface, border: `1px solid ${C.surfaceBorder}` }}>
                <Users size={24} color={C.textFaint} />
              </div>
              <p className="text-[14px] mb-1" style={{ color: C.textMuted }}>{t.emptyTitle}</p>
              <p className="text-[12.5px]" style={{ color: C.textFaint }}>{t.emptySub}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5 pb-24">
              {filtered.map((r, i) => <NoticeCard key={r.id} report={r} sightingCount={sightingCountFor(r.id)} onOpen={openDetail} t={t} index={i} />)}
            </div>
          )}

          <button onClick={() => setView("report")} className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-5 py-3.5 rounded-full font-semibold text-[14px]" style={{ background: `linear-gradient(135deg, ${C.rose}, #FF7B54)`, color: "#1B1032", boxShadow: `0 10px 28px ${C.rose}55` }}>
            <Plus size={18} strokeWidth={2.5} /> {t.report}
          </button>
        </div>
      )}

      <footer className="max-w-lg mx-auto px-5 pb-24 pt-4 text-center">
        <p className="text-[10.5px] leading-relaxed" style={{ color: "#3D3654" }}>{t.footerNote}</p>
      </footer>
    </div>
  );
}
