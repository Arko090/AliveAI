import React, { useMemo, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faHeartbeat,
  faNotesMedical,
  faAngleDown,
  faComments,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
// import { useLocation } from "react-router-dom";

import MenuDashboard from "./MenuDashboard";
import "../StyleSheets/Dashboard.css";

// UI Frontend
const MenuGeneralInformation = () => <h1>General Information Component</h1>;
const MenuChatbot = () => <h1>Chatbot Component</h1>;
const MenuAppointments = () => <h1>Appointments Component</h1>;

// Dashborard Menu
const MenuData = [
  {
    icon: faHome,
    text: "Dashboard",
  },
  {
    icon: faInfoCircle,
    text: "General Information",
  },
  {
    icon: faHeartbeat,
    text: "Health Analysis",
    submenuItems: [{ icon: faNotesMedical, text: "Diabetes Analysis" }],
  },
  {
    icon: faComments,
    text: "Chatbot",
  },
  {
    icon: faListCheck,
    text: "Appointments",
  },
];

// Web Menu Dashboard


// Web Dashboard Menu Items
const WebMenuItem = ({ icon, text, isActive, onClick }) => (
  <li>
    <h6 className={`menu-item ${isActive ? "active" : ""}`} onClick={onClick}>
      <FontAwesomeIcon icon={icon} className="dashboard-faIcon" size="1x" />
      {text}
    </h6>
  </li>
);

// Web Dashboard Sub-Menu Items
const WebSubMenuItem = ({ icon, text, onclick }) => (
  <li>
    <h6>
      <FontAwesomeIcon icon={icon} className="dashboard-faIcon" size="1x" />
      {text}
    </h6>
  </li>
);

// Web Dashboard Menu List
const WebMenuList = ({ toggleSubMenu, setActiveMenu, activeMenu }) => {
  return (
    <ul className="dashboard-menu">
      {MenuData.map((item, index) => (
        <React.Fragment key={index}>
          {item.submenuItems ? (
            <li>
              <h6
                className={`dashboard-menu-header ${
                  activeMenu === index ? "active" : ""
                }`}
                onClick={() => toggleSubMenu(index)}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="dashboard-faIcon"
                  size="1x"
                />
                {item.text}{" "}
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className={`arrow-icon ${
                    activeMenu === index ? "arrow-icon-active" : ""
                  }`}
                />
              </h6>
              <ul
                className={`dashboard-submenu ${
                  activeMenu === index ? "active" : ""
                }`}
              >
                {item.submenuItems.map((subItem, subIndex) => (
                  <WebSubMenuItem
                    key={subIndex}
                    icon={subItem.icon}
                    text={subItem.text}
                  />
                ))}
              </ul>
            </li>
          ) : (
            <WebMenuItem
              icon={item.icon}
              text={item.text}
              isActive={activeMenu === index}
              onClick={() => setActiveMenu(index)}
            />
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

// Web Dashboard
const WebDashboard = () => {
  const [activeMenu, setActiveMenu] = useState(0);
  const toggleSubMenu = (index) =>
    setActiveMenu(activeMenu === index ? 0 : index);

  const renderComponent = () => {
    switch (activeMenu) {
      case 0:
        return <MenuDashboard />;
      case 1:
        return <MenuGeneralInformation />;
      case 3:
        return <MenuChatbot />;
      case 4:
        return <MenuAppointments />;
      default:
        return null;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col className="col-4 dashboard-menu-box">
          <Row className="text-center">
            <h3>Welcome Arko to the Dashboard!</h3>
          </Row>
          <Row>
            <WebMenuList
              toggleSubMenu={toggleSubMenu}
              setActiveMenu={setActiveMenu}
              activeMenu={activeMenu}
            />
          </Row>
        </Col>
        <Col>
          <Container>{renderComponent()}</Container>
        </Col>
      </Row>
    </Container>
  );
};

// Mobile Dashboard { TEMPORARY }
const MobileDashboard = () => {
  return <h2>Dashboard Mobile</h2>;
};

// Dashboard Component Main
const Dashboard = ({ windowWidth }) => {
  // const location = useLocation();
  // const userEmail = location.state && location.state.userEmail;

  const dashboard = useMemo(() => {
    return windowWidth >= 992 ? <WebDashboard /> : <MobileDashboard />;
  }, [windowWidth]);
  return dashboard;
};

export default Dashboard;
