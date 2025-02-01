import React from "react";
import './css/center-style.css'
const Center = ({children}:{children:React.ReactNode}) => {
    return (
        <div className="center-container">
  <div className="center-content">{children}</div>
</div>

    );
}

export default Center;