import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const PayView = () => {
  const [card, setCard] = useState("");
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getData = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before new request

    try {
      const res = await axios.get(
        `https://travelmanagement.onrender.com/payment/view/${card}`
      );
      setPayment(res.data);
      navigate(`/payment/details/${res.data.id}`);
    } catch (err) {
      setError("Invalid Card Number.");
    }
  };

  return (
    <div>
      <Header />
      <Container className="my-5">
        <Form
          className="p-4"
          style={{ backgroundColor: "hsl(172, 50%, 50%, 0.2)" }}
          onSubmit={getData}
        >
          <h3>Enter Your Card Number</h3>
          <hr />
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="cardNumber">
            <Form.Control
              type="text"
              placeholder="Enter your Card Number"
              maxLength="12"
              value={card}
              onChange={(e) => setCard(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" variant="success" className="mt-3">
            Submit
          </Button>
        </Form>

        {payment && (
          <div className="mt-4">
            <h4>Payment Details</h4>
            <dl className="row">
              <dt className="col-sm-3">Reference</dt>
              <dd className="col-sm-9">{payment.reference}</dd>
              <dt className="col-sm-3">Name</dt>
              <dd className="col-sm-9">{payment.name}</dd>
              <dt className="col-sm-3">Card Number</dt>
              <dd className="col-sm-9">{payment.card}</dd>
              <dt className="col-sm-3">Paid For</dt>
              <dd className="col-sm-9">{payment.payf}</dd>
              <dt className="col-sm-3">Method</dt>
              <dd className="col-sm-9">{payment.method}</dd>
              <dt className="col-sm-3">Date</dt>
              <dd className="col-sm-9">{payment.time}</dd>
              <dt className="col-sm-3">CVV</dt>
              <dd className="col-sm-9">{payment.no}</dd>
              <dt className="col-sm-3">Amount</dt>
              <dd className="col-sm-9">{payment.amount}</dd>
            </dl>
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default PayView;
