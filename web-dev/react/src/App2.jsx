// Performance of a React application is measured by the number of re-renders.

import { memo } from "react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom, evenSelector } from "./store/atoms/counter";

function App2() {
  return (
    <RecoilRoot>
      <Buttons />
      <Counter />
      <IsEven />
    </RecoilRoot>
  );
}

function Buttons() {
  const setCount = useSetRecoilState(counterAtom);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 2)}>Increase</button>
      <button onClick={() => setCount((c) => c - 1)}>Decrease</button>
    </div>
  );
}

function IsEven() {
  const isEven = useRecoilValue(evenSelector);
  return <div>{isEven ? "Even" : "Odd"}</div>;
}

function Counter() {
  const count = useRecoilValue(counterAtom);
  return <div>{count}</div>;
}

/*
// memoized component won't re-render unless props or state changes in the component
const MemoizedCounter = memo(Counter);

function Counter() {
  return (
    <div>
      <Count />
      <Increase />
      <Decrease />
    </div>
  );
}

function Count() {
  // const { count } = useContext(CounterContext);
  const count = useRecoilValue(counterAtom);
  return <div>{count}</div>;
}

function Increase() {
  // const { setCount } = useContext(CounterContext);
  const setCount = useSetRecoilState(counterAtom);
  return <button onClick={() => setCount((c) => c + 1)}>Increase</button>;
}

function Decrease() {
  // const { setCount } = useContext(CounterContext);
  const setCount = useSetRecoilState(counterAtom);
  return <button onClick={() => setCount((c) => c - 1)}>Decrease</button>;
}

*/

export default App2;
