import styled from "@emotion/styled";
import { Box, Card, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Drawer as MuiDrawer, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router";
import SidebarProfile from "./Profile";
import { registryConfig } from "../../config";
import { useTheme } from "@emotion/react";

const Drawer = styled(MuiDrawer)`
    border-right: 0;
    > div {
        border-right: 0;
    }
`;

const Sidebar = ({ items, isBotsScreen, ...rest }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const currentPath = pathname;
    const theme = useTheme();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: "16vw",
                height: "100%",
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: "16vw",
                    boxSizing: "border-box",
                    background: theme.palette.primary.main,
                },
                background: theme.palette.primary.main,
                backgroundColor: theme.palette.primary.main,
            }}
            direction={"column"}
        >
            <Grid width={"100%"} height={"100px"} display={"flex"} justifyContent={"flex-start"} paddingX={2} alignItems={"center"} gap={2}>
                {/* <Grid display={"flex"} justifyContent={"center"} paddingX={2} alignItems={"center"} overflow={"hidden"}> */}
                <Grid>
                    <img src={registryConfig.logUrl} style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
                </Grid>
                <Grid style={{ fontSize: "1rem", color: "white" }}>
                    {registryConfig.registryName} <br />
                    Communication ERP
                </Grid>
            </Grid>
            <Divider orientation="horizontal" variant="middle" sx={{ backgroundColor: "white" }} />

            <Grid flex={1} overflow={"auto"}>
                <List className="mt-1" sx={{padding:"8px"}}>
                    {items.map((item, index) => {
                        return (
                            <>
                                <Card
                                    className="mb-2"
                                    style={{
                                        boxShadow: "none",
                                        backgroundColor: item.route === currentPath ? "#8b87ff" : "#706bf9",
                                        color: item.route === currentPath ? "white" : "#fff",
                                        borderRadius: item.route === currentPath ? "15px" : "none",
                                        // margin: item.route === currentPath ? "8px" : "none",
                                    }}
                                    key={index}
                                >
                                    <ListItem
                                        className="mt-2 mb-2 poppins-regular"
                                        selected={item.route === currentPath}
                                        key={item.name}
                                        disablePadding
                                        onClick={() => {
                                            navigate(`${item.route}`);
                                        }}
                                    >
                                        <ListItemButton>
                                            <item.icon />
                                            {/* <ListItemText className="ml-2 poppins-regular" primary={item.name} /> */}
                                            <ListItemText
                                                className="ml-2 poppins-regular"
                                                primary={<Typography sx={{ fontFamily: `"Poppins", sans-serif !important` }}>{item.name}</Typography>}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                </Card>
                            </>
                        );
                    })}
                </List>
            </Grid>
            <Grid>
                <SidebarProfile />
            </Grid>
        </Drawer>
    );
};

export default Sidebar;
