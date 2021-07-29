import React from 'react';
import CustomProjectCard from "./CustomProjectCard";
import {
    Container,
    Row,
    Jumbotron
} from "react-bootstrap";

const CustomProjects = ({heading,data}) => {
    return (  
        <section className="section">
            <Container>
                <Jumbotron fluid className="bg-white">
                    <h2 className="display-4 mb-5 text-center">
                        {heading}
                    </h2>
                    <Row>
                        {
                            data.map((element,index) => {
                                return <CustomProjectCard key={index} data={element} />
                            })
                        }
                    </Row>
                </Jumbotron>
            </Container>
        </section>
    );
}
export default CustomProjects;