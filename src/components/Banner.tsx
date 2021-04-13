import React, { useState, useEffect } from "react";
import instance from "../axios";
import requests from "../requests";
import styles from "../styles/banner.module.scss";
const baseUrl = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    };
    fetchData();
  }, []);

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      //   className={styles.banner}
      style={{
        backgroundSize: "cover",
        color: "white",
        objectFit: "contain",
        height: "448px",
        backgroundImage: `url("${baseUrl}${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className={styles.banner__contents}>
        <h1 className={styles.banner__title}>
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        <div className={styles.banner_buttons}>
          <button
            onClick={() => console.log("CLICKED")}
            className={styles.banner__button}
          >
            Play
          </button>
          <button className={styles.banner__button}>My List</button>
        </div>
        <h1 className={styles.banner__description}>
          {truncate(movie?.overview, 250)}
        </h1>
      </div>
    </header>
  );
}

export default Banner;
