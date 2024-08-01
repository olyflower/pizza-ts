import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setSearchQuery } from "../../redux/slices/searchSlice";
import Input from "../Input/Input";
import style from "../Search/Search.module.css";

const Search: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const searchQuery = useSelector((state: RootState) => state.search.query);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchQuery(e.target.value));
	};

	return (
		<div className={style.search}>
			<Input
				placeholder="Search for pizza..."
				value={searchQuery}
				onChange={handleSearchChange}
				style={{ backgroundColor: "rgb(217 222 152 / 49%)" }}
			/>
		</div>
	);
};

export default Search;
