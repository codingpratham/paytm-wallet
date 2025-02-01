import express  from "express"
import {prisma} from "@repo/db/client"

const app = express()

app.use(express.json())

app.post("/hdfcWebhook" ,async(req,res)=>{
    const paymentInformation:{
        token : string,
        userId : string,
        amount : string
    }={
        token:req.body.token,
        userId:req.body.user_identifier,
        amount:req.body.amount
    }

    try{
        await prisma.$transaction([
            prisma.balance.updateMany({
                where:{
                    userId:Number(paymentInformation.userId)
                },
                data:{
                    amount:{
                        increment:Number(paymentInformation.amount)
                    }
                }
            }),
            prisma.onRampTransaction.updateMany({
                where:{
                    token:paymentInformation.token
                },
                data:{
                    status:"Success"
                }
            })
        ])
        res.status(200).send("Payment Received")
    }
    catch(error){
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
})

app.listen(3002)