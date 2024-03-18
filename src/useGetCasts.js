import { useState, useEffect } from "react";

export function useGetCasts(movieID) {
  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // callback?.();

      const controller = new AbortController();

      async function fetchmovie() {
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

          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieID}/credits`,
            options
          );
          const data = await res.json();
          setCasts(data);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (movieID.length < 3) {
        setCasts([]);
        setError("");
        return;
      }

      fetchmovie();
      return function () {
        controller.abort();
      };
    },
    [movieID]
  );

  return [casts, isLoading, error];
}
