import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { videoReducer } from "./features/videoslice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./features/authSlice";
import persistStore from "redux-persist/es/persistStore";

const authPersistConfig = {
	key: "auth",
	storage: storage,
	// whitelist: ["authState"],
};
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
export const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
		videos: videoReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
