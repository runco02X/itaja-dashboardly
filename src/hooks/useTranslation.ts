import { useLanguage } from '@/context/LanguageContext';
import { TranslationKey } from '@/translations';

/**
 * Custom hook for accessing translations
 * @returns An object with the current language, setLanguage function, and t function for translations
 */
export function useTranslation() {
  const languageContext = useLanguage();
  
  /**
   * Translate a key
   * @param key - The translation key
   * @returns The translated string
   */
  const translate = (key: TranslationKey): string => {
    return languageContext.t(key);
  };
  
  return {
    language: languageContext.language,
    setLanguage: languageContext.setLanguage,
    t: translate,
    isLanguageDetected: languageContext.isLanguageDetected,
  };
}
