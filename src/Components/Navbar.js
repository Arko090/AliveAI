import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Col, Button, Offcanvas } from "react-bootstrap";

import AILogo from "../Utils/Images/Logo Images/AliveAI Logo.png";
import "../StyleSheets/Navbar.css";

// Frontend UI
// Logo Component
const Logo = () => {
  return <img src={AILogo} alt="" className="logo-container" />;
};

// Hamburger Button
const HamburgerButton = () => {
  return (
    <>
      <div className="line-lg"></div>
      <div className="line-md"></div>
      <div className="line-lg"></div>
    </>
  );
};



// WebNavbar & MobileNavbar Custom Hook to get Navbar Items
const useNavbarItems = (StaticData) => {
  return useMemo(
    () => [
      { eventKey: "Home", label: StaticData.Header.Header_Link_1, path: "/" },
      { eventKey: "About", label: StaticData.Header.Header_Link_2, path: "/about" },
      {
        eventKey: "Contact",
        label: StaticData.Header.Header_Link_3,
        path: "/contact",
      },
      {
        eventKey: "Features",
        label: StaticData.Header.Header_Link_4,
        path: "/features",
      },
    ],
    [StaticData]
  );
};

// WebNavbar & MobileNavbar Custom Hook to Render Navbar Items
const useRenderNavItems = (navItems) => {
  return useMemo(
    () =>
      navItems.map(({ eventKey, label, path }) => (
        <NavItem key={eventKey} eventKey={eventKey} path={path}>
          {label}
        </NavItem>
      )),
    [navItems]
  );
};

// WebNavbar & MobileNavbar NavItem Component
const NavItem = ({ eventKey, children, path }) => (
  <Nav.Item>
    <Nav.Link eventKey={eventKey} className="me-4" as={Link} to={path}>
      {children}
    </Nav.Link>
  </Nav.Item>
);



// WebNavbar [Main]
// WebNavbar CustomButton Component
const CustomWebButton = ({ path, label }) => (
  <Button as={Link} to={path} className="mx-2" variant="outline-info" size="md">
    {label}
  </Button>
);

// WebNavbar Component
const WebNavbar = ({ StaticData }) => {
  const navItems = useNavbarItems(StaticData);
  const navContent = useRenderNavItems(navItems);

  return (
    <>
      <Nav>{navContent}</Nav>
      <Nav>
        <CustomWebButton path="/login" label={StaticData.Header.Header_Login_Button} />
        <CustomWebButton
          path="/signup"
          label={StaticData.Header.Header_SignUp_Button}
        />
      </Nav>
    </>
  );
};



// Mobile Navbar [Main]
// MobileNavbar CustomButton Component
const CustomMobButton = ({ path, label }) => {
  return (
    <Col>
      <Button
        as={Link}
        to={path}
        className="w-100 me-2"
        variant="outline-info"
        size="sm"
      >
        {label}
      </Button>
    </Col>
  );
};

// Custom Hook to Render Login and Signup Buttons
const useRenderButtons = (StaticData) => {
  return useMemo(
    () => (
      <Container>
        <div className="row">
          <CustomMobButton
            path="/login"
            label={StaticData.Header.Header_Login_Button}
          />
          <CustomMobButton
            path="/signup"
            label={StaticData.Header.Header_SignUp_Button}
          />
        </div>
      </Container>
    ),
    [StaticData]
  );
};

// MobileNavbar Component
const MobileNavbar = ({ StaticData }) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const renderButtons = useRenderButtons(StaticData);
  const navItems = useNavbarItems(StaticData);
  const renderNavItems = useRenderNavItems(navItems);

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <button
            className="hamburger"
            onClick={() => setShowOffcanvas((prevState) => !prevState)}
          >
            <HamburgerButton />
          </button>
        </Container>
      </Navbar>

      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
        style={{ backgroundColor: "#212529", color: "white" }}
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          {renderButtons}
          <Nav className="flex-column ms-3 mt-2">{renderNavItems}</Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};



// Navbar [Main]
// Responsive Navbar Components as per Screen Width (992 px)
const NavbarComponent = ({ StaticData, windowWidth }) => {
  const navbar = useMemo(() => {
    return windowWidth >= 992 ? (
      <WebNavbar StaticData={StaticData} />
    ) : (
      <MobileNavbar StaticData={StaticData} />
    );
  }, [windowWidth, StaticData]);

  return navbar;
};

// Navbar Component Main
const Header = ({ StaticData, windowWidth }) => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        style={{ minWidth: 250 }}
        className="shadow-lg"
      >
        <Container>
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
          <NavbarComponent StaticData={StaticData} windowWidth={windowWidth} />
        </Container>
      </Navbar>
    </>
  );
};

export default Header;