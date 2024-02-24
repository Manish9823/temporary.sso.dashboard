import { Close } from "@mui/icons-material";
import {
    Box,
    Button,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { appConfig } from "../../config";
import { UnitType, UserType } from "../../utils/accessControl";
import { appServerPortNumberMapping } from "../../utils/localSetup";

export default function AppList() {
    const state = useSelector(store => store.ssoStore);
    const [viewApp, setViewApp] = useState(false);
    const [appData, setAppData] = useState(null);
    const theme = useTheme();

    const handleAppClickEvent = item => {
        if (!state.loginData.user_type) {
            return;
        }
        switch (state.loginData.user_type) {
            case UserType.ORG_ADMIN: {
                setAppData(item);
                setViewApp(true);
                break;
            }
            case UserType.ORG_USER: {
                if (state.loginData.unit_type === UnitType.CONSUMER_UNIT) {
                    redirectToAppService(item);
                } else {
                    setAppData(item);
                    setViewApp(true);
                }
                break;
            }
            case UserType.TECH_SUPPORT_USER: {
                redirectToAppService(item);
                break;
            }
            default: {
                break;
            }
        }
    };

    const redirectToAppService = item => {
        
        if (!item.app_subdomain) {
            console.log("Invalid Sub Domain.");
            return null;
        }

        let protocol = "https";
        let portNumber = null;
        let appUrl = `${protocol}://${item.app_subdomain}.${appConfig.REACT_APP_BASE_DOMAIN_URL}`;
        if (window.location.protocol === "http:") {
            const localAppServerData = appServerPortNumberMapping(item.app_subdomain);
            if (localAppServerData) {
                protocol = "http";
                portNumber = `:${localAppServerData.PORT}`;
                appUrl = `${protocol}://${item.app_subdomain}.${appConfig.REACT_APP_BASE_DOMAIN_URL}${portNumber}`;
            }
        }
        window.open(appUrl, "_blank");
    };

    // const getApps = async () => {
    //     try {
    //         const response = await axiosInstance.get("/apps/get-org");
    //         if (response && response.data && response.data.app_list) {
    //             dispatch(setAppList(response.data.app_list));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        // getApps();
    }, []);

    return (
        <Grid pl={1}>
            <Box sx={{ width: "100%" }}>
                <Grid>
                    <Grid style={{ color: theme.palette.primary.main, fontSize: "2rem", marginBottom: "20px" }}>Apps</Grid>
                </Grid>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth className="text-center">
                        <Grid display={"flex"} gap={2} container flex={1}>
                            {state.orgDetails.app_list &&
                                state.orgDetails.app_list.length > 0 &&
                                state.orgDetails.app_list.map((item, key) => (
                                    // if (item && (!item.essential || item.essential === false)) {
                                    <Grid
                                        className="hoverCss"
                                        item
                                        md={2}
                                        display={"flex"}
                                        flexDirection={"column"}
                                        sx={{
                                            padding: 2,
                                            backgroundColor: "white",
                                            borderRadius: "8px",
                                            height: "120px",
                                            padding: 2,
                                            cursor: "pointer",
                                            border: "1px solid #706bf9",
                                            height: "120px",
                                        }}
                                        onClick={() => {
                                            handleAppClickEvent(item);
                                        }}
                                    >
                                        <Grid
                                            item
                                            style={{
                                                height: "auto",
                                                display: "flex",
                                                justifyContent: "start",
                                                width: "100%",
                                            }}
                                        >
                                            {/* <item.icon className='icon' />/ */}

                                            {/* <img src={item.icon} style={{ height: "70px", width: "70px" }} /> */}
                                            <Grid
                                                item
                                                style={{
                                                    fontSize: "1px",
                                                    display: "flex",
                                                    justifyContent: "end",
                                                    width: "100%",
                                                }}
                                            >
                                                {/* {item.status ? "..." + item.status : " "} */}
                                                {item.status === "INSTALLED" && (
                                                    <Chip label={item.status} color="success" size="small" sx={{ fontSize: "10px" }} />
                                                )}
                                                {item.status === "COMING SOON" && (
                                                    <Chip
                                                        label={item.status}
                                                        size="small"
                                                        sx={{ fontSize: "10px" }}
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                                )}
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            item
                                            style={{
                                                fontSize: "18px",
                                                fontWeight: "500",
                                                height: "100%",
                                                display: "flex",
                                                justifyContent: "start",
                                                // alignItems: 'center',
                                                color: theme.palette.primary.main,
                                            }}
                                        >
                                            {item.app_name}
                                        </Grid>
                                        <Grid>
                                            <Typography sx={{ color: "grey", fontSize: "15px" }}>{item.description}</Typography>
                                            <Typography sx={{ color: "grey", fontSize: "15px" }}></Typography>
                                        </Grid>
                                    </Grid>
                                    // }
                                ))}
                        </Grid>
                    </FormControl>
                </Box>
            </Box>
            {viewApp && (
                <ReadOnlyAppView
                    appData={appData}
                    setViewApps={() => {
                        setViewApp(false);
                        setAppData(null);
                    }}
                />
            )}
        </Grid>
    );
}

const ReadOnlyAppView = ({ appData, setViewApps }) => {
    const theme = useTheme();
    return (
        <Dialog open={true} fullWidth maxWidth="xl">
            <Grid style={{ height: "90vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography fontSize={"1.8rem"} color={"primary"}>
                        Apps Permissions
                    </Typography>
                    <IconButton
                        variant="secondary"
                        onClick={() => {
                            setViewApps(false);
                        }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{ flex: 1, overflow: "auto" }}>
                    <Grid container justifyContent={"space-around"} mt={1}>
                        <Grid item md={5.8} border={1} borderColor={theme.palette.primary.main} p={1}>
                            <Typography fontWeight={"500"} textAlign={"start"} color={"primary"} fontSize={"1.2rem"}>
                                For this CU
                            </Typography>
                            <Divider />
                            <Grid container mt={1} justifyContent={"space-between"}>
                                <Grid item md={7}>
                                    <Typography> Modules</Typography>
                                    {appData &&
                                        appData.modules &&
                                        appData.modules.map((item, index) => (
                                            <Grid key={`${item._id}-${index}-cu`} display={"flex"} alignItems={"center"} gap={3}>
                                                <Typography variant="body1">{item.name}</Typography>
                                                <FormGroup row sx={{ gap: "10px" }}>
                                                    <FormControlLabel
                                                        title="Read"
                                                        sx={{ margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        checked={item.moduleForCU ? (item.moduleForCU.read ? item.moduleForCU.read : false) : false}
                                                        label={"R"}
                                                        disabled={true}
                                                    />
                                                    <FormControlLabel
                                                        title="Write"
                                                        sx={{ margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        checked={item.moduleForCU ? (item.moduleForCU.write ? item.moduleForCU.write : false) : false}
                                                        label={"W"}
                                                        disabled={true}
                                                    />
                                                    <FormControlLabel
                                                        title="Update"
                                                        sx={{ margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        checked={
                                                            item.moduleForCU ? (item.moduleForCU.update ? item.moduleForCU.update : false) : false
                                                        }
                                                        label={"U"}
                                                        disabled={true}
                                                    />
                                                    <FormControlLabel
                                                        title="Delete"
                                                        sx={{ margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        checked={
                                                            item.moduleForCU ? (item.moduleForCU.delete ? item.moduleForCU.delete : false) : false
                                                        }
                                                        label={"D"}
                                                        disabled={true}
                                                    />
                                                </FormGroup>
                                            </Grid>
                                        ))}
                                </Grid>
                                <Grid item md={5}>
                                    <Typography> Features</Typography>
                                    {appData &&
                                        appData.features &&
                                        appData.features.map((item, index) => (
                                            <Grid key={`${item._id}-${index}-cu`} display={"flex"} alignItems={"center"} gap={3}>
                                                <Typography variant="body1">{item.name}</Typography>
                                                <RadioGroup
                                                    row
                                                    value={item.featureForCU ? (item.featureForCU.active ? item.featureForCU.active : false) : false}
                                                    sx={{ gap: "10px" }}
                                                >
                                                    <FormControlLabel
                                                        disabled={true}
                                                        sx={{ margin: 0 }}
                                                        value={true}
                                                        control={<Radio size="small" />}
                                                        label="On"
                                                    />
                                                    <FormControlLabel
                                                        disabled={true}
                                                        sx={{ margin: 0 }}
                                                        value={false}
                                                        control={<Radio size="small" />}
                                                        label="Off"
                                                    />
                                                </RadioGroup>
                                            </Grid>
                                        ))}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={5.8} border={1} borderColor={theme.palette.primary.main} p={1}>
                            <Typography fontWeight={"500"} textAlign={"start"} color={"primary"} fontSize={"1.2rem"}>
                                For MU of this CU
                            </Typography>
                            <Divider />
                            <Grid container mt={1} justifyContent={"space-around"}>
                                <Grid item md={7}>
                                    <Typography> Modules</Typography>
                                    {appData &&
                                        appData.modules &&
                                        appData.modules.map((item, index) => (
                                            <Grid key={`${item._id}-${index}-mu`} display={"flex"} alignItems={"center"} gap={3}>
                                                <Typography variant="body1">{item.name}</Typography>
                                                <FormGroup row sx={{ gap: "10px" }}>
                                                    <FormControlLabel
                                                        title="Read"
                                                        sx={{ margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        checked={item.moduleForMU ? (item.moduleForMU.read ? item.moduleForMU.read : false) : false}
                                                        label={"R"}
                                                        disabled={true}
                                                    />
                                                    <FormControlLabel
                                                        title="Write"
                                                        sx={{ margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        checked={item.moduleForMU ? (item.moduleForMU.write ? item.moduleForMU.write : false) : false}
                                                        label={"W"}
                                                        disabled={true}
                                                    />
                                                    <FormControlLabel
                                                        title="Update"
                                                        sx={{ margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        checked={
                                                            item.moduleForMU ? (item.moduleForMU.update ? item.moduleForMU.update : false) : false
                                                        }
                                                        label={"U"}
                                                        disabled={true}
                                                    />
                                                    <FormControlLabel
                                                        title="Delete"
                                                        sx={{ margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        checked={
                                                            item.moduleForMU ? (item.moduleForMU.delete ? item.moduleForMU.delete : false) : false
                                                        }
                                                        label={"D"}
                                                        disabled={true}
                                                    />
                                                </FormGroup>
                                            </Grid>
                                        ))}
                                </Grid>
                                <Grid item md={5}>
                                    <Typography> Features</Typography>
                                    {appData &&
                                        appData.features &&
                                        appData.features.map((item, index) => (
                                            <Grid key={`${item._id}-${index}-mu`} display={"flex"} alignItems={"center"} gap={2}>
                                                <Typography variant="body1">{item.name}</Typography>
                                                <RadioGroup
                                                    row
                                                    value={item.featureForMU ? (item.featureForMU.active ? item.featureForMU.active : false) : false}
                                                    sx={{ gap: "10px" }}
                                                >
                                                    <FormControlLabel
                                                        disabled={true}
                                                        sx={{ margin: 0 }}
                                                        value={true}
                                                        control={<Radio size="small" />}
                                                        label="On"
                                                    />
                                                    <FormControlLabel
                                                        disabled={true}
                                                        sx={{ margin: 0 }}
                                                        value={false}
                                                        control={<Radio size="small" />}
                                                        label="Off"
                                                    />
                                                </RadioGroup>
                                            </Grid>
                                        ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ padding: "20px" }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setViewApps(false);
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Grid>
        </Dialog>
    );
};
