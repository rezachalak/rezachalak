"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function current(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export default function ThemeToggle() {
  // Rendered only after mount: the server has no way to know the visitor's
  // theme, so committing to an icon during SSR guarantees a wrong first paint.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(current());
  }, []);

  function toggle() {
    const next: Theme = current() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage: the choice just won't persist.
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-line-2 hover:text-fg"
      aria-label={
        theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Switch theme"
      }
      title="Toggle theme"
    >
      {theme === "light" ? (
        // Moon: offers the dark theme
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      ) : (
        // Sun: offers the light theme
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )}
    </button>
  );
}
