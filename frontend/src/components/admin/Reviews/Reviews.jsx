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

const CommentsReviews = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  const getComments = async () => {
    setComments([]);
    try {
      setLoading(true);
      let url =
        filter === "most" // most rated
          ? `/api/tour/get-comments?searchTerm=${search}&sort=totalRatings`
          : `/api/tour/get-comments?searchTerm=${search}&sort=rating`; // all
      const res = await fetch(url);
      const data = await res.json();
      if (data?.success) {
        setComments(data?.comments);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
      if (data?.comments?.length > 8) {
        setShowMoreBtn(true);
      } else {
        setShowMoreBtn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, [filter, search]);

  const onShowMoreClick = async () => {
    const numberOfComments = comments.length;
    const startIndex = numberOfComments;
    let url =
      filter === "most" // most rated
        ? `/api/tour/get-comments?searchTerm=${search}&sort=totalRatings&startIndex=${startIndex}`
        : `/api/tour/get-comments?searchTerm=${search}&sort=rating&startIndex=${startIndex}`; // all
    const res = await fetch(url);
    const data = await res.json();
    if (data?.comments?.length < 9) {
      setShowMoreBtn(false);
    }
    setComments([...comments, ...data?.comments]);
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
      {comments && (
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
      {comments ? (
        comments.map((comment, i) => (
          <ListGroup.Item className="border rounded-lg p-3 mb-2" key={i}>
            <Row>
              <Col lg={5}>
                <Link to={`/tour/comments/${comment.tourId}`}>
                  <img
                    src={comment.tourImage}
                    alt="Tour"
                    className="img-thumbnail"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
              </Col>
              <Col lg={7}>
                <Link to={`/tour/comments/${comment.tourId}`}>
                  <h5 className="font-weight-bold mb-2">{comment.tourName}</h5>
                </Link>
                <p>{comment.commentText}</p>
                <div className="d-flex align-items-center">
                  <Rating value={comment.rating} />
                  <span className="ml-2">({comment.totalRatings})</span>
                </div>
              </Col>
            </Row>
          </ListGroup.Item>
        ))
      ) : (
        <h1 className="text-center">No Comments Available!</h1>
      )}
      {showMoreBtn && (
        <Button
          onClick={onShowMoreClick}
          variant="success"
          className="d-block mx-auto mt-3"
        >
          Show More
        </Button>
      )}
    </Container>
  );
};

export default CommentsReviews;
