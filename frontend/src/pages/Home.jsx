import React from "react";
import "../styles/Home.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Subtitle from "../components/Subtitle";
import SearchBar from "../components/SearchBar";
import ServiceList from "../components/Services/ServiceList";
import FeaturedToursList from "../components/FeaturedTours/FeaturedToursList";
import FeaturedBlogsList from "../components/FeaturedBlog/FeaturedBlogList";
import ImagesGallery from "../components/Gallery/ImagesGallery";
import Testimonials from "../components/Testimonials/Testimonials";
import Newsletter from "../components/Newsletter";
import Contact from "./Contact";
import heroImg from "../assets/images/backwaters.webp";
import heroImg2 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/promo.mp4";
import worldImg from "../assets/images/world.png";
import experienceImage from "../assets/images/experience_1.webp";
import FAQ from "../components/FAQ";

const Home = () => {
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know Before You Go"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Traveling Opens The Door To Creating{" "}
                  <span className="highlight">Memories</span>
                </h1>
                <p>
                  Discover new cultures, experience the beauty of diverse
                  landscapes, and create unforgettable memories with each trip.
                  Whether you're seeking adventure or relaxation, traveling has
                  something for everyone.
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box video-box mt-4">
                <video src={heroVideo} alt="" autoPlay loop muted />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg2} alt="" />
              </div>
            </Col>
            <SearchBar />
          </Row>
          <Container fluid>
            <Row className="lg:flex-row flex-col grid-cols-2 gap-10">
              <Col className="experience__content">
                <Subtitle subtitle={"Explore"} />
                <h1 className="text-4xl md:text-5xl font-bold">
                  The Wonders of India
                </h1>
                <h1 className="text-4xl md:text-6xl font-bold text-primary">
                  with Us
                </h1>
                <p className="mt-4">
                  Embark on a journey through the vibrant landscapes of India.
                  From the bustling streets of Delhi to the serene backwaters of
                  Kerala, experience the rich culture, history, and natural
                  beauty that India has to offer.
                </p>
                <Button className="bg-primary px-2 py-3 rounded-lg hover:bg-white hover-text-primary hover-border hover-font-bold mt-4">
                  Get started
                </Button>
              </Col>
              <Col>
                <img
                  src="https://img.freepik.com/premium-photo/palm-tree-jungle-philippines-concept-about-wanderlust-tropical-travels-swinging-river-people-having-fun_186382-1220.jpg?w=1060"
                  alt="heroimg"
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: "10px",
                  }}
                  className="hero__img-box"
                />
              </Col>
            </Row>
          </Container>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <h5 className="services__subtitle">What We Serve</h5>
              <h2 className="services__title">We Offer Our Best Services</h2>
            </Col>
          </Row>
          <ServiceList />
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__tour-title">Our Featured Tours</h2>
            </Col>
            <FeaturedToursList />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"} />
                <h2>
                  With Our Experience <br /> We Will Serve You
                </h2>
                <p>
                  With over a decade of experience in the travel industry, we
                  pride ourselves on providing exceptional services that ensure
                  memorable trips. Join our community of happy travelers.
                </p>
              </div>

              <div className="couter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>20+ trips</span>
                  <h6>Successful Trips</h6>
                </div>
                <div className="counter__box">
                  <span>100+</span>
                  <h6>Regular Clients</h6>
                </div>
                <div className="counter__box">
                  <span>1+</span>
                  <h6>Years Experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImage} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">
                Visit Our Customers' Tour Gallery
              </h2>
            </Col>
            <Col lg="12">
              <ImagesGallery limit={10} />
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <div className="title">
            <Subtitle subtitle={"Featured Blogs"} />
          </div>
          <Row>
            <FeaturedBlogsList lg={4} md={6} sm={6} />
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Testimonial"} />
              <h2 className="testimonials__title">
                What Our Customers Say About Us
              </h2>
            </Col>
            <Testimonials />
          </Row>
        </Container>
      </section>
      <FAQ />
      <Newsletter />
    </>
  );
};

export default Home;
