import { configureStore } from "@reduxjs/toolkit";
import { ssoSlice } from "./store/ssoSlice";
import { snackbarSlice } from "./store/snackbarSlice";

export const store = configureStore({
    reducer: {
        ssoStore: ssoSlice.reducer,
        snackbarStore: snackbarSlice.reducer,
    },
});
