import React, { FC, useState, useEffect } from "react";

export interface ICountInputProps {
  label: string;
  className?: string;
  valueNumber: number;
  limit: number;
  onChange: (newValue: number) => void;
}

export const CountInput: FC<ICountInputProps> = ({
  label,
  className,
  valueNumber,
  onChange,
  limit,
}) => {
  const [value, setValue] = useState(valueNumber);

  useEffect(() => {
    setValue(valueNumber);
  }, [valueNumber]);

  const decrement = () => {
    if (value > 0) {
      const newValue = value - 1;
      setValue(newValue);
      onChange(newValue);
    }
  };

  const increment = () => {
    if (value < limit) {
      const newValue = value + 1;
      setValue(newValue);
      onChange(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="custom-number-input w-full">
      <label
        htmlFor="custom-input-number"
        className={`w-full text-gray-700 text-sm font-medium ${className}`}
      >
        {label}
      </label>
      <div
        className={`${className} flex flex-row rounded-lg relative bg-transparent mt-1`}
      >
        <button
          type="button"
          data-action="decrement"
          className="bg-slate-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 dark:bg-slate-700 dark:text-white h-full w-full rounded-l-full cursor-pointer outline-none"
          onClick={decrement}
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          className="focus:outline-none text-center w-full bg-slate-200 dark:bg-slate-700 dark:text-white text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
          name="custom-input-number"
          value={value}
          onChange={handleInputChange}
        />
        <button
          type="button"
          data-action="increment"
          className="bg-slate-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 dark:bg-slate-700 dark:text-white h-full w-full rounded-r-full cursor-pointer"
          onClick={increment}
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
};
