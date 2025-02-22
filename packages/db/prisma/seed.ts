import { prisma } from "..";

async function main(){
    const alice = await prisma.user.upsert({
        where:{
            number:"9999999999"
        },
        update:{},
        create:{
            number:"9999999999",
            name:"Alice",
            email:"alice@example.com",
            password:"alice",
            OnRampTransaction:{
                create:{
                    startTime:new Date(),
                    status:"Success",
                    amount:20000,
                    token:"122",
                    provider:"HDFC Bank"
                }
            }
        }
    })
    const bob=await prisma.user.upsert({
        where:{
            number:"8888888888"
        },
        update:{},
        create:{
            number:"8888888888",
            name:"Bob",
            email:"bob@example.com",
            password:"bob",
            OnRampTransaction:{
                create:{
                    startTime:new Date(),
                    status:"Failure",
                    token:"333",
                    amount:30000,
                    provider:"HDFC Bank"
                }
            }
        }
    })
    console.log({alice,bob});
}
main()
.then(async()=>{
    await prisma.$disconnect();
})
.catch(async (e)=>{
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})