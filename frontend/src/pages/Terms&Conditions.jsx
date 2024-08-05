import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/terms.css";
import Subtitle from "../components/Subtitle";

const TermsAndConditions = () => {
  return (
    <section>
      <Container>
        <Row className="mt-4">
          <Col sm={12}>
            <Subtitle subtitle={"Terms and Conditions"} />
            <div className="terms-content">
              <h5>Introduction</h5>
              <p>
                Welcome to <b>Desi Discoveries</b>. These Terms and Conditions
                govern your use of our website and services. By accessing or
                using our website, you agree to be bound by these Terms and
                Conditions.
              </p>

              <h5>Use of Our Website</h5>
              <p>
                You may use our website for lawful purposes only. You must not
                use our website in any way that breaches any applicable local,
                national, or international law or regulation. You also agree not
                to:
              </p>
              <ul>
                <li>
                  Engage in any conduct that restricts or inhibits anyone's use
                  or enjoyment of the website.
                </li>
                <li>
                  Violate the security of the website, such as gaining
                  unauthorized access to the website or any part of it.
                </li>
                <li>
                  Use the website in any manner that could disable, overburden,
                  or impair the site.
                </li>
              </ul>

              <h5>Booking and Payments</h5>
              <p>
                All bookings made through our website are subject to our
                acceptance. We reserve the right to refuse any booking request
                at our discretion. Payments must be made in full at the time of
                booking unless otherwise specified.
              </p>

              <h5>Cancellation and Refund Policy</h5>
              <p>
                Cancellations must be made in accordance with our cancellation
                policy, which can be found on our website. Refunds, if
                applicable, will be processed according to the terms of the
                policy.
              </p>

              <h5>Intellectual Property</h5>
              <p>
                All content on our website, including text, graphics, logos,
                images, and software, is the property of <b>Desi Discoveries</b>
                and is protected by intellectual property laws. You may not use
                any content without our prior written permission.
              </p>

              <h5>Limitation of Liability</h5>
              <p>
                We will not be liable for any loss or damage arising from your
                use of our website or services. This includes any direct,
                indirect, incidental, or consequential damages. Our liability is
                limited to the maximum extent permitted by law.
              </p>

              <h5>Indemnification</h5>
              <p>
                You agree to indemnify and hold <b>Desi Discoveries</b> harmless
                from any claims, losses, damages, liabilities, including legal
                fees, arising out of your use or misuse of our website or
                services, your violation of these Terms and Conditions, or your
                violation of any third-party rights.
              </p>

              <h5>Changes to Terms and Conditions</h5>
              <p>
                We may update these Terms and Conditions from time to time. The
                updated Terms and Conditions will be posted on our website, and
                your continued use of our website will be deemed as acceptance
                of the updated Terms and Conditions.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TermsAndConditions;
