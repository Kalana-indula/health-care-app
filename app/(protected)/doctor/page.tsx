import React from 'react'
import {checkRole, getRole} from "@/utils/roles";
import Interceptors from "undici-types/interceptors";
import {redirect} from "next/navigation";


const DoctorDashboard = async () => {

    const isDoctor = await checkRole('doctor');

    const role = await getRole();

    if(!isDoctor){
        redirect(`/${role}`);
    }

    return (
        <div>DoctorDashboard</div>
    )
}
export default DoctorDashboard
