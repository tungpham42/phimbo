import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowList from "./components/ShowList";
import ShowDetails from "./components/ShowDetails";
import StreamPlayer from "./components/StreamPlayer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/chi-tiet/:id" element={<ShowDetails />} />
        <Route path="/chieu-phim/:id/:season/:episode" element={<StreamPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
