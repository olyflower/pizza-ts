import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useRedirect } from "../../hooks/useRedirect";
import Button from "../Button/Button";
import style from "../../components/Header/Header.module.css";

const Header: React.FC = () => {
	const userName = useSelector((state: RootState) => state.auth.userName);
	const redirectToCart = useRedirect("/cart");

	return (
		<div className={style.header}>
			<Link className={style.logo} to="/">
				Pizza Day
			</Link>
			{userName && <p>Welcome, {userName}!</p>}
			<Button onClick={redirectToCart}>Cart</Button>
		</div>
	);
};

export default Header;
