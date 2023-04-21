import { useState, useEffect } from "react";

function useStorage({
  initState,
  key,
  storage,
}: {
  initState: any;
  key: string;
  storage: any;
}) {
  const savedItem = storage.getItem(key);

  if (savedItem) {
    try {
      initState = JSON.parse(savedItem);
    } catch (e) {
      initState = savedItem;
    }
  }

  const [state, setState] = useState(initState);

  useEffect(() => {
    storage.setItem(key, JSON.stringify(state));
  }, []);

  return [state, setState];
}

export default useStorage;
