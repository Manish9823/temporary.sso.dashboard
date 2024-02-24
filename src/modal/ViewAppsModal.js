import {
    Checkbox,
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
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Typography,
    useTheme,
} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import { useState } from "react";
import { Close, Save } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../store/snackbarSlice";
import { UserType } from "../utils/accessControl";
import axiosInstance from "../utils/axiosInstance";

export default function ViewAppsModal({ setViewApps, node, getPyramidData, userType }) {
    const [appData, setAppData] = useState(null);
    const [updatedAppList, setUpdatedAppList] = useState(node.linked_apps);
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleOnClick = app_id => {
        const selectedApp = updatedAppList.find(app => app._id === app_id);
        setAppData(selectedApp);
    };

    const onHandleForModuleCheck = (e, moduleId, moduleFor = "moduleForCU", activeFor = "read") => {
        if (userType !== UserType.ORG_ADMIN) {
            return null;
        }

        const newModulesArray = appData.modules.map(module => {
            if (module.id === moduleId) {
                if (module.hasOwnProperty(`${moduleFor}`)) {
                    return {
                        ...module,
                        [`${moduleFor}`]: { ...module[`${moduleFor}`], [`${activeFor}`]: e.target.checked },
                    };
                } else {
                    return {
                        ...module,
                        [`${moduleFor}`]: { [`${activeFor}`]: e.target.checked },
                    };
                }
            }
            return module;
        });
        const appToUpdate = {
            ...appData,
            modules: newModulesArray,
        };
        setAppData(appToUpdate);
        const newUpdatedAppList = updatedAppList.map(app => {
            if (app._id === appData._id) {
                return appToUpdate;
            }
            return app;
        });
        setUpdatedAppList(newUpdatedAppList);
    };

    const onHandleForFeatureCheck = (e, featureId, featureFor = "featureForCU") => {
        if (userType !== UserType.ORG_ADMIN) {
            return null;
        }

        const newFeaturesArray = appData.features.map(feature => {
            if (feature.id === featureId) {
                return {
                    ...feature,
                    [`${featureFor}`]: { 'active': e.target.value },
                };
            }
            return feature;
        });
        const appToUpdate = {
            ...appData,
            features: newFeaturesArray,
        };
        setAppData(appToUpdate);
        const newUpdatedAppList = updatedAppList.map(app => {
            if (app._id === appData._id) {
                return appToUpdate;
            }
            return app;
        });
        setUpdatedAppList(newUpdatedAppList);
    };

    const updateAppListInBackend = async () => {
        const payloadData = {
            unit_id: node._id,
            fieldsToUpdate: {
                linked_apps: updatedAppList,
            },
        };
        try {
            const response = await axiosInstance.post("/pyramid/update-unit", { ...payloadData });
            if (response.status === 200) {
                await getPyramidData();
                setViewApps(false);
                dispatch(
                    showSnackbar({
                        open: true,
                        severity: "success",
                        message: "Changes Saved!!",
                    }),
                );
            } else {
                alert("Failed to save data.");
            }
        } catch (error) {
            console.log(error);
            setViewApps(false);
        }
    };

    return (
        <Dialog open={true} fullWidth maxWidth="xl">
            <Grid style={{ height: "90vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography color={"primary"} fontWeight={"500"} fontSize={"1.8rem"}>
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
                    <Grid container justifyContent={"space-between"}>
                        <Grid item md={1.7} display={"flex"} flexDirection={"column"} gap={3} mt={1}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select App</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={appData && appData._id}
                                    label="Select App"
                                    onChange={event => {
                                        handleOnClick(event.target.value);
                                    }}
                                >
                                    {node &&
                                        node.linked_apps &&
                                        node.linked_apps.map((app, index) => {
                                            // if (app && (!app.essential || app.essential === false))
                                                return (
                                                    <MenuItem key={`${app._id}`} value={app._id}>
                                                        {app.app_name}
                                                    </MenuItem>
                                                );
                                        })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={5} border={1} borderColor={theme.palette.primary.main} p={1}>
                            <Typography fontWeight={"500"} textAlign={"start"} color={'primary'} fontSize={'1.2rem'}>
                                For this CU
                            </Typography>
                            <Divider />
                            <Grid container mt={1} justifyContent={'space-between'}>
                                <Grid item md={7}>
                                    <Typography> Modules</Typography>
                                    {appData &&
                                        appData.modules &&
                                        appData.modules.map((item, index) => (
                                            <Grid key={`${item._id}-${index}-cu`} display={'flex'} alignItems={'center'} gap={3}>
                                                <Typography variant="body1">{item.name}</Typography>
                                                <FormGroup row sx={{ gap: "10px" }}>
                                                    <FormControlLabel
                                                        title="Read"
                                                        sx={{ margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        checked={item.moduleForCU ? item.moduleForCU.read ? item.moduleForCU.read : false : false}
                                                        label={'R'}
                                                        onChange={e => {
                                                            onHandleForModuleCheck(e, item.id, "moduleForCU", 'read');
                                                        }}
                                                        disabled={userType !== UserType.ORG_ADMIN}
                                                    />
                                                    <FormControlLabel
                                                        title="Write"
                                                        sx={{ margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        checked={item.moduleForCU ? item.moduleForCU.write ? item.moduleForCU.write : false : false}
                                                        label={'W'}
                                                        onChange={e => {
                                                            onHandleForModuleCheck(e, item.id, "moduleForCU", 'write');
                                                        }}
                                                        disabled={userType !== UserType.ORG_ADMIN}
                                                    />
                                                    <FormControlLabel
                                                        title="Update"
                                                        sx={{ margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        checked={item.moduleForCU ? item.moduleForCU.update ? item.moduleForCU.update : false : false}
                                                        label={'U'}
                                                        onChange={e => {
                                                            onHandleForModuleCheck(e, item.id, "moduleForCU", 'update');
                                                        }}
                                                        disabled={userType !== UserType.ORG_ADMIN}
                                                    />
                                                    <FormControlLabel
                                                        title="Delete"
                                                        sx={{ margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        checked={item.moduleForCU ? item.moduleForCU.delete ? item.moduleForCU.delete : false : false}
                                                        label={'D'}
                                                        onChange={e => {
                                                            onHandleForModuleCheck(e, item.id, "moduleForCU", 'delete');
                                                        }}
                                                        disabled={userType !== UserType.ORG_ADMIN}
                                                    />
                                                </FormGroup>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                                <Grid item md={5}>
                                    <Typography> Features</Typography>
                                    {appData &&
                                        appData.features &&
                                        appData.features.map((item, index) => (
                                            <Grid key={`${item._id}-${index}-cu`} display={'flex'} alignItems={'center'} gap={3}>
                                                <Typography variant="body1">{item.name}</Typography>
                                                <RadioGroup
                                                    row
                                                    value={item.featureForCU ? item.featureForCU.active ? item.featureForCU.active : false : false}
                                                    onChange={(e) => {
                                                        onHandleForFeatureCheck(e, item.id, "featureForCU");
                                                    }}
                                                    sx={{ gap: "10px" }}
                                                >
                                                    <FormControlLabel disabled={userType !== UserType.ORG_ADMIN} sx={{ margin: 0 }} value={true} control={<Radio size="small" />} label="On" />
                                                    <FormControlLabel disabled={userType !== UserType.ORG_ADMIN} sx={{ margin: 0 }} value={false} control={<Radio size="small" />} label="Off" />
                                                </RadioGroup>
                                            </Grid>
                                        ))}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={5} border={1} borderColor={theme.palette.primary.main} p={1}>
                            <Typography fontWeight={"500"} textAlign={"start"} color={'primary'} fontSize={'1.2rem'}>
                                For MU of this CU
                            </Typography>
                            <Divider />
                            <Grid container mt={1} justifyContent={'space-around'}>
                                <Grid item md={7}>
                                    <Typography> Modules</Typography>
                                    {appData &&
                                        appData.modules &&
                                        appData.modules.map((item, index) => (
                                            <Grid key={`${item._id}-${index}-mu`} display={'flex'} alignItems={'center'} gap={3}>
                                                <Typography variant="body1">{item.name}</Typography>
                                                <FormGroup row sx={{ gap: "10px" }}>
                                                    <FormControlLabel
                                                        title="Read"
                                                        sx={{ margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        checked={item.moduleForMU ? item.moduleForMU.read ? item.moduleForMU.read : false : false}
                                                        label={'R'}
                                                        onChange={e => {
                                                            onHandleForModuleCheck(e, item.id, "moduleForMU", 'read');
                                                        }}
                                                        disabled={userType !== UserType.ORG_ADMIN}
                                                    />
                                                    <FormControlLabel
                                                        title="Write"
                                                        sx={{ margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        checked={item.moduleForMU ? item.moduleForMU.write ? item.moduleForMU.write : false : false}
                                                        label={'W'}
                                                        onChange={e => {
                                                            onHandleForModuleCheck(e, item.id, "moduleForMU", 'write');
                                                        }}
                                                        disabled={userType !== UserType.ORG_ADMIN}
                                                    />
                                                    <FormControlLabel
                                                        title="Update"
                                                        sx={{ margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        checked={item.moduleForMU ? item.moduleForMU.update ? item.moduleForMU.update : false : false}
                                                        label={'U'}
                                                        onChange={e => {
                                                            onHandleForModuleCheck(e, item.id, "moduleForMU", 'update');
                                                        }}
                                                        disabled={userType !== UserType.ORG_ADMIN}
                                                    />
                                                    <FormControlLabel
                                                        title="Delete"
                                                        sx={{ margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        checked={item.moduleForMU ? item.moduleForMU.delete ? item.moduleForMU.delete : false : false}
                                                        label={'D'}
                                                        onChange={e => {
                                                            onHandleForModuleCheck(e, item.id, "moduleForMU", 'delete');
                                                        }}
                                                        disabled={userType !== UserType.ORG_ADMIN}
                                                    />
                                                </FormGroup>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                                <Grid item md={5}>
                                    <Typography> Features</Typography>
                                    {appData &&
                                        appData.features &&
                                        appData.features.map((item, index) => (
                                            <Grid key={`${item._id}-${index}-mu`} display={'flex'} alignItems={'center'} gap={2}>
                                                <Typography variant="body1">{item.name}</Typography>
                                                <RadioGroup
                                                    row
                                                    value={item.featureForMU ? item.featureForMU.active ? item.featureForMU.active : false : false}
                                                    onChange={(e) => {
                                                        onHandleForFeatureCheck(e, item.id, "featureForMU");
                                                    }}
                                                    sx={{ gap: "10px" }}
                                                >
                                                    <FormControlLabel disabled={userType !== UserType.ORG_ADMIN} sx={{ margin: 0 }} value={true} control={<Radio size="small" />} label="On" />
                                                    <FormControlLabel disabled={userType !== UserType.ORG_ADMIN} sx={{ margin: 0 }} value={false} control={<Radio size="small" />} label="Off" />
                                                </RadioGroup>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ padding: "20px", display: "flex", gap: "20px" }}>
                    {userType === UserType.ORG_ADMIN && (
                        <Button variant="contained" onClick={updateAppListInBackend}>
                            <Save fontSize="small" />
                            &nbsp; Save Changes
                        </Button>
                    )}
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setViewApps(false);
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Grid >
        </Dialog >
    );
}
