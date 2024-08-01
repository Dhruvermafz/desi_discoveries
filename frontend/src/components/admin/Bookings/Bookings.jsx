import React, { useState } from "react";
import { Container, Tabs, Tab, Spinner, Alert } from "react-bootstrap";
import BookingDetailCard from "./BookingDetailRecord";
import NoRecord from "./NoRecord";
import useFetch from "../../../hooks/useFetch";
import { BASE_URL } from "../../../utils/config";

export default function Bookings() {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Fetch booking records
  const {
    data: allBookingRecords,
    loading: bookingsLoading,
    error: bookingsError,
  } = useFetch(`booking`);

  const isValidDate = (date) => {
    return !isNaN(new Date(date).getTime());
  };

  const todaysDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  const filterBookingRecords = (records, comparison) => {
    return (records || []).filter((record) => {
      const bookingDateTime = new Date(record.journey_date);
      if (!isValidDate(bookingDateTime)) {
        console.error(`Invalid date: ${record.journey_date}`);
        return false;
      }
      const formattedDateTime = bookingDateTime
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      console.log(
        `Booking Date: ${formattedDateTime}, Today's Date: ${todaysDate}`
      );
      return comparison === "before"
        ? formattedDateTime <= todaysDate
        : formattedDateTime > todaysDate;
    });
  };

  const completedBookingRecords = filterBookingRecords(
    allBookingRecords,
    "before"
  );
  const upcomingBookingRecords = filterBookingRecords(
    allBookingRecords,
    "after"
  );

  const renderTabContent = (records, status) => {
    if (bookingsLoading) {
      return <Spinner animation="border" />;
    }

    if (bookingsError) {
      return <Alert variant="danger">Error fetching booking records</Alert>;
    }

    if (records.length === 0) {
      return <NoRecord />;
    }

    return records.map((record) => (
      <BookingDetailCard key={record._id} booking={record} status={status} />
    ));
  };

  return (
    <Container className="my-5">
      <Tabs
        id="controlled-tab-example"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="upcoming" title="Upcoming Bookings">
          {renderTabContent(upcomingBookingRecords, "upcoming")}
        </Tab>
        <Tab eventKey="completed" title="Completed Bookings">
          {renderTabContent(completedBookingRecords, "completed")}
        </Tab>
        <Tab eventKey="all" title="All Bookings">
          {renderTabContent(allBookingRecords, "all")}
        </Tab>
      </Tabs>
    </Container>
  );
}
