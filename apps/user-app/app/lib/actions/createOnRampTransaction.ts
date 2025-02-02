"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { prisma } from "@repo/db/client"

export async function createOnRampTransaction(provider: string, amount: number) {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }

    const token = (Math.random() * 1000).toString()

    // Create OnRamp Transaction
    await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount,
        }
    })

    // Create Balance and set locked to 0 if not available in the session
    await prisma.balance.updateMany({
        where:{
            userId: Number(session?.user?.id),
        },
        data: {
            amount: {
                increment:amount 
            },
            locked: 0  // Set locked to 0 or use session?.locked if available
        }
    })

    return {
        message: "Transaction created successfully",
        token: token
    }
}
