import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import store from "./store/store.js";
import App from "./App.jsx";
import "./index.css";

export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster richColors closeButton />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
