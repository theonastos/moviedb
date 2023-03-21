import { MovieType } from "@models/movie/movie";

/** getSeasonalMovies */

export type GetSeasonalMovies = {
  results: MovieType[];
  totalPages: number;
}

export type GetSeasonalMoviesDto = {
  results: MovieType[];
  total_pages: number;
}

/** getMoviesBySearch */

export type GetMoviesBySearch = {
  results: MovieType[];
  totalPages: number;
}

export type GetMoviesBySearchDto = {
  results: MovieType[];
  total_pages: number;
}

