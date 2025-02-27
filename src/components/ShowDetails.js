import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Button,
  Spinner,
  Alert,
  Image,
  ListGroup,
  Accordion,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTv, faListUl } from "@fortawesome/free-solid-svg-icons";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seasons, setSeasons] = useState([]);

  const fetchShowDetails = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tv/${id}`, {
        params: { api_key: API_KEY, language: "vi" },
      });
      setShow(response.data);

      const seasonPromises = response.data.seasons.map((season) =>
        axios.get(`${BASE_URL}/tv/${id}/season/${season.season_number}`, {
          params: { api_key: API_KEY, language: "vi" },
        })
      );

      const seasonResponses = await Promise.all(seasonPromises);
      setSeasons(seasonResponses.map((res) => res.data));
    } catch (error) {
      setError("Error fetching show details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchShowDetails();
  }, [fetchShowDetails]);

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!show) return null;

  return (
    <Container className="mt-4 col-md-6">
      <h2 className="mb-3">
        <FontAwesomeIcon icon={faTv} className="me-2" />
        {show.name}
      </h2>
      <p>{show.overview || "No description available."}</p>
      <Image
        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
        alt={show.name}
        fluid
        rounded
        className="mb-3"
      />

      {/* Seasons and Episodes Info */}
      <h4 className="mt-4">
        <FontAwesomeIcon icon={faListUl} className="me-2" /> Mùa & Tập
      </h4>
      <ListGroup className="mb-3">
        <ListGroup.Item>
          <strong>Số Mùa:</strong> {show.number_of_seasons}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Số Tập:</strong> {show.number_of_episodes}
        </ListGroup.Item>
      </ListGroup>

      {/* Accordion to Show All Seasons and Episodes */}
      <Accordion className="mb-4">
        {seasons.map((season) => (
          <Accordion.Item
            eventKey={season.season_number.toString()}
            key={season.id}
          >
            <Accordion.Header>
              <strong>Mùa {season.season_number}</strong> (
              {season.episodes.length} Tập)
            </Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                {season.episodes.map((episode) => (
                  <ListGroup.Item key={episode.id}>
                    <Link
                      to={`/xem/${id}/${season.season_number}/${episode.episode_number}`}
                    >
                      <Button variant="outline-primary" size="sm">
                        <FontAwesomeIcon icon={faTv} className="me-2" />
                        Tập {episode.episode_number}: {episode.name}
                      </Button>
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Back to Home Button */}
      <Link to="/">
        <Button variant="secondary" className="mb-5">
          <FontAwesomeIcon icon={faHome} className="me-2" /> Quay về trang chủ
        </Button>
      </Link>
    </Container>
  );
};

export default ShowDetails;
