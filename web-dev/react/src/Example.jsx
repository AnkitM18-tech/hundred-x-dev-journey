import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [counterVisible, setCounterVisible] = useState(true);

  useEffect(() => {
    // runs on mount -> empty dependency array
    const timer = setInterval(() => setCounterVisible((c) => !c), 5000);
    // runs when unmount -> empty dependency array
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>{counterVisible && <Button count={count} setCount={setCount} />}</div>
  );
}

function Button({ count, setCount }) {
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount((c) => c + 1)}>⬆️ Increase</button>
    </div>
  );
}

export default App;
