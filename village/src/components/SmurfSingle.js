import React from "react";

const SmurfSingle = ({ smurf, onDelete }) => {
  const { id, name, height, age } = smurf;
  return (
    <div id={id} className="Smurf">
      <h3>{name}</h3>
      <strong>{height} tall</strong>
      <p>{age} smurf years old</p>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default SmurfSingle;
