import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { bn } from "../locales/bn";
import { en } from "../locales/en";

const STORAGE_KEY = "gheelagbe-language";
const DEFAULT_LANGUAGE = "bn";

const dictionaries = {
  bn,
  en,
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "bn") {
        return saved;
      }
    } catch {
      // Ignore localStorage errors
    }
    return DEFAULT_LANGUAGE;
  });

  // Keep HTML document lang attribute and body data attribute in sync
  useEffect(() => {
    try {
      document.documentElement.lang = language;
      document.body.setAttribute("data-lang", language);
    } catch {
      // SSR or safe environment check
    }
  }, [language]);

  const setLanguage = useCallback((lang) => {
    if (lang !== "bn" && lang !== "en") return;
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next = prev === "bn" ? "en" : "bn";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore localStorage errors
      }
      return next;
    });
  }, []);

  /**
   * Translate function: looks up a nested key path in the active dictionary.
   * e.g., t("header.nav.home") or t("cart.itemCount", { count: 3 })
   */
  const t = useCallback(
    (keyPath, variablesOrFallback = null, explicitFallback = null) => {
      let variables = null;
      let fallback = null;

      if (
        variablesOrFallback !== null &&
        typeof variablesOrFallback === "object" &&
        !Array.isArray(variablesOrFallback)
      ) {
        variables = variablesOrFallback;
        fallback = explicitFallback;
      } else if (typeof variablesOrFallback === "string") {
        fallback = variablesOrFallback;
      }

      const getFromDict = (dict) => {
        if (!dict || !keyPath) return undefined;
        const parts = keyPath.split(".");
        let current = dict;
        for (const part of parts) {
          if (current === undefined || current === null) return undefined;
          current = current[part];
        }
        return current;
      };

      let value = getFromDict(dictionaries[language]);

      // Fallback to English if not found in active language
      if (value === undefined && language !== "en") {
        value = getFromDict(dictionaries.en);
      }

      if (value === undefined) {
        return fallback !== null ? fallback : keyPath;
      }

      // If value is a string and variables were provided, interpolate {var}
      if (typeof value === "string" && variables) {
        return value.replace(/\{(\w+)\}/g, (match, paramName) => {
          if (variables[paramName] !== undefined && variables[paramName] !== null) {
            return String(variables[paramName]);
          }
          return match;
        });
      }

      return value;
    },
    [language]
  );

  const isBangla = language === "bn";

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      isBangla,
    }),
    [language, setLanguage, toggleLanguage, t, isBangla]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
