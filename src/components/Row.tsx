import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import instance from "../axios";
import styles from "../styles/row.module.scss";
// @ts-ignore
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/original/";

export type RowPropTypes = {
  title: string;
  fetchUrl: string;
  isLargeRow: boolean;
};

function Row({ title, fetchUrl, isLargeRow }: RowPropTypes) {
  const [movies, setMovies] = useState<any>([]);
  const [trailerUrl, setTrailerUrl] = useState<any>();
  useEffect(() => {
    const getMovies = async () => {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
    };
    getMovies();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = async (movie: any) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      if (movie?.name) {
        movieTrailer(movie?.name || "")
          .then((url: any) => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
          })
          .catch((error: Error) => console.error(error));
      } else {
        movieTrailer(movie?.title || "")
          .then((url: any) => {
            console.log(url);
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
          })
          .catch((error: Error) => console.error(error));
      }
    }
  };

  return (
    <div className={styles.row}>
      <h2>{title}</h2>
      <div className={styles.row__posters}>
        {movies.map((movie: any) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={
              isLargeRow ? styles.row__posterLarge : styles.row__poster
            }
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>

      {trailerUrl && (
        <YouTube
          videoId={trailerUrl}
          //@ts-ignore
          opts={opts}
        />
      )}
    </div>
  );
}

export default Row;
