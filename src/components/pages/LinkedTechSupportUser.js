import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllTechUsers } from "../../store/ssoSlice";
import axiosInstance from "../../utils/axiosInstance";

export default function LinkedTechSupportUser() {
    const dispatch = useDispatch();
    const getLinkedTechUser = async () => {
        try {
            const response = await axiosInstance.get("/tech-supoort-users/get");
            console.log(response);
            if (response.status === 200) {
                dispatch(setAllTechUsers(response.data.linked_tech_support_users));
                console.log("response-------", response.data.linked_tech_support_users);
            }
        } catch (error) {
            alert("error");
        }
    };
    useEffect(() => {
        getLinkedTechUser();
    }, []);
    return <div>Hello</div>;
}
