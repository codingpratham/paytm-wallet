import{ prisma }from '@repo/db/client'
import { NextResponse } from 'next/server'

export const POST= async ()=>{
    const user =await prisma.user.create({
        data:{
            name:"jhon",
            email:"john@example.com",
            number:"2452452451",
            password:"password",
        }
    })
    return NextResponse.json({
        user: user.name,
    })
}