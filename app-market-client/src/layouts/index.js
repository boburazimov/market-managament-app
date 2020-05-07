import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import NavbarPanel from "../component/NavbarPanel";

function BasicLayout(props) {
  return (
    <div>
      <NavbarPanel/>
      {props.children}
    </div>
  );
}

export default BasicLayout;
