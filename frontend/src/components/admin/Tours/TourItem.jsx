import React, { useEffect } from "react";
import { connect } from "react-redux";
// Adjust the path as per your file structure
import TourItem from "./TourItem";
import { fetchTour } from "../../../redux/actions/tourActions";
const TourList = ({ tours, fetchTour }) => {
  useEffect(() => {
    fetchTour();
  }, [fetchTour]);

  return (
    <div>
      <h2>Tours</h2>
      {tours.map((tour) => (
        <TourItem
          key={tour.id}
          id={tour.id}
          name={tour.name}
          startLocation={tour.startLocation}
          imageCover={tour.imageCover}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  tours: state.tours, // Assuming your tours are stored in state.tours
});

export default connect(mapStateToProps, { fetchTour })(TourList);
