"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage indisponível (ex: modo privado) — ignora em silêncio
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={toggle} aria-label="Alternar tema claro/escuro">
      {isDark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
    </Button>
  );
}
