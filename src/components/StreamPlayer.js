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
      />
      <div className="d-flex justify-content-center gap-3 my-5">
        <Link to={`/chi-tiet/${id}`}>
          <Button variant="secondary">Quay về phim</Button>
        </Link>
        <Link to="/">
          <Button variant="secondary">Quay về trang chủ</Button>
        </Link>
      </div>
    </Container>
  );
};

export default StreamPlayer;
