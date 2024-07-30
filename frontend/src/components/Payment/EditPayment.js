import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { FaCheckSquare } from "react-icons/fa";

const EditPayment = ({ match }) => {
  const [reference, setReference] = useState("");
  const [name, setName] = useState("");
  const [payf, setPayf] = useState("");
  const [method, setMethod] = useState("");
  const [card, setCard] = useState("");
  const [time, setTime] = useState("");
  const [no, setNo] = useState("");
  const [amount, setAmount] = useState("");

  const id = match.params.id;

  useEffect(() => {
    axios
      .get(`https://travelmanagement.onrender.com/payment/${id}`)
      .then((res) => {
        if (res.data.success) {
          const payment = res.data.payment;
          setReference(payment.reference);
          setName(payment.name);
          setPayf(payment.payf);
          setMethod(payment.method);
          setCard(payment.card);
          setTime(payment.time);
          setNo(payment.no);
          setAmount(payment.amount);
        }
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      reference,
      name,
      payf,
      method,
      card,
      time,
      no,
      amount,
    };

    axios
      .put(`https://travelmanagement.onrender.com/payment/update/${id}`, data)
      .then((res) => {
        if (res.data.success) {
          alert("Payment updated successfully");
          window.location.replace(`/payment/details/${id}`);
        }
      });
  };

  return (
    <>
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col md={8} style={{ backgroundColor: "white", padding: "20px" }}>
            <h1 className="h3 mb-4 font-weight-normal">Update Payment</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formReference" className="mb-3">
                <Form.Label>Reference</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit Reference"
                  value={reference}
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPayf" className="mb-3">
                <Form.Label>Pay For</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit Pay For"
                  value={payf}
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="formMethod" className="mb-3">
                <Form.Label>Card Type</Form.Label>
                <Form.Check
                  type="radio"
                  label="Visa"
                  value="Visa"
                  checked={method === "Visa"}
                  onChange={(e) => setMethod(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="MasterCard"
                  value="MasterCard"
                  checked={method === "MasterCard"}
                  onChange={(e) => setMethod(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formCard" className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit Card Number"
                  value={card}
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="formTime" className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="MM/YY"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formNo" className="mb-3">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit CVV"
                  value={no}
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="formAmount" className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit Amount"
                  value={amount}
                  disabled
                />
              </Form.Group>
              <Button variant="success" type="submit">
                <FaCheckSquare className="me-2" />
                Update Payment
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditPayment;
