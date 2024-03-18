import { useState, useEffect } from "react";

export function usePopMovies(type, page) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPage, setTotalPage] = useState();
  useEffect(
    function () {
      // callback?.();

      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjA3OGQwZjFmYjRlNmEzMTdiYTY5ZmZkMGFlNDdjZSIsInN1YiI6IjY1YTY4N2NlZWI2NGYxMDEyNWY1MTUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UqzGL4nq0GfZLDa3dwM-9wRf8J7BCOWr7U81HjzPoIQ",
            },
          };

          fetch(
            `https://api.themoviedb.org/3/movie/${type}?page=${page}`,
            options
          )
            .then((response) => response.json())
            .then((response) => {
              setMovies(response.results);
              setTotalPage(response.total_pages);
            })
            .catch((err) => console.error(err));
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [type, page]
  );

  return { movies, isLoading, error, totalPage };
}
