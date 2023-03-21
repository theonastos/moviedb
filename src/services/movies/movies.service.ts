import { MovieReview, MovieVideo, SimilarMovie } from '@models/movie/movie';
import {
  GetMoviesBySearch,
  GetMoviesBySearchDto,
  GetSeasonalMovies,
  GetSeasonalMoviesDto,
} from '@services/movies/type';

const baseUrl = process.env.MOVIE_DB_API_URL;
const apiKey = process.env.MOVIE_DB_API_KEY;

export const getSeasonalMovies = async  (page: number): Promise<GetSeasonalMovies> => {
  const response = await fetch(`${baseUrl}/movie/now_playing?api_key=${apiKey}&page=${page}`);
  const data: GetSeasonalMoviesDto = await response.json();
  return { results: data.results, totalPages: data.total_pages };
}

export const getMoviesBySearch = async  (searchTerm: string, page: number): Promise<GetMoviesBySearch> => {
  const response = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${page}`);
  const data: GetMoviesBySearchDto = await response.json();
  return { results: data.results, totalPages: data.total_pages };
}

export const getMovie = async  (id: number): Promise<GetMoviesBySearch> => {
  const response = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}`);
  const data: GetMoviesBySearchDto = await response.json();
  return { results: data.results, totalPages: data.total_pages };
}

export const getMovieTrailer = async  (id: string): Promise<string | null> => {
  const response = await fetch(`${baseUrl}/movie/${id}/videos?api_key=${apiKey}`);
  const data: { results: MovieVideo[] } = await response.json();
  if (!data.results?.length) return null;
  const trailer = data.results.find((entry: any) => entry.type === 'Trailer');
  return trailer ? trailer.key : null;
}

export const getSimilarMovies = async  (id: string): Promise<SimilarMovie[]> => {
  const response = await fetch(`${baseUrl}/movie/${id}/similar?api_key=${apiKey}`);
  const data: { results: SimilarMovie[] } = await response.json();
  return data.results;
}

export const getMovieReviews = async  (id: string): Promise<MovieReview[]> => {
  const response = await fetch(`${baseUrl}/movie/${id}/reviews?api_key=${apiKey}`);
  const data: { results: MovieReview[] } = await response.json();
  return data.results;
}
