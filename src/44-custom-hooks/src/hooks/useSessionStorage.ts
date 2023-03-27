import { useState, useEffect } from 'react';

function useSessionStorage({initState, key} : {initState : any, key: string}) {
  const savedItem = sessionStorage.getItem(key); 
  if(savedItem) {
    try {
      initState = JSON.parse(savedItem);
    } catch(e) {
      initState = savedItem;
    }
  }
  
  const [state, setState] = useState(initState);

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state))
  }, []);

  return [state, setState];
}

export default useSessionStorage;