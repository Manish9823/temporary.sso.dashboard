import styled from "@emotion/styled";
import { Add, RemoveRedEye } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    tableCellClasses,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddOrgUsersModal from "../../modal/AddOrgUsersModal";
// import { setAllOrgUsers, setAllTechUsers } from "../../store/ssoSlice";
import { showSnackbar } from "../../store/snackbarSlice";
import { setAllOrgUsers } from "../../store/ssoSlice";
import axiosInstance from "../../utils/axiosInstance";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontSize: 16,
        fontWeight: 600,
        backgroundColor: theme.palette.primary.light,
        color: "#fff",
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

export default function AddOrgUsers() {
    const state = useSelector(store => store.ssoStore);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [addOrgUsersModal, setAddOrgUsersModal] = useState(false);
    const [viewTechUsersModal, setViewTechUsersModal] = useState(false);
    const snackbarStore = useSelector(store => store.snackBarStore);
    const theme = useTheme();

    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        //fractionalSecondDigits: 0,
    });

    const getAllOrganizationUsers = async userId => {
        try {
            const response = await axiosInstance.get(`/users/org`);
            // dispatch(setAllOrgUsers(response.data.data));
            console.log("response===>", response);
            dispatch(setAllOrgUsers(response.data.data));
        } catch (error) {
            throw error;
        }
    };

    function convertUTCDateToLocalDate(date) {
        var newDate = new Date(date);
        return formatter.format(newDate);
    }

    const onCloseOrgCreationModal = () => {
        setAddOrgUsersModal(false);
    };
    const handleOnClick = () => {
        setAddOrgUsersModal(true);
    };

    const createOrganizationUser = async createOrgUser => {
        // debugger;
        try {
            const response = await axiosInstance.post("/users/createUser", createOrgUser);
            console.log(response);
            if (response.status === 200) {
                onCloseOrgCreationModal();
                getAllOrganizationUsers();
                dispatch(
                    showSnackbar({
                        open: true,
                        severity: "success",
                        message: "Organization User Created!!",
                    }),
                );
            }
        } catch (error) {
            alert("error");
        }
    };

    useEffect(() => {
        getAllOrganizationUsers();
    }, []);

    return (
        <Grid pl={1}>
            <Grid display={"flex"} justifyContent={"space-between"}>
                <Grid>
                    <Typography fontSize={"2rem"} color="primary">
                        Organization Users
                    </Typography>
                </Grid>
                <Grid display={"flex"} gap={2}>
                    <Button variant="contained" onClick={() => handleOnClick()}>
                        <Add />
                        &nbsp; Add Organisation User
                    </Button>
                    <Button variant="contained" onClick={() => setViewTechUsersModal(true)}>
                        <RemoveRedEye />
                        &nbsp; View tech user
                    </Button>
                </Grid>
            </Grid>

            <Grid style={{ width: "100%" }} mt={3}>
                <TableContainer component={Paper} className="table-container table-container-css">
                    <Table className="center" aria-label="table with sticky header" stickyHeader>
                        <TableHead className="p-3 mb-2 row">
                            <TableRow>
                                <StyledTableCell className="col-1 tableHeaderFont">Sr.No.</StyledTableCell>
                                <StyledTableCell className="col-1 tableHeaderFont">Organisation Users</StyledTableCell>

                                <StyledTableCell className="col-1 tableHeaderFont">Date</StyledTableCell>
                                <StyledTableCell className="col-1 tableHeaderFont">Time</StyledTableCell>
                                {/* <StyledTableCell className="col-1 tableHeaderFont"></StyledTableCell>
                  <StyledTableCell className="col-1 tableHeaderFont"></StyledTableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.allOrganisationUsers.map((row, index) => (
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

                {addOrgUsersModal && (
                    <AddOrgUsersModal open={addOrgUsersModal} handleClose={onCloseOrgCreationModal} createOrganizationUser={createOrganizationUser} />
                )}
                {viewTechUsersModal && (
                    <ViewTechUserComponent
                        open={viewTechUsersModal}
                        handleClose={() => {
                            setViewTechUsersModal(false);
                        }}
                    />
                )}
            </Grid>
        </Grid>
    );
}

const ViewTechUserComponent = ({ handleClose, open }) => {
    const orgDetails = useSelector(store => store.ssoStore.orgDetails);
    const theme = useTheme();
    return (
        <Dialog open={open} PaperProps={{ style: { width: "30%" } }}>
            <DialogTitle
                variant={5}
                className="text-center"
                style={{
                    fontSize: "1.8rem",
                    color: theme.palette.primary.main,
                }}
            >
                Tech Support User
            </DialogTitle>

            <DialogContent>
                <TableContainer
                    component={Paper}
                    className="table-container"
                    sx={{
                        overflowY: "scroll",
                        overflowX: "hidden",
                        width: "auto !important",
                    }}
                >
                    <Table className="center" aria-label="table with sticky header" stickyHeader>
                        <TableHead className="p-3 mb-2 row">
                            <TableRow>
                                <StyledTableCell className="col-1 tableHeaderFont">Sr.No.</StyledTableCell>
                                <StyledTableCell className="col-1 tableHeaderFont">Email</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orgDetails &&
                                orgDetails.linked_tech_support_users &&
                                Object.keys(orgDetails.linked_tech_support_users).map((key, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell className="tableContentFont">{index + 1}</StyledTableCell>
                                        <StyledTableCell className="tableContentFont">{orgDetails.linked_tech_support_users[key]}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} size="small">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
