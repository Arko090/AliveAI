import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Logo from "../Utils/Images/Logo Images/AliveAI Logo.png";
import "../StyleSheets/Dashboard.css";

const handleSignUp = async (
  e,
  otp,
  setOtp,
  setotpMessage,
  setShow,
  navigate
) => {
  e.preventDefault();
  try {
    // Temporary OTP for Test
    const ValOTP = "112233";

    if (otp !== ValOTP) {
      setOtp("");
      setotpMessage("Please try Again.");
      setShow(true);
    } else {
      setOtp("");
      setotpMessage("Verification Successful.");
      setShow(true);

      await sleep(2000);
      navigate("/login");
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

const handleOTPFormat = async (e, setOtp) => {
  try {
    const input = e.target.value;
    const numericInput = input.replace(/\D/g, "").slice(0, 6);
    setOtp(numericInput);
  } catch (error) {
    alert("Error");
  }
};

// API Calls
const getOTP = () => {
  try {
  } catch (error) {
    alert("An Error Occurred.");
  }
};

const UserData = () => {
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
      <img src={Logo} alt="AliveAI Logo" />
    </div>
  );
};

const SignUpButton = ({ StaticData }) => {
  return (
    <Button variant="outline-info" type="submit" className="w-100 mt-4">
      {StaticData.SignUp.SignUp_Button}
    </Button>
  );
};

const FormConstraints = ({ type, placeholder, value, onChange }) => {
  return (
    <Form.Group controlId="formName" className="my-3">
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

const SignUpOTPForm = ({ StaticData, otp, setOtp, setotpMessage, setShow, navigate }) => {
  return (
    <Form
      onSubmit={(e) =>
        handleSignUp(e, otp, setOtp, setotpMessage, setShow, navigate)
      }
    >
      <FormConstraints
        type="text"
        placeholder="Enter 6 digit OTP"
        value={otp}
        onChange={(e) => handleOTPFormat(e, setOtp)}
      />
      <SignUpButton StaticData={StaticData}/>
    </Form>
  );
};

const SignUpOTP = ({ StaticData }) => {
  const [otp, setOtp] = useState("");
  const [otpMessage, setotpMessage] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state && location.state.result;

  // console.log(result);

  const AlertType =
    otpMessage === "Verification Successful."
      ? "Congratulations!"
      : "Invalid OTP!";

  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center max-vh-100 bg-dark text-light"
      >
        <Row className="form-alert w-100 mx-2">
          {
            <FormAlert
              type={AlertType}
              message={otpMessage}
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
          <Col xs={12} sm={10} md={8} lg={6} xl={5} className="mx-auto">
            <div className="form-container">
              <FormLogo />
              <h5 className="mb-5">Email Sent to {result.Email}</h5>
              <SignUpOTPForm
                StaticData={StaticData}
                otp={otp}
                setOtp={setOtp}
                setotpMessage={setotpMessage}
                setShow={setShow}
                navigate={navigate}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUpOTP;