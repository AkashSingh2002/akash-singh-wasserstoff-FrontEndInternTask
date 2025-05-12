'use client';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({ label, onClick, variant = 'primary', type = 'button' }: ButtonProps) => {
  const base = 'px-4 py-2 font-semibold rounded focus:outline-none';
  const style =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-gray-200 text-black hover:bg-gray-300';

  return (
    <button type={type} onClick={onClick} className={`${base} ${style}`}>
      {label}
    </button>
  );
};

export default Button;
