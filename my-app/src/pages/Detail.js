import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ItemImage } from "../components/ItemImage"
import { ReviewForm } from "../components/ReviewForm"
import { Reviews } from "../components/Reviews"

export function Detail(props) {
  const [movieData, setMovieData ] = useState()

  let {id} = useParams()

  useEffect( () => {
    if( !movieData ) {
      props.handler(id).then( (movie) => setMovieData(movie) )
    }
  }, [id])

  if( movieData ) {
    return(
      <Container>
        <Row>
          <Col>
            <h1>{movieData.movie_title}</h1>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <ItemImage source={movieData.cover_image} />
          </Col>
          <Col md={8}>
            <h3>Overview</h3>
            <p>{ movieData.overview }</p>
            <h6><p>Director: { movieData.director }</p>
            <p>Genre: { movieData.genre}</p>
            <p>Rating: { movieData.rating}</p>
            <p>Year: { movieData.year }</p>
            <p>Length: { movieData.length }</p></h6>
          </Col>
        </Row>
        <Row>
          <Col>
            <ReviewForm movietitle={movieData.movie_title} movieId={movieData.id} />
          </Col>
        </Row>
        <Row>
        <Col><Reviews movieId={movieData.id}/>
        </Col>
        </Row>
      </Container>
    )
  }
  else {
    return null
  }
  
}