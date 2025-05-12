import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store/index.js"; // Import persistor as well
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Add this import

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <StrictMode>
          <App />
        </StrictMode>
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
