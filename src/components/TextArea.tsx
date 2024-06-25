interface TextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  error?: string;
}
const TextArea = ({
  value,
  onChange,
  placeholder,
  ...restProps
}: TextAreaProps) => {
  return (
    <div>
      <textarea
        className="bg-transparent text-md border-b border-b-primary-dark w-full focus-visible:outline-none placeholder:text-md text-primary px-3 py-2"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...restProps}
      />{" "}
    </div>
  );
};

export default TextArea;
