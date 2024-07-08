import React, { useContext } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { FaQuestionCircle, FaGlobe, FaBlog, FaStar } from "react-icons/fa"; // Import additional icons
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Nav } from "react-bootstrap";
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
          <Nav className="flex-column">
            <NavLink
              to="/admin/tours"
              className="nav-link"
              activeClassName="active"
            >
              <BsPeopleFill /> Manage Tours
            </NavLink>
          </Nav>
        </>
      );
    }
  };

  return (
    <Container fluid className="admin-wrapper">
      <Row>
        <Col md={3} lg={2} className="sidebar p-4">
          <h5>{user ? user.username : "User"}</h5>
          <Nav className="flex-column">
            {user && (
              <NavLink
                to={`/profile/${user.id}`}
                className="nav-link"
                activeClassName="active"
              >
                <MdDashboard /> Profile
              </NavLink>
            )}
            <NavLink
              to="/admin/queries"
              className="nav-link"
              activeClassName="active"
            >
              <FaQuestionCircle /> Queries
            </NavLink>
            <NavLink
              to="/admin/tours"
              className="nav-link"
              activeClassName="active"
            >
              <FaGlobe /> Tours
            </NavLink>
            <NavLink
              to="/admin/blogs"
              className="nav-link"
              activeClassName="active"
            >
              <FaBlog /> Blogs
            </NavLink>
            <NavLink
              to="/admin/reviews"
              className="nav-link"
              activeClassName="active"
            >
              <FaStar /> Reviews
            </NavLink>
          </Nav>
          {renderAdminNav()}
        </Col>
        <Col md={9} lg={10} className="main-content p-4">
          {/* Main content goes here */}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { isAdmin: state.auth };
};

export default connect(mapStateToProps)(AdminWrapper);
