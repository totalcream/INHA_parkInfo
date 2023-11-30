import { AppProps } from "next/app";
import { Provider } from "mobx-react";
import Store from "@/app/store/Store";

function  MyApp({ Component, pageProps}: AppProps) {
    return (
        <Provider>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;