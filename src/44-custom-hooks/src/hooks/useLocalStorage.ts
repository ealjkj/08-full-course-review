import useStorage from "./useStorage";

function useLocalStorage({ initState, key }: { initState: any; key: string }) {
  return useStorage({ initState: initState, key: key, storage: localStorage });
}

export default useLocalStorage;
