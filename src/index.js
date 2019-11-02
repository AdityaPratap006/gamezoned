import React from "react";
import ReactDOM from "react-dom";
import { IdentityContextProvider } from "react-netlify-identity-widget";

import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { store, persistor } from "./redux/store";

const url = "https://infallible-mclean-90bb83.netlify.com"; // supply the url of your Netlify site instance. VERY IMPORTANT. no point putting in env var since this is public anyway

ReactDOM.render(
  <Provider store={store}>
    <IdentityContextProvider url={url}>
      <HashRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </HashRouter>
    </IdentityContextProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
