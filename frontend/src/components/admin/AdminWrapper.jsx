import React, { useContext } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import {
  FaQuestionCircle,
  FaGlobe,
  FaBlog,
  FaStar,
  FaUser,
} from "react-icons/fa"; // Import additional icons
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../styles/admin.css";
import { AuthContext } from "../../context/AuthContext";
import { BsBookHalf } from "react-icons/bs";
import { TbCategoryFilled, TbReceiptRefund } from "react-icons/tb";
import { MdNewLabel } from "react-icons/md";

const AdminWrapper = () => {
  const { user } = useContext(AuthContext);

  const AdminCard = ({ to, icon, title }) => (
    <Col xs={6} md={2} className="admin-card">
      <NavLink to={to}>
        <Card className="h-100">
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            {icon}
            <Card.Title className="mt-3">{title}</Card.Title>
          </Card.Body>
        </Card>
      </NavLink>
    </Col>
  );

  // if (!user || user.role !== "admin") {
  //   return <div>Unauthorized Access</div>;
  // }

  return (
    <Container fluid className="admin-wrapper">
      <Row>
        <Col md={12} className="main-content p-4">
          <h5>{user.username}</h5>
          <Row className="gx-3 gy-3 admin-div">
            <AdminCard
              to={`/profile/${user.id}`}
              icon={<MdDashboard />}
              title="Profile"
            />
            <AdminCard
              to="/admin/queries"
              icon={<FaQuestionCircle />}
              title="Queries"
            />
            <AdminCard to="/admin/tours" icon={<FaGlobe />} title="Tours" />
            <AdminCard to="/admin/blogs" icon={<FaBlog />} title="Blogs" />
            <AdminCard
              to="/admin/comments-reviews"
              icon={<FaStar />}
              title="Comments & Reviews"
            />
            <AdminCard
              to="/admin/users"
              icon={<FaUser />}
              title="Manage Users"
            />
            <AdminCard
              to="/admin/bookings"
              icon={<BsBookHalf />}
              title="Bookings"
            />
            <AdminCard
              to="/admin/extras"
              icon={<TbCategoryFilled />}
              title="Categories & Tags"
            />
            <AdminCard
              to="/admin/refund"
              icon={<TbReceiptRefund />}
              title="Refund"
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminWrapper;
