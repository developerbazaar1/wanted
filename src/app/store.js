import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/authSlice";
import { categorySlice } from "../features/categorySlice";
import { subcategorySlice } from "../features/subcategorySlice";
import { subscriptionSlice } from "../features/subscriptionSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { subsubcategorySlice } from "../features/subsubcategory";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  category: categorySlice.reducer,
  subcategory: subcategorySlice.reducer,
  subsubcategory: subsubcategorySlice.reducer,
  subscription: subscriptionSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };
