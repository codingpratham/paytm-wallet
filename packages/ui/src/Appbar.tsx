import { Button } from "./button"
import './css/Appbar-style.css'

interface AppbarProps{
    user?:{
        name?:string | null
    },
    onSignin:any,
    onSignout:any
}

export const Appbar=({
    user,
    onSignin,
    onSignout
}:AppbarProps)=>{
    return (
        <div className="container">
        {/* Text Section */}
        <div className="text-section">PayTM</div>
  
        {/* Button Section */}
        <div className="button-section">
          <Button onClick={user ? onSignout : onSignin}>
            {user ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
    )
}