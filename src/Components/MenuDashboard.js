import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DonutChart from "./DonutChart";
import "../StyleSheets/Comp.css";

const MenuDashboard = () => {
    const dataSets = [
        { id: '1', risk: 25, health: 75 },
        { id: '2', risk: 25, health: 75 },
        { id: '3', risk: 25, health: 75 },
        { id: '4', risk: 25, health: 75 },
        { id: '5', risk: 25, health: 75 },
        { id: '6', risk: 25, health: 75 },
        { id: '7', risk: 25, health: 75 },
        { id: '8', risk: 25, health: 75 },
    ];

    return (
        <Container>
            <Row>
                <Col className="col-6">
                    <h1>First Half of Dashboard</h1>
                </Col>
                <Col style={{ height: '880px', overflowY: 'auto' }}>
                    <h2>Second Half of Dashboard</h2>
                    <Row>
                        {dataSets.map(data => (
                            <Col key={data.id} md={6}>
                                <DonutChart data={[
                                    { label: 'Risk', value: data.risk }, 
                                    { label: 'Health', value: data.health }
                                ]} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default MenuDashboard;
