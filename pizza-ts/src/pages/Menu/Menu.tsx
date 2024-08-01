import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuList from "../../components/MenuList/MenuList";
import Search from "../../components/Search/Search";
import { getData, selectMenu } from "../../redux/slices/menuSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import { RootState, AppDispatch } from "../../redux/store";

import style from "../Menu/Menu.module.css";

const Menu: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const { items, status, error } = useSelector((state: RootState) =>
		selectMenu(state)
	);
	const searchQuery = useSelector((state: RootState) => state.search.query);

	useEffect(() => {
		if (status === "idle") {
			dispatch(getData());
		}
	}, [dispatch, status]);

	useEffect(() => {
		dispatch(clearCart());
	}, [dispatch]);

	const menuItems = items?.data || [];

	const filteredItems = Array.isArray(menuItems)
		? menuItems.filter((item) =>
			item.name.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: [];
	console.log("Filtered Items: ", filteredItems); 

	return (
		<div className={style.menu}>
			<Search />
			{status === "loading" && <p>Loading...</p>}
			{status === "failed" && <p>Error: {error}</p>}
			{status === "succeeded" && <MenuList data={filteredItems} />}
		</div>
	);
};

export default Menu;
