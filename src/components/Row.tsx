import React, { useState, useEffect } from "react";
import instance from "../axios";
import styles from "../styles/row.module.scss";
const baseUrl = "https://image.tmdb.org/t/p/original/";

export type RowPropTypes = {
  title: string;
  fetchUrl: string;
  isLargeRow: boolean | null;
};

function Row({ title, fetchUrl, isLargeRow }: RowPropTypes) {
  const [movies, setMovies] = useState<any>([]);
  useEffect(() => {
    const getMovies = async () => {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
    };
    getMovies();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className={styles.row__posters}>
        {movies.map((movie: any) => (
          <img
            key={movie.id}
            className={styles.row__poster}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
