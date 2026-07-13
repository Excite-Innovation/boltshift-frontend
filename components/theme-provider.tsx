"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";
type Attribute = "class" | `data-${string}` | Array<"class" | `data-${string}`>;

type ThemeContextValue = {
  theme?: Theme;
  resolvedTheme?: ResolvedTheme;
  systemTheme?: ResolvedTheme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  themes: Theme[];
  forcedTheme?: Theme;
};

type ThemeProviderProps = React.PropsWithChildren<{
  attribute?: Attribute;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  enableColorScheme?: boolean;
  storageKey?: string;
  forcedTheme?: Theme;
}>;

const THEME_STORAGE_KEY = "theme";

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(storageKey: string, fallback: Theme): Theme {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    return (window.localStorage.getItem(storageKey) as Theme | null) ?? fallback;
  } catch {
    return fallback;
  }
}

function resolveTheme(theme: Theme, enableSystem: boolean): ResolvedTheme {
  if (theme === "system" && enableSystem) {
    return getSystemTheme();
  }

  return theme === "dark" ? "dark" : "light";
}

function applyThemeToDocument({
  attribute,
  resolvedTheme,
  enableColorScheme,
  disableTransitionOnChange,
}: {
  attribute: Attribute;
  resolvedTheme: ResolvedTheme;
  enableColorScheme: boolean;
  disableTransitionOnChange: boolean;
}) {
  const root = document.documentElement;
  const attributes = Array.isArray(attribute) ? attribute : [attribute];

  let cleanupTransitions: (() => void) | undefined;

  if (disableTransitionOnChange) {
    const style = document.createElement("style");
    style.setAttribute("data-theme-transition", "true");
    style.appendChild(
      document.createTextNode(
        "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}",
      ),
    );
    document.head.appendChild(style);

    cleanupTransitions = () => {
      window.getComputedStyle(document.body);
      window.setTimeout(() => {
        style.remove();
      }, 1);
    };
  }

  for (const attr of attributes) {
    if (attr === "class") {
      root.classList.remove("light", "dark");
      root.classList.add(resolvedTheme);
      continue;
    }

    root.setAttribute(attr, resolvedTheme);
  }

  if (enableColorScheme) {
    root.style.colorScheme = resolvedTheme;
  }

  cleanupTransitions?.();
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
  enableColorScheme = true,
  storageKey = THEME_STORAGE_KEY,
  forcedTheme,
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(() =>
    getStoredTheme(storageKey, defaultTheme),
  );
  const [systemTheme, setSystemTheme] = React.useState<ResolvedTheme>(() =>
    getSystemTheme(),
  );

  const resolvedTheme = resolveTheme(theme, enableSystem);
  const themes = enableSystem ? (["light", "dark", "system"] as Theme[]) : (["light", "dark"] as Theme[]);

  React.useEffect(() => {
    const currentTheme = getStoredTheme(storageKey, defaultTheme);
    setTheme(currentTheme);
    setSystemTheme(getSystemTheme());
  }, [defaultTheme, storageKey]);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setSystemTheme(getSystemTheme());
    };

    media.addEventListener("change", handleChange);
    handleChange();

    return () => media.removeEventListener("change", handleChange);
  }, []);

  React.useEffect(() => {
    if (forcedTheme) {
      applyThemeToDocument({
        attribute,
        resolvedTheme: resolveTheme(forcedTheme, enableSystem),
        enableColorScheme,
        disableTransitionOnChange,
      });
      return;
    }

    applyThemeToDocument({
      attribute,
      resolvedTheme,
      enableColorScheme,
      disableTransitionOnChange,
    });
  }, [
    attribute,
    disableTransitionOnChange,
    enableColorScheme,
    enableSystem,
    forcedTheme,
    resolvedTheme,
  ]);

  const handleSetTheme = React.useCallback<React.Dispatch<React.SetStateAction<Theme>>>(
    (value) => {
      setTheme((current) => {
        const nextTheme = typeof value === "function" ? value(current) : value;

        try {
          window.localStorage.setItem(storageKey, nextTheme);
        } catch {
          // Ignore storage write failures.
        }

        return nextTheme;
      });
    },
    [storageKey],
  );

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      systemTheme,
      setTheme: handleSetTheme,
      themes,
      forcedTheme,
    }),
    [forcedTheme, handleSetTheme, resolvedTheme, systemTheme, theme, themes],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    return {
      theme: "light" as Theme,
      resolvedTheme: "light" as ResolvedTheme,
      systemTheme: "light" as ResolvedTheme,
      setTheme: (() => {}) as React.Dispatch<React.SetStateAction<Theme>>,
      themes: ["light", "dark", "system"] as Theme[],
      forcedTheme: undefined,
    };
  }

  return context;
}
