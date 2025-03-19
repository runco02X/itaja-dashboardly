
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  SupportedLanguage, 
  TranslationKey, 
  TranslationKeys,
  Translations, 
  getTranslationsByLanguage 
} from '../translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: TranslationKey) => string;
  isLanguageDetected: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to get browser language and map it to our supported languages
const getBrowserLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return 'en';
  
  // Get from localStorage first if available
  const savedLanguage = localStorage.getItem('itaja-language') as SupportedLanguage;
  if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
    return savedLanguage;
  }
  
  // Otherwise detect from browser
  const browserLang = navigator.language.toLowerCase();
  
  // Check if the browser language starts with 'fr'
  if (browserLang.startsWith('fr')) {
    return 'fr';
  }
  
  // Default to English for all other languages
  return 'en';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<SupportedLanguage>('en'); // Default fallback
  const [isLanguageDetected, setIsLanguageDetected] = useState<boolean>(false);

  // Detect browser language on mount
  useEffect(() => {
    const detectedLanguage = getBrowserLanguage();
    setLanguage(detectedLanguage);
    setIsLanguageDetected(true);
  }, []);
  
  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (isLanguageDetected) {
      localStorage.setItem('itaja-language', language);
    }
  }, [language, isLanguageDetected]);

  // Get the appropriate translation object based on the selected language
  const translations = getTranslationsByLanguage(language);

  // Enhanced translation function with fallback and error handling
  const t = (key: TranslationKey): string => {
    try {
      const translation = translations[key];
      if (!translation) {
        console.warn(`Translation key not found: ${String(key)}`);
        return String(key);
      }
      return translation;
    } catch (error) {
      console.error(`Error retrieving translation for key: ${String(key)}`, error);
      return String(key);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLanguageDetected }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Alias for useLanguage to maintain consistency with naming conventions
export const useTranslation = useLanguage;
