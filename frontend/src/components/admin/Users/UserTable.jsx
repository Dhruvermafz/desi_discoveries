// components/UsersTable.js
import React, { useEffect, useState } from "react";
import { Toast, ToastContainer, Modal, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../redux/actions/authActions";

import SingleUserRow from "./SingleUserRow";
import axios from "axios";
import { createSelector } from "reselect";

const getUsers = (state) => state.users || [];

// Memoized selector
export const getUserList = createSelector([getUsers], (users) => {
  return Array.isArray(users) ? users : []; // Ensure users is an array
});

const UsersTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const dispatch = useDispatch();
  const users = useSelector(getUserList); // Use memoized selector

  const changeModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleSetDeleteUser = (user) => {
    setDeletingUser(user);
    changeModal();
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/api/v1/users/${deletingUser._id}`);
      dispatch(fetchAllUsers()); // Fetch users again to update the list
      changeModal();
      showToast("success", "User deleted.");
    } catch (err) {
      showToast(
        "error",
        err.response?.data?.message || "Failed to delete user."
      );
    }
  };

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 3000);
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      <Table striped bordered hover responsive className="bg-white">
        <thead className="bg-dark text-white text-center">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <SingleUserRow
              key={user._id}
              user={user}
              fetchUsers={() => dispatch(fetchAllUsers())}
              changeModal={() => handleSetDeleteUser(user)}
            />
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={changeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you really want to delete user{" "}
          <span className="font-weight-bold">{deletingUser?.username}</span>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteUser}>
            Delete
          </Button>
          <Button variant="secondary" onClick={changeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {toast.show && (
        <ToastContainer position="top-end" className="p-3">
          <Toast bg={toast.type === "success" ? "success" : "danger"} autohide>
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  );
};

export default UsersTable;
