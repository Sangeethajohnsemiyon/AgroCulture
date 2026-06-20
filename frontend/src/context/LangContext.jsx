import React, { createContext, useContext, useState } from 'react';

const LangContext = createContext(null);
export const useLang = () => useContext(LangContext);

const translations = {
  en: {
    appName: 'AgroConnect',
    tagline: 'Smart Agriculture Management & Marketplace',
    home: 'Home', dashboard: 'Dashboard', marketplace: 'Marketplace',
    weather: 'Weather', crops: 'My Crops', orders: 'Orders',
    profile: 'Profile', logout: 'Logout', login: 'Login', register: 'Register',
    addCrop: 'Add Crop', myCrops: 'My Crops', farmGallery: 'Farm Gallery',
    fertilizerTracker: 'Fertilizer Tracker', waterUsage: 'Water Usage',
    harvestSchedule: 'Harvest Schedule', diseaseDetection: 'Disease Detection',
    cropRecommendation: 'Crop Recommendation', equipmentRental: 'Equipment Rental',
    buyerDashboard: 'Buyer Dashboard', shoppingCart: 'Shopping Cart',
    orderHistory: 'Order History', checkout: 'Checkout', deliveryTracking: 'Delivery Tracking',
    salesAnalytics: 'Sales Analytics', profitAnalysis: 'Profit Analysis',
    marketPrices: 'Market Prices', adminDashboard: 'Admin Dashboard',
    userManagement: 'User Management', productManagement: 'Product Management',
    orderMonitoring: 'Order Monitoring', systemSettings: 'System Settings',
    reportGeneration: 'Report Generation',
    govtSchemes: 'Government Schemes', blog: 'Blog & News', faq: 'FAQ',
    feedback: 'Feedback', notifications: 'Notifications', liveChat: 'Live Chat',
    chatbot: 'AgroBot', aboutUs: 'About Us', contactUs: 'Contact Us',
    systemOverview: 'System overview and analytics',
    totalUsers: 'Total Users',
    farmersCount: 'Farmers',
    buyersCount: 'Buyers',
    productsCount: 'Products',
    totalOrdersCount: 'Total Orders',
    revenueCount: 'Revenue',
    recentOrders: 'Recent Orders',
    platformGrowth: 'Platform Growth (Monthly)',
    userDistribution: 'User Distribution',
    viewAll: 'View All →',
    orderId: 'Order ID',
    customer: 'Customer',
    amount: 'Amount',
    statusLabel: 'Status',
    dateLabel: 'Date',
    actionLabel: 'Action',
    searchProducts: 'Search products...', addToCart: 'Add to Cart',
    buyNow: 'Buy Now', viewDetails: 'View Details', placeOrder: 'Place Order',
    uploadImage: 'Upload Image', detect: 'Detect Disease', recommend: 'Get Recommendations',
    submit: 'Submit', cancel: 'Cancel', save: 'Save', edit: 'Edit', delete: 'Delete',
    loading: 'Loading...', noData: 'No data found', error: 'Something went wrong',
    welcome: 'Welcome', farmer: 'Farmer', buyer: 'Buyer', admin: 'Admin',
  },
  ta: {
    appName: 'அக்ரோகனெக்ட்',
    tagline: 'நவீன வேளாண்மை மேலாண்மை & சந்தை',
    home: 'முகப்பு', dashboard: 'டாஷ்போர்டு', marketplace: 'சந்தை',
    weather: 'வானிலை', crops: 'என் பயிர்கள்', orders: 'ஆர்டர்கள்',
    profile: 'சுயவிவரம்', logout: 'வெளியேறு', login: 'உள்நுழைவு', register: 'பதிவு செய்க',
    addCrop: 'பயிர் சேர்க்க', myCrops: 'என் பயிர்கள்', farmGallery: 'பண்ணை காட்சியகம்',
    fertilizerTracker: 'உர கண்காணிப்பு', waterUsage: 'நீர் பயன்பாடு',
    harvestSchedule: 'அறுவடை அட்டவணை', diseaseDetection: 'நோய் கண்டறிதல்',
    cropRecommendation: 'பயிர் பரிந்துரை', equipmentRental: 'உபகரண வாடகை',
    buyerDashboard: 'வாங்குபவர் டாஷ்போர்டு', shoppingCart: 'ஷாப்பிங் கார்ட்',
    orderHistory: 'ஆர்டர் வரலாறு', checkout: 'செக்அவுட்', deliveryTracking: 'டெலிவரி கண்காணிப்பு',
    salesAnalytics: 'விற்பனை பகுப்பாய்வு', profitAnalysis: 'லாப பகுப்பாய்வு',
    marketPrices: 'சந்தை விலைகள்', adminDashboard: 'நிர்வாக டாஷ்போர்டு',
    userManagement: 'பயனர் மேலாண்மை', productManagement: 'தயாரிப்பு மேலாண்மை',
    orderMonitoring: 'ஆர்டர் கண்காணிப்பு', systemSettings: 'கணினி அமைப்புகள்',
    reportGeneration: 'அறிக்கை உருவாக்கம்',
    govtSchemes: 'அரசு திட்டங்கள்', blog: 'வலைப்பதிவு & செய்திகள்', faq: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    feedback: 'கருத்து', notifications: 'அறிவிப்புகள்', liveChat: 'நேரடி அரட்டை',
    chatbot: 'அக்ரோபாட்', aboutUs: 'எங்களை பற்றி', contactUs: 'தொடர்பு கொள்ள',
    systemOverview: 'கணினி கண்ணோட்டம் மற்றும் பகுப்பாய்வு',
    totalUsers: 'மொத்த பயனர்கள்',
    farmersCount: 'விவசாயிகள்',
    buyersCount: 'வாங்குபவர்கள்',
    productsCount: 'தயாரிப்புகள்',
    totalOrdersCount: 'மொத்த ஆர்டர்கள்',
    revenueCount: 'வருவாய்',
    recentOrders: 'சமீபத்திய ஆர்டர்கள்',
    platformGrowth: 'மேடை வளர்ச்சி (மாதாந்திர)',
    userDistribution: 'பயனர்கள் பங்கீடு',
    viewAll: 'அனைத்தையும் காட்டு →',
    orderId: 'ஆர்டர் ஐடி',
    customer: 'வாடிக்கையாளர்',
    amount: 'தொகை',
    statusLabel: 'நிலைமை',
    dateLabel: 'தேதி',
    actionLabel: 'நடவடிக்கை',
    searchProducts: 'தயாரிப்புகளை தேடுக...', addToCart: 'கார்ட்டில் சேர்',
    buyNow: 'இப்போதே வாங்கு', viewDetails: 'விவரங்கள் காண', placeOrder: 'ஆர்டர் செய்',
    uploadImage: 'படம் பதிவேற்று', detect: 'நோய் கண்டறி', recommend: 'பரிந்துரைகள் பெறு',
    submit: 'சமர்ப்பி', cancel: 'ரத்து செய்', save: 'சேமி', edit: 'திருத்து', delete: 'நீக்கு',
    loading: 'ஏற்றுகிறது...', noData: 'தரவு இல்லை', error: 'ஏதோ தவறு நேர்ந்தது',
    welcome: 'வரவேற்கிறோம்', farmer: 'விவசாயி', buyer: 'வாங்குபவர்', admin: 'நிர்வாகி',
  }
};

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('agroconnect_lang') || 'en');

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  const switchLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('agroconnect_lang', newLang);
  };

  return (
    <LangContext.Provider value={{ lang, t, switchLang }}>
      {children}
    </LangContext.Provider>
  );
};
