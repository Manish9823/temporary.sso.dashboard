import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    Snackbar,
    TextField,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogContentText,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";

export default function AddMonitoringUnitModal({ open, handleClose }) {
    const state = useSelector(store => store.ssoStore);
    const dispatch = useDispatch();

    const [snackBar, setSnackBar] = useState({
        show: false,
        snackBarMessage: "",
    });

    const [createMU, setCreateMU] = useState({
        unit_name: "",
        unit_type: "MU",
        parent_id: "",
    });

    const handleDetails = event => {
        const { name, value } = event.target;
        let objectToChange = {};

        objectToChange = { ...createMU, [name]: value };

        setCreateMU(objectToChange);
    };

    const onClickSubmitDetails = async () => {
        if (createMU.unit_name === "") {
            setSnackBar({ show: true, snackBarMessage: "Please Enter Unit Name" });
            return;
        }
        if (createMU.parent_id === "") {
            setSnackBar({ show: true, snackBarMessage: "Please Enter its Parent" });
            return;
        }
    };

    //     try {
    //       const response = await axios.post(
    //         "http://localhost:3010/allUnits/create-new-units",
    //         { ...createSubUnitDatails },
    //         { headers: { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` } }
    //       );
    //       if (response.status === 200) {
    //         dispatch(setAllUnits(response.data.data.treeData));
    //         handleClose();
    //       }
    //     } catch (error) {
    //       alert("error");
    //     }
    //   };

    return (
        <>
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
                    Add Monitoring Unit
                </DialogContent>

                <DialogContent>
                    <Grid mt={1}>
                        <TextField
                            autoFocus
                            fullWidth
                            size="small"
                            label="Enter Unit Name"
                            name="unit_name"
                            type="email"
                            onChange={handleDetails}
                        ></TextField>
                    </Grid>

                    <Grid mt={3}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Parent id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="parent_id"
                                name="parent_id"
                                onChange={handleDetails}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
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
        </>
    );
}
