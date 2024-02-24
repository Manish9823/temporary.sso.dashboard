import styled from "@emotion/styled";
import { Box, CssBaseline, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "./sidebar/Sidebar";
import { useLocation } from "react-router";
import { Registry_NavBarOptions } from "../utils/Registry_NavBarOptions";

const Root = styled.div`
    display: flex;
    min-height: 100vh;
`;

const AppContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 100%;
`;

export default function RegistryLayout({ children }) {
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
                        items={Registry_NavBarOptions}
                        isBotsScreen={true}
                    />
                </Box>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <Sidebar
                        PaperProps={{ style: { width: 100 } }}
                        variant="temporary"
                        open={false}
                        onClose={() => {}}
                        items={Registry_NavBarOptions}
                        isBotsScreen={true}
                    />
                </Box>
            </Grid>
            <AppContent>
                <Grid style={{ width: "100%", background: "#1e293b", height: "8vh", alignItems: "center", display: "flex" }}>
                    <Grid style={{ fontSize: "20px", color: "white" }} className="ml-3 ">
                        Welcome Admin!
                    </Grid>
                </Grid>
                <Grid flex={1} p={2} overflow={"auto"}>
                    {children}
                    <Outlet />
                </Grid>
                <Grid style={{ justifySelf: "flex-end" }}>
                    <Footer />
                </Grid>
            </AppContent>
        </Root>
    );
}
