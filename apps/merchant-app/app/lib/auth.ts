/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable turbo/no-undeclared-env-vars */
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const authOptions={
    providers:[
        Google({
          clientId:process.env.GOOGLE_CLIENT_ID || " ",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || " ",
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID || " ",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || " ",
        })
    ],
    secret:process.env.NEXTAUTH_SECRET || "secret",
    callback:{
        async session ({token , session }:any){
            session.user.id=token.sub
            return session
        },
        async jwt({ token, user }:any){

            if(user){
                token.id=user.id
            }
            return token
        }
    }
}