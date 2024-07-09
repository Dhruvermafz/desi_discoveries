import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

const History = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const getAllBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/booking/get-allBookings?searchTerm=${search}`
      );
      const data = await res.json();
      if (data?.success) {
        setAllBookings(data?.bookings);
        setLoading(false);
        setError(false);
      } else {
        setLoading(false);
        setError(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, [search]);

  const handleHistoryDelete = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/booking/delete-booking-history/${id}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data?.success) {
        setLoading(false);
        alert(data?.message);
        getAllBookings();
      } else {
        setLoading(false);
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">History</h1>
      {loading && (
        <Spinner
          animation="border"
          variant="primary"
          className="d-block mx-auto"
        />
      )}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search Username or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>
      {allBookings.map((booking, i) => (
        <Row
          key={i}
          className="border-bottom py-3 d-flex align-items-center justify-content-between"
        >
          <Col xs={1}>
            <Link to={`/package/${booking?.packageDetails?._id}`}>
              <img
                className="img-thumbnail"
                src={booking?.packageDetails?.packageImages[0]}
                alt="Package Image"
                style={{ width: "50px", height: "50px" }}
              />
            </Link>
          </Col>
          <Col xs={3}>
            <Link to={`/package/${booking?.packageDetails?._id}`}>
              <p className="font-weight-bold">
                {booking?.packageDetails?.packageName}
              </p>
            </Link>
          </Col>
          <Col xs={2}>{booking?.buyer?.username}</Col>
          <Col xs={3}>{booking?.buyer?.email}</Col>
          <Col xs={2}>{booking?.date}</Col>
          <Col xs={1}>
            {(new Date(booking?.date).getTime() < new Date().getTime() ||
              booking?.status === "Cancelled") && (
              <Button
                variant="danger"
                onClick={() => handleHistoryDelete(booking._id)}
              >
                Delete
              </Button>
            )}
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default History;
