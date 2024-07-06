import React, { useContext } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Nav } from "react-bootstrap";
import "../../styles/admin.css";
import AuthContext from "../../context/AuthContext";
const AdminWrapper = (props) => {
  const { user } = useContext(AuthContext);
  const checkActive = (match, location) => {
    if (!location) return false;
    const { pathname } = location;
    return pathname === `/profile/${user.id}`;
  };

  const renderAdminNav = () => {
    if (!user) {
      return null;
    } else if (user.role === "admin") {
      return (
        <>
          <h5 className="mt-4">Admin</h5>
          <Nav className="flex-column">
            <NavLink to="/admin/tours" className="nav-link">
              <BsPeopleFill /> Manage tours
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
                isActive={checkActive}
              >
                <MdDashboard /> Profile
              </NavLink>
            )}
            <NavLink to="/contacted" className="nav-link">
              Queries
            </NavLink>
            <NavLink to="/tours" className="nav-link">
              Tours
            </NavLink>
            <NavLink to="/blogs" className="nav-link">
              Blogs
            </NavLink>
            <NavLink to="/reviews" className="nav-link">
              Reviews
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
