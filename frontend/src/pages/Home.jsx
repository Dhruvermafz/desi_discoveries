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
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg2 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import experienceImage from "../assets/images/experience.png";
import FAQ from "../components/FAQ";

const Home = () => {
  return (
    <>
      <section>
        <Container>
          <Container fluid>
            <Row className="lg:flex-row flex-col grid-cols-2 gap-10">
              <Col className="experience__content">
                <Subtitle subtitle={"Explore"} />

                <h1 className="text-4xl md:text-5xl font-bold">
                  the Wonders of India
                </h1>
                <h1 className="text-4xl md:text-6xl font-bold text-primary">
                  with us.
                </h1>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus tempus massa vitae elit consectetur, ut convallis
                  massa ultricies. Duis hendrerit turpis quis tincidunt
                  lobortis. Nullam vel faucibus mauris.
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
                  Will our all experience <br /> we will serve you
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  <br />
                  Phasellus tempus massa vitae elit consectetur, ut convallis
                  massa ultricies.
                </p>
              </div>

              <div className="couter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful Trips</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular Clients</h6>
                </div>
                <div className="counter__box">
                  <span>15+</span>
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
                Visit Our Customers Tour Gallery
              </h2>
            </Col>
            <Col lg="12">
              <ImagesGallery />
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
              <h2 className="testmonials__title">
                What our Customers Say about us
              </h2>
            </Col>
            <Testimonials />
          </Row>
        </Container>
      </section>
      <FAQ />
      <Contact />
      <Newsletter />
    </>
  );
};

export default Home;
