/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkMode = createContext();

function DarkModeProvider({ children }) {
  const [toggle, setToggle] = useLocalStorageState(false, "dark");

  useEffect(() => {
    if (!document.documentElement.classList.contains("dark-mode") && toggle) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  }, [toggle]);

  function toggleMode() {
    setToggle((dark) => !dark);
  }

  return (
    <DarkMode.Provider value={{ toggle, toggleMode }}>
      {children}
    </DarkMode.Provider>
  );
}

function useDark() {
  const context = useContext(DarkMode);
  if (context === undefined) throw new Error("Using outside provider");

  return context;
}

export { DarkModeProvider, useDark };
