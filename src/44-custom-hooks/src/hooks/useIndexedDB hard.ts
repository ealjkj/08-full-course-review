import { useState, useEffect } from "react";

function useIndexedDB({ initState, key }: { initState: any; key: string }) {
  const [state, setState] = useState(null);

  let db : any;

  const [status, setStatus] = useState({
    isLoading: true,
    isError: false,
  });
  const connection = indexedDB.open("hookDB", 1);

  connection.onsuccess = () => {
    db = connection.result;
    console.log("Base de datos abierta", db);
  };

  connection.onupgradeneeded = (e: any) => {
    if (!e.target) return;

    db = e.target.result;
    db.createObjectStore("state", {
      keyPath: "key",
    });
  };

  connection.onerror = (error) => {
    throw error;
  };

  const add = (data: any) => {
    const transaction = db.transaction(["state"], "readwrite");
    const objectCollection = transaction.objectStore("state");
    objectCollection.add(data);
  };

  const getFromDB = (key: string) => {
    console.log("we are talking about dbs", db);
    const transaction = db.transaction(["state"], "readonly");
    const objectCollection = transaction.objectStore("state");
    const connection = objectCollection.get(key);

    connection.onsuccess((e: Event) => {
      let { data } = connection.result;

      if (!data) {
        data = initState;
      }

      setState(data);
      setStatus({
        isLoading: false,
        isError: false,
      });
    });

    connection.onerror((error: Error) => {
      setStatus({
        isLoading: false,
        isError: true,
      });
    });
  };

  useEffect(() => {
    if (status.isLoading) {
      getFromDB(key);
    } else if (!status.isError) {
      add({ key, data: state });
    }
  }, []);

  return [state, setState, status];
}

export default useIndexedDB;
