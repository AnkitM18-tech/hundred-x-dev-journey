import { useEffect, useState } from "react";

function useCounter() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount((c) => c + 1);
  }

  return [count, increaseCount];
}

function useFetch(url) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, [url]);

  return { loading, data };
}

function useFetchWithRefetch(url, retryTimeout) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  async function getDetails() {
    const data = await fetch(url);
    const response = await data.json();
    setData(response);
    setLoading(false);
  }

  useEffect(() => {
    getDetails();
  }, [url]);

  useEffect(() => {
    const timer = setInterval(() => {
      getDetails();
    }, retryTimeout * 1000);

    return () => clearInterval(timer);
  }, []);

  return { loading, data };
}

function usePrev(value) {
  const ref = useRef(null);
  //   console.log("re-render with new value " + value); -> 1

  useEffect(() => {
    // console.log("updated ref to be " + value); -> 3
    ref.current = value;
  }, [value]);

  //   console.log("returned " + ref.current); -> 2
  return ref.current;
  // returns first and effect gets called later, after the component is rendered => returns the previously stored ref, and then useEffect changes that ref
  // it is possible as refs - when changed, don't trigger re-renders
}

function useDebounceFunctionCall(timeout, fn) {
  const timer = useRef();

  const callback = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fn, timeout);
  };
  return callback;
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup function runs when the dependency changes or component unmounts
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function useDebounceFunction(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

function useIsOnline() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));
  }, []);

  return isOnline;
}

function useMousePointer() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}
