/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState.js";

const DarkContext = createContext();

function DarkContextProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorageState(false, "dark-mode");

  useEffect(() => {
    if (
      darkMode
      //&& !document.documentElement.classList.contains(".dark-mode")
    ) {
      document.documentElement.classList.remove("light-mode");
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      document.documentElement.classList.remove("light-mode");
      document.documentElement.classList.add("dark-mode");
    }
  }, []);

  return (
    <DarkContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkContext);
  if (DarkContext === undefined)
    throw new Error("Using outside DarkMode provider");
  return context;
}

export { DarkContextProvider, useDarkMode };
