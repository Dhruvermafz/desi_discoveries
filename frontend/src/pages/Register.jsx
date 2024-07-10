import React, { useState, useContext } from "react";
import { Container, Row, Col, FormGroup, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../assets/images/register.png";
import "../styles/Login.css";
import userIcon from "../assets/images/user.png";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true); // State for email validation
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
    if (id === "email") {
      setIsEmailValid(validateEmail(value)); // Validate email on change
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!isEmailValid) {
      setError("Please enter a valid email address");
      return;
    }

    dispatch({ type: "REGISTER_START" });
    setError(null); // Reset the error on each registration attempt

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result.message);
        dispatch({ type: "REGISTER_FAILURE", payload: result.message });
      } else {
        setSuccess("Registration successful!"); // Set the success message
        dispatch({ type: "REGISTER_SUCCESS", payload: result });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      setError("An error occurred while registering. Please try again later.");
      dispatch({ type: "REGISTER_FAILURE", payload: error.message });
    }
  };

  const validateEmail = (email) => {
    // Simple email validation regex pattern
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="Register" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="User Icon" />
                </div>
                <h2>Register</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">{success}</div>
                )}
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      id="username"
                      onChange={handleChange}
                      autoFocus
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      autoComplete="true"
                      id="email"
                      onChange={handleChange}
                    />
                    {!isEmailValid && credentials.email && (
                      <div className="alert alert-danger">
                        Please enter a valid email address
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <div className="password__input">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        required
                        autoComplete="true"
                        id="password"
                        onChange={handleChange}
                      />
                      <i
                        className={`ri-eye${showPassword ? "-off" : ""}-line`}
                        onClick={togglePasswordVisibility}
                      ></i>
                    </div>
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Create Account
                  </Button>
                </Form>

                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
