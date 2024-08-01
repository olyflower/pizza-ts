import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { useRedirect } from "../../hooks/useRedirect";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import style from "../../pages/Login/Login.module.css";

const Login: React.FC = () => {
	const [userName, setUserName] = useState<string>("");
	const dispatch = useDispatch();

	const redirectToMenu = useRedirect("/menu");

	const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (userName) {
			dispatch(login({ userName }));
			redirectToMenu();
		}
	};
	return (
		<div className={style.container}>
			<div className={style.wrapper}>
				<div className={style.content}>
					<h1 className={style.title}>
						The best pizza.
						<br />
						<span className={style.text__yellow}>
							Straight out of the oven, straight to you.
						</span>
					</h1>
					<p className={style.sub__title}>
						👋 Welcome! Please start by telling us your name:
					</p>
					<form
						className={style.login__form}
						onSubmit={handlerSubmit}
					>
						<Input
							type="text"
							placeholder="Your full name"
							onChange={(e) => setUserName(e.target.value)}
						/>
						<Button type="submit">Login</Button>
					</form>
				</div>
			</div>
		</div>
	);
};
export default Login;
