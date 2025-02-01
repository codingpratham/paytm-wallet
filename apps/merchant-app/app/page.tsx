"use client"
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
    <button onClick={()=>{
      signIn()
    }} className=" underline text-amber-800 mr-10">signin</button>
    <button onClick={()=>{
      signOut()
    }} className=" underline text-blue-900  mr-10">signout</button>
  
    </>
  );
}
