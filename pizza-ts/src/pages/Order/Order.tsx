import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Button from "../../components/Button/Button";
import style from "../Order/Order.module.css";
import { useRedirect } from "../../hooks/useRedirect";

interface Order {
	id: string;
	status: string;
	priority: boolean;
	estimatedDelivery: string;
}

const Order: React.FC = () => {
	const orders = useSelector((state: RootState) => state.orders.orders);
	const redirectToNewOrder = useRedirect("/order/new");
	const redirectToMenu = useRedirect("/menu");

	return (
		<div className={style.container}>
			<div className={style.title}>Orders List: </div>
			{orders.length === 0 ? (
				<p>No orders yet</p>
			) : (
				<ul className={style.orders}>
					{orders.map((order) => (
						<li key={order.id}>
							<div className={style.order}>
								<p>
									<span className={style.bold}>
										Order ID:
									</span>{" "}
									{order.id}
								</p>
								<p>
									<span className={style.bold}>Status:</span>{" "}
									{order.status}
								</p>
								<p>
									<span className={style.bold}>
										Priority:
									</span>

									{order.priority ? "Yes" : "No"}
								</p>
								<p>
									<span className={style.bold}>
										Estimated Delivery:
									</span>

									{new Date(
										order.estimatedDelivery
									).toLocaleString()}
								</p>
							</div>
						</li>
					))}
				</ul>
			)}
			<div className={style.container}>
				<Button onClick={redirectToNewOrder}>Create new order</Button>
				<Button onClick={redirectToMenu}>Back to menu</Button>
			</div>
		</div>
	);
};

export default Order;
