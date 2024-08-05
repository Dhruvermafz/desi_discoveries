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
                For the purpose of these Terms and Conditions, The term "we",
                "us", "our" used anywhere on this page shall mean Darsh Teotia,
                whose registered/operational office is H-82, Kunwar Singh Nagar,
                Nangloi West Delhi DELHI 110041. "you", “your”, "user",
                “visitor” shall mean any natural or legal person who is visiting
                our website and/or agreed to purchase from us.
              </p>
              <p>
                Your use of the website and/or purchase from us are governed by
                following Terms and Conditions:
              </p>
              <ul>
                <li>
                  {" "}
                  - The content of the pages of this website is subject to
                  change without notice.
                </li>
                <li>
                  {" "}
                  - Neither we nor any third parties provide any warranty or
                  guarantee as to the accuracy, timeliness, performance,
                  completeness or suitability of the information and materials
                  found or offered on this website for any particular purpose.
                  You acknowledge that such information and materials may
                  contain inaccuracies or errors and we expressly exclude
                  liability for any such inaccuracies or errors to the fullest
                  extent permitted by law.
                </li>
                <li>
                  {" "}
                  - Your use of any information or materials on our website
                  and/or product pages is entirely at your own risk, for which
                  we shall not be liable. It shall be your own responsibility to
                  ensure that any products, services or information available
                  through our website and/or product pages meet your specific
                  requirements.
                </li>
                <li>
                  {" "}
                  - Our website contains material which is owned by or licensed
                  to us. This material includes, but are not limited to, the
                  design, layout, look, appearance and graphics. Reproduction is
                  prohibited other than in accordance with the copyright notice,
                  which forms part of these terms and conditions.
                </li>
                <li>
                  {" "}
                  - All trademarks reproduced in our website which are not the
                  property of, or licensed to, the operator are acknowledged on
                  the website.
                </li>
                <li>
                  {" "}
                  - Unauthorized use of information provided by us shall give
                  rise to a claim for damages and/or be a criminal offense.
                </li>
                <li>
                  {" "}
                  - From time to time our website may also include links to
                  other websites. These links are provided for your convenience
                  to provide further information.
                </li>
                <li>
                  {" "}
                  - You may not create a link to our website from another
                  website or document without Darsh Teotia’s prior written
                  consent.
                </li>
                <li>
                  {" "}
                  - Any dispute arising out of use of our website and/or
                  purchase with us and/or any engagement with us is subject to
                  the laws of India.
                </li>
                <li>
                  {" "}
                  - We shall be under no liability whatsoever in respect of any
                  loss or damage arising directly or indirectly out of the
                  decline of authorization for any Transaction, on Account of
                  the Cardholder having exceeded the preset limit mutually
                  agreed by us with our acquiring bank from time to time.
                </li>
              </ul>
              <p>
                Welcome to <b>Desi Discoveries</b>. By accessing or using our
                website, you agree to be bound by these Terms and Conditions.
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
                  {" "}
                  - Engage in any conduct that restricts or inhibits anyone's
                  use or enjoyment of the website.
                </li>
                <li>
                  {" "}
                  - Violate the security of the website, such as gaining
                  unauthorized access to the website or any part of it.
                </li>
                <li>
                  {" "}
                  - Use the website in any manner that could disable,
                  overburden, or impair the site.
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
