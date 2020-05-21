import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import NavbarPanel from "../component/NavbarPanel";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useSpinner from "../component/Spinner/useSpinner";


function BasicLayout(props) {

  const [spinner, showSpinner, hideSpinner] = useSpinner();

  const fakeFetch = () => {
    showSpinner();
    setTimeout(() => hideSpinner(), 3000)
  };

  return (
    <div>
      <ToastContainer/>
      <NavbarPanel/>
      {props.children}
      {spinner}
    </div>
  );
}

export default BasicLayout;
