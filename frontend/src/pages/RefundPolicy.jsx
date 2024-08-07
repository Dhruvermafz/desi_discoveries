import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Subtitle from "../components/Subtitle";

const RefundPolicy = () => {
  return (
    <section>
      <Container>
        <Row className="mt-4">
          <Col sm={12}>
            <Subtitle subtitle={"Refund Policy"} />
            <h5>Cancellation and Refund Policy for Rebound Corp:</h5>
            <p>
              Cancellation Policy: Customers may request to cancel their
              tour/trip/package or service with Desi Discoveries with their
              reasons to do so. And prior to that there can be a reason for in
              Desi Discoveries context to cancel a trip/tour/package because of
              unseen reasons. To initiate a cancellation, or a refund consider
              these points to walk further.
            </p>

            <div className="refund-content">
              <h5>Refund Eligibility in Cancellation by Customer</h5>
              <ul>
                <li>30 days or more before departure: 90% refund.</li>
                <li>15-29 days before departure: 50% refund.</li>
                <li>7-14 days before departure: 25% refund.</li>
                <li>Less than 7 days before departure: No refund.</li>
              </ul>

              <h5>Cancellation by Desi Discoveries</h5>
              <ul>
                <li>
                  Full refund if canceled due to unforeseen circumstances.
                </li>
                <li>Alternative travel dates or packages may be offered.</li>
              </ul>

              <h5>Partial Refunds</h5>
              <ul>
                <li>No refunds for unused services during the trip.</li>
              </ul>

              <h5>Force Majeure</h5>
              <ul>
                <li>
                  No refund for cancellations due to natural disasters,
                  pandemics, etc.
                </li>
              </ul>

              <h5>Process</h5>
              <ul>
                <li>Submit refund requests via email to [email address].</li>
                <li>
                  Refunds processed within 10-15 business days after approval.
                </li>
              </ul>

              <h5>Non-refundable items</h5>
              <ul>
                <li>Non-refundable deposits as specified at booking.</li>
                <li>
                  Third-party services subject to their respective policies.
                </li>
              </ul>
              <p>
                To request a refund, email us at info@desidiscoveries.com or use
                our contact form. Abuse of the refund policy may result in
                denial of the refund, account ban, and restricted future use of
                our services. If your account is banned due to Terms &
                Conditions violations, no refund will be provided.
              </p>
              <p>
                For any queries, email us at info@desidiscoveries.com or use our
                contact form. Refer to our Privacy Policy for more details.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RefundPolicy;
