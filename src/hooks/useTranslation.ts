
import { useLanguage } from '@/context/LanguageContext';
import { TranslationKey } from '@/translations';

/**
 * Custom hook for accessing translations
 * @returns An object with the current language, setLanguage function, and t function for translations
 */
export function useTranslation() {
  const languageContext = useLanguage();
  
  /**
   * Translate a key with optional interpolation values
   * @param key - The translation key
   * @param params - Optional parameters for interpolation (e.g., {name: 'John'})
   * @returns The translated string with interpolated values
   */
  const translate = (key: TranslationKey, params?: Record<string, string | number>): string => {
    let translation = languageContext.t(key);
    
    // Handle interpolation if params are provided
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        const regex = new RegExp(`{{${paramKey}}}`, 'g');
        translation = translation.replace(regex, String(paramValue));
      });
    }
    
    return translation;
  };
  
  return {
    language: languageContext.language,
    setLanguage: languageContext.setLanguage,
    t: translate,
    isLanguageDetected: languageContext.isLanguageDetected,
  };
}
