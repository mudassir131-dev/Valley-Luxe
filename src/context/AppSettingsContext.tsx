import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'ks';
export type Theme = 'dark' | 'light';

interface TranslationDictionary {
  brandName: string;
  tagline: string;
  subTagline: string;
  exploreCollections: string;
  ourStory: string;
  home: string;
  shop: string;
  collections: string;
  story: string;
  contact: string;
  cart: string;
  wishlist: string;
  search: string;
  artisans: string;
  legacy: string;
  customers: string;
  countries: string;
  handcrafted: string;
  pashmina: string;
  saffron: string;
  carpets: string;
  dryfruits: string;
  papermache: string;
  craftstory: string;
  testimonials: string;
  joinValley: string;
  emailPlaceholder: string;
  subscribe: string;
  addToCart: string;
  whatsappCheckout: string;
  whatsappOrder: string;
  backToShop: string;
  checkout: string;
  emptyCart: string;
  aboutHeader: string;
  contactHeader: string;
  send: string;
}

const translations: Record<Language, TranslationDictionary> = {
  en: {
    brandName: "Valley Luxe",
    tagline: "Where Heaven Meets Your Hands",
    subTagline: "Crafted in Kashmir Since Centuries",
    exploreCollections: "Explore Collections",
    ourStory: "Our Story",
    home: "Home",
    shop: "Shop",
    collections: "Collections",
    story: "Story",
    contact: "Contact",
    cart: "Cart",
    wishlist: "Wishlist",
    search: "Search",
    artisans: "Artisans",
    legacy: "Years Legacy",
    customers: "Happy Customers",
    countries: "Countries Delivered",
    handcrafted: "Handcrafted in Kashmir",
    pashmina: "Pure Pashmina",
    saffron: "Authentic Saffron",
    carpets: "Silk Carpets",
    dryfruits: "Mamra Almonds",
    papermache: "Paper Mache",
    craftstory: "Our Craft",
    testimonials: "Artisan Voices",
    joinValley: "Join the Valley",
    emailPlaceholder: "Enter your email for private collection releases",
    subscribe: "Request Invitation",
    addToCart: "Add to Cart",
    whatsappCheckout: "Checkout via WhatsApp",
    whatsappOrder: "Order on WhatsApp",
    backToShop: "Explore Products",
    checkout: "Proceed to Checkout",
    emptyCart: "Your shopping cart is currently empty",
    aboutHeader: "Our Heritage",
    contactHeader: "Let's Talk",
    send: "Submit Inquiry"
  },
  hi: {
    brandName: "वैली लक्स",
    tagline: "जहाँ स्वर्ग आपके हाथों से मिलता है",
    subTagline: "सदियों से कश्मीर में निर्मित",
    exploreCollections: "संग्रह देखें",
    ourStory: "हमारी कहानी",
    home: "मुख्य पृष्ठ",
    shop: "दुकान",
    collections: "संग्रह",
    story: "कहानी",
    contact: "संपर्क",
    cart: "कार्ट",
    wishlist: "इच्छा-सूची",
    search: "खोजें",
    artisans: "कुशल कारीगर",
    legacy: "वर्षों की विरासत",
    customers: "संतुष्ट ग्राहक",
    countries: "देशों में डिलीवरी",
    handcrafted: "कश्मीर में हस्तनिर्मित",
    pashmina: "शुद्ध पश्मीना",
    saffron: "असली केसर",
    carpets: "रेशमी कालीन",
    dryfruits: "मामरा बादाम",
    papermache: "पेपर माशे",
    craftstory: "हमारी कला",
    testimonials: "कलाकारों की आवाज",
    joinValley: "घाटी से जुड़ें",
    emailPlaceholder: "निजी संग्रहों के लिए अपना ईमेल दर्ज करें",
    subscribe: "आमंत्रण का अनुरोध करें",
    addToCart: "कार्ट में जोड़ें",
    whatsappCheckout: "व्हाट्सएप द्वारा चेकआउट करें",
    whatsappOrder: "व्हाट्सएप पर ऑर्डर करें",
    backToShop: "उत्पादों को देखें",
    checkout: "चेकआउट के लिए आगे बढ़ें",
    emptyCart: "आपकी कार्ट वर्तमान में खाली है",
    aboutHeader: "हमारी विरासत",
    contactHeader: "बात करें",
    send: "पूछताछ भेजें"
  },
  ks: {
    brandName: "وادی لکس",
    tagline: "ییتہِ جنت تمنہِ چھِ تُہندِس اتھس منز",
    subTagline: "صدیو پیٹھ کشمیرس منز تیار کرنہ آمت",
    exploreCollections: "کلکشن وچھِیو",
    ourStory: "سٲن کٔہنؠ",
    home: "گھر",
    shop: "دکان",
    collections: "کلکشن",
    story: "کٔہنؠ",
    contact: "رابطہ",
    cart: "ٹوکری",
    wishlist: "خواہش",
    search: "تلاش",
    artisans: "دستکار",
    legacy: "ورثہٕ وٕری",
    customers: "خوش گاہک",
    countries: "ملکوں منز سپلائی",
    handcrafted: "کشمیرک دستکاری",
    pashmina: "اصلی پشمینہ",
    saffron: "خالص کانگڑی زعفران",
    carpets: "ریشم غالہٕ",
    dryfruits: "کٲشِر بادام",
    papermache: "کاغذ سازی",
    craftstory: "کاریگری ہنز کتھ",
    testimonials: "دستکارن ہنز آواز",
    joinValley: "وادی منز شٲمل گژھیو",
    emailPlaceholder: "سٲن کلکشن خٲطرٕ ای میل درج کٔریو",
    subscribe: "شٲمل گژھنک عرضی",
    addToCart: "ٹوکری منز تھاویو",
    whatsappCheckout: "واٹس ایپ ذریعے آرڈر",
    whatsappOrder: "واٹس ایپ پیٹھ آرڈر",
    backToShop: "پروڈکٹس وچھِیو",
    checkout: "آرڈر بک کٔریو",
    emptyCart: "تہنز ٹوکری چھِ خٲلی",
    aboutHeader: "سٲنۍ تاریخ",
    contactHeader: "رابطہ کٔریو",
    send: "پیغام سوزیو"
  }
};

interface AppSettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  audioPlaying: boolean;
  setAudioPlaying: (play: boolean) => void;
  t: TranslationDictionary;
}

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export const AppSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('valley_luxe_lang');
    return (saved as Language) || 'en';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('valley_luxe_theme');
    return (saved as Theme) || 'dark';
  });

  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('valley_luxe_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('valley_luxe_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.backgroundColor = '#0D0500'; // Kashmir Night
      root.style.color = '#FDFAF4'; // Ivory Cream
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#FDFAF4'; // Ivory Cream
      root.style.color = '#0D0500'; // Kashmir Night
    }
  }, [theme]);

  // Activate custom cursor configuration
  useEffect(() => {
    document.body.classList.add('custom-cursor-active');
    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const t = translations[language];

  return (
    <AppSettingsContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        audioPlaying,
        setAudioPlaying,
        t,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
};
