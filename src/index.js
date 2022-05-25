import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { persistor, store } from "./Redux/store/store";
import { PersistGate } from "redux-persist/integration/react";


const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
