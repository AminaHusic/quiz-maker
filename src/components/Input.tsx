interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
}
const Input = ({ value, onChange, placeholder, ...restProps }: InputProps) => {
  return (
    <input
      className="bg-transparent text-md border-b border-b-primary-dark w-full focus-visible:outline-none placeholder:text-md px-3 py-2 text-primary"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...restProps}
    />
  );
};

export default Input;
