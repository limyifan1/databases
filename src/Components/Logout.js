import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

const LogoutHandler = () => {
  Cookies.remove("session");
  return <div style={{paddingTop:"60px"}}>Logged out!</div>;
};

function Logout() {
  return <div>{LogoutHandler()}</div>;
}

export default Logout;
