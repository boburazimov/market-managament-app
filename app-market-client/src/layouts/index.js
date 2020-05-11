import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import NavbarPanel from "../component/NavbarPanel";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function BasicLayout(props) {
  return (
    <div>
      <ToastContainer/>
      <NavbarPanel/>
      {props.children}
    </div>
  );
}

export default BasicLayout;
