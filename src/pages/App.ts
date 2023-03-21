import createPubSub from '@lib/state';
import { createElement, getSvgElement, replaceElementWithAttr } from '@lib/dom';
import html from '@lib/html';
import InputWithSuffix from '@components/ui/input-with-suffix/InputWithSuffix';
import MovieList from '@components/movies/MovieList';
import { getQueryParam, removeQueryParam } from '@utils/query';
import eventBus from '@lib/event-bus';
import searchIcon from '@assets/svgs/search-icon.svg';
import MovieDetails from '@components/movies/movie/movie-details/MovieDetails';
import styles from './App.module.scss';

const REVIEW_CONTAINER_ID = 'review-container';
const APP_CONTAINER_ID = 'app-container';

const App = () => {
  const state = { open: false, movieId: '' };

  const searchTermPubSub = createPubSub<string>();

  const onSearch = (event: Event) => {
    const searchTerm = (event.target as HTMLInputElement).value;
    searchTermPubSub.publish(searchTerm);
  };

  const template = html`
    <div data-id="${APP_CONTAINER_ID}" class="${styles.appContainer}">
      <div class="${styles.leftSide}">
        <section class="${styles.searchBarContainer}">
          ${InputWithSuffix({
            placeholder: 'Search for a movie...',
            icon: getSvgElement(searchIcon),
            onInput: onSearch,
          })}
        </section>
        <section class="${styles.moviesContainer}">${MovieList({ searchTermPubSub })}</section>
      </div>
      <div data-id="${REVIEW_CONTAINER_ID}" class="${styles.rightSide}"></div>
    </div>
  `;

  eventBus.getInstance().eventTarget.addEventListener('MOVIE_DETAILS_TRIGGERED', () => {
    const reviewContainer = document.querySelector(`[data-id="${REVIEW_CONTAINER_ID}"]`);
    if (!reviewContainer) return;
    const movieId = getQueryParam('movieId');
    if (movieId && state.movieId !== movieId) {
      state.movieId = movieId;
      reviewContainer.classList.add(styles.open);
      replaceElementWithAttr(`[data-id="${REVIEW_CONTAINER_ID}"]`, MovieDetails({ movieId }));
      return;
    }
    state.movieId = '';
    removeQueryParam('movieId');
    reviewContainer.classList.remove(styles.open);
  });

  return createElement(template, null);
};

export default App;
