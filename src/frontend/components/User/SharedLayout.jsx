import { Link, Outlet} from "react-router-dom";
import StyledNavbar from "../User/StlyedNavbar"
import React from "react"

const Home = () => {


return (
<>
< StyledNavbar />
<Outlet />
</>
);

}
export default Home;
