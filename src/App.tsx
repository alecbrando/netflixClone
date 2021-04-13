import React from "react";
import "./App.css";
import Row from "./components/Row";
import Banner from "./components/Banner";
import requests from "./requests";

function App() {
  return (
    <div className="App">
      <Banner />
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row
        title="Trending Now"
        fetchUrl={requests.fetchTrending}
        isLargeRow={false}
      />
      <Row
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
        isLargeRow={false}
      />
      <Row
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
        isLargeRow={false}
      />
      <Row
        title="Romantic Movies"
        fetchUrl={requests.fetchRomanceMovies}
        isLargeRow={false}
      />
      <Row
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
        isLargeRow={false}
      />
      <Row
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
        isLargeRow={false}
      />
    </div>
  );
}

export default App;
