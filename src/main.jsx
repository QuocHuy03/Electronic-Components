import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* <Provider store={store}> */}
        {/* <PersistGate persistor={persistor}> */}
        {/* <AppContextProvider> */}
        <App />
        {/* </AppContextProvider> */}
        {/* </PersistGate> */}
        {/* </Provider> */}
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
