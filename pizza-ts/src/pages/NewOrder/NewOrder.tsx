import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../components/Button/Button";
import { createOrder } from "../../redux/slices/orderSlice";
import { RootState } from "../../redux/store";
import { CreateOrderPayload } from "../../types/orderTypes";
import style from "../NewOrder/NewOrder.module.css";

const validationSchema = Yup.object({
	name: Yup.string().required("Required"),
	phone: Yup.string()
		.matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
		.required("Required"),
	address: Yup.string().required("Required"),
});

interface FormValues {
	name: string;
	phone: string;
	address: string;
	priority: boolean;
}

const NewOrder: React.FC = () => {
	const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (
		values: FormValues,
		{ resetForm }: { resetForm: () => void }
	) => {
		const orderData: CreateOrderPayload = {
			customer: values.name,
			phone: values.phone,
			address: values.address,
			priority: values.priority,
			position: "",
			cart: cartItems.map((item) => ({
				pizzaId: item.id,
				name: item.name,
				quantity: item.quantity,
				unitPrice: item.unitPrice,
				totalPrice: item.quantity * item.unitPrice,
			})),
		};
		console.log("Order data before dispatch:", orderData);

		try {
			const result = await dispatch(createOrder(orderData) as any);
			if (createOrder.fulfilled.match(result)) {
				const orderId = result.payload.data.id;
				console.log("Order ID from response:", orderId);
				navigate(`/order/${orderId}`);
			} else {
				console.error("Something went wrong", result.payload);
			}
		} catch (error) {
			console.error("Error creating order", error);
		}

		resetForm();
	};

	return (
		<div className={style.container}>
			<h1>Ready to order? Let's go!</h1>
			<Formik
				initialValues={{
					name: "",
					phone: "",
					address: "",
					priority: false,
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<Form>
					<div className={style.formGroup}>
						<label>
							Name:
							<Field
								type="text"
								name="name"
								placeholder="Enter name"
							/>
						</label>
						<ErrorMessage name="name" component="p" />
					</div>

					<div className={style.formGroup}>
						<label>
							Phone:
							<Field
								type="text"
								name="phone"
								placeholder="Enter phone number"
							/>
						</label>
						<ErrorMessage name="phone" component="p" />
					</div>

					<div className={style.formGroup}>
						<label>
							Address:
							<Field
								type="text"
								name="address"
								placeholder="Enter address"
							/>
						</label>
						<ErrorMessage name="address" component="p" />
					</div>

					<div className={style.formGroup}>
						<Field type="checkbox" id="priority" name="priority" />
						<label htmlFor="priority">
							Want to give your order priority?
						</label>
					</div>

					<Button type="submit">Order now for €{totalPrice}</Button>
				</Form>
			</Formik>
		</div>
	);
};

export default NewOrder;
