import { useState } from "react";

// A generic type T for the value that will be stored in localStorage
export const useLocalStorage = <T,>(keyName: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value) as T;
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error(err);
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.error(err);
    }

    setStoredValue(newValue);
  };

  return [storedValue, setValue] as const; // Ensure tuple return type
};
