import { InsertLink, Key } from "@mui/icons-material";
import { Button, Chip, CircularProgress, Grid, Stack, Typography, styled, useTheme } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinkOrgUsers from "../../modal/LinkOrgUserModal";
import LinkTechSupportUser from "../../modal/LinkTechSupportUser";
import ViewAppsModal from "../../modal/ViewAppsModal";
import { setPyramidData } from "../../store/ssoSlice";
import { UserType } from "../../utils/accessControl";
import axiosInstance from "../../utils/axiosInstance";

const Accordion = styled(props => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
}));

const AccordionSummary = styled(props => <MuiAccordionSummary {...props} />)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
        padding: theme.spacing(0),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const TreeNode = ({ node, index, getPyramidData, userType }) => {
    const [expanded, setExpanded] = React.useState("panel1");

    const [viewApps, setViewApps] = useState(false);
    const [linkTechSupport, setLinkTechSupport] = useState(false);
    const [linkOrgUser, setLinkOrgUser] = useState(false);
    const theme = useTheme();

    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div style={{ paddingBottom: "10px" }}>
            <div>
                <Accordion onChange={handleChange("panel1")} style={{ border: `1px solid ${theme.palette.primary.main}`, paddingLeft: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        {/* <div
              className="mt-2"
              style={{
                width: "50px",
                height: "100%",
                justifyContent: "center",
                textAlign: "center",
                verticalAlign: "center",
                alignItems: "center",
              }}
            > */}
                        {/* </div> */}
                        <div style={{ flex: 1 }}>
                            {/* {index + 1} */}
                            <AccordionSummary
                                expanded
                                aria-controls="panel1d-content"
                                id="panel1d-header"
                                sx={{ width: "100%", backgroundColor: "white" }}
                                className="p-0 pt-0 pb-0"
                            >
                                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center !important" }}>
                                    <Typography sx={{ display: "flex", width: "100%" }}>
                                        <Stack direction="row" spacing={1} style={{ justifyContent: "center" }}>
                                            {node.organization_name ? (
                                                <Chip className="pl-1 pr-1" variant="outlined" color="primary" label={"Organization"} />
                                            ) : (
                                                <Chip
                                                    className="pl-1 pr-1"
                                                    variant="outlined"
                                                    color={"primary"}
                                                    label={node.unit_type === "MONITORING_UNIT" ? "Monitoring Unit" : "Consumer Unit"}
                                                />
                                            )}
                                            {node.organization_name ? (
                                                <div style={{ fontWeight: "bold", fontSize: "16px", padding: "4px" }}> {node.organization_name} </div>
                                            ) : (
                                                <div style={{ fontWeight: "bold", fontSize: "16px", padding: "4px" }}> {node.unit_name} </div>
                                            )}
                                        </Stack>
                                    </Typography>
                                </div>
                            </AccordionSummary>
                        </div>

                        <Grid display={"flex"} gap={2} mx={1} alignItems={"center"}>
                            {node.unit_type === "CONSUMER_UNIT" && (
                                <>
                                    <div>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            style={{ alignItems: "center", width: "200px", height: "65%" }}
                                            className="font-weight-bold"
                                            onClick={() => {
                                                setViewApps(true);
                                            }}
                                        >
                                            <Key fontSize="small" />
                                            &nbsp; Apps Permissions
                                        </Button>
                                    </div>
                                    {userType === UserType.ORG_ADMIN && (
                                        <Button
                                            size="small"
                                            variant="contained"
                                            style={{ alignItems: "center", width: "300px", height: "65%" }}
                                            className="font-weight-bold"
                                            onClick={() => {
                                                setLinkTechSupport(true);
                                            }}
                                        >
                                            <InsertLink fontSize="small" />
                                            &nbsp; Link Tech Support Users
                                        </Button>
                                    )}
                                </>
                            )}

                            {userType === UserType.ORG_ADMIN && node.unit_type && (
                                <Button
                                    size="small"
                                    style={{ alignItems: "center", width: "200px", height: "65%" }}
                                    variant="contained"
                                    className="font-weight-bold"
                                    onClick={() => {
                                        setLinkOrgUser(true);
                                    }}
                                >
                                    <InsertLink fontSize="small" />
                                    &nbsp; Link Org Users
                                </Button>
                            )}
                        </Grid>

                        {/* <div
              style={{
                width: "4%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setTechSupportList(true);
              }}
              >
              <Tooltip title="View Tech Users">
              <RecentActors className="mr-2" fontSize="small" />
              </Tooltip>
            </div> */}
                    </div>

                    <AccordionDetails>
                        {node.data.map((child, index) => (
                            <TreeNode
                                key={`${node && node._id}_${index}`}
                                node={child}
                                index={index}
                                getPyramidData={getPyramidData}
                                userType={userType}
                            />
                        ))}
                    </AccordionDetails>
                </Accordion>
            </div>
            {viewApps && <ViewAppsModal setViewApps={setViewApps} node={node} getPyramidData={getPyramidData} userType={userType} />}
            {userType === UserType.ORG_ADMIN && (
                <>
                    {linkTechSupport && <LinkTechSupportUser setLinkTechSupport={setLinkTechSupport} node={node} getPyramidData={getPyramidData} />}
                    {linkOrgUser && <LinkOrgUsers setLinkOrgSupport={setLinkOrgUser} node={node} getPyramidData={getPyramidData} />}
                </>
            )}
            {/* {techSupportList && <ViewTechUserModal setTechSupportList={setTechSupportList} node={node} handleClose={handleOnClose} />} */}
        </div>
    );
};
export default function Pyramid() {
    const state = useSelector(store => store.ssoStore);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const getAllData = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/pyramid/data`);
            dispatch(setPyramidData(response.data.data));
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getAllData();
    }, []);

    return (
        // <React.Fragment>
        //     {loading === true ? (
        //         <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
        //             <CircularProgress />
        //         </Grid>
        //     ) : (
        <Grid pl={1}>
            <Grid>
                <Typography fontSize={"2rem"} color={"primary"} style={{ marginTop: "5px", marginBottom: "20px" }}>
                    Pyramid
                </Typography>
            </Grid>
            <Grid>
                {state.pyramidData.length > 0 &&
                    state.pyramidData.map((child, index) => (
                        <TreeNode
                            node={child}
                            index={index}
                            getPyramidData={getAllData}
                            userType={state.loginData ? (state.loginData.user_type ? state.loginData.user_type : "") : ""}
                        />
                    ))}
            </Grid>
        </Grid>
        //     )}
        // </React.Fragment>
    );
}
