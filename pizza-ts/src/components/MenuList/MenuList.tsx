import MenuItem from "../MenuItem/MenuItem";
import { MenuItem as MenuItemType } from "../../types/menuTypes";
import style from "../../components/MenuList/MenuList.module.css";

interface MenuListProps {
  data: MenuItemType[]; 
}

const MenuList: React.FC<MenuListProps> = ({ data }) => {
	return (
		<div className={style.container}>
			<div className={style.wrapper}>
				<ul>
					{data.map((item) => (
						<MenuItem item={item} key={item.id} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default MenuList;
