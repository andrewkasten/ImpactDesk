import { Navigate } from "react-router-dom";
import { useContext } from 'react'
import AuthContext from "../../contexts/AuthContext";

export default function Logout() {
  const { userToken, logout } = useContext(AuthContext);


  const handleLogout = (e) => {
    e.preventDefault();
    logout();
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
