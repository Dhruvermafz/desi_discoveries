import React from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiDelete } from "react-icons/fi";
import { Image } from "react-bootstrap";

const TourItem = ({ name, id, startLocation, imageCover }) => {
  return (
    <>
      <td>
        <Link to={`/tours/${id}`}>
          <Image
            src={`/tours/${imageCover}`}
            alt={name}
            rounded
            style={{ width: "4rem", marginRight: "1rem", display: "none" }}
            className="d-none d-md-inline"
          />
          {name}
        </Link>
      </td>
      <td>{startLocation}</td>
      <td className="d-flex justify-content-end">
        <Link to={`/admin/tours/edit/${id}`} className="me-2">
          <FiEdit className="icon" />
        </Link>
        <Link to={`/admin/tours/delete/${id}`} className="ms-2">
          <FiDelete className="icon" />
        </Link>
      </td>
    </>
  );
};

export default TourItem;
