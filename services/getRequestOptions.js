import dotenv from "dotenv";

dotenv.config();

export const API_PATH = {
  popularPersons: (page) => `/3/person/popular?page=${page}&api_key=${process.env.API_KEY}`,
  singlePerson: (id) => `/3/person/${id}?api_key=${process.env.API_KEY}`,
  popularMovies: (page) => `/3/movies/popular?page=${page}&api_key=${process.env.API_KEY}`,
  singleMovie: (id) => `/3/movie/${id}&api_key=${process.env.API_KEY}`,
  singleMovieDetails: (id) => `/3/movie/${id}/reviews?api_key=${process.env.API_KEY}`,
};

export const getRequestOptions = (method, payload) => {
  return {
    hostname: "api.themoviedb.org",
    port: 443,
    path: API_PATH[method](payload),
    method: "GET",
  };
};
