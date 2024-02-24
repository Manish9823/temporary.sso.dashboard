import { Add } from "@mui/icons-material";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddTechSupportModal from "../../modal/AddTechSupportModal";
import styled from "@emotion/styled";
import axios from "axios";
import { setAllTechUsers } from "../../store/ssoSlice";

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

export default function AddTechSupport() {
    const state = useSelector(store => store.ssoStore);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [addTechSupportModel, setAddTechSupportModel] = useState(false);

    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        //fractionalSecondDigits: 0,
    });

    const getAllTechUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/techUsers/get-all-tech-user`);
            // console.log("hghghgg", response);
            dispatch(setAllTechUsers(response.data.data));
        } catch (error) {
            throw error;
        }
    };
    console.log("----------", state.allTechUsers);

    useEffect(() => {
        getAllTechUser();
    }, []);

    function convertUTCDateToLocalDate(date) {
        var newDate = new Date(date);

        return formatter.format(newDate);
    }

    const onCloseTechUserCreationModal = () => {
        setAddTechSupportModel(false);
    };
    const handleOnClick = () => {
        setAddTechSupportModel(true);
        // navigate("/login");
    };

    const onCreateTechUser = async createTechSupport => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/techUsers/create-tech-user`, { ...createTechSupport });
            if (response.status === 200) {
                setAddTechSupportModel(false);
            }
            getAllTechUser();
        } catch (error) {
            alert("error");
        }
    };

    return (
        <>
            <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                <Button variant="contained" className="add-button mt-2 mr-2" onClick={() => handleOnClick()}>
                    <Add />
                    Add Tech Support User
                </Button>
            </div>
            <Grid style={{ height: "85%", width: "100%" }}>
                <Grid sx={{ width: "100%", display: "flex", justifyContent: "end" }}></Grid>

                <Grid className="mt-3">
                    <TableContainer component={Paper} className="table-container table-container-css">
                        <Table className="center" aria-label="table with sticky header" stickyHeader>
                            <TableHead className="p-3 mb-2 row">
                                <TableRow>
                                    <StyledTableCell className="col-1 tableHeaderFont">Sr.No.</StyledTableCell>
                                    <StyledTableCell className="col-1 tableHeaderFont">Tech Support User</StyledTableCell>

                                    <StyledTableCell className="col-1 tableHeaderFont">Date</StyledTableCell>
                                    <StyledTableCell className="col-1 tableHeaderFont">Time</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state.allTechUsers.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell className="tableContentFont">{index + 1}</StyledTableCell>
                                        <StyledTableCell className="tableContentFont">{row.email}</StyledTableCell>

                                        <StyledTableCell className="tableContentFont">
                                            {convertUTCDateToLocalDate(row.createdAt).split(",")[0]}
                                        </StyledTableCell>

                                        <StyledTableCell className="tableContentFont">
                                            {convertUTCDateToLocalDate(row.createdAt).split(",")[1]}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {addTechSupportModel && (
                    <AddTechSupportModal open={addTechSupportModel} handleClose={onCloseTechUserCreationModal} onCreateTechUser={onCreateTechUser} />
                )}
            </Grid>
        </>
    );
}
