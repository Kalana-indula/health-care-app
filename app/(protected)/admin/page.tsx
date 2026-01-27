import React from 'react'
import {checkRole, getRole} from "@/utils/roles";
import {redirect} from "next/navigation";

const AdminDashboard = async () => {

    const isAdmin = await checkRole('admin');

    const role = await getRole();

    if(!isAdmin){
        redirect(`/${role}`);
    }

    return (
        <div>AdminDashboard</div>
    )
}
export default AdminDashboard
