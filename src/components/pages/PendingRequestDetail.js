import { Add } from "@mui/icons-material";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddTechSupportModal from "../../modal/AddTechSupportModal";
import styled from "@emotion/styled";
import axios from "axios";
import { setAllPendingRequest } from "../../store/ssoSlice";
import axiosInstance from "../../utils/axiosInstance";

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
        // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function PendingRequestDetail() {
    const state = useSelector(store => store.ssoStore);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [approvedRequestDetails, setApprovedRequestDetails] = useState({
        organisation_name: "",
        unit_name: "",
        unit_type: "",
        // parent_mu: [],
        status: "Approved",
    });

    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        //fractionalSecondDigits: 0,
    });

    const getAllPendingRequest = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/unit/get-all-pending-requests`, {
                registry_admin_id: "user@leadows.com",
            });
            dispatch(setAllPendingRequest(response.data.data));
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        getAllPendingRequest();
    }, []);

    function convertUTCDateToLocalDate(date) {
        var newDate = new Date(date);

        return formatter.format(newDate);
    }

    const handleApproveOnClick = async row => {
        try {
            setApprovedRequestDetails({
                organisation_name: row.organisation_name,
                unit_name: row.unit_name,
                unit_type: row.unit_type,
                // parent_mu: row.parent_mu,
                status: "Approved",
            });

            const response = await axiosInstance.post("/unit/create-all-approved-requests", {
                organisation_name: row.organisation_name,
                unit_name: row.unit_name,
                unit_type: row.unit_type,
                // parent_mu: row.parent_mu,
                status: "Approved",
            });
            // dispatch(setAllPendingRequest(response.data.data));
        } catch (error) {
            throw error;
        }
    };

    return (
        <>
            <Grid style={{ height: "85vh", width: "100%" }}>
                <Grid className="mt-3">
                    <TableContainer
                        component={Paper}
                        className="table-container"
                        sx={{
                            height: "89vh",
                            overflowY: "scroll",
                            overflowX: "hidden",
                            width: "auto !important",
                        }}
                    >
                        <Table className="center" aria-label="table with sticky header" stickyHeader>
                            <TableHead className="p-3 mb-2 row">
                                <TableRow>
                                    <StyledTableCell className="col-1 tableHeaderFont">Sr.No.</StyledTableCell>
                                    <StyledTableCell className="col-1 tableHeaderFont">Organisation Name</StyledTableCell>
                                    <StyledTableCell className="col-1 tableHeaderFont">Unit Name</StyledTableCell>
                                    <StyledTableCell className="col-1 tableHeaderFont">Unit Type</StyledTableCell>
                                    <StyledTableCell className="col-1 tableHeaderFont">Date</StyledTableCell>
                                    <StyledTableCell className="col-1 tableHeaderFont">Time</StyledTableCell>
                                    <StyledTableCell className="col-1 tableHeaderFont"></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state.allPendingRequest.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell className="tableContentFont">{index + 1}</StyledTableCell>
                                        <StyledTableCell className="tableContentFont">{row.organisation_name}</StyledTableCell>
                                        <StyledTableCell className="tableContentFont">{row.unit_name}</StyledTableCell>
                                        <StyledTableCell className="tableContentFont">{row.unit_type}</StyledTableCell>
                                        <StyledTableCell className="tableContentFont">
                                            {convertUTCDateToLocalDate(row.createdAt).split(",")[0]}
                                        </StyledTableCell>
                                        <StyledTableCell className="tableContentFont">
                                            {convertUTCDateToLocalDate(row.createdAt).split(",")[1]}
                                        </StyledTableCell>
                                        <StyledTableCell className="tableContentFont">
                                            <Button className="font-weight-bold" size="small" onClick={() => handleApproveOnClick(row)}>
                                                Approve
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
}
