import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Table, Spinner, Alert, Button } from "react-bootstrap";
import { fetchQueries, deleteQuery } from "../redux/actions/queriesAction";
import "../styles/queries.css";

const Queries = () => {
  const dispatch = useDispatch();
  const { queries, error } = useSelector((state) => state.query);

  useEffect(() => {
    dispatch(fetchQueries());
  }, [dispatch]);

  const handleReply = (email) => {
    window.open(`mailto:${email}`, "_blank");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this query?")) {
      dispatch(deleteQuery(id));
    }
  };

  if (error) {
    return (
      <Container className="queries-container">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!Array.isArray(queries) || queries.length === 0) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="queries-container">
      <Table striped bordered hover className="queries-table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
            <th>MESSAGE</th>
            <th>SUBMITTED AT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query, index) => (
            <tr key={index}>
              <td>{query.name}</td>
              <td>{query.email}</td>
              <td>{query.phone}</td>
              <td>{query.message}</td>
              <td>{new Date(query.createdAt).toLocaleString()}</td>
              <td>
                <div className="action-buttons">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleReply(query.email)}
                  >
                    Reply
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(query._id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Queries;
