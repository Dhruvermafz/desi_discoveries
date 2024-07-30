import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaPlane, FaCreditCard, FaCalendarAlt } from "react-icons/fa";

const PayForActivity = ({ match }) => {
  const [activityName, setActivityName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [reference, setReference] = useState("");
  const [name, setName] = useState("");
  const [payf] = useState("Activity");
  const [method, setMethod] = useState("");
  const [card, setCard] = useState("");
  const [time, setTime] = useState("");
  const [no, setNo] = useState("");
  const [amount] = useState("");

  const id = match.params.id;

  useEffect(() => {
    axios
      .get(`https://travelmanagement.onrender.com/activities/${id}`)
      .then((res) => {
        const activity = res.data;
        setActivityName(activity.aname);
        setPrice(activity.price);
        setImg(activity.activityImage);
        setCategory(activity.category);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      reference: activityName,
      name,
      payf,
      method,
      card,
      time,
      no,
      amount: price,
    };

    axios
      .post("https://travelmanagement.onrender.com/payment/add", data)
      .then((res) => {
        if (res.data.success) {
          alert("Payment Successful. Give Us Feedback");
          window.location.replace("/confirm/payment");
        }
      });
  };

  return (
    <>
      <Container className="my-4">
        <Row>
          <Col md={5} className="mb-4">
            <div
              className="border p-4"
              style={{ backgroundColor: "white", borderRadius: "10px" }}
            >
              <h2 className="text-center mb-4">Your Selected Activity</h2>
              <h4 className="text-muted mb-4">{activityName}</h4>
              <img
                src={img}
                alt={activityName}
                className="img-fluid mb-4"
                style={{ height: "200px", width: "100%" }}
              />
              <div className="d-flex justify-content-between mb-2">
                <span>Category:</span>
                <span>{category}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span>
                  <b>Price Per Person:</b>
                </span>
                <span>
                  <b>{price}</b>
                </span>
              </div>
              <p className="text-muted text-center">
                Apply Terms and Conditions
              </p>
            </div>
          </Col>
          <Col md={7}>
            <div
              className="border p-4"
              style={{ backgroundColor: "white", borderRadius: "15px" }}
            >
              <h2 className="text-center mb-4">Payment</h2>
              <div className="d-flex mb-3 align-items-center">
                <p className="fw-bold me-3">We Accept:</p>
                <img
                  src="https://img.icons8.com/color/48/000000/visa.png"
                  alt="Visa"
                />
                <img
                  src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                  alt="MasterCard"
                  className="ms-3"
                />
                <img
                  src="https://img.icons8.com/color/48/000000/maestro.png"
                  alt="Maestro"
                  className="ms-3"
                />
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Package Name</Form.Label>
                  <Form.Control type="text" value={activityName} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="text" value={price} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaPlane className="me-2" /> Pay For
                  </Form.Label>
                  <Form.Control type="text" value="Activity" disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaCreditCard className="me-2" /> Enter Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Card Holder Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaCreditCard className="me-2" /> Card Type
                  </Form.Label>
                  <div>
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
                  </div>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaCreditCard className="me-2" /> Card Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Card Number"
                    value={card}
                    onChange={(e) => setCard(e.target.value)}
                    maxLength="12"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaCalendarAlt className="me-2" /> Expire Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="MM/YY"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaCreditCard className="me-2" /> CVV
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="CVV"
                    value={no}
                    onChange={(e) => setNo(e.target.value)}
                    maxLength="3"
                    required
                  />
                </Form.Group>
                <Button variant="danger" type="submit" className="w-100">
                  <b>Pay Now</b>
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PayForActivity;
