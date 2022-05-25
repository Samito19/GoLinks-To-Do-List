import { persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import allReducers from "../reducers";
import { createStore } from "redux";

const persistConfiguration = {
    key: "persist-key",
    storage
}

const persistedReducer = persistReducer(persistConfiguration, allReducers)

export const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export const persistor = persistStore(store)


