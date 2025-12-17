import { createContext, useState } from "react";

const CounterContext = createContext();

export function CounterContextProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <CounterContext.Provider value={{ count, setCount }}>
        {children}
      </CounterContext.Provider>
    </div>
  );
}
