import useLocalStorage from "./hooks/useLocalStorage";
import useSessionStorage from "./hooks/useSessionStorage";
import { useState } from "react";
import useIndexedDB from "./hooks/useIndexedDB";

export default function Counter() {
  const [count, setCount, { isLoading, isError }] = useIndexedDB({
    initState: 0,
    key: "key",
  });

  const handleClick = () => {
    setCount(count + 1);
  };

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>There is an error</div>;

  return (
    <div>
      <h3>Counter</h3>
      <h1>{count}</h1>
      <button onClick={handleClick}> Click!</button>
    </div>
  );
}
