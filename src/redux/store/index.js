import rootReducer from "../combineReducers";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { thunk } from "redux-thunk"; // Fixed: Import thunk, not default export
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage"; // Use this for web applications

// For React Native, use this instead:
// import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: storage, // Use storage for web, not AsyncStorage
  whitelist: ["product", "userDetailsReducer"], // Make sure this matches your reducer name in combineReducers
};

const loggerMiddleware = createLogger();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, loggerMiddleware) // Fixed: Use thunk not thunkMiddleware
);

const persistor = persistStore(store);

export { store, persistor };
