import style from "../../components/Button/Button.module.css";

interface ButtonProps {
	type?: "button" | "submit" | "reset";
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
	type = "button",
	children,
	onClick,
}) => {
	return (
		<button type={type} className={style.button} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
