import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Subtitle from "../components/Subtitle";
import "../styles/About.css";
import worldImg from "../assets/images/world.png";
import logo1 from "../assets/images/logo1.png";
import Newsletter from "../components/Newsletter";
import { FaGuilded, FaServicestack } from "react-icons/fa";
import { MdDashboardCustomize, MdFlightTakeoff } from "react-icons/md";
import "../components/Services/ServiceCard.css";

const ServiceItem = ({ item }) => {
  const { imgUrl: Icon, title, desc } = item;
  return (
    <div className="service__item">
      <div className="service__img">
        <Icon />
      </div>
      <h5>{title}</h5>
      <p>{desc}</p>
    </div>
  );
};

const serviceData = [
  {
    imgUrl: FaServicestack,
    title: "Personalized Service",
    desc: "We tailor our services to meet your specific needs and preferences, ensuring a unique and memorable travel experience.",
  },
  {
    imgUrl: FaGuilded,
    title: "Expert Knowledge",
    desc: "Our team of travel experts has extensive knowledge and experience, providing you with insider tips and recommendations.",
  },
  {
    imgUrl: MdDashboardCustomize,
    title: "Exceptional Support",
    desc: "We offer 24/7 support to ensure that your travel experience is smooth and hassle-free from start to finish.",
  },
  {
    imgUrl: MdFlightTakeoff,
    title: "Comprehensive Planning",
    desc: "We handle all aspects of your trip planning, from flights and accommodations to activities and excursions.",
  },
];

const About = () => {
  return (
    <>
      <section className="about">
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"About Us"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Traveling Opens The Door To Creating{" "}
                  <span className="highlight">Memories</span>
                </h1>
                <p>
                  We believe that travel has the power to transform lives and
                  create lasting memories. Our goal is to provide you with
                  unforgettable experiences and exceptional service, making your
                  travels as enjoyable and stress-free as possible.
                </p>
              </div>
            </Col>
            <Col
              lg="6"
              className="d-flex align-items-center justify-content-center"
            >
              <img src={logo1} height={250} width={250} alt="Our Logo" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* <section className="our-team">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <Subtitle subtitle={"Our Team"} />
              <h2>Meet the People Behind Our Success</h2>
            </Col>
            <Col lg="4" md="6" className="mb-4">
              <Card className="team-member">
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>John Doe</Card.Title>
                  <Card.Text>Founder & CEO</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="4" md="6" className="mb-4">
              <Card className="team-member">
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>Jane Smith</Card.Title>
                  <Card.Text>Chief Operating Officer</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="4" md="6" className="mb-4">
              <Card className="team-member">
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>Mike Johnson</Card.Title>
                  <Card.Text>Head of Marketing</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section> */}

      <section className="why-choose-us">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <Subtitle subtitle={"Why Choose Us"} />
              <h2>Experience the Difference with Us</h2>
            </Col>
            {serviceData.map((item, index) => (
              <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
                <ServiceItem item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default About;
