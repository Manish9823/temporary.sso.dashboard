import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Alert, Dialog, DialogActions, DialogContent, Grid, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddTechSupportModal({ open, handleClose, onCreateTechUser }) {
    const state = useSelector(store => store.ssoStore);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const [snackBar, setSnackBar] = useState({
        show: false,
        snackBarMessage: "",
    });

    const [createTechSupport, setCreateTechSupport] = useState({
        email: "",
        phone: "",
        password: "",
        user_type: "TechSupportUser",
    });

    const handleDetails = event => {
        const { name, value } = event.target;
        let objectToChange = {};

        objectToChange = { ...createTechSupport, [name]: value };

        setCreateTechSupport(objectToChange);
    };

    const onClickSubmitDetails = async () => {
        if (createTechSupport.email === "") {
            setSnackBar({ show: true, snackBarMessage: "Please Enter Email!" });
            return;
        }

        if (createTechSupport.phone === "") {
            setSnackBar({ show: true, snackBarMessage: "Enter Your Phone Number" });
            return;
        }
        if (createTechSupport.password === "") {
            setSnackBar({
                show: true,
                snackBarMessage: "Password length must contain 8 character!",
            });
            return;
        }
        await onCreateTechUser(createTechSupport);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <Dialog open={open} PaperProps={{ style: { width: "30%" } }}>
            <DialogContent
                variant={5}
                className="text-center font-weight-bold "
                style={{
                    fontSize: "22px",
                    color: "#1e3a8a",
                    fontWeight: "900px",
                }}
            >
                Add Tech Support User
            </DialogContent>

            <DialogContent>
                <Grid mt={1}>
                    <TextField autoFocus fullWidth size="small" label="Enter Email" name="email" type="email" onChange={handleDetails}></TextField>
                </Grid>

                <Grid mt={3}>
                    <TextField
                        fullWidth
                        label="Enter password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        style={{ fontSize: "18px" }}
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleDetails}
                    />
                </Grid>

                <Grid mt={3}>
                    <TextField fullWidth size="small" label="Enter phone Number" name="phone" onChange={handleDetails}></TextField>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={onClickSubmitDetails} size="small">
                    Register
                </Button>
                <Button onClick={handleClose} size="small">
                    Cancel
                </Button>
            </DialogActions>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackBar.show}
                autoHideDuration={3000}
                onClose={() => {
                    setSnackBar({ show: false, snackBarMessage: "" });
                }}
            >
                <Alert severity="error">{snackBar.snackBarMessage}</Alert>
            </Snackbar>
        </Dialog>
    );
}
