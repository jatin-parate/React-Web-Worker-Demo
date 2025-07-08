import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Children } from "react";

import type { PropsWithChildren } from "react";

export default function Shell({ children }: PropsWithChildren) {
  return (
    <Container className="d-flex flex-column mt-4">
      <Col>
        {Children.map(children, (child) => {
          if (!child) return null;
          return <Row>{child}</Row>;
        })}
      </Col>
    </Container>
  );
}
