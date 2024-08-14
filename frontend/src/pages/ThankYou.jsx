import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import {
  faFileInvoice,
  faCalendar,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import PrintInVoice from "../components/PrintInVoice";
const ThankYou = () => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const handleCloseInvoiceModal = () => setShowInvoiceModal(false);
  const handleShowInvoiceModal = () => setShowInvoiceModal(true);

  return (
    <section className="py-4 gray-simple position-relative">
      <Container>
        <Row className="align-items-start">
          <Col xs={12}>
            <div className="card mb-3">
              <div className="card-body px-xl-5 px-lg-4 py-lg-5 py-4 px-2">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <div className="square--80 circle text-light bg-success">
                    <FontAwesomeIcon icon={faCheckDouble} className="fs-1" />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center flex-column text-center mb-5">
                  <h3 className="mb-0">
                    Your order was confirmed successfully!
                  </h3>
                  <p className="text-md mb-0">
                    Booking detail sent to:{" "}
                    <span className="text-primary">paythemezhub@gmail.com</span>
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-center flex-column mb-4">
                  <div className="border br-dashed full-width rounded-2 p-3 pt-0">
                    <Row className="g-3 m-0 p-0">
                      <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                        <div className="d-block">
                          <p className="text-dark fw-medium lh-2 mb-0">
                            Order Invoice
                          </p>
                          <p className="text-muted mb-0 lh-2">#26545</p>
                        </div>
                      </Col>
                      <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                        <div className="d-block">
                          <p className="text-dark fw-medium lh-2 mb-0">Date</p>
                          <p className="text-muted mb-0 lh-2">24 Aug 2023</p>
                        </div>
                      </Col>
                      <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                        <div className="d-block">
                          <p className="text-dark fw-medium lh-2 mb-0">
                            Total Amount
                          </p>
                          <p className="text-muted mb-0 lh-2">$772.40</p>
                        </div>
                      </Col>
                      <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                        <div className="d-block">
                          <p className="text-dark fw-medium lh-2 mb-0">
                            Payment Mode
                          </p>
                          <p className="text-muted mb-0 lh-2">Visa Card</p>
                        </div>
                      </Col>
                      <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                        <div className="d-block">
                          <p className="text-dark fw-medium lh-2 mb-0">
                            First Name
                          </p>
                          <p className="text-muted mb-0 lh-2">Dhananjay</p>
                        </div>
                      </Col>
                      <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                        <div className="d-block">
                          <p className="text-dark fw-medium lh-2 mb-0">
                            Last Name
                          </p>
                          <p className="text-muted mb-0 lh-2">Verma</p>
                        </div>
                      </Col>
                      <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                        <div className="d-block">
                          <p className="text-dark fw-medium lh-2 mb-0">Phone</p>
                          <p className="text-muted mb-0 lh-2">9584563625</p>
                        </div>
                      </Col>
                      <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                        <div className="d-block">
                          <p className="text-dark fw-medium lh-2 mb-0">Email</p>
                          <p className="text-muted mb-0 lh-2">
                            paythemezhub@gmail.com
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="text-center d-flex align-items-center justify-content-center">
                  <Link
                    to="/home-2"
                    className="btn btn-md btn-light-seegreen fw-semibold mx-2"
                  >
                    Book Next Tour
                  </Link>
                  <Button
                    variant="light-primary"
                    className="btn-md fw-semibold mx-2"
                    onClick={handleShowInvoiceModal}
                  >
                    View Invoice Print
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Include PrintInVoice Modal */}
      {showInvoiceModal && (
        <Modal
          size="lg"
          id="invoice"
          tabIndex="-1"
          aria-labelledby="invoicemodal"
          aria-hidden="true"
          centered
        >
          <Modal.Dialog className="modal-dialog-centered invoice-pop-form">
            <Modal.Content>
              <Modal.Header>
                <Modal.Title className="fs-6">
                  Download your invoice
                </Modal.Title>
                <Button
                  variant="link"
                  className="text-muted fs-4"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faSquareXmark} />
                </Button>
              </Modal.Header>
              <Modal.Body>
                <div className="invoiceblock-wrap p-3">
                  <div className="invoice-header d-flex align-items-center justify-content-between mb-4">
                    <div className="inv-fliop01 d-flex align-items-center">
                      <div className="square--60 circle bg-light-primary text-primary">
                        <FontAwesomeIcon
                          icon={faFileInvoice}
                          className="fs-2"
                        />
                      </div>
                      <div className="inv-fliop01 ps-3">
                        <span className="text-uppercase d-block fw-semibold text-md text-dark lh-2 mb-0">
                          Invoice #3256425
                        </span>
                        <span className="text-sm text-muted lh-2">
                          <FontAwesomeIcon icon={faCalendar} className="me-1" />
                          Issued Date 12 Jul 2023
                        </span>
                      </div>
                    </div>
                    <div className="inv-fliop02">
                      <span className="label text-success bg-light-success">
                        Paid
                      </span>
                    </div>
                  </div>

                  <div className="invoice-body">
                    <div className="invoice-bodytop">
                      <Row className="align-items-start justify-content-between">
                        <Col xl={6} lg={6} md={6}>
                          <div className="invoice-desc mb-2">
                            <h6>From</h6>
                            <p className="text-md lh-2 mb-0">
                              #782 Baghambari, Poudery Colony
                              <br />
                              Shivpuras Town, Canada
                              <br />
                              QBH230542 USA
                            </p>
                          </div>
                        </Col>
                        <Col xl={5} lg={5} md={6}>
                          <div className="invoice-desc mb-2">
                            <h6>To</h6>
                            <p className="text-md lh-2 mb-0">
                              Dhananjay Verma/ Brijendra Mani
                              <br />
                              220 K.V Jail Road Hydel Colony
                              <br />
                              271001 Gonda, UP
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="invoice-bodymid py-2">
                      <ul className="list-unstyled gray rounded-3 p-3 m-0">
                        <li className="d-flex justify-content-between align-items-center border-0 px-0 py-1">
                          <span className="fw-medium text-sm text-muted-2 mb-0">
                            Account No.:
                          </span>
                          <span className="fw-semibold text-muted-2 text-md">
                            ************4562
                          </span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center border-0 px-0 py-1">
                          <span className="fw-medium text-sm text-muted-2 mb-0">
                            Reference ID:
                          </span>
                          <span className="fw-semibold text-muted-2 text-md">
                            #2326524
                          </span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center border-0 px-0 py-1">
                          <span className="fw-medium text-sm text-muted-2 mb-0">
                            Pay by:
                          </span>
                          <span className="fw-semibold text-muted-2 text-md">
                            25 Aug 2023
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="invoice-bodybott py-2 mb-2">
                      <div className="table-responsive border rounded-2">
                        <Table className="mb-0">
                          <thead>
                            <tr>
                              <th>Item</th>
                              <th>Price</th>
                              <th>Qut.</th>
                              <th>Total Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>King Bed in Royal Resort</td>
                              <td>$514</td>
                              <td>03</td>
                              <td>$514</td>
                            </tr>
                            <tr>
                              <td>Breakfast for 3</td>
                              <td>$214</td>
                              <td>03</td>
                              <td>$214</td>
                            </tr>
                            <tr>
                              <td>Tax & VAT</td>
                              <td>$78</td>
                              <td>-</td>
                              <td>$772.40</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>

                    <div className="invoice-bodyaction d-flex justify-content-end align-items-center">
                      <Button
                        variant="light-success"
                        className="fw-medium me-2"
                      >
                        Download Invoice
                      </Button>
                      <Button
                        variant="light-primary"
                        className="fw-medium me-2"
                      >
                        Print Invoice
                      </Button>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal.Content>
          </Modal.Dialog>
        </Modal>
      )}
    </section>
  );
};

export default ThankYou;
