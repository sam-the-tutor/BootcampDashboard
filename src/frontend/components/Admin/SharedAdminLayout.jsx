
import React from 'react'
import AdminNavBar from "./adminNavbar"
import { Link, Outlet} from "react-router-dom";

const SharedAdminLayout = () => {
  return (
        <>
        < AdminNavBar />
        <Outlet />
        </>
    
  );
}

export default SharedAdminLayout