export enum ButtonStyles {
  mainButtonStyle = "bg-primary text-white hover:bg-primary-dark",
  warningButtonStyle = "bg-warning text-white hover:bg-red-700",
  transparentButtonStyle = "bg-transparent border border-black text-black hover:border-secondary hover:text-secondary",
  textButton = "bg-transparent text-gray hover:text-secondary",
}
interface ButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonStyle: ButtonStyles;
  icon?: JSX.Element;
  className?: string;
  iconPlacement?: "left" | "right";
}
const Button = ({
  text,
  icon,
  buttonStyle,
  onClick,
  iconPlacement = "right",
}: ButtonProps) => {
  return (
    <button
      className={`${buttonStyle} px-3 py-2 rounded flex items-center gap-2 ${
        iconPlacement === "left" && "flex-row-reverse"
      } max-w-max`}
      onClick={onClick}
    >
      {text} {icon}
    </button>
  );
};

export default Button;
