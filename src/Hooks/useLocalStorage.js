import { useCallback, useState } from "react";

export function useLocalStorage(key, initialState) {
  const initialStateString = JSON.stringify(initialState);

  let storageValue = initialState;
  try {
    storageValue = JSON.parse(localStorage.getItem(key));
  } catch {
    localStorage.setItem(key, initialStateString);
  }

  const [value, setValue] = useState(storageValue);

  const updateSetValue = useCallback(
    (newValue) => {
      const newValueString = JSON.stringify(newValue);
      if (
        newValueString === initialStateString ||
        typeof newValue === "undefined"
      ) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, newValueString);
      }

      setValue(newValue ?? initialState);
    },
    [initialState, initialStateString, key]
  );

  return [value, updateSetValue];
}
