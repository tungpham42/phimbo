import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faUndo,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const EMBED_URL = process.env.REACT_APP_EMBED_URL;

const StreamPlayer = () => {
  const { id, season, episode } = useParams();
  const [show, setShow] = useState({});
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [totalSeasons, setTotalSeasons] = useState(0);

  const embedUrl = `${EMBED_URL}?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [showRes, seasonRes] = await Promise.all([
          axios.get(`${BASE_URL}/tv/${id}`, {
            params: { api_key: API_KEY, language: "vi" },
          }),
          axios.get(`${BASE_URL}/tv/${id}/season/${season}`, {
            params: { api_key: API_KEY, language: "vi" },
          }),
        ]);

        setShow(showRes.data);
        setTotalSeasons(showRes.data.number_of_seasons);
        setTotalEpisodes(seasonRes.data.episodes.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, season]);

  return (
    <Container className="mt-4 text-center">
      <h2 className="mb-3">
        Phim "{show.name}" - Tập {episode} (Mùa {season})
      </h2>

      <iframe
        src={embedUrl}
        width="100%"
        height="500px"
        allowFullScreen
        title={`Tập ${episode} Mùa ${season}`}
        style={{ border: "none" }}
      />

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-3 mb-2">
        {episode > 1 && (
          <Link to={`/xem/${id}/${season}/${parseInt(episode) - 1}`}>
            <Button variant="warning">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Tập trước
            </Button>
          </Link>
        )}
        {episode < totalEpisodes && (
          <Link to={`/xem/${id}/${season}/${parseInt(episode) + 1}`}>
            <Button variant="primary">
              Tập sau
              <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </Button>
          </Link>
        )}
        {season > 1 && (
          <Link to={`/xem/${id}/${parseInt(season) - 1}/1`}>
            <Button variant="danger">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Mùa trước
            </Button>
          </Link>
        )}
        {season < totalSeasons && (
          <Link to={`/xem/${id}/${parseInt(season) + 1}/1`}>
            <Button variant="success">
              Mùa sau
              <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </Button>
          </Link>
        )}
      </div>

      {/* Back to Movie & Home Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-3 mb-5">
        <Link to={`/chi-tiet/${id}`}>
          <Button variant="secondary">
            <FontAwesomeIcon icon={faUndo} className="me-2" />
            Quay về phim
          </Button>
        </Link>
        <Link to="/">
          <Button variant="secondary">
            <FontAwesomeIcon icon={faHome} className="me-2" />
            Quay về trang chủ
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default StreamPlayer;
