import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import Rating from "./Rating";
const RatingsReviews = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  const getPackages = async () => {
    setPackages([]);
    try {
      setLoading(true);
      let url =
        filter === "most" // most rated
          ? `/api/package/get-packages?searchTerm=${search}&sort=packageTotalRatings`
          : `/api/package/get-packages?searchTerm=${search}&sort=packageRating`; // all
      const res = await fetch(url);
      const data = await res.json();
      if (data?.success) {
        setPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
      if (data?.packages?.length > 8) {
        setShowMoreBtn(true);
      } else {
        setShowMoreBtn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPackages();
  }, [filter, search]);

  const onShowMoreSClick = async () => {
    const numberOfPackages = packages.length;
    const startIndex = numberOfPackages;
    let url =
      filter === "most" // most rated
        ? `/api/package/get-packages?searchTerm=${search}&sort=packageTotalRatings&startIndex=${startIndex}`
        : `/api/package/get-packages?searchTerm=${search}&sort=packageRating&startIndex=${startIndex}`; // all
    const res = await fetch(url);
    const data = await res.json();
    if (data?.packages?.length < 9) {
      setShowMoreBtn(false);
    }
    setPackages([...packages, ...data?.packages]);
  };

  return (
    <Container className="shadow-xl rounded-lg p-5">
      {loading && (
        <Spinner
          animation="border"
          variant="primary"
          className="d-block mx-auto"
        />
      )}
      {packages && (
        <>
          <Form className="mb-4">
            <Form.Control
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Form>
          <ListGroup horizontal className="mb-3">
            <ListGroup.Item
              className={`cursor-pointer p-2 ${
                filter === "all" ? "bg-primary text-white" : ""
              }`}
              id="all"
              onClick={(e) => {
                setFilter(e.target.id);
              }}
            >
              All
            </ListGroup.Item>
            <ListGroup.Item
              className={`cursor-pointer p-2 ${
                filter === "most" ? "bg-primary text-white" : ""
              }`}
              id="most"
              onClick={(e) => {
                setFilter(e.target.id);
              }}
            >
              Most Rated
            </ListGroup.Item>
          </ListGroup>
        </>
      )}
      {packages ? (
        packages.map((pack, i) => (
          <ListGroup.Item
            className="border rounded-lg p-3 d-flex justify-content-between align-items-center mb-2"
            key={i}
          >
            <Link to={`/package/ratings/${pack._id}`}>
              <img
                src={pack?.packageImages[0]}
                alt="image"
                className="img-thumbnail"
                style={{ width: "80px", height: "80px" }}
              />
            </Link>
            <Link
              to={`/package/ratings/${pack._id}`}
              className="flex-grow-1 mx-3"
            >
              <p className="font-weight-bold mb-0">{pack?.packageName}</p>
            </Link>
            <div className="d-flex align-items-center">
              <Rating value={pack?.packageRating} />
              <span className="ml-2">({pack?.packageTotalRatings})</span>
            </div>
          </ListGroup.Item>
        ))
      ) : (
        <h1 className="text-center">No Ratings Available!</h1>
      )}
      {showMoreBtn && (
        <Button
          onClick={onShowMoreSClick}
          variant="success"
          className="d-block mx-auto mt-3"
        >
          Show More
        </Button>
      )}
    </Container>
  );
};

export default RatingsReviews;
