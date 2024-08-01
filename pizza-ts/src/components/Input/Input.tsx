import style from "../../components/Input/Input.module.css";

interface InputProps {
	type?: "text" | "password" | "email" | "number";
	placeholder?: string;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	style?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({
	type = "text",
	placeholder,
	value,
	onChange,
	style: customStyle = {},
}) => {
	return (
		<input
			className={style.input}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			style={customStyle}
		/>
	);
};

export default Input;
