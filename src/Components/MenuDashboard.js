import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../StyleSheets/Comp.css";

const MenuDashboard = () => {
    return (
        <Container>
            <Row>
                <Col className="col-6">
                <h1>First Half of Dashboard</h1>
                </Col>
                <Col>
                <h1>Second Half of Dashboard</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default MenuDashboard;