import { configureStore } from "@reduxjs/toolkit";
import ticketPackageSlice from "./features/ticketPackage.slice";
import ticketCheckSlice from "./features/ticketCheck.slice";
import ticketEventPackageSlice from "./features/ticketEventPackage.slice";
import ticketFamilyPackageSlice from "./features/ticketFamilyPackage.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunk from "redux-thunk";

export const store = configureStore({
    reducer: {
        ticketPackageSlice,
        ticketCheckSlice,
        ticketEventPackageSlice,
        ticketFamilyPackageSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;