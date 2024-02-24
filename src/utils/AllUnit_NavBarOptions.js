import { AccountTree, Apps, DynamicFeed, GroupAdd, WorkHistory } from "@mui/icons-material";

export const AllUnit_NavBarOptions = [
    {
        name: "Pyramid",
        iconProvider: "mui",
        icon: AccountTree,
        route: "/pyramid",
        defaultRoute: true,
    },
    {
        name: "Organization Users",
        iconProvider: "mui",
        icon: GroupAdd,
        route: "/add-org-users",
    },
    {
        name: "New Unit",
        iconProvider: "mui",
        icon: DynamicFeed,
        route: "/new-unit",
    },
    {
        name: "Apps",
        iconProvider: "mui",
        icon: Apps,
        route: "/app-list",
    },
    // {
    //     name: "Audit logs",
    //     iconProvider: "mui",
    //     icon: WorkHistory,
    //     route: "/audit-log",
    // },
];

export const NavbarForConsumerUnitUser = [
    {
        name: "Apps",
        iconProvider: "mui",
        icon: Apps,
        route: "/app-list",
        defaultRoute: true,
    },
    // {
    //     name: "Audit logs",
    //     iconProvider: "mui",
    //     icon: WorkHistory,
    //     route: "/audit-log",
    // },
];

export const NavbarForMonitoringUnitUser = [
    {
        name: "Pyramid",
        iconProvider: "mui",
        icon: AccountTree,
        route: "/pyramid",
        defaultRoute: true,
    },
    {
        name: "Apps",
        iconProvider: "mui",
        icon: Apps,
        route: "/app-list",
        defaultRoute: true,
    },
    // {
    //     name: "Audit logs",
    //     iconProvider: "mui",
    //     icon: WorkHistory,
    //     route: "/audit-log",
    // },
];
