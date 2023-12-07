import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export function About(props) {
  return (
    <Container>
      <Row>
        <Col>
          <h2>About us</h2>
          <p> <h6>We help you to rate movies</h6> </p>
          <p> Please visit our website to leave your feedback about movies!</p>
        </Col>
      </Row>
    </Container>
  )
}