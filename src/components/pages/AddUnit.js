import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    makeStyles,
    styled,
    tableCellClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllMusOfOrg } from "../../store/ssoSlice";
import axiosInstance from "../../utils/axiosInstance";
import { useTheme } from "@emotion/react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontSize: 16,
        fontWeight: 600,
        backgroundColor: theme.palette.primary.light,
          color: theme.palette.common.white,
        padding: "10px !important",
        width: "20vw",
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
export default function AddUnit() {
    const state = useSelector(store => store.ssoStore);
    const dispatch = useDispatch();
    const [domain, setDomain] = useState("");
    const [selectedOrganization, setSelectedOrganization] = useState({ id: "", name: "" });
    const [selectedMU, setSelectedMU] = useState({ id: "", name: "" });
    const theme = useTheme();

    const [unitDetails, setunitDetails] = useState({
        unit_name: "",
        org_id: "",
        monitoringUnitId: "",
        consumerUnitId: "",
        unit_type: "MONITORING UNIT",
        status: "active",
    });

    const getAllMU = async () => {
        const response = await axiosInstance.get(`/unit/get-mu-by-org-id`);
        console.log(response, "----------");
        dispatch(setAllMusOfOrg(response.data));
    };

    const handleOnClick = async () => {
        try {
            const response = await axiosInstance.post("/unit/create-mu", { ...unitDetails });
            if (response.data === 200) {
                alert("Unit created successfully!");
            }
            setunitDetails({
                unit_name: "",
                org_id: "",
                monitoringUnitId: "",
                consumerUnitId: "",
                unit_type: "MONITORING UNIT",
                status: "active",
            });
            setSelectedOrganization({ id: "", name: "" });
            setSelectedMU({ id: "", name: "" });
        } catch (error) {}
    };

    //   const handleOrgChange = async (event) => {
    //     const value = event.target.value;
    //     const orgDetails = state.orgAdmin.find((org) => org._id === value);
    //     if (orgDetails) {
    //       setunitDetails({ ...unitDetails, org_id: value });
    //       setSelectedOrganization({ id: value, name: orgDetails.organization_name });

    //       try {
    //         const response = await axiosInstance.post(`/unit/get-mu-by-parent_id`, { unit_type: "MONITORING_UNIT", org_id: value });
    //         dispatch(setAllMusOfOrg(response.data.data));
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    //   };

    const handleChangeParentMu = event => {
        // const value = event.target.value;
        const value = event.target.value;
        const selectedMU = state.allMUsOfOrg.find(unit => unit._id === value);
        if (selectedMU) {
            setunitDetails({ ...unitDetails, monitoringUnitId: event.target.value });
            setSelectedMU({ id: value, name: selectedMU.unit_name });
        }
    };

    const handleUnitName = event => {
        const value = event.target.value;
        setunitDetails({ ...unitDetails, unit_name: value });
    };

    const handleUnitType = event => {
        const value = event.target.value;
        setunitDetails({ ...unitDetails, unit_type: value });
    };

    useEffect(() => {
        getAllMU();
        // getApps();
    }, [unitDetails.monitoringUnitId]);

    console.log(unitDetails);
    return (
        <Grid pl={1}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "start",
                    textAlign: "center",
                    alignContent: "center",
                    fontSize: "2rem",
                    color: theme.palette.primary.main,
                    marginBottom:"20px"
                }}
            >
                New Unit
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "70vh",
                    backgroundColor: "#F6F8FA",
                }}
            >
                <div style={{ width: "40%", fontWeight: "bold" }} className="add-css ml-2">
                    <Grid>
                        {" "}
                        <Grid mt={3} sx={{ display: "flex ", justifyContent: "center" }}>
                            <TextField
                                style={{ width: "100%", backgroundColor: "white" }}
                                size="small"
                                label="Enter Unit Name"
                                value={unitDetails.unit_name}
                                name="unit_name"
                                type="email"
                                onChange={handleUnitName}
                            ></TextField>
                        </Grid>
                        <Grid mt={3} sx={{ display: "flex ", justifyContent: "center", width: "100%", backgroundColor: "white" }}>
                            <TextField fullWidth size="small" label="Unit Type" value="MONITORING UNIT" />
                        </Grid>
                        {/* <Grid mt={3} sx={{ display: "flex ", justifyContent: "center" }}>
              <FormControl style={{ width: "100%", backgroundColor: "white" }}>
                <InputLabel sx={{ textAlign: "center" }} id="demo-select-small-label">
                  Select Organisation Name
                </InputLabel>

                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  size="small"
                  //   label="Enter Parent Name"
                  // defaultValue={selectedOrganization.name ? selectedOrganization.name : ""}
                  value={selectedOrganization.id}
                  label="Select Organisation Name"
                  name="orgNameForMU"
                  //   onChange={handleOrgChange}
                >
                  {state.orgAdmin.length > 0 &&
                    state.orgAdmin.map((event, index) => (
                      <MenuItem key={index} value={event._id}>
                        {event.organization_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid> */}
                        <Grid mt={3} sx={{ display: "flex ", justifyContent: "center" }}>
                            <FormControl fullWidth style={{ backgroundColor: "white" }} size="small">
                                <InputLabel  id="demo-select-small-label">
                                    Select MU Name
                                </InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    // label="Enter Parent Name"
                                    value={selectedMU.id}
                                    label="Enter MU Name"
                                    // name="parent_id"
                                    onChange={handleChangeParentMu}
                                >
                                    {state.allMUsOfOrg.length > 0 &&
                                        state.allMUsOfOrg.map((event, index) => (
                                            <MenuItem key={index} value={event._id}>
                                                {event.unit_name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid
                        sx={{
                            justifyContent: "start",
                            alignContent: "center",
                            textAlign: "center",
                            backgroundColor: "#F6F8FA",
                        }}
                    >
                        <Button variant="contained" className="mt-3 mb-2" onClick={handleOnClick}>
                            create
                        </Button>
                    </Grid>
                </div>
                <div style={{ width: "60%" }} className="mr-2">
                    <Grid
                        mt={2}
                        sx={{
                            display: "flex ",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <TableContainer
                            component={Paper}
                            className="table-container"
                            sx={{
                                height: "420px",
                                overflowY: "scroll",
                                overflowX: "hidden",
                                width: "auto !important",
                            }}
                        >
                            <Table className="center" aria-label="table with sticky header" stickyHeader>
                                <TableHead className="p-3 mb-2 row">
                                    <TableRow>
                                        <StyledTableCell className="col-1 tableHeaderFont">Apps</StyledTableCell>
                                        <StyledTableCell className="col-1 tableHeaderFont">Sub Domain</StyledTableCell>
                                        {/* <StyledTableCell className="col-1 tableHeaderFont">Domain</StyledTableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {state.orgDetails.app_list &&
                                        state.orgDetails.app_list.length > 0 &&
                                        state.orgDetails.app_list.map((app, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell className="tableContentFont">{app.app_name}</StyledTableCell>

                                                <StyledTableCell className="tableContentFont">
                                                    {app.app_subdomain}.{state.orgDetails.domainName}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </div>
            </div>
        </Grid>
    );
}
