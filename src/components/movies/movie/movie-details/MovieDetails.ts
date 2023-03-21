import html from '@lib/html';
import SimilarMovies from '@components/movies/movie/movie-details/similar-movies/SimilarMovies';
import MovieReviews from '@components/movies/movie/movie-details/movie-reviews/MovieReviews';
import MovieTrailer from '@components/movies/movie/movie-details/movie-trailer/MovieTrailer';
import styles from './MovieDetails.module.scss';

type MovieDetailsProps = {
  movieId: string;
};

const MovieDetails = ({ movieId }: MovieDetailsProps) => {
  const template = html`
    <section class="${styles.reviewsContainer}">${MovieTrailer({ movieId })} ${MovieReviews({ movieId })} ${SimilarMovies({ movieId })}</section>
  `;

  return template;
};

export default MovieDetails;
