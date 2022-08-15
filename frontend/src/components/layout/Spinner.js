import React, { Fragment } from "react";
import loader from "./spinner.gif";

function Spinner() {
  return (
    <Fragment>
      <img
        src={loader}
        alt="Loading"
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </Fragment>
  );
}

export default Spinner;
