import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../../store/snackbarSlice";

function SnackbarMessage() {
    const snackbarStore = useSelector(store => store.snackbarStore);
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <Snackbar
                open={snackbarStore.open}
                autoHideDuration={3000}
                onClose={() => {
                    dispatch(closeSnackbar());
                }}
                key={"top" + "center"}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert severity={snackbarStore.severity} variant="filled" sx={{ width: "100%" }}>
                    {snackbarStore.message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

export default SnackbarMessage;
