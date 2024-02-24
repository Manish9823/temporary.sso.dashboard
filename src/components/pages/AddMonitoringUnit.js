import styled from "@emotion/styled";
import { Add } from "@mui/icons-material";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddMonitoringUnitModal from "../../modal/AddMonitoringUnitModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontSize: 16,
        fontWeight: 600,
        backgroundColor: "#d1d5db",
        //   color: theme.palette.common.white,
        padding: "10px !important",
        width: "100vw",
    },
    [`&.${tableCellClasses.body}`]: {
        padding: "10px !important",
        fontSize: 14,
    },
    [`&.${tableCellClasses.head.tr}`]: {
        backgroundColor: "#79E0EE",
        width: "45vw",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function AddMonitoringUnit() {
    const state = useSelector(store => store.ssoStore);
    const navigate = useNavigate();

    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        //fractionalSecondDigits: 0,
    });

    function convertUTCDateToLocalDate(date) {
        var newDate = new Date(date);

        return formatter.format(newDate);
    }

    const [addMonitoringUnitModal, setAddMonitoringUnitModal] = useState(false);

    const onCloseOrgCreationModal = () => {
        setAddMonitoringUnitModal(false);
    };
    const handleOnClick = () => {
        setAddMonitoringUnitModal(true);
    };

    return (
        <>
            <Grid style={{ width: "100%" }}>
                <Grid sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
                    <Button variant="contained" onClick={() => handleOnClick()}>
                        <Add />
                        Add Monitoring Unit
                    </Button>
                </Grid>
                <Grid className="mt-3">
                    <TableContainer
                        component={Paper}
                        className="table-container"
                        sx={{
                            height: "735px",
                            overflowY: "scroll",
                            overflowX: "hidden",
                            width: "auto !important",
                        }}
                    >
                        <Table className="center" aria-label="table with sticky header" stickyHeader>
                            <TableHead className="p-3 mb-2 row">
                                <TableRow>
                                    <StyledTableCell className="col-1 tableHeaderFont">Sr.No.</StyledTableCell>
                                    <StyledTableCell className="col-1 tableHeaderFont">Unit</StyledTableCell>

                                    <StyledTableCell className="col-1 tableHeaderFont">Date</StyledTableCell>
                                    <StyledTableCell className="col-1 tableHeaderFont">Time</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {state.allRegistry.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell className="tableContentFont">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell className="tableContentFont">
                {row.registry_name}
                </StyledTableCell>
                <StyledTableCell className="tableContentFont">
                  {row.domain_name}
                </StyledTableCell>

                <StyledTableCell className="tableContentFont">
                  {convertUTCDateToLocalDate(row.createdAt).split(",")[0]}
                </StyledTableCell>

                <StyledTableCell className="tableContentFont">
                  {convertUTCDateToLocalDate(row.createdAt).split(",")[1]}
                </StyledTableCell>
                <StyledTableCell className="tableContentFont">
                  Created
                </StyledTableCell>

                <StyledTableCell className="btn-color">
                  <Button
                    className="font-weight-bold"
                    size="small"
                  >
                    Deployment Details
                  </Button>
                </StyledTableCell>

                <StyledTableCell className="btn-color">
                  <Button className="font-weight-bold" size="small">
                  Billing Details
                  </Button>
                  </StyledTableCell>
                  </StyledTableRow>
                ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                {addMonitoringUnitModal && <AddMonitoringUnitModal open={addMonitoringUnitModal} handleClose={onCloseOrgCreationModal} />}
            </Grid>
        </>
    );
}
