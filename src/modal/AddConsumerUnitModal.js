import * as React from "react";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
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
// import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { setAllMusOfOrg } from "../store/ssoSlice";
// import ConsumerUnitRequestModal from "./ConsumerUnitRequestModal";

export default function AddConsumerUnitModal({ open, handleClose, handleCloseRequest }) {
    const state = useSelector(store => store.ssoStore);
    const dispatch = useDispatch();

    const [snackBar, setSnackBar] = useState({
        show: false,
        snackBarMessage: "",
    });

    const [createCU, setCreateCU] = useState({
        unit_name: "",
        unit_type: "Consumer Unit",
        parent_mu: "",
        organisation_name: "testOrg",
        status: "Pending",
        registry_admin_id: "",
    });

    const handleDetails = event => {
        const { name, value } = event.target;
        let objectToChange = {};

        objectToChange = { ...createCU, [name]: value };

        setCreateCU(objectToChange);
    };

    const onClickSubmitDetails = async () => {
        if (createCU.unit_name === "") {
            setSnackBar({ show: true, snackBarMessage: "Please Enter Unit Name" });
            return;
        }
        // if (createCU.parent_id === "") {
        //   setSnackBar({ show: true, snackBarMessage: "Please Enter its Parent" });
        //   return;
        // }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/unit/request-consumer-unit`, { ...createCU });
            if (response.status === 200) {
                handleClose();
            }
        } catch (error) {
            alert("error");
        }
        handleCloseRequest();
    };

    const handleOnClickCancel = () => {
        handleClose();
        handleCloseRequest();
    };

    const handleChangeParentMu = async event => {
        // setCreateCU({ ...createCU, parent_mu: event.target.value });

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/unit/get-mu-by-parent_id`, {
                unit_type: "Monitoring Unit",
                parent_org: "Ajio",
            });
            dispatch(setAllMusOfOrg(response.data.data));
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        handleChangeParentMu();
    }, []);

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
                    Fill details to request Consumer Unit
                </DialogContent>

                <DialogContent>
                    <Grid>
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

                    <Grid mt={2}>
                        <TextField
                            fullWidth
                            size="small"
                            // label="Unit Type"
                            name="unit_type"
                            value="Consumer Unit"
                            onChange={handleDetails}
                        ></TextField>
                    </Grid>

                    {/* <Grid mt={2}>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">organisation Name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Monitoring Units"
                name="parent_mu"
                onChange={handleDetails}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}

                    <Grid mt={2} sx={{ display: "flex ", justifyContent: "center" }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel sx={{ textAlign: "center" }} id="demo-select-small-label">
                                Select MU Name
                            </InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                size="small"
                                label="Enter MU Name"
                                // defaultValue={unitDetails.parent_mu}
                                // name="parent_id"
                                onChange={handleDetails}
                            >
                                {state.allMUsOfOrg.length > 0 &&
                                    state.allMUsOfOrg.map((event, index) => (
                                        <MenuItem key={index} value={event.unit_name}>
                                            {event.unit_name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" onClick={onClickSubmitDetails} size="small">
                        Submit
                    </Button>
                    <Button onClick={handleOnClickCancel} size="small">
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
