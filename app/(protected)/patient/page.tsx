import React from 'react'
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {UserButton} from "@clerk/nextjs";

const PatientDashboard = async () => {

    const user = await currentUser();

    const data = null;

    if(user && !data){
        redirect("/patient/registration")
    }

    return (
        <>
            <div>
                Patient Dashboard
                <UserButton/>
            </div>
        </>
    )
}
export default PatientDashboard
