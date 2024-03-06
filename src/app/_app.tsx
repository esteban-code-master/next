import { container } from "@core/inversify/inversify.config";
import { Provider } from "inversify-react";

function MyApp({ Component, pageProps }: any) {
	console.log("render--...");
	return (
		<Provider container={container}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
