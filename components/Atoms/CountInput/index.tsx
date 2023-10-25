import React, { FC, useState } from "react";
export interface ICountInputProps {
  label: string;
  className?: string;
}
export const CountInput: FC<ICountInputProps> = ({label, className}) => {
  const [value, setValue] = useState(0);

  const decrement = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    }
  };
  const increment = () => {
    if (value < 5) {
      setValue((prevValue) => prevValue + 1);
    }
  };

  return (
    <div className="custom-number-input w-full">
      <label
        htmlFor="custom-input-number"
        className={`w-full text-gray-700 text-sm font-medium ${className}`}
      >
        {label}
      </label>
      <div className={`${className} flex flex-row rounded-lg relative bg-transparent mt-1`}>
        <button
          data-action="decrement"
          className="bg-slate-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-full rounded-l-full cursor-pointer outline-none"
          onClick={decrement}
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          className="focus:outline-none text-center w-full bg-slate-200 text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
          name="custom-input-number"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
        />
        <button
          data-action="increment"
          className="bg-slate-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-full rounded-r-full cursor-pointer"
          onClick={increment}
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
};
