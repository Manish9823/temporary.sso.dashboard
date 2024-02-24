import { CircularProgress } from "@mui/material";
import * as React from "react";
import { useLocation, useNavigate } from "react-router";
import { appConfig } from "../../config";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setLoginData, setOrgDetails } from "../../store/ssoSlice";
import { defaultRouteBasedOnUserType, isAccessible } from "../../utils/accessControl";

// For routes that can only be accessed by authenticated team members
function AuthGuard({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const location = useLocation();

    const getOrganization = async () => {
        try {
            const response = await axiosInstance.get("/apps/get-org");
            if (response && response.data) {
                dispatch(setOrgDetails(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const servePage = async () => {
        setLoading(true);
        try {
            const serverResponse = await axiosInstance.post(`/authenticated/click`, {});
            if (serverResponse.status === 200) {
                dispatch(setLoginData(serverResponse.data.loggedInUser));
                if (isAccessible(location.pathname, serverResponse.data.loggedInUser)) {
                    await getOrganization();
                    if (location.pathname === "/" || location.pathname === "") {
                        const defaultRoute = defaultRouteBasedOnUserType(serverResponse.data.loggedInUser);
                        navigate(defaultRoute);
                    } else {
                        navigate(location.pathname);
                    }
                } else {
                    navigate("/unauthorized");
                }
            } else {
                window.location.href = `${appConfig.REACT_APP_SSO_SERVER_URL}/login`;
            }
        } catch (error) {
            window.location.href = `${appConfig.REACT_APP_SSO_SERVER_URL}/login`;
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        servePage();
    }, []);

    if (loading) {
        return (
            <React.Fragment>
                <CircularProgress />
            </React.Fragment>
        );
    }

    return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
