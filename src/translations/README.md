# Translations System

This directory contains the translation files for the Itaja application.

## Structure

- `index.ts`: Exports all translation objects and helper functions
- `en-US.ts`: English translations
- `fr.ts`: French translations

## Usage

### In Components

```tsx
import { useTranslation } from '@/hooks';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('projectsTitle')}</h1>
      <p>{t('projectsSubtitle')}</p>
    </div>
  );
}
```

### Changing Language

```tsx
import { useTranslation } from '@/hooks';

function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  
  return (
    <div>
      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('fr')}>Français</button>
    </div>
  );
}
```

## Adding New Translations

1. Add the new key and value to `en-US.ts` first
2. Add the same key with the translated value to `fr.ts`
3. TypeScript will ensure that all translations have the same keys

## Default Language

The default language is automatically selected based on the user's browser language:
- If the browser language starts with 'fr', French will be selected
- Otherwise, English will be selected

The selected language is stored in localStorage, so it will persist between sessions.
