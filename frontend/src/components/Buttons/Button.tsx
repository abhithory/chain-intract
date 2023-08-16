import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
  label: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, label, ...props }) => {
  return (
    <button onClick={onClick} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" {...props}>
      {label}
    </button>
  );
};

export default Button;
