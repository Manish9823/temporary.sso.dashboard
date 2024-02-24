import { createSlice } from "@reduxjs/toolkit";
export const ssoSlice = createSlice({
    name: "ssoSlice",
    initialState: {
        loginData: {},
        allOrganisation: [],
        allOrganisationUsers: [],
        allTechUsers: [],
        appList: [],
        orgAdmin: [],
        allMUsOfOrg: [],
        orgDetails: {},
        allPendingRequest: [],
        pyramidData: [],
    },
    reducers: {
        setLoginData: (state, action) => {
            state.loginData = action.payload;
        },
        setAllTechUsers: (state, action) => {
            state.allTechUsers = action.payload;
        },
        setAllOrganisation: (state, action) => {
            state.allOrganisation = action.payload;
        },

        setAppList: (state, action) => {
            state.appList = action.payload;
        },
        setOrgAdmin: (state, action) => {
            state.orgAdmin = action.payload;
        },

        setAllPendingRequest: (state, action) => {
            state.allPendingRequest = action.payload;
        },
        setOrgDetails: (state, action) => {
            state.orgDetails = action.payload;
        },

        setAllMusOfOrg: (state, action) => {
            state.allMUsOfOrg = action.payload;
        },
        setAllOrgUsers: (state, action) => {
            state.allOrganisationUsers = action.payload;
        },
        setPyramidData: (state, action) => {
            state.pyramidData = action.payload;
        },
    },
});
export const {
    setAllTechUsers,
    setAllOrgUsers,
    setAllOrganisation,
    setAppList,
    setOrgAdmin,
    setOrgDetails,
    setAllPendingRequest,
    setAllMusOfOrg,
    setLoginData,
    setPyramidData,
} = ssoSlice.actions;
