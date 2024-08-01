import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const rootElement = document.getElementById("root") as HTMLElement;

if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<Provider store={store}>
			<App />
		</Provider>
	);
} else {
	console.error("Root element not found");
}
