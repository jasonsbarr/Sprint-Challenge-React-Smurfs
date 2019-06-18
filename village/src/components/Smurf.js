import React from "react";
import SmurfSingle from "./SmurfSingle";

const Smurf = ({ smurf, onDelete, ...props }) => {
  return <SmurfSingle smurf={smurf} onDelete={onDelete} {...props} />;
};

export default Smurf;
