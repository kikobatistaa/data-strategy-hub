import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  showLabel?: boolean;
}

const ThemeToggle = ({ showLabel = false }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size={showLabel ? "default" : "icon"}
      onClick={toggleTheme}
      className={`${showLabel ? "w-full justify-start px-4 py-3 h-auto" : "h-10 w-10"} text-foreground hover:bg-accent/10 hover:text-accent transition-colors`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <>
          <Sun className={showLabel ? "h-5 w-5 mr-3" : "h-5 w-5"} />
          {showLabel && <span className="text-lg font-medium">Light Mode</span>}
        </>
      ) : (
        <>
          <Moon className={showLabel ? "h-5 w-5 mr-3" : "h-5 w-5"} />
          {showLabel && <span className="text-lg font-medium">Dark Mode</span>}
        </>
      )}
    </Button>
  );
};

export default ThemeToggle;
