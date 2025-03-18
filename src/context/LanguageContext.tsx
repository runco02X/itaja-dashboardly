
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { enUS, fr } from '../translations';

type Language = 'en' | 'fr';
type Translations = typeof enUS;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Get the appropriate translation object based on the selected language
  const translations = language === 'en' ? enUS : fr;

  // Translation function
  const t = (key: keyof Translations) => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
