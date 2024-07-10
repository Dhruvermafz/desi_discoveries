import React, { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/searchbar.css";
import { Col, Form, FormGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FiMapPin, FiCalendar, FiUsers, FiSearch } from "react-icons/fi";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const locationRef = useRef(null);
  const maxGroupSizeRef = useRef(null);
  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const searchHandler = async (e) => {
    e.preventDefault();

    const location = locationRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    const searchParams = new URLSearchParams();
    if (location) searchParams.append("city", location);
    if (fromDate) searchParams.append("fromDate", fromDate.toISOString());
    if (toDate) searchParams.append("toDate", toDate.toISOString());
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
              <FiMapPin />
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
              <FiCalendar />
            </span>
            <div>
              <h6>From</h6>
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                selectsStart
                startDate={fromDate}
                endDate={toDate}
                placeholderText="Select start date"
                className="form-control"
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <FiCalendar />
            </span>
            <div>
              <h6>To</h6>
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                selectsEnd
                startDate={fromDate}
                endDate={toDate}
                minDate={fromDate}
                placeholderText="Select end date"
                className="form-control"
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <FiUsers />
            </span>
            <div>
              <h6>Max People</h6>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>

          <button className="search__icon" type="submit">
            <FiSearch />
          </button>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
