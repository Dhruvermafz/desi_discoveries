import React, { useState } from "react";
import {
  Toast,
  ToastContainer,
  Modal,
  Button,
  Container,
  Row,
  Col,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import SingleUserCard from "./SingleUserCard";
import axios from "axios";
import useFetch from "../../../hooks/useFetch"; // Import the useFetch hook
import { BASE_URL } from "../../../utils/config";

const UsersTable = () => {
  const { data: users, loading, error } = useFetch("users"); // Use the useFetch hook
  const [showModal, setShowModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const changeModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleSetDeleteUser = (user) => {
    setDeletingUser(user);
    changeModal();
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`${BASE_URL}users/${deletingUser._id}`);
      changeModal();
      setToast({ show: true, type: "success", message: "User deleted." });
    } catch (err) {
      setToast({
        show: true,
        type: "error",
        message: err.response?.data?.message || "Failed to delete user.",
      });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users?.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users</div>;

  return (
    <>
      <Container>
        <h2>Users</h2>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search users"
            aria-label="Search users"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
        <Row>
          {filteredUsers.map((user) => (
            <Col md={6} lg={4} key={user._id}>
              <SingleUserCard
                user={user}
                changeModal={() => handleSetDeleteUser(user)}
                editUser={() => console.log(`Edit user: ${user._id}`)} // Implement your editUser logic here
              />
            </Col>
          ))}
        </Row>
      </Container>

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
