import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, CssBaseline, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { navListBasedOnUserType } from "../utils/accessControl";
import Footer from "./Footer";
import SnackbarMessage from "./Snackbar";
import Sidebar from "./sidebar/Sidebar";

const Root = styled.div`
    display: flex;
    min-height: 100vh;
`;

const AppContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    height: 100vh;
    justify-content: space-between;
`;

export default function Layout({ children }) {
    const state = useSelector(state => state.ssoStore);
    const navListBasedOnUserRole = navListBasedOnUserType(state.loginData);
    const theme = useTheme();
    return (
        <Root>
            <CssBaseline />
            <Grid>
                <Box sx={{ display: { xs: "block", lg: "none" } }}>
                    <Sidebar
                        PaperProps={{ style: { width: 100 } }}
                        variant="temporary"
                        open={false}
                        onClose={() => {}}
                        items={navListBasedOnUserRole}
                        isBotsScreen={true}
                    />
                </Box>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <Sidebar
                        PaperProps={{ style: { width: 100 } }}
                        variant="temporary"
                        open={false}
                        onClose={() => {}}
                        items={navListBasedOnUserRole}
                        isBotsScreen={true}
                    />
                </Box>
            </Grid>
            <Grid item flex={1} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                <AppContent>
                    <Grid pt={2} pl={3}>
                        <div style={{ fontSize: "1rem", color: theme.palette.primary.main, fontWeight: "bold" }}>
                            Welcome {state.loginData.email} - {state.orgDetails.organization_name} - {state.loginData.unit_type==="CONSUMER_UNIT"?"Consumer Unit":"Monitoring Unit"}
                            {state.loginData.user_type === "ORG_ADMIN" && "Organization Admin"}
                        </div>
                    </Grid>
                    <Grid flex={1} p={2} overflow={"auto"}>
                        {children}
                        <Outlet />
                    </Grid>
                    {/* <Grid style={{ justifySelf: "flex-end" }}>
                        <Footer />
                    </Grid> */}
                </AppContent>
            </Grid>
            <SnackbarMessage />
        </Root>
    );
}
