import {
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    FormGroup,
    IconButton,
    Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import { useState } from "react";
import { Close, InsertLink, Save } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { showSnackbar } from "../store/snackbarSlice";

export default function LinkTechSupportUser({ setLinkTechSupport, node, getPyramidData }) {
    const state = useSelector(store => store.ssoStore);
    const [updateTechUser, setUpdateTechUser] = useState(node.linked_tech_support_users ?? {});
    const dispatch = useDispatch();

    const handleOnChange = (e, obj) => {
        if (e.target.checked) {
            const techUserId = obj._id;
            const techUserEmail = obj.email;
            const newTechUserObject = { ...updateTechUser, [techUserId]: techUserEmail };
            setUpdateTechUser(newTechUserObject);
        } else {
            const newTechUserObject = {};
            const techUserId = obj._id;
            Object.keys(updateTechUser).forEach(key => {
                if (key !== techUserId) {
                    newTechUserObject[key] = updateTechUser[key];
                }
            });
            setUpdateTechUser(newTechUserObject);
        }
    };

    const linkTechSupportToOrg = async () => {
        const payloadData = {
            unit_id: node._id,
            fieldsToUpdate: {
                linked_tech_support_users: updateTechUser,
            },
        };
        try {
            const response = await axiosInstance.post(`/pyramid/update-unit`, { ...payloadData });
            await getPyramidData();
            setLinkTechSupport(false);
            dispatch(
                showSnackbar({
                    open: true,
                    severity: "success",
                    message: "User Linked",
                }),
            );
        } catch (error) {
            throw error;
        }
    };

    return (
        <Dialog open={true} fullWidth maxWidth="xs">
            <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" color={"primary"} fontSize={"1.8rem"} fontWeight={"500"}>
                    Link Tech Support User
                </Typography>
                <IconButton
                    variant="secondary"
                    onClick={() => {
                        setLinkTechSupport(false);
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {state &&
                    state.orgDetails &&
                    state.orgDetails.linked_tech_support_users &&
                    Object.keys(state.orgDetails.linked_tech_support_users).map((row, index) => (
                        <FormGroup>
                            {node.linked_tech_support_users &&
                            Object.keys(node.linked_tech_support_users).find(
                                key => node.linked_tech_support_users[key] == state.orgDetails.linked_tech_support_users[row],
                            ) ? (
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label={state.orgDetails.linked_tech_support_users[row]}
                                    checked={updateTechUser[row]}
                                    onChange={e => {
                                        handleOnChange(e, { _id: row, email: state.orgDetails.linked_tech_support_users[row] });
                                    }}
                                />
                            ) : (
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label={state.orgDetails.linked_tech_support_users[row]}
                                    checked={updateTechUser[row]}
                                    onChange={e => {
                                        handleOnChange(e, { _id: row, email: state.orgDetails.linked_tech_support_users[row] });
                                    }}
                                />
                            )}
                        </FormGroup>
                    ))}
            </DialogContent>
            <DialogActions style={{ padding: "10px" }}>
                {/* <Button
          variant="contained"
          onClick={() => {
            dispatch(changeCreateScreenModal(false));
          }}
        >
          Close
        </Button> */}
                <Button variant="contained" onClick={linkTechSupportToOrg}>
                    <Save fontSize="small" />
                    &nbsp;Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
