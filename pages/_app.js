import App from "next/app";
import React from "react";
import { Provider } from "mobx-react";
import { Parkupdate } from "../stores/Store";

class MyApp extends App {
  state = {
    Parkupdate: new Parkupdate()
  };

  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);
    const initialStoreState = await fetchInitialStoreState();

    return {
      ...appProps,
      initialStoreState
    };
  }

  // Hydrate serialized state to store
  static getDerivedStateFromProps(props, state) {
    state.Parkupdate.hydrate(props.initialStoreState);
    return state;
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider Parkupdate={this.state.Parkupdate}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
export default MyApp;