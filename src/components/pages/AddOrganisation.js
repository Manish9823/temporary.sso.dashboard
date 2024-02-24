import { Add } from "@mui/icons-material";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddOrganisationModal from "../../modal/AddOrganisationModal";
import styled from "@emotion/styled";
import axios from "axios";
import { setAllOrganisation } from "../../store/ssoSlice";

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

export default function AddOrganisation() {
    const state = useSelector(store => store.ssoStore);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [orgAdminData , setOrgAdminData] = useState();
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

    const [addOrgModal, setAddOrgModal] = useState(false);

    const onCloseOrgCreationModal = () => {
        setAddOrgModal(false);
    };

    const getAllOrg = async () => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/apps/get-org-admin`, {
            registry_admin_id: sessionStorage.getItem("email"),
        });
        dispatch(setAllOrganisation(response.data.data));
    };

    // useEffect(() => {
    //     getAllOrg();
    // }, []);
    // console.log(state.loginData.email);
    const handleOnClick = () => {
        setAddOrgModal(true);
        // navigate("/login");
    };

    const onCreateOrganisation = async createOrgDetails => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/org/create-org-admin`, { ...createOrgDetails });
            if (response.status === 200) {
                onCloseOrgCreationModal();
                getAllOrg();
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <Grid sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
                <Button variant="contained" className="add-button mt-2 mr-2" onClick={() => handleOnClick()}>
                    <Add />
                    Add New Organisation
                </Button>
            </Grid>
            {/* <Grid style={{ height: "85%", width: "100%" }}> */}
            <Grid style={{ width: "100%" }}>
                <TableContainer component={Paper} className="table-container table-container-css">
                    <Table className="center" aria-label="table with sticky header" stickyHeader>
                        <TableHead className="p-3 mb-2 row">
                            <TableRow>
                                <StyledTableCell className="col-1 tableHeaderFont">Sr.No.</StyledTableCell>
                                <StyledTableCell className="col-1 tableHeaderFont">Organisation Name</StyledTableCell>

                                <StyledTableCell className="col-1 tableHeaderFont">Date</StyledTableCell>
                                <StyledTableCell className="col-1 tableHeaderFont">Time</StyledTableCell>
                                <StyledTableCell className="col-1 tableHeaderFont"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.allOrganisation.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell className="tableContentFont">{index + 1}</StyledTableCell>
                                    <StyledTableCell className="tableContentFont">{row.organisation_name}</StyledTableCell>

                                    <StyledTableCell className="tableContentFont">
                                        {convertUTCDateToLocalDate(row.createdAt).split(",")[0]}
                                    </StyledTableCell>

                                    <StyledTableCell className="tableContentFont">
                                        {convertUTCDateToLocalDate(row.createdAt).split(",")[1]}
                                    </StyledTableCell>
                                    <StyledTableCell className="tableContentFont">Created</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            {addOrgModal && (
                <AddOrganisationModal open={addOrgModal} handleClose={onCloseOrgCreationModal} onCreateOrganisation={onCreateOrganisation} />
            )}
            {/* </Grid> */}
        </>
    );
}
