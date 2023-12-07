import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export function Contact(props) {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Contact us</h2>
          <p> <h6>You can contact us through our email</h6> </p>
          <p> Email: contactus@yourmoviereviews.test.com.eu</p>
        </Col>
      </Row>
    </Container>
  )
}