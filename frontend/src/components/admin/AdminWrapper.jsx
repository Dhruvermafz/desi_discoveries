import React, { useContext } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { FaQuestionCircle, FaGlobe, FaBlog, FaStar } from "react-icons/fa"; // Import additional icons
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../styles/admin.css";
import AuthContext from "../../context/AuthContext";

const AdminWrapper = (props) => {
  const { user } = useContext(AuthContext);

  const renderAdminNav = () => {
    if (!user) {
      return null;
    } else if (user.role === "admin") {
      return (
        <>
          <h5 className="mt-4">Admin</h5>
          <Row className="gx-3 gy-3">
            <AdminCard
              to={`/admin/tours`}
              icon={<BsPeopleFill />}
              title="Manage Tours"
            />
          </Row>
        </>
      );
    }
  };

  const AdminCard = ({ to, icon, title }) => (
    <Col xs={6} md={4} lg={3} className="admin-card">
      <Card className="h-100">
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          {icon}
          <Card.Title className="mt-3">{title}</Card.Title>
        </Card.Body>
        <NavLink to={to} className="stretched-link"></NavLink>
      </Card>
    </Col>
  );

  return (
    <Container fluid className="admin-wrapper">
      <Row>
        <Col md={12} className="main-content p-4">
          <h5>{user ? user.username : "User"}</h5>
          <Row className="gx-3 gy-3 ">
            {user && (
              <AdminCard
                to={`/profile/${user.id}`}
                icon={<MdDashboard />}
                title="Profile"
              />
            )}
            <AdminCard
              to="/admin/queries"
              icon={<FaQuestionCircle />}
              title="Queries"
            />
            <AdminCard to="/admin/tours" icon={<FaGlobe />} title="Tours" />
            <AdminCard to="/admin/blogs" icon={<FaBlog />} title="Blogs" />
            <AdminCard to="/admin/reviews" icon={<FaStar />} title="Reviews" />
          </Row>
          {renderAdminNav()}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { isAdmin: state.auth };
};

export default connect(mapStateToProps)(AdminWrapper);
