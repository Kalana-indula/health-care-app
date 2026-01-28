'use server'

import {PatientFormSchema} from "@/lib/schema";
import {clerkClient} from "@clerk/nextjs/server";
import {prisma} from "@/lib/prisma";

export async function createNewPatient(data:any, pid:string){
    try{
        const validateData = PatientFormSchema.safeParse(data)

        if(!validateData.success){
            return {
                success: false,
                error:true,
                msg:"Provide all required fields"
            }
        }

        const patientData = validateData.data;
        let patient_id = pid
        const client=await clerkClient();

        if(pid === "new-patient"){
            const user = await client.users.createUser({
                emailAddress:[patientData.email],
                password:patientData.phone,
                firstName:patientData.first_name,
                lastName:patientData.last_name,
                publicMetadata:{role:"patient"},
            });

            patient_id = user?.id;
        }else{
            await client.users.updateUser(pid,{
                publicMetadata:{role:"patient"},
            });
        }

        await prisma.patient.create({
            date:{
                ...patientData,
                id:patient_id,
            },
        })

        return {success:true,error:false,msg:"Successfully created patient"};

    }catch(err:any){
        console.log(err);
        return {success:false,err:true,msg:err?.message};
    }
}