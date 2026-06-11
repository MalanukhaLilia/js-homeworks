import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch {
        return saved;
      }
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
