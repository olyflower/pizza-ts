import Button from "../../components/Button/Button";
import { useRedirect } from "../../hooks/useRedirect";
import style from "../../pages/NoPage/NoPage.module.css";

const NoPage: React.FC = () => {
	const redirectToLogin = useRedirect("/login");

	return (
		<div className={style.container}>
			<h1>404</h1>
			<h4>Page not found</h4>
			<Button onClick={redirectToLogin}>Back to Home page</Button>
		</div>
	);
};

export default NoPage;
