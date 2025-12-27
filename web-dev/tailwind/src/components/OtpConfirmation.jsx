import { useRef, useState } from "react";

const OtpConfirmation = ({ number }) => {
  const [disabled, setDisabled] = useState(true);
  const [otp, setOtp] = useState(new Array(number).fill(""));
  const otpBoxRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d+$/.test(value)) return;
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < number - 1) otpBoxRef.current[index + 1].focus();
    if (index === number - 1) setDisabled(false);
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index >= 0) {
      let newArr = [...otp];
      newArr[index] = "";
      setDisabled(true);
      setOtp(newArr);
      if (index == 0) {
        otpBoxRef.current[index].focus();
        return;
      }
      otpBoxRef.current[index - 1].focus();
    }
  };

  return (
    <div className="text-lg bg-[#002b5b] h-screen flex flex-col gap-10 justify-center">
      <div className="flex gap-4 justify-center">
        {otp.map((value, index) => (
          <OtpBox
            reference={otpBoxRef}
            key={index}
            value={value}
            index={index}
            handleChange={handleChange}
            handleBackspace={handleBackspace}
          />
        ))}
      </div>
      <button
        disabled={disabled}
        className={`w-40 mx-auto p-4 rounded-md cursor-pointer transition-all ${
          disabled ? "bg-cyan-50 text-black" : "bg-cyan-400"
        }`}
      >
        Submit
      </button>
    </div>
  );
};

const OtpBox = ({ value, index, reference, handleChange, handleBackspace }) => {
  return (
    <input
      value={value}
      ref={(ele) => (reference.current[index] = ele)}
      onChange={(e) => handleChange(e.target.value, index)}
      onKeyDown={(e) => handleBackspace(e, index)}
      maxLength={1}
      type="text"
      className="w-16 h-20 rounded-md outline-none bg-cyan-200 p-4 text-center"
    />
  );
};

export default OtpConfirmation;
