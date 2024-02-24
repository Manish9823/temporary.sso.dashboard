import {
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import { useState } from "react";

import { Close, InsertLink, Save } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { setAllOrgUsers } from "../store/ssoSlice";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";

export default function LinkOrgUsers({ setLinkOrgSupport, node, getPyramidData }) {
    const state = useSelector(store => store.ssoStore);
    const [updateOrgUser, setUpdateOrgUser] = useState(node.org_users ?? {});
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleOnChange = (e, obj) => {
        if (e.target.checked) {
            const userId = obj._id;
            const userEmail = obj.email;
            const newUserObject = { ...updateOrgUser, [userId]: userEmail };
            setUpdateOrgUser(newUserObject);
        } else {
            const newUserObject = {};
            const userId = obj._id;
            Object.keys(updateOrgUser).forEach(key => {
                if (key !== userId) {
                    newUserObject[key] = updateOrgUser[key];
                }
            });
            setUpdateOrgUser(newUserObject);
        }
    };

    const linkOrgUser = async () => {
        const payloadData = {
            unit_id: node._id,
            fieldsToUpdate: {
                org_users: updateOrgUser,
            },
        };
        try {
            const response = await axiosInstance.post(`/pyramid/update-unit`, { ...payloadData });
            await getPyramidData();
            setLinkOrgSupport(false);
        } catch (error) {
            throw error;
        }
    };

    const getAllOrganizationUsers = async userId => {
        try {
            const response = await axiosInstance.get(`/users/org`);

            dispatch(setAllOrgUsers(response.data.data));
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        getAllOrganizationUsers();
    }, []);

    return (
        <Dialog open={true} fullWidth maxWidth="xs">
            <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
                <Grid sx={{ fontSize: "1.8rem", color: theme.palette.primary.main, fontFamily: `"Poppins", sans-serif !important` }}>
                    Link Org Users
                </Grid>
                <IconButton
                    variant="secondary"
                    onClick={() => {
                        setLinkOrgSupport(false);
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {state.allOrganisationUsers.map((row, index) => (
                    <Grid>
                        <FormControlLabel
                            key={`${index}`}
                            control={<Checkbox />}
                            label={row.email}
                            checked={updateOrgUser[row._id]}
                            onChange={e => {
                                handleOnChange(e, row);
                            }}
                        />
                    </Grid>
                ))}
            </DialogContent>
            <DialogActions>
                {/* <Button
          variant="contained"
          onClick={() => {
            dispatch(changeCreateScreenModal(false));
          }}
        >
          Close
        </Button> */}
                <Button variant="contained" onClick={linkOrgUser}>
                    <Save fontSize="small" />
                    &nbsp;Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
