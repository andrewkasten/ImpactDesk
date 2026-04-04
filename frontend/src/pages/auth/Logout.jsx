import { Navigate } from "react-router-dom";
import { useState } from 'react'

export default function Logout() {
  const [userToken, setUserToken] = useState(localStorage.getItem('token'))


  const handleLogout = (e) => {
    e.preventDefault();
    setUserToken(null);
    localStorage.removeItem('token')
  };

  if (!userToken) {
    return <Navigate to="/login" />
  } else {
    return (
      <>
        <p>Are you sure you want to logout?</p>
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  }
}
