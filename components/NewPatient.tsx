'use client'

import type { Patient } from "@/generated/prisma";
import React, {useState} from 'react'
import {useUser} from "@clerk/nextjs";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod";
import {PatientFormSchema} from "@/lib/schema";

interface DataProps {
    data?:Patient;
    type?:"create"|"update"
}

const NewPatient = ({data,type}:DataProps) => {

    const {user} = useUser();
    const [loading,setLoading]=useState(false);
    const [imgURL,setImgURL]=useState<any>();
    const router=useRouter()

    const userData = {
        first_name:user?.firstName || "",
        last_name:user?.lastName || "",
        email:user?.emailAddresses[0].emailAddress || "",
        phone:user?.phoneNumbers?.toString() || "",
    };


    const form = useForm<z.infer<typeof PatientFormSchema>>({
        resolver:zodResolver(PatientFormSchema),
        defaultValue:{
            ...userData
        },
    })

    return (
        <Card className="max-w-6xl w-full p-4">
            <CardHeader>
                <CardTitle>Patient Registration</CardTitle>
                <CardDescription>
                    Please provide all the information below to help us understand better and provide good and quality service to you
                </CardDescription>
            </CardHeader>
        </Card>
    )
}
export default NewPatient
