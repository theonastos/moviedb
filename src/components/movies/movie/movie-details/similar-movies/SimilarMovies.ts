import { createElement, replaceElementWithId } from '@lib/dom';
import html from '@lib/html';
import createPubSub from '@lib/state';
import { SimilarMovie } from '@models/movie/movie';
import { getSimilarMovies } from '@services/movies/movies.service';
import styles from './SimilarMovies.module.scss';

type SimilarMoviesProps = {
  movieId: string;
};

const imgRepoUrl = `${process.env.MOVIE_DB_IMAGE_REPOSITORY_BASE_URL}/w92` ?? '';

const SimilarMovies = ({ movieId }: SimilarMoviesProps) => {
  const elementId = `similar-movies-${movieId}`;
  const state = { data: [], loading: true };
  const statePubSub = createPubSub<{ data: SimilarMovie[]; loading: boolean }>();

  const getTemplate = (data: SimilarMovie[]) => {
    return html` <div id="${elementId}" class="${styles.similarMoviesContainer}">
      ${!!data.length ? html`<h4 class="${styles.sectionTitle}">Similar Movies</h4>` : ''}
      <div class="${styles.similarMovies}">
        ${data.slice(0, 6).map((movie: SimilarMovie) => {
          return html`
            <div class="${styles.similarMovie}">
              <img class="${styles.similarMovieImg}" src="${movie.poster_path ? `${imgRepoUrl}${movie.poster_path}` : ''}" alt="${movie.title}-poster" />
              <p class="${styles.similarMovieTitle}">${movie.title}</p>
            </div>
          `;
        })}
      </div>
    </div>`;
  };

  getSimilarMovies(movieId).then((data) => {
    statePubSub.publish({ data, loading: false });
  });

  statePubSub.subscribe((newState) => {
    if (newState.loading) {
      // render loading
    } else {
      replaceElementWithId(elementId, getTemplate(newState.data));
    }
  });

  return createElement(getTemplate(state.data));
};

export default SimilarMovies;
