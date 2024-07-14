import React from "react";
import { Button, Container, NavLink } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
const ImagesGallery = ({ limit }) => {
  const importAll = (r) => {
    return r.keys().map(r);
  };

  let images = importAll(
    require.context("../../assets/images/gallery", false, /\.(png|jpe?g|svg)$/)
  );

  if (limit) {
    images = images.slice(0, limit);
  }

  return (
    <Container>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
        <Masonry gutter="1rem">
          {images.map((item, index) => (
            <img
              key={index}
              src={item}
              className="masonry__img"
              alt="gallery"
              style={{ width: "100%", display: "block", borderRadius: "10px" }}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {limit && (
        <div className="viall__btn">
          <Link to="/gallery">
            <Button className="btn primary__btn">View All</Button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default ImagesGallery;
