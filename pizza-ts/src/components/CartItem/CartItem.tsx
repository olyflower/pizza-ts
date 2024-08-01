import Button from "../../components/Button/Button";
import { CartItemType } from "../../types/cartTypes";
import style from "../../pages/Cart/Cart.module.css";

interface CartItemProps {
	item: CartItemType;
	handleDecrement: (id: number) => void;
	handleIncrement: (id: number) => void;
	handleDeleteFromCart: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
	item,
	handleDecrement,
	handleIncrement,
	handleDeleteFromCart,
}) => {
	const totalPrice = item.unitPrice * item.quantity;

	return (
		<div key={item.id} className={style.items}>
			<li>
				<div className={style.content}>
					<span>
						{item.quantity}*{item.name}
					</span>
					<span>€{totalPrice.toFixed(2)}</span>
					<div className={style.buttons}>
						<Button onClick={() => handleDecrement(item.id)}>
							-
						</Button>
						{item.quantity}
						<Button onClick={() => handleIncrement(item.id)}>
							+
						</Button>
						<Button onClick={() => handleDeleteFromCart(item.id)}>
							Delete
						</Button>
					</div>
				</div>
			</li>
		</div>
	);
};

export default CartItem;
