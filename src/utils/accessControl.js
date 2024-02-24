import { AllUnit_NavBarOptions, NavbarForConsumerUnitUser, NavbarForMonitoringUnitUser } from "./AllUnit_NavBarOptions";

export const UserType = {
    ORG_ADMIN: "ORG_ADMIN",
    REGISTRY_ADMIN: "REGISTRY_ADMIN",
    ORG_USER: "ORG_USER",
    TECH_SUPPORT_USER: "TECH_SUPPORT_USER",
};

export const UnitType = {
    MONITORING_UNIT: "MONITORING_UNIT",
    CONSUMER_UNIT: "CONSUMER_UNIT",
};

export const isAccessible = (currentRoute, loggedInUser) => {
    if (currentRoute === "/") {
        return true;
    }
    if (!loggedInUser) {
        return false;
    }
    if (!loggedInUser.user_type) {
        return false;
    }
    switch (loggedInUser.user_type) {
        case UserType.REGISTRY_ADMIN: {
            return "";
        }
        case UserType.ORG_ADMIN: {
            const defaultRouteNavItem = AllUnit_NavBarOptions.find(navItem => navItem.route === currentRoute);
            if (defaultRouteNavItem && defaultRouteNavItem.route) {
                return true;
            } else {
                return false;
            }
        }
        case UserType.TECH_SUPPORT_USER: {
            const defaultRouteNavItem = NavbarForConsumerUnitUser.find(navItem => navItem.route === currentRoute);
            if (defaultRouteNavItem && defaultRouteNavItem.route) {
                return true;
            } else {
                return false;
            }
        }

        case UserType.ORG_USER: {
            if (loggedInUser.unit_type === UnitType.MONITORING_UNIT) {
                const defaultRouteNavItem = NavbarForMonitoringUnitUser.find(navItem => navItem.route === currentRoute);
                if (defaultRouteNavItem && defaultRouteNavItem.route) {
                    return true;
                } else {
                    return false;
                }
            } else {
                const defaultRouteNavItem = NavbarForConsumerUnitUser.find(navItem => navItem.route === currentRoute);
                if (defaultRouteNavItem && defaultRouteNavItem.route) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        default: {
            return [];
        }
    }
};

export const navListBasedOnUserType = loggedInUser => {
    if (!loggedInUser) {
        return [];
    }
    if (!loggedInUser.user_type) {
        return [];
    }

    switch (loggedInUser.user_type) {
        case UserType.REGISTRY_ADMIN: {
            return [];
        }
        case UserType.ORG_ADMIN: {
            return AllUnit_NavBarOptions;
        }
        case UserType.TECH_SUPPORT_USER: {
            return NavbarForConsumerUnitUser;
        }
        case UserType.ORG_USER: {
            if (loggedInUser.unit_type === UnitType.MONITORING_UNIT) {
                return NavbarForMonitoringUnitUser;
            } else {
                return NavbarForConsumerUnitUser;
            }
        }

        default: {
            return [];
        }
    }
};

export const defaultRouteBasedOnUserType = loggedInUser => {
    if (!loggedInUser) {
        return "/";
    }
    if (!loggedInUser.user_type) {
        return "/";
    }
    switch (loggedInUser.user_type) {
        case UserType.REGISTRY_ADMIN: {
            return "";
        }
        case UserType.ORG_ADMIN: {
            const defaultRouteNavItem = AllUnit_NavBarOptions.find(navItem => navItem.defaultRoute === true);
            if (defaultRouteNavItem && defaultRouteNavItem.route) {
                return defaultRouteNavItem.route;
            } else {
                return "";
            }
        }
        case UserType.TECH_SUPPORT_USER: {
            const defaultRouteNavItem = NavbarForConsumerUnitUser.find(navItem => navItem.defaultRoute === true);
            if (defaultRouteNavItem && defaultRouteNavItem.route) {
                return defaultRouteNavItem.route;
            } else {
                return "";
            }
        }

        case UserType.ORG_USER: {
            if (loggedInUser.unit_type === UnitType.MONITORING_UNIT) {
                const defaultRouteNavItem = NavbarForMonitoringUnitUser.find(navItem => navItem.defaultRoute === true);
                if (defaultRouteNavItem && defaultRouteNavItem.route) {
                    return defaultRouteNavItem.route;
                } else {
                    return "";
                }
            } else {
                const defaultRouteNavItem = NavbarForConsumerUnitUser.find(navItem => navItem.defaultRoute === true);
                if (defaultRouteNavItem && defaultRouteNavItem.route) {
                    return defaultRouteNavItem.route;
                } else {
                    return "";
                }
            }
        }

        default: {
            return [];
        }
    }
};
