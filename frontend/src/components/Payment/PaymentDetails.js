import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, ListGroup, Row, Col } from "react-bootstrap";
import Header from "../Header";
import Footer from "../Footer";
import { useParams, useNavigate } from "react-router-dom";

const PaymentDetails = () => {
  const [payment, setPayment] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://travelmanagement.onrender.com/payment/${id}`)
      .then((res) => {
        if (res.data.success) {
          setPayment(res.data.payment);
        }
      });
  }, [id]);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete your payment?")) {
      axios
        .delete(`https://travelmanagement.onrender.com/payment/delete/${id}`)
        .then(() => {
          alert("Deleted Successfully");
          navigate("/");
        });
    }
  };

  const { reference, name, payf, method, card, time, no, amount, _id } =
    payment;

  return (
    <>
      <Header />
      <Container className="my-5">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h4 className="mb-4">{name}</h4>
            <ListGroup>
              <ListGroup.Item>
                <strong>Reference:</strong> {reference}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Card Number:</strong> {card}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Paid For:</strong> {payf}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Method:</strong> {method}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Date:</strong> {time}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>CVV:</strong> {no}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Amount:</strong> {amount}
              </ListGroup.Item>
            </ListGroup>
            <div className="mt-4">
              <Button
                variant="warning"
                href={`/payment/edit/${_id}`}
                className="me-2"
              >
                <i className="fas fa-edit"></i> Edit
              </Button>
              <Button variant="danger" onClick={() => onDelete(_id)}>
                <i className="fas fa-trash-alt"></i> Delete
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PaymentDetails;
