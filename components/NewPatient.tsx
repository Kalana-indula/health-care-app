'use client'

import type { Patient } from "@/generated/prisma";
import React, {useState} from 'react'
import {useUser} from "@clerk/nextjs";

interface DataProps {
    data?:Patient;
    type?:"create"|"update"
}

const NewPatient = ({data,type}:DataProps) => {

    const user = useUser();
    const [loading,setLoading]=useState(false);

    return (
        <div>NewPatient</div>
    )
}
export default NewPatient
