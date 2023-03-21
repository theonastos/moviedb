import { MovieType } from '@models/movie/movie';
import { createElement, replaceElementWithId } from '@lib/dom';
import html from '@lib/html';
import { setQueryParam } from '@utils/query';
import eventBus from '@lib/event-bus';
import { formatDate } from '@utils/date';
import styles from './MovieListing.module.scss';

type MovieListingProps = {
  movie: MovieType;
};

const imgRepoUrl = `${process.env.MOVIE_DB_IMAGE_REPOSITORY_BASE_URL}/w154` ?? '';

const MovieListing = ({ movie }: MovieListingProps) => {
  const headerTemplate = html`
    <button data-on-click="onClick" class="${styles.movieListing}" data-testid="movie-listing-button">
      <img 
        class="${styles.img}" 
        src="${movie.poster_path ? `${imgRepoUrl}${movie.poster_path}` : ''}"
        alt="${movie.title}-poster"
        data-testid="movie-listing-img"
      />
      <h4 class="${styles.title}">${movie.title}</h3>
      <p class="${styles.releaseDate}">${formatDate(movie.release_date)}</p>
      <p class="${styles.votes}">${movie.vote_average.toFixed(1)} / 10</p>
      <p class="${styles.overview}">${movie.overview}</p>
    </div>
  `;

  const onClick = () => {
    setQueryParam('movieId', `${movie.id}`);
    eventBus.getInstance().dispatch('MOVIE_DETAILS_TRIGGERED');
  };

  return createElement(headerTemplate, {onClick});
};

export default MovieListing;
