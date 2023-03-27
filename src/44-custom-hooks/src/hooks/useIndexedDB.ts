import { useState, useEffect } from 'react';
import {set, get} from 'idb-keyval';

function useIndexedDB({initState, key} : {initState : any, key: string}) {
  const [status, setStatus] =  useState({isLoading: true, isError: false});
  const [state, setState] = useState(initState);

  
  useEffect(() => {
    const lookForItem = async () => {
      try {
        const savedItem = await get(key);
        setStatus({isLoading: false, isError: false})
        
        if(savedItem) {
          setState(savedItem)
        }

      } catch(e) {
        setStatus({isLoading: false, isError: true})
      }
    }

    lookForItem();
  }, []) 

  
  useEffect(() => { 
    set(key, state)
  }, [state]);

  if(status.isLoading || status.isError) return [null, null, status];

  return [state, setState, status];
}

export default useIndexedDB;