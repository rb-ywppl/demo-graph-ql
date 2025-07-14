import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  className = "",
}) => {
  return (
    <label
      className={`relative inline-flex items-center cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <div
        className={`w-[40px] h-[25px] rounded-full transition-colors duration-300 ${
          checked ? "bg-[#386B6E]" : "bg-gray-200"
        } peer-checked:bg-[#386B6E]`}
      ></div>
      <div
        className={`absolute left-[2px] top-[2px] w-[21px] h-[21px] bg-white rounded-full border shadow-sm transform transition-transform duration-300 ${
          checked ? "translate-x-[15px]" : ""
        }`}
      ></div>
    </label>
  );
};

export default Switch;
