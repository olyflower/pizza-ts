import MenuItem from "../MenuItem/MenuItem";
import style from "../../components/MenuList/MenuList.module.css";

interface MenuItemData {
	id: number;
	name: string;
	unitPrice: number;
	imageUrl: string;
	ingredients: string[];
	soldOut: boolean;
}

interface MenuListProps {
	data: MenuItemData[];
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
