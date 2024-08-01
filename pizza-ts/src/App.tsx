import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
import NewOrder from "./pages/NewOrder/NewOrder";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
import NoPage from "./pages/NoPage/NoPage";
import Layout from "./pages/Layout/Layout";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Login />} />
					<Route path="login" element={<Login />} />
					<Route path="menu" element={<Menu />} />
					<Route path="cart" element={<Cart />} />
					<Route path="order" element={<Order />} />
					<Route path="order/new" element={<NewOrder />} />
					<Route path="order/:id" element={<OrderDetail />} />
				</Route>
				<Route path="*" element={<NoPage />} />
			</Routes>
		</Router>
	);
};

export default App;
