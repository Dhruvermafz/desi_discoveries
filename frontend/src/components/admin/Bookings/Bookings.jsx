import React, { useEffect, useState } from "react";
import {
  Accordion,
  Card,
  Button,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import axios from "axios";
import BookingDetailCard from "./BookingDetailRecord";
import NoRecord from "./NoRecord";
import dateFormat from "dateformat";
import useFetch from "../../../hooks/useFetch";
import { BASE_URL } from "../../../utils/config";

export default function Bookings() {
  const [expanded, setExpanded] = useState(null);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [allBookingRecords, setAllBookingRecords] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  const handlePanelChange = (id) => () => {
    setUserId(id);
    setExpanded(expanded === id ? null : id);
  };

  const fetchBookingRecordsFromAdmin = async () => {
    if (userId) {
      try {
        const response = await axios.get(`${BASE_URL}/booking`);
        setAllBookingRecords(response?.data?.data || []);
      } catch (err) {
        console.error("Error fetching booking records", err);
      }
    }
  };

  useEffect(() => {
    fetchBookingRecordsFromAdmin();
  }, [userId]);

  const completedBookingRecords = [];
  const upcomingBookingRecords = [];
  const todaysDate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss", true);

  if (Array.isArray(allBookingRecords)) {
    allBookingRecords.forEach((record) => {
      const bookingDateTime = new Date(record.journey_date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      if (bookingDateTime > todaysDate) {
        upcomingBookingRecords.push(record);
      } else {
        completedBookingRecords.push(record);
      }
    });
  }

  const { data: user, loading } = useFetch(`${BASE_URL}/booking`);

  useEffect(() => {
    axios.get(`${BASE_URL}/booking`).then((response) => {
      setUsers(response?.data?.users?.rows || []);
    });
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Container className="my-5">
      {users.length === 0 ? (
        <Alert variant="info">No users found</Alert>
      ) : (
        users.map((user) => (
          <Accordion
            key={user.id}
            activeKey={expanded === user.id ? user.id : null}
            onSelect={handlePanelChange(user.id)}
          >
            <Accordion.Item eventKey={user.id}>
              <Accordion.Header>
                <Col>
                  <strong>User Name:</strong> {user.first_name} {user.last_name}
                </Col>
                <Col>
                  <strong>User Email:</strong> {user.email}
                </Col>
                <FaArrowDown className="ms-2" />
                <FaArrowUp className="ms-2" />
              </Accordion.Header>
              <Accordion.Body>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-3"
                >
                  <Tab eventKey="upcoming" title="Upcoming Bookings">
                    {Array.isArray(upcomingBookingRecords) &&
                    upcomingBookingRecords.length === 0 ? (
                      <NoRecord />
                    ) : (
                      upcomingBookingRecords.map((record) => (
                        <BookingDetailCard
                          key={record.id}
                          booking={record}
                          status="upcoming"
                          fetchBookingRecordsFromAdmin={
                            fetchBookingRecordsFromAdmin
                          }
                        />
                      ))
                    )}
                  </Tab>
                  <Tab eventKey="completed" title="Completed Bookings">
                    {Array.isArray(completedBookingRecords) &&
                    completedBookingRecords.length === 0 ? (
                      <NoRecord />
                    ) : (
                      completedBookingRecords.map((record) => (
                        <BookingDetailCard
                          key={record.id}
                          booking={record}
                          status="completed"
                          fetchBookingRecordsFromAdmin={
                            fetchBookingRecordsFromAdmin
                          }
                        />
                      ))
                    )}
                  </Tab>
                  <Tab eventKey="all" title="All Bookings">
                    {Array.isArray(allBookingRecords) &&
                    allBookingRecords.length === 0 ? (
                      <NoRecord />
                    ) : (
                      allBookingRecords.map((record) => (
                        <BookingDetailCard
                          key={record.id}
                          booking={record}
                          status="all"
                          fetchBookingRecordsFromAdmin={
                            fetchBookingRecordsFromAdmin
                          }
                        />
                      ))
                    )}
                  </Tab>
                </Tabs>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))
      )}
    </Container>
  );
}
