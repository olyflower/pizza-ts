import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRedirect } from "../../hooks/useRedirect";
import { updateOrderPriority } from "../../redux/slices/orderSlice";
import Button from "../../components/Button/Button";
import { RootState, AppDispatch } from "../../redux/store";
import { Order } from "../../types/orderTypes";
import style from "../OrderDetail/OrderDetail.module.css";

const OrderDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const orders = useSelector((state: RootState) => state.orders.orders);
	const order: Order | undefined = orders.find((order) => order.id === id);

	const redirectToMenu = useRedirect("/menu");
	const redirectToOrders = useRedirect("/order");

	const handlePriorityToggle = () => {
		if (order) {
			dispatch(
				updateOrderPriority({ id: order.id, priority: !order.priority })
			);
		}
	};

	return (
		<div className={style.container}>
			{!order ? (
				<div>Order not found</div>
			) : (
				<>
					<div className={style.status}>
						<div className={style.title}>
							Order {order.id} status: {order.status}
						</div>
						{order.priority && (
							<div className={style.priority}>Priority</div>
						)}
						<div className={style.info}>Preparing Order</div>
					</div>

					<p className={style.delivery}>
						Estimated Delivery:
						{new Date(order.estimatedDelivery).toLocaleString()}
					</p>

					<div>
						<div className={style.title}>Customer Info:</div>
						<p>Name:{order.customer}</p>
						<p>Phone: {order.phone}</p>
						<p>Address: {order.address}</p>
					</div>

					<div className={style.title}>Cart Items:</div>
					<ul>
						{order.cart.map((item) => (
							<li key={item.pizzaId}>
								<div className={style.total}>
									<p>
										{item.quantity}*{item.name}
									</p>
									<p>€{item.totalPrice}</p>
								</div>
							</li>
						))}
					</ul>

					<div className={style.delivery}>
						<p>Price pizza: €{order.orderPrice}</p>
						<p>
							Price Priority: €
							{order.priority ? order.priorityPrice : 0}
						</p>
						<p>
							To pay on delivery:
							{new Date(
								order.estimatedDelivery
							).toLocaleDateString()}
						</p>
					</div>
					{!order.priority && (
						<Button onClick={handlePriorityToggle}>
							Prioritize
						</Button>
					)}
				</>
			)}
			<Button onClick={redirectToMenu}>Back to menu</Button>
			<Button onClick={redirectToOrders}>Back to orders</Button>
		</div>
	);
};

export default OrderDetail;
