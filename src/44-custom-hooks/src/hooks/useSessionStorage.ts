import useStorage from "./useStorage";

function useSessionStorage({
  initState,
  key,
}: {
  initState: any;
  key: string;
}) {
  return useStorage({
    initState: initState,
    key: key,
    storage: sessionStorage,
  });
}

export default useSessionStorage;
