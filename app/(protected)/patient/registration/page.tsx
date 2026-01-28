import React from 'react'
import NewPatient from "@/components/NewPatient";
import {auth} from "@clerk/nextjs/server";

const RegisterPatient = async () => {
    const {userId} = await auth();

    const data = null;

    return (
        <div className="py-6 px-3 flex justify-center">
            <NewPatient data={data} type={!data ? "create" : "update"}/>
        </div>
    )
}
export default RegisterPatient;
