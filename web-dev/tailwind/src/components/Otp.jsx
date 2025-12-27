import { useRef, useState } from "react";

const Otp = () => {
  const [disabled, setDisabled] = useState(true);
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();

  return (
    <div>
      <div className="h-screen bg-[#002b5b] text-white text-lg flex flex-col items-center mx-auto">
        <div className="flex gap-4 mx-auto justify-center py-20">
          <OtpBox
            reference={ref1}
            onDone={() => ref2.current.focus()}
            onBack={() => {
              setDisabled(true);
              ref1.current.focus();
            }}
          />
          <OtpBox
            reference={ref2}
            onDone={() => ref3.current.focus()}
            onBack={() => {
              setDisabled(true);
              ref1.current.focus();
            }}
          />
          <OtpBox
            reference={ref3}
            onDone={() => ref4.current.focus()}
            onBack={() => {
              setDisabled(true);
              ref2.current.focus();
            }}
          />
          <OtpBox
            reference={ref4}
            onDone={() => ref5.current.focus()}
            onBack={() => {
              setDisabled(true);
              ref3.current.focus();
            }}
          />
          <OtpBox
            reference={ref5}
            onDone={() => ref6.current.focus()}
            onBack={() => {
              setDisabled(true);
              ref4.current.focus();
            }}
          />
          <OtpBox
            reference={ref6}
            onDone={() => {
              setDisabled(false);
            }}
            onBack={() => {
              setDisabled(true);
              ref5.current.focus();
            }}
          />
        </div>
        <button
          className={`w-40 rounded-md p-4 cursor-pointer transition-all ${
            disabled ? "bg-slate-50 text-black" : "bg-cyan-400"
          }`}
          disabled={disabled}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const OtpBox = ({ reference, onDone, onBack }) => {
  const [input, setInput] = useState("");
  return (
    <input
      value={input}
      ref={reference}
      onKeyUp={(e) => {
        if (e.key === "Backspace") {
          setInput("");
          onBack();
        }
      }}
      onChange={(e) => {
        const val = e.target.value;
        if (/^\d+$/.test(val)) {
          setInput(val);
          onDone();
        }
      }}
      type="text"
      className="size-18 px-5 py-8 bg-[#194c4b] outline-none rounded-md"
    />
  );
};

export default Otp;
