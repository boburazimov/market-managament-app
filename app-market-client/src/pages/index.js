import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import useSpinner from "../component/Spinner/useSpinner";
import {Button} from "reactstrap";

export default function () {

  const [spinner, showSpinner, hideSpinner] = useSpinner();

  const fakeFetch = () => {
    showSpinner();
    setTimeout(() => hideSpinner(), 3000)
  };

  return (
    <div>
     <div className="banner">
       <h1>Home Page</h1>
       <Button onClick={fakeFetch}>Click Me</Button>
       {spinner}
     </div>
    </div>
  );
}
