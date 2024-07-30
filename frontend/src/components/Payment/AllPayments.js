import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Container, Table } from "react-bootstrap";
import { FaPrint } from "react-icons/fa";
import ReactToPrint from "react-to-print";

const AllPayments = () => {
  const [payments, setPayments] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    retrievePayments();
  }, []);

  const retrievePayments = async () => {
    try {
      const res = await axios.get(
        "https://travelmanagement.onrender.com/payment"
      );
      if (res.data.success) {
        setPayments(res.data.existingPayment);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container className="my-4">
        <ReactToPrint
          trigger={() => (
            <Button
              variant="secondary"
              className="mb-3"
              style={{ float: "right" }}
            >
              <FaPrint className="me-2" /> Print this out!
            </Button>
          )}
          content={() => componentRef.current}
        />
        <div ref={componentRef}>
          <h3 className="mb-4">All Payments</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Paid For</th>
                <th>Category Name</th>
                <th>Name</th>
                <th>Method</th>
                <th>Card</th>
                <th>Expire Date</th>
                <th>CVV</th>
                <th>Amount</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{payment.payf}</td>
                  <td>{payment.reference}</td>
                  <td>{payment.name}</td>
                  <td>{payment.method}</td>
                  <td>{payment.card}</td>
                  <td>{payment.time}</td>
                  <td>{payment.no}</td>
                  <td>Rs {payment.amount}</td>
                  <td>{payment.pdate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default AllPayments;
