'use client'

import {Patient} from  "@prisma/client";
import React from 'react'

interface DataProps {
    data?:Patient;
    type?:"create"|"update"
}

const NewPatient = () => {
    return (
        <div>NewPatient</div>
    )
}
export default NewPatient
