import React, { useState } from "react";
import { Button, Grid, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SettingsIcon from "@mui/icons-material/Settings";
import { appConfig } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Logout, Person } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

export default function SidebarProfile() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = anchorEl;
    const navigate = useNavigate();
    const theme = useTheme();

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = async () => {
        const serverResponse = await axios.post(`${appConfig.REACT_APP_API_URL}/logout`, {}, { withCredentials: true });
        if (serverResponse.status === 200) {
            window.location.href = `${appConfig.REACT_APP_SSO_SERVER_URL}/login`;
        }
    };

    return (
            <Grid
                // width={"284px"}
                height={"70px"}
                sx={{
                    paddingX: "2px",
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "5px",
                }}
            >
                <Grid
                    height={"70px"}
                    sx={{
                        borderRadius: "10px",
                    }}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    gap={2}
                >
                    <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}>
                        <Grid
                            className="ml-2"
                            width={"60px"}
                            height={"55px"}
                            sx={{
                                borderRadius: "50px",
                                border: "5px solid #eee",
                                color: "white",
                                fontSize: "20px",
                            }}
                            display={"flex"}
                            justifyContent={"center"}
                            paddingX={2}
                            alignItems={"center"}
                            overflow={"hidden"}
                        >
                            <Person />
                        </Grid>
                        <Grid style={{ color: "white" }}>User</Grid>
                    </Grid>
                    <Grid justifySelf={"flex-end"}>
                        <MoreVertIcon
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                            color="inherit"
                            sx={{ cursor: "pointer", color: "white" }}
                        />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem onClick={logOut} style={{ color: theme.palette.primary.main }}>
                                <Logout style={{ color: "red" }} fontSize="small" />
                                &nbsp;&nbsp; Log out
                            </MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Grid>
    );
}
