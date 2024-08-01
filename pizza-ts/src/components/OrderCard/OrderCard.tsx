import { Order } from "../../types/orderTypes";
import style from "../OrderCard/OrderCard.module.css";

interface OrderCardProps {
	order: Order;
	onClick: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onClick }) => {
	const totalPrice = order.cart.reduce(
		(sum, item) => sum + item.totalPrice,
		0
	);

	return (
		<li className={style.card} onClick={onClick}>
			<p>Id: {order.id}</p>
			<p>Customer: {order.customer}</p>
			<p>Phone: {order.phone}</p>
			<p>Address: {order.address}</p>
			<p>Priority: {order.priority ? "Yes" : "No"}</p>
			<p>Total Price: €{totalPrice.toFixed(2)}</p>
		</li>
	);
};
export default OrderCard;
