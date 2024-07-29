import React from "react";
import { Button } from "react-bootstrap";

const SingleUserRow = ({ user, changeModal }) => {
  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
      <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
      <td className="text-center">
        <Button variant="danger" onClick={() => changeModal(user)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default SingleUserRow;
