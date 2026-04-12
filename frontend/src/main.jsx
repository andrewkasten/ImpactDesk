import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client"
import {createBrowserRouter,createRoutesFromElements,RouterProvider, Route} from "react-router-dom";
import PublicRoot from "./pages/roots/PublicRoot"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import DashboardRoot from "./pages/roots/DashboardRoot"
import DashboardHome from "./pages/home/DashboardHome"
import Logout from "./pages/auth/Logout"
import ErrorPage from "./error-page"
import Home from "./pages/home/Home"
import Developments from "./pages/dashboard/Developments"
import Contacts from "./pages/dashboard/Contacts"
import Donations from "./pages/dashboard/Donations"
import AuthContext from "./contexts/AuthContext"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PublicRoot />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="/dashboard" element={<DashboardRoot />}>
        <Route index element={<DashboardHome />} />
        <Route path="developments" element={<Developments />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="donations" element={<Donations />} />
        <Route path="logout" element={<Logout />} />
      </Route>
    </>
  ),
);

function App() {
  const [userToken, setUserToken] = useState(sessionStorage.getItem("token"));

  const handleToken = (token) => {
    sessionStorage.setItem("token", token);
    setUserToken(token);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, handleToken, logout }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
