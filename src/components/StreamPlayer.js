import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const StreamPlayer = () => {
  const { id, season, episode } = useParams();
  const embedUrl = `https://hoc.cotuong.top/se_player.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;

  return (
    <Container className="mt-4 text-center">
      <h2 className="mb-3">
        Chiếu Tập {episode} (Mùa {season})
      </h2>
      <iframe
        src={embedUrl}
        width="100%"
        height="500px"
        allowFullScreen
        title={`Tập ${episode} Mùa ${season}`}
        style={{ border: "none" }}
      ></iframe>
      <Link to="/">
        <Button variant="secondary" className="mb-5">
          Quay về trang chủ
        </Button>
      </Link>
    </Container>
  );
};

export default StreamPlayer;
