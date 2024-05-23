import React from 'react';
import CustomProjectCard from "./CustomProjectCard";
import {
    Container,
    Row,
    Jumbotron
} from "react-bootstrap";
import CustomNewProjectCard from './CustomNewProjectCard';

const CustomProjects = ({heading,data}) => {
    return (  
        <section className="section">
            <Container>
                <Jumbotron fluid className="bg-white">
                    <h2 className="display-4 mb-5 text-center">
                        {heading}
                    </h2>
                    <Row style={{display: 'flex' , justifyContent: 'space-evenly'}}>
                        {
                            data.map((element,index) => {
                                // return <CustomProjectCard key={index} data={element} />
                                return <CustomNewProjectCard key={index} data={element} />
                            })
                        }
                    </Row>
                </Jumbotron>
            </Container>
        </section>
    );
}
export default CustomProjects;