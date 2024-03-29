import React, { useState, type InputHTMLAttributes } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
}

export default function Checkbox({ checked, ...props }: Props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <input
        type="checkbox"
        className="peer hidden"
        checked={isChecked || checked}
        onChange={handleCheckboxChange}
        {...props}
      />
      <span className="border-border flex h-4 w-4 items-center justify-center rounded border bg-box peer-checked:border-blue-900 peer-checked:bg-blue-700">
        <AnimatePresence>
          {(isChecked || checked) && (
            <svg
              height="100%"
              viewBox="0 0 11 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-2"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ opacity: 0 }}
                d="M1 5.60657L3.49855 8.6912C3.7436 8.99372 4.2092 8.9805 4.43668 8.66456L9.95516 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </AnimatePresence>
      </span>
    </>
  );
}
