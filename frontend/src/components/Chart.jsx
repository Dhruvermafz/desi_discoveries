import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
} from "recharts";
import { format } from "timeago.js";
import { Card, Container, Row, Col } from "react-bootstrap";

export default function Chart({ data }) {
  const realData = data?.map((item) => ({
    price: item.totalPrice,
    date: format(item.createdAt),
  }));

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="my-4">
            <Card.Header as="h2" className="text-center">
              Bookings
            </Card.Header>
            <Card.Body>
              <div className="w-full m-2 h-60">
                <ResponsiveContainer width={"100%"} height={300}>
                  <BarChart data={realData}>
                    <Tooltip
                      content={(props) => (
                        <div>
                          {props.payload?.map((item) => {
                            return (
                              <div
                                className="bg-slate-400 text-white py-2 px-4 rounded-md shadow-lg"
                                key={item.payload.date}
                              >
                                <p>Price: ${item.value}</p>
                                <p>Date: {item.payload.date}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    />
                    <YAxis dataKey={"price"} />
                    <XAxis dataKey={"date"} />
                    <Bar dataKey={"price"} fill="#0080ff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
