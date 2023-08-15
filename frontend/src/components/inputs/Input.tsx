import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
  };
  
  const Input: React.FC<InputProps> = ({ label, ...inputProps }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
          {...inputProps}
        />
      </div>
    );
  };
  
  export default Input;
  