import styled from "@emotion/styled";
import { Grid, List, ListItemButton as MuiListItemButton, ListItemText as MuiListItemText, Typography } from "@mui/material";
import * as React from "react";

function Footer() {
    return (
        <Grid container spacing={0} justifyContent="flex-start">
            <Grid container item xs={12} md={6} justifyContent="flex-end">
                <Grid>{`© ${new Date().getFullYear()} - PINNACLE`}</Grid>
            </Grid>
        </Grid>
    );
}

export default Footer;
