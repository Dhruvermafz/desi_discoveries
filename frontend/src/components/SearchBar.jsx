import React, { useRef } from "react";
import "../styles/searchbar.css";
import { Col, Form, FormGroup } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const locationRef = useRef(null);
  const distanceRef = useRef(null);
  const maxGroupSizeRef = useRef(null);
  const navigate = useNavigate();

  const searchHandler = async (e) => {
    e.preventDefault(); // Prevent form submission

    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    const searchParams = new URLSearchParams();
    if (location) searchParams.append("city", location);
    if (distance) searchParams.append("distance", distance);
    if (maxGroupSize) searchParams.append("maxGroupSize", maxGroupSize);

    try {
      const res = await axios.get(
        `${BASE_URL}/search?${searchParams.toString()}`
      );
      navigate(`/search?${searchParams.toString()}`, {
        state: { searchResult: res.data.data },
      });
    } catch (err) {
      alert("Failed to fetch search results: " + err.message);
    }
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form
          className="d-flex align-items-center gap-4"
          onSubmit={searchHandler}
        >
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line" />
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                ref={locationRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-time-line" />
            </span>
            <div>
              <h6>Distance</h6>
              <input
                type="number"
                placeholder="Distance k/m"
                ref={distanceRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-group-line" />
            </span>
            <div>
              <h6>Max People</h6>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>

          <button className="search__icon" type="submit">
            <i className="ri-search-line" />
          </button>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
