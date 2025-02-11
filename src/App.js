import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowList from "./components/ShowList";
import ShowDetails from "./components/ShowDetails";
import StreamPlayer from "./components/StreamPlayer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/phim/:id" element={<ShowDetails />} />
        <Route path="/xem/:id/:season/:episode" element={<StreamPlayer />} />
      </Routes>
    </Router>
  );
};

export default App;
