import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Logo from "../Utils/Images/Logo Images/AliveAI Logo.png";
import "../StyleSheets/Dashboard.css";

// Replace with Country Code API
const countryCodes = [
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "India", code: "+91" },
];

// Backend Components
const handleSignUp = async (
  e,
  name,
  setName,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  countryCode,
  setCountryCode,
  mobileNumber,
  setMobileNumber,
  address,
  setAddress,
  setSignUpMessage,
  setShow,
  navigateCallback
) => {
  e.preventDefault();
  try {
    if (name === "") {
      setName("");
      setSignUpMessage("Please Enter a Valid Name");
      setShow(true);
    } else if (username === "" || handleUsernameFormat(username)) {
      setUsername("");
      setSignUpMessage("Please Enter a Valid Username");
      setShow(true);
    } else if (email === "" || handleEmailFormat(email)) {
      setEmail("");
      setSignUpMessage("Please Enter a Valid Email");
      setShow(true);
    } else if (password === "" || handlePasswordFormat(password)) {
      setPassword("");
      setSignUpMessage("Please Enter a Valid Password");
      setShow(true);
    } else if (mobileNumber === "" || mobileNumber.length < 10) {
      setMobileNumber("");
      setSignUpMessage("Please Enter a Valid Mobile Number");
      setShow(true);
    } else if (address === "") {
      setAddress("");
      setSignUpMessage("Please Enter a Valid Address");
      setShow(true);
    } else {
      const result = {
        "Name": name,
        "Username": username,
        "Email": email,
        "Password": password,
        "Country Code": countryCode,
        "Mobile Number": mobileNumber,
        "Address": address,
      };

      setSignUpMessage("Signup information successfully submitted.");
      setShow(true);

      // Clear form fields
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setCountryCode(countryCodes[0].code);
      setMobileNumber("");
      setAddress("");

      await sleep(2000);
      navigateCallback("/signupotp", { state: { result } });
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

const handleNameFormat = (e, setName) => {
  try {
    const name = e.target.value;
    const validInput = name.replace(/[^a-zA-Z\s]/g, "").slice(0, 30);
    setName(validInput);
  } catch (error) {
    alert("An Error Occurred.");
  }
};

const handleUsernameFormat = (Username) => {
  try {
    const usernameRegex = /^[a-z_][a-z0-9_]*$/;
    return !usernameRegex.test(Username);
  } catch (error) {
    alert("An Error Occured.");
  }
};

const handleEmailFormat = (Email) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(Email);
  } catch (error) {
    alert("An Error Occured.");
  }
};

const handlePasswordFormat = (Password) => {
  try {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])(?!.*\s).{8,18}$/;
    return !passwordRegex.test(Password);
  } catch (error) {
    alert("An Error Occured.");
  }
};

const handleMobileNumberFormat = (e, setMobileNumber) => {
  try {
    const input = e.target.value;
    const numericInput = input.replace(/\D/g, "").slice(0, 10);
    setMobileNumber(numericInput);
  } catch (error) {
    alert("An Error Occurred.");
  }
};

// API Calls
const UsernameExist = () => {
  try {
  } catch (error) {
    alert("An Error Occurred.");
  }
};

const EmailExist = () => {
  try {
  } catch (error) {
    alert("An Error Occurred.");
  }
};

const MobileExist = () => {
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

const FormConstraints = ({
  type,
  placeholder,
  value,
  onChange,
  as,
  options,
}) => {
  return (
    <Form.Group controlId="formName" className="my-3">
      {as === "select" ? (
        <Form.Control as="select" value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.code} value={option.code}>
              ({option.code})
            </option>
          ))}
        </Form.Control>
      ) : (
        <Form.Control
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </Form.Group>
  );
};

const SignUpButton = ({ StaticData }) => {
  return (
    <Button variant="outline-info" type="submit" className="w-100 mt-4">
      {StaticData.SignUp.SignUp_Button}
    </Button>
  );
};

const SignUpLoginNavigate = ({ StaticData, navigate }) => {
  return (
    <div className="mt-3 text-center">
      <p>
        {StaticData.SignUp.SingUp_Account_Exist}&nbsp;{" "}
        <span
          className="form-redirect-button"
          onClick={() => navigate("/login")}
        >
          {StaticData.SignUp.SignUp_Login_Redirect}
        </span>
      </p>
    </div>
  );
};

const SignUpForm = ({
  StaticData,
  name,
  setName,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  countryCode,
  setCountryCode,
  mobileNumber,
  setMobileNumber,
  address,
  setAddress,
  setSignUpMessage,
  setShow,
  navigate,
}) => {
  return (
    <>
      <Form
        onSubmit={(e) =>
          handleSignUp(
            e,
            name,
            setName,
            username,
            setUsername,
            email,
            setEmail,
            password,
            setPassword,
            countryCode,
            setCountryCode,
            mobileNumber,
            setMobileNumber,
            address,
            setAddress,
            setSignUpMessage,
            setShow,
            navigate
          )
        }
      >
        <FormConstraints
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => handleNameFormat(e, setName)}
        />
        <FormConstraints
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormConstraints
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormConstraints
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Row className="align-items-end">
          <Col xs={3} className="pr-1">
            <FormConstraints
              as="select"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              options={countryCodes}
            />
          </Col>
          <Col xs={9} className="pl-1">
            <FormConstraints
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => handleMobileNumberFormat(e, setMobileNumber)}
            />
          </Col>
        </Row>
        <FormConstraints
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <SignUpButton StaticData={StaticData}/>
        <SignUpLoginNavigate StaticData={StaticData} navigate={navigate} />
      </Form>
    </>
  );
};

const SignUp = ({  StaticData }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState(countryCodes[0].code);
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [signUpMessage, setSignUpMessage] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const AlertType =
    signUpMessage === "Signup information successfully submitted."
      ? "Congratulations!"
      : "Validation Error";

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
              message={signUpMessage}
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
                {StaticData.SignUp.SignUp_Create_Account}
              </h5>
              <SignUpForm
                StaticData={StaticData}
                name={name}
                setName={setName}
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
                address={address}
                setAddress={setAddress}
                setSignUpMessage={setSignUpMessage}
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

export default SignUp;