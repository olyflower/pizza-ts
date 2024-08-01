import { useNavigate } from "react-router-dom";

export function useRedirect(path: string) {
	const navigate = useNavigate();
	return () => navigate(path);
}
