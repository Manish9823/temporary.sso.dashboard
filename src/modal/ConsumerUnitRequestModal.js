import { Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddConsumerUnitModal from "../modal/AddConsumerUnitModal";

export default function ConsumerUnitRequestModal({ open, handleClose }) {
    const state = useSelector(store => store.ssoStore);
    const [addConsumerUnitDetails, setAddConsumerDetails] = useState(false);

    const handleRequest = () => {
        setAddConsumerDetails(true);

        // const interval = setInterval(() => {
        //   setAddConsumerDetails(true);
        // }, 5000);
        // handleClose();
    };

    const onCloseConsumerDetailsModal = () => {
        setAddConsumerDetails(false);
    };

    return (
        <>
            <Dialog open={open} PaperProps={{ style: { width: "30%" } }}>
                <DialogContent
                    variant={5}
                    className="text-center font-weight-bold "
                    style={{
                        fontSize: "14px",
                        color: "#1e3a8a",
                        fontWeight: "900px",
                    }}
                >
                    You do not have access to create a Consumer Unit. Please request your White Label Solution Owner!
                </DialogContent>

                <DialogActions>
                    <Button className="font-weight-bold" variant="outlined" size="small" onClick={() => handleRequest()}>
                        {" "}
                        Request{" "}
                    </Button>
                    <Button className="font-weight-bold" variant="outlined" size="small" onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            {addConsumerUnitDetails && (
                <AddConsumerUnitModal open={addConsumerUnitDetails} handleClose={onCloseConsumerDetailsModal} handleCloseRequest={handleClose} />
            )}
            ;
        </>
    );
}
