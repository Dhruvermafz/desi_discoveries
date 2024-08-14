import React from "react";
import { Card, Dropdown, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";

const PaymentDetails = () => {
  return (
    <div className="col-xl-8 col-lg-8 col-md-12">
      <Card className="mb-4">
        <Card.Header>
          <h4>
            <FontAwesomeIcon icon={faWallet} className="me-2" />
            Payment Details
          </h4>
        </Card.Header>
        <Card.Body className="gap-4">
          <h4 className="fs-5 fw-semibold">Saved Card (02)</h4>

          <div className="row justify-content-start g-3">
            <div className="col-xl-5 col-lg-6 col-md-6">
              <Card className="h-100">
                <Card.Body className="bg-dark p-4 rounded-3 text-white">
                  <div className="d-flex justify-content-between align-items-start">
                    <img
                      className="img-fluid"
                      src="assets/img/visa.png"
                      width="55"
                      alt="Visa"
                    />
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        id="creditcardDropdown"
                        className="text-white"
                      >
                        <svg width="24" height="24" fill="none">
                          <circle
                            fill="currentColor"
                            cx="12.5"
                            cy="3.5"
                            r="2.5"
                          ></circle>
                          <circle
                            fill="currentColor"
                            opacity="0.5"
                            cx="12.5"
                            cy="11.5"
                            r="2.5"
                          ></circle>
                          <circle
                            fill="currentColor"
                            opacity="0.3"
                            cx="12.5"
                            cy="19.5"
                            r="2.5"
                          ></circle>
                        </svg>
                      </Dropdown.Toggle>
                      <Dropdown.Menu align="end">
                        <Dropdown.Item href="#">
                          <i className="bi bi-credit-card-2-front-fill me-2 fw-icon"></i>
                          Edit card
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="bi bi-calculator me-2 fw-icon"></i>
                          Currency converter
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <h4 className="fs-6 mt-4">**** **** **** 1569</h4>
                  <div className="d-flex justify-content-between mt-4">
                    <div className="d-flex flex-column">
                      <span className="text-md">Issued To</span>
                      <span className="text-sm fw-medium text-uppercase">
                        Daniel Duekoza
                      </span>
                    </div>
                    <div className="d-flex text-end flex-column">
                      <span className="text-md">Valid Thru</span>
                      <span>12/2027</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-xl-5 col-lg-6 col-md-6">
              <Card className="h-100">
                <Card.Body className="bg-seegreen p-4 rounded-3 text-white">
                  <div className="d-flex justify-content-between align-items-start">
                    <img
                      className="img-fluid"
                      src="assets/img/card.png"
                      width="55"
                      alt="Card"
                    />
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        id="creditcardDropdown1"
                        className="text-white"
                      >
                        <svg width="24" height="24" fill="none">
                          <circle
                            fill="currentColor"
                            cx="12.5"
                            cy="3.5"
                            r="2.5"
                          ></circle>
                          <circle
                            fill="currentColor"
                            opacity="0.5"
                            cx="12.5"
                            cy="11.5"
                            r="2.5"
                          ></circle>
                          <circle
                            fill="currentColor"
                            opacity="0.3"
                            cx="12.5"
                            cy="19.5"
                            r="2.5"
                          ></circle>
                        </svg>
                      </Dropdown.Toggle>
                      <Dropdown.Menu align="end">
                        <Dropdown.Item href="#">
                          <i className="bi bi-credit-card-2-front-fill me-2 fw-icon"></i>
                          Edit card
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="bi bi-calculator me-2 fw-icon"></i>
                          Currency converter
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <h4 className="fs-6 mt-4">**** **** **** 1563</h4>
                  <div className="d-flex justify-content-between mt-4">
                    <div className="d-flex flex-column">
                      <span className="text-md">Issued To</span>
                      <span className="text-sm fw-medium text-uppercase">
                        Daniel Duekoza
                      </span>
                    </div>
                    <div className="d-flex text-end flex-column">
                      <span className="text-md">Valid Thru</span>
                      <span>12/2027</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-xl-2 col-lg-6 col-md-6">
              <Card className="d-flex align-items-center justify-content-center border br-dashed border-2 py-3 h-100">
                <div className="d-flex align-items-center justify-content-center">
                  <a
                    href="#"
                    className="square--60 circle bg-light-primary text-primary fs-2"
                    data-bs-toggle="modal"
                    data-bs-target="#addcard"
                  >
                    <i className="fa-solid fa-circle-plus"></i>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>
          <h4>
            <FontAwesomeIcon icon={faFileInvoiceDollar} className="me-2" />
            Billing History
          </h4>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01</td>
                <td>BK32154</td>
                <td>10 Sep 2023</td>
                <td>
                  <span className="badge bg-light-success text-success fw-medium text-uppercase">
                    Paid
                  </span>
                </td>
                <td>
                  <span className="text-md fw-medium text-dark">$240</span>
                </td>
              </tr>
              <tr>
                <td>02</td>
                <td>BK32155</td>
                <td>08 Aug 2023</td>
                <td>
                  <span className="badge bg-light-warning text-warning fw-medium text-uppercase">
                    UnPaid
                  </span>
                </td>
                <td>
                  <span className="text-md fw-medium text-dark">$240</span>
                </td>
              </tr>
              <tr>
                <td>03</td>
                <td>BK32156</td>
                <td>10 Aug 2023</td>
                <td>
                  <span className="badge bg-light-info text-info fw-medium text-uppercase">
                    Hold
                  </span>
                </td>
                <td>
                  <span className="text-md fw-medium text-dark">$240</span>
                </td>
              </tr>
              <tr>
                <td>04</td>
                <td>BK32157</td>
                <td>22 Jul 2023</td>
                <td>
                  <span className="badge bg-light-seegreen text-seegreen fw-medium text-uppercase">
                    Completed
                  </span>
                </td>
                <td>
                  <span className="text-md fw-medium text-dark">$240</span>
                </td>
              </tr>
              <tr>
                <td>05</td>
                <td>BK32158</td>
                <td>16 Jun 2023</td>
                <td>
                  <span className="badge bg-light-danger text-danger fw-medium text-uppercase">
                    Cancel
                  </span>
                </td>
                <td>
                  <span className="text-md fw-medium text-dark">$240</span>
                </td>
              </tr>
              <tr>
                <td>06</td>
                <td>BK32159</td>
                <td>20 May 2023</td>
                <td>
                  <span className="badge bg-light-info text-info fw-medium text-uppercase">
                    Hold
                  </span>
                </td>
                <td>
                  <span className="text-md fw-medium text-dark">$240</span>
                </td>
              </tr>
              <tr>
                <td>07</td>
                <td>BK32160</td>
                <td>18 Apr 2023</td>
                <td>
                  <span className="badge bg-light-seegreen text-seegreen fw-medium text-uppercase">
                    Completed
                  </span>
                </td>
                <td>
                  <span className="text-md fw-medium text-dark">$240</span>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PaymentDetails;
