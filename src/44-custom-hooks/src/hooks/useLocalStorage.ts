import { useState, useEffect } from 'react';

function useLocalStorage({initState, key} : {initState : any, key: string}) {
  const savedItem = localStorage.getItem(key); 
  
  if(savedItem) {
    try {
      initState = JSON.parse(savedItem);
    } catch(e) {
      initState = savedItem;
    }
  }

  const [state, setState] = useState(initState);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, []);

  return [state, setState]; 
}

export default useLocalStorage;