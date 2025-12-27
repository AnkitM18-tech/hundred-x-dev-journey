import { useState } from "react";

const SimpleInputForm = () => {
  const [year, setYear] = useState("");
  return (
    <div className="bg-[#002b5b] h-screen">
      <h2 className="text-cyan-600 text-4xl text-center py-20">
        Webinar<span className="text-white">.gg</span>
      </h2>
      <div className="my-10 flex flex-col mx-auto gap-4 justify-center w-3xl text-white">
        <h4 className="text-2xl  mb-10 text-center">Verify your Age</h4>
        <label className="text-center" htmlFor="year">
          Please confirm your birth year. This data will not be stored.
        </label>
        <input
          id="year"
          className="border w-96 mx-auto border-slate-50 px-4 py-2 rounded-md"
          type="text"
          placeholder="Your Birth Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button
          className={`w-96 mx-auto cursor-pointer  border-slate-50 px-4 py-2 rounded-md ${
            year.trim().length === 4 ? "bg-cyan-500" : "bg-slate-500"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SimpleInputForm;
