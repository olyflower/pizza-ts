import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	deleteFromCart,
	incrementQuantity,
	decrementQuantity,
	clearCart,
} from "../../redux/slices/cartSlice";
import Button from "../../components/Button/Button";
import { useRedirect } from "../../hooks/useRedirect";
import style from "../Cart/Cart.module.css";
import CartItem from "../../components/CartItem/CartItem";
import { RootState } from "../../redux/store";

const Cart: React.FC = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state: RootState) => state.cart);
	const userName = useSelector((state: RootState) => state.auth.userName);

	const redirectToMenu = useRedirect("/menu");
	const redirectToOrder = useRedirect("/order");

	const handleClearCart = useCallback(() => {
		dispatch(clearCart());
	}, [dispatch]);

	const handleIncrement = useCallback(
		(id: number) => {
			dispatch(incrementQuantity({ id }));
		},
		[dispatch]
	);

	const handleDecrement = useCallback(
		(id: number) => {
			dispatch(decrementQuantity({ id }));
		},
		[dispatch]
	);

	const handleDeleteFromCart = useCallback(
		(id: number) => {
			dispatch(deleteFromCart({ id }));
		},
		[dispatch]
	);

	return (
		<div className={style.container}>
			<div className={style.actions}>
				<div className={style.buttons}>
					<Button onClick={redirectToMenu}>
						{"\u2190"}Back to menu
					</Button>
					<Button onClick={redirectToOrder}>
						Back to orders{"\u2192"}
					</Button>
				</div>
				<h1>Your cart, {userName}</h1>
			</div>

			<div className={style.content}>
				{cart.items.length === 0 ? (
					<p>Cart is empty.</p>
				) : (
					<ul>
						{cart.items.map((item) => (
							<CartItem
								key={item.id}
								item={item}
								handleIncrement={handleIncrement}
								handleDecrement={handleDecrement}
								handleDeleteFromCart={handleDeleteFromCart}
							/>
						))}
					</ul>
				)}
			</div>
			<div className={style.total}>
				<p>Total items: {cart.totalItems}</p>
				<p>Total price: €{cart.totalPrice}</p>
			</div>
			<div className={style.buttons}>
				<Button onClick={redirectToOrder}>Order Pizzas</Button>
				<Button onClick={handleClearCart}>Clear Cart</Button>
			</div>
		</div>
	);
};

export default Cart;
