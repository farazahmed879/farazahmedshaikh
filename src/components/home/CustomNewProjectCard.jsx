import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

const CustomNewProjectCard = ({ data, index }) => {
  return (
    <Card style={{ width: "18rem", marginTop: "10px" }} key={index}>
      <Card.Img variant="top" src={data.companylogo} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>{data.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <div>
            {data?.lang.map((e, i) => (
              <Badge style={{marginLeft: 2}} variant={e.variant} key={i}>
                {e.name}
              </Badge>
            ))}
          </div>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">{data.link}</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default CustomNewProjectCard;
