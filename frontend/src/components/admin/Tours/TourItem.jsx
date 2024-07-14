import React from "react";

const TourItem = ({
  _id,
  photo,
  title,
  city,
  address,
  distance,
  price,
  maxGroupSize,
  desc,
}) => {
  return (
    <tr>
      <td>{_id}</td>
      <td>
        <img
          src={photo}
          alt={title}
          style={{ width: "100px", height: "auto" }}
        />
      </td>
      <td>{title}</td>
      <td>{city}</td>
      <td>{address}</td>
      <td>{distance}</td>
      <td>{price}</td>
      <td>{maxGroupSize}</td>
      <td>{desc}</td>
    </tr>
  );
};

export default TourItem;
