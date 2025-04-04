/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";

export const authOptions ={
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email:{
                    label:"Email",
                    type:"email",
                    placeholder:"Enter your email"
                },
                name:{
                    label:"Name",
                    type:"text",
                    placeholder:"Enter your name"   
                },
                phone:{
                    label:"Number",
                    type:"tel",
                    placeholder:"Enter your phone number"
                },
                password:{
                    label:"Password",
                    type:"password",
                    placeholder:"Enter your password"
                }
            },
            async authorize(
                credentials: any
            ): Promise<any> {
                if (!credentials) return null;

                const existingUser = await prisma.user.findFirst({
                    where:{
                        number:credentials.phone
                    }
                })
                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)

                    if(passwordValidation){
                        return {
                            id:existingUser.id.toString(),
                            name:existingUser.name,
                            email:existingUser.email,
                            phone:existingUser.number
                        }
                    }
                    return null
                }
                try {
                    const user = await prisma.user.create({
                        data:{
                            email:credentials.email,
                            name:credentials.name,
                            number:credentials.phone,
                            password:await bcrypt.hash(credentials.password, 10),
                        }
                    })
                    return {
                        id:user.id.toString(),
                        name:user.name,
                        email:user.email,
                        phone:user.number
                    }
                } catch (error) {
                    console.error(error)
                    return null
                }
            },
        })
    ],
    secret:process.env.NEXTAUTH_SECRET || "secret",
    callbacks:{
        async session({session,token}:any){
            if (token) {
                session.user = {
                    id: token.id, // Assign ID from token
                    name: token.name,
                    email: token.email,
                    phone: token.phone,
                };
            }
            return session;
        },
        async jwt({token, user}:any){
            if(user){
                token.id=user.id
                token.name = user.name;
                token.email = user.email;
                token.phone = user.phone;
            }
            return token
        }
    }
}