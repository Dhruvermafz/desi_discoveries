import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Table, Spinner, Alert, Button } from "react-bootstrap";
import { fetchQueries, deleteQuery } from "../redux/actions/queriesAction";

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
      <Container className="mt-4">
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
    <Container className="mt-4">
      <Table striped bordered hover>
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
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleReply(query.email)}
                  target="_blank"
                >
                  Reply
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="ml-2"
                  onClick={() => handleDelete(query._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Queries;
