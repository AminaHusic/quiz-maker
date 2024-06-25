interface CheckboxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: number;
  onChange: () => void;
  text: string;
  checked?: boolean;
}
const Checkbox = ({ value, onChange, text, checked }: CheckboxProps) => {
  return (
    <div className="border rounded border-gray p-3 w-full gap-2 hover:border-secondary">
      <input
        type="checkbox"
        value={value}
        onChange={onChange}
        className="w-3 h-3 accent-secondary mr-2"
      />
      <label className="text-xs">{text}</label>
    </div>
  );
};

export default Checkbox;
