import React from 'react';

import {
    Col
} from "react-bootstrap";
const ExperienceCard = ({data}) => {
debugger
    return (
        <Col lg="6">
            <div className="text-center">
                {/* <img className="bg-white" src={data.companylogo} alt="" /> */}
                <h3>{data.companyName}</h3>
                <p className="lead">
                    {data.role}
                    <br/>
                    {data.description}
                    <br />
                    {data.date}
                </p>

            </div>
        </Col>
    );
}

export default ExperienceCard;