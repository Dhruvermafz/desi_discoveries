import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/privacy.css";
import Subtitle from "../components/Subtitle";

const PrivacyPolicy = () => {
  return (
    <section>
      <Container>
        <Row className="mt-4">
          <Col sm={12}>
            <Subtitle subtitle={"Privacy Policy"} />
            <section className="privacy-content">
              <div class="container">
                <div class="row justify-content-center g-4">
                  <div class="col-xl-12 col-lg-12 col-md-12">
                    <p>
                      {" "}
                      This Privacy Policy describes how <b>
                        Desi Discoveries
                      </b>{" "}
                      collects, uses, and protects your personal information
                      when you use our website and services. When ordering or
                      registering on our Site you may be asked to enter your
                      name, member name, email address, mailing address,
                      country, billing information or other details to help you
                      with your experience. These information are collected in
                      purpose of providing services described on it, like to
                      verify your identity when you sign in to website, to
                      process your transactions made on site, to respond to
                      support tickets and offer customer services, for
                      administrative and accounting needs that we required to
                      provide to government. When you submit a support question
                      we collect your first name, last name and your email
                      address so that we can correspond with you.
                    </p>
                    <h3 class="fs-4">Information We Collect</h3>
                    <p>
                      I We may collect personal information such as your name,
                      email address, phone number, and other information you
                      provide to us through our website. This information is
                      collected when you:
                      <ul>
                        <li> - Make a booking or reservation</li>
                        <li> - Subscribe to our newsletter</li>
                        <li> - Contact us with inquiries or requests</li>
                      </ul>
                    </p>
                    <h3 class="fs-4">How We Use Your Information</h3>
                    <p>
                      We use your information to provide and improve our
                      services, to communicate with you, and to comply with
                      legal obligations. We may also use your information for
                      marketing purposes with your consent. Specifically, we may
                      use your information to:
                      <ul>
                        <li>
                          {" "}
                          - Process and manage your bookings and reservations
                        </li>
                        <li> -Send you updates and promotional offers</li>
                        <li>
                          {" "}
                          - Respond to your inquiries and provide customer
                          support
                        </li>
                        <li> - Improve our website and services</li>
                      </ul>
                    </p>
                    <h3 class="fs-4">Sharing Your Information</h3>
                    <p>
                      {" "}
                      We do not share your personal information with third
                      parties except as required by law or to provide our
                      services. We may share your information with service
                      providers who assist us in operating our services like
                      Hotel and Other thrid party providers to provide you best
                      of the resources in your travel,, such as payment
                      processors and booking providers. These service providers
                      are contractually obligated to protect your information
                      and only use it for the purposes we specify.{" "}
                    </p>
                    <h3 class="fs-4">Data Security</h3>
                    <p>
                      We take reasonable measures to protect your personal
                      information from unauthorized access, use, or disclosure.
                      However, no internet transmission is completely secure,
                      and we cannot guarantee the security of your information.
                      We recommend that you take steps to protect your personal
                      information, such as using strong passwords and keeping
                      them confidential.{" "}
                    </p>
                    <h3 class="fs-4">Cookies and Tracking Technologies</h3>
                    <p>
                      Our website may use cookies and other tracking
                      technologies to enhance your experience and collect
                      information about how you use our site. You can control
                      cookies through your browser settings and other tools. By
                      using our website, you consent to our use of cookies and
                      tracking technologies as described in this Privacy Policy.
                    </p>
                    <h3 class="fs-4">Your Rights</h3>
                    <p>
                      {" "}
                      You have the right to access, update, and delete your
                      personal information. You can exercise these rights by
                      contacting us at support@desidiscoveries.in . We will
                      respond to your request within a reasonable timeframe.
                    </p>
                    <h3 className="fs-4">Changes to Privacy Policy</h3>
                    <p>
                      We may update this Privacy Policy from time to time. The
                      updated Privacy Policy will be posted on our website, and
                      your continued use of our website will be deemed as
                      acceptance of the updated Privacy Policy. We encourage you
                      to review this Privacy Policy periodically to stay
                      informed about how we are protecting your information.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PrivacyPolicy;
