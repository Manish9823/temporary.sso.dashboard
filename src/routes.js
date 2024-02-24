import React from "react";
import async from "./components/Async";

// Guards
const AuthGuard = async(() => import("./components/guards/AuthGuard"));
const AddConsumerUnit = async(() => import("./components/pages/AddConsumerUnit"));
const AddUnit = async(() => import("./components/pages/AddUnit"));
const AddOrgUsers = async(() => import("./components/pages/AddOrgUsers"));
const AllUnitDashboard = async(() => import("./components/pages/AllUnitDashboard"));
const Pyramid = async(() => import("./components/pages/Pyramid"));

const AppList = async(() => import("./components/pages/AppList"));
const Layout = async(() => import("./components/Layout"));
const UnauthorizedPage = async(() => import("./components/pages/static/UnauthorizedPage"));

const routes = [
    {
        path: "/",
        element: (
            <AuthGuard>
                <Layout />
            </AuthGuard>
        ),
        children: [
            {
                path: "dashboard",
                element: <AllUnitDashboard />,
            },
            {
                path: "new-unit",
                element: <AddUnit />,
            },
            {
                path: "pyramid",
                element: <Pyramid />,
            },
            {
                path: "consumer-unit",
                element: <AddConsumerUnit />,
            },
            {
                path: "add-org-users",
                element: <AddOrgUsers />,
            },
            {
                path: "app-list",
                element: <AppList />,
            },
            {
                path: "*",
                element: <AuthGuard />,
            },
        ],
    },
    {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
    },
];
export default routes;
