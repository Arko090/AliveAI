import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Logo from "../Utils/Images/Logo Images/AliveAI Logo.png";
import "../StyleSheets/Dashboard.css";

// Backend
const handleLogin = async (
  e,
  navigate,
  email,
  setEmail,
  password,
  setPassword,
  setloginMessage,
  setShow
) => {
  e.preventDefault();
  try {
    const userEmail = email;
    const userPassword = password;

    // Temporary Email & Password for Test
    if (userEmail === "" || userEmail !== "arkosengupta9@gmail.com") {
      setEmail("");
      setloginMessage("Please Enter valid email");
      setShow(true);
    } else if (userPassword === "" || userPassword !== "Arko@1234") {
      setPassword("");
      setloginMessage("Please Enter valid password");
      setShow(true);
    } else {
      setloginMessage("Logging into your Account.");
      setShow(true);

      setEmail("");
      setPassword("");

      await sleep(2000);
      navigate("/dashboard", { state: { userEmail } });
    }
  } catch (error) {
    alert("An Error Occurred.");
  }
};

const sleep = (ms) => {
  try {
    return new Promise((resolve) => setTimeout(resolve, ms));
  } catch (error) {
    alert("An Error Occured.");
  }
};

// API Calls
const AuthenticateCredentials = () => {
  try {
  } catch (error) {
    alert("An Error Occurred.");
  }
};

// UI Components
const FormAlert = ({ type, message, show, setShow }) => {
  if (show) {
    return (
      <Alert
        variant={type === "Congratulations!" ? "success" : "danger"}
        onClose={() => setShow(false)}
        dismissible
      >
        <h5>{type}</h5>
        <p>{message}</p>
      </Alert>
    );
  }
  return null;
};

const FormLogo = () => {
  return (
    <div className="form-logo-container">
      <img src={Logo} alt="" />
    </div>
  );
};

const FormConstraints = ({ controlId, type, placeholder, value, onChange }) => {
  return (
    <Form.Group controlId={controlId} className="my-4">
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

const LoginButton = ({ StaticData }) => {
  return (
    <Button variant="outline-info" type="submit" className="w-100 mt-4">
      {StaticData.Login.Login_Button}
    </Button>
  );
};

const LoginDashboardNavigate = ({ StaticData, navigate }) => {
  return (
    <>
      <div className="mt-5 text-center" style={{ color: "#999" }}>
        <span>{StaticData.Login.Login_Forgot_Password}</span>
      </div>
      <div className="mt-3 text-center">
        <p>
          {StaticData.Login.Login_Account_Exists}&nbsp;
          <span
            className="form-redirect-button"
            onClick={() => navigate("/signup")}
          >
            {StaticData.Login.Login_Signup}
          </span>
        </p>
      </div>
    </>
  );
};

const Login = ({ StaticData }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setloginMessage] = useState(null);
  const [show, setShow] = useState(false);

  const AlertType =
    loginMessage === "Logging into your Account."
      ? "Congratulations!"
      : "Authentication Failed";

  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center max-vh-50 bg-dark text-light"
      >
        <Row className="form-alert w-100 mx-2">
          {
            <FormAlert
              type={AlertType}
              message={loginMessage}
              show={show}
              setShow={setShow}
            />
          }
        </Row>
      </Container>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light"
      >
        <Row className="w-100 mx-2">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <div className="form-container">
              <FormLogo />
              <h5 className="text-center mb-5">
                {StaticData.Login.Login_Signup_Account}
              </h5>
              <Form
                onSubmit={(e) =>
                  handleLogin(
                    e,
                    navigate,
                    email,
                    setEmail,
                    password,
                    setPassword,
                    setloginMessage,
                    setShow
                  )
                }
              >
                <FormConstraints
                  controlId="formEmail"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormConstraints
                  controlId="formPassword"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoginButton StaticData={StaticData}/>
                <LoginDashboardNavigate StaticData={StaticData} navigate={navigate} />
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;