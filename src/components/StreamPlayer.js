import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const StreamPlayer = () => {
  const { id, season, episode } = useParams();
  const [show, setShow] = useState({});
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const embedUrl = `https://hoc.cotuong.top/se_player.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;

  const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchTVShow = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tv/${id}`, {
          params: { api_key: API_KEY, language: "vi" },
        });
        setShow(response.data);
      } catch (error) {
        console.error("Error fetching TV show details:", error);
      }
    };

    const fetchSeasonDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/tv/${id}/season/${season}`,
          {
            params: { api_key: API_KEY, language: "vi" },
          }
        );
        setTotalEpisodes(response.data.episodes.length);
      } catch (error) {
        console.error("Error fetching season details:", error);
      }
    };

    fetchTVShow();
    fetchSeasonDetails();
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
      <div className="d-flex justify-content-center gap-3 my-5">
        <Link to={`/chi-tiet/${id}`}>
          <Button variant="secondary">Quay về phim</Button>
        </Link>
        <Link to="/">
          <Button variant="secondary">Quay về trang chủ</Button>
        </Link>
        {episode < totalEpisodes && (
          <Link to={`/xem/${id}/${season}/${parseInt(episode) + 1}`}>
            <Button variant="primary">Tập tiếp theo</Button>
          </Link>
        )}
      </div>
    </Container>
  );
};

export default StreamPlayer;
