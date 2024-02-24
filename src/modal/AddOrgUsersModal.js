import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    Snackbar,
    TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { Save } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

export default function AddOrgUsersModal({ open, handleClose, createOrganizationUser }) {
    const state = useSelector(store => store.ssoStore);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();

    const [snackBar, setSnackBar] = useState({
        show: false,
        snackBarMessage: "",
    });

    const [createOrgUser, setCreateOrgUser] = useState({
        email: "",
        phone: "",
        password: "",
        role_id: "123",
        // user_type: "OrganizationUser"
    });

    const handleDetails = event => {
        const { name, value } = event.target;
        let objectToChange = {};

        objectToChange = { ...createOrgUser, [name]: value };

        setCreateOrgUser(objectToChange);
    };

    const onClickSubmitDetails = async () => {
        if (setCreateOrgUser.email === "") {
            setSnackBar({ show: true, snackBarMessage: "Please Enter Email!" });
            return;
        }

        if (setCreateOrgUser.phone === "") {
            setSnackBar({ show: true, snackBarMessage: "Enter Your Phone Number" });
            return;
        }
        if (setCreateOrgUser.password === "") {
            setSnackBar({
                show: true,
                snackBarMessage: "Password length must contain 8 character!",
            });
            return;
        }
        // try {
        //     const response = await axiosInstance.post("/users/createUser", createOrgUser)
        //     if (response.status === 200) {
        //         handleClose();
        //     }
        // } catch (error) {
        //     alert("error");
        // }
        await createOrganizationUser(createOrgUser);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <Dialog open={open} PaperProps={{ style: { width: "30%" } }}>
            <DialogTitle
                variant={5}
                style={{
                    fontSize: "1.8rem",
                    color: theme.palette.primary.main,
                }}
            >
                Add Organization User
            </DialogTitle>

            <DialogContent>
                <Grid mt={2}>
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
                    <Save fontSize="small" />
                    &nbsp;Add
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
