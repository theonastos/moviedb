import html from '@lib/html';
import { createElement, getStringFromFragment, getSvgElement } from '@lib/dom';
import { debounce } from '@utils/debounce';
import { MovieType } from '@models/movie/movie';
import createPubSub, { PubSubType } from '@lib/state';
import { getSeasonalMovies, getMoviesBySearch } from '@services/movies/movies.service';
import styles from './MovieList.module.scss';
import MovieListing from '@components/movies/movie/movie-listing/MovieListing';
import Spinner from '@components/ui/spinner/Spinner';

type MovieListState = {
  page: number;
  loading: boolean;
  totalPages: number | null;
  data: MovieType[];
  searchTerm: string;
};

type MovieListProps = {
  searchTermPubSub: PubSubType<string>;
};

const LAST_ELEMENT_ID = 'last-element';
const LOADING_ELEMENT_ID = 'loading-element';
const MOVIE_LIST_ELEMENT_ID = 'movie-list-element';
const NO_RESULTS_ELEMENT_ID = 'no-results-element';

const cancellationToken: { isCancelled: boolean } = { isCancelled: false };

const loadMovies = async (state: MovieListState, setState: (newState: MovieListState) => void) => {
  cancellationToken.isCancelled = true;
  setState({ ...state, loading: true, page: 1, data: [] });
  try {
    cancellationToken.isCancelled = false;
    const movies = state.searchTerm
      ? await getMoviesBySearch(state.searchTerm, state.page)
      : await getSeasonalMovies(state.page);
    if (movies.results.length) {
      // window.scrollTo(0, 0);
      setState({ ...state, loading: false, totalPages: movies.totalPages, data: movies.results });
    } else {
      setState({ ...state, loading: false, data: [] });
    }
  } catch (error) {
    setState({ ...state, loading: false, data: [] });
  }
};

const loadMoreMovies = async (state: MovieListState, setState: (newState: MovieListState) => void) => {
  cancellationToken.isCancelled = true;
  if (state.totalPages && state.page >= state.totalPages) return;
  const newPage = ++state.page;
  setState({ ...state, loading: true, page: newPage });
  try {
    cancellationToken.isCancelled = false;
    const movies = state.searchTerm
      ? await getMoviesBySearch(state.searchTerm, newPage)
      : await getSeasonalMovies(newPage);
    if (movies.results.length) {
      setState({ ...state, loading: false, totalPages: movies.totalPages, data: [...state.data, ...movies.results] });
    } else {
      setState({ ...state, loading: false, data: [] });
    }
  } catch (error) {
    setState({ ...state, loading: false, data: [] });
  }
};

const MovieList = ({ searchTermPubSub }: MovieListProps) => {
  let state: MovieListState = { page: 0, loading: true, totalPages: 0, data: [], searchTerm: '' };
  const statePubSub = createPubSub<MovieListState>();

  // State management
  statePubSub.subscribe((newState: MovieListState) => {
    if (newState.loading !== state.loading) {
      state.loading = newState.loading;
      renderLoading(newState.loading);
    }
    if (newState.data !== state.data) {
      const dataToAppend = !state.data.length
        ? newState.data
        : newState.data.slice(state.data.length + 1, newState.data.length);
      state.data = newState.data;
      render(dataToAppend);
    }
    if (newState.page !== state.page) {
      state.page = newState.page;
    }
    if (newState.searchTerm !== state.searchTerm) {
      state.searchTerm = newState.searchTerm;
      state.page = 1;
      state.data = [];
    }
    if (newState.totalPages !== state.totalPages) {
      state.totalPages = newState.totalPages;
    }
  });

  const setState = (newState: Partial<MovieListState>) => statePubSub.publish({ ...state, ...newState });

  searchTermPubSub.subscribe(
    debounce(async (searchTerm: string) => {
      state.searchTerm = searchTerm;
      await loadMovies(state, setState);
    }, 500),
  );

  // Template handling
  const getMoviesTemplate = (movies: MovieType[]) => {
    return html`${movies.map(
      (movie: MovieType) => html`<li class="${styles.movieElement}">${MovieListing({ movie })}</li>`,
    )}`;
  };

  const template = html`
    <ul id="${MOVIE_LIST_ELEMENT_ID}" class="${styles.moviesWrap}"></ul>
    <span id=${NO_RESULTS_ELEMENT_ID} class="${styles.noMovies}"></span>
    <span id="${LOADING_ELEMENT_ID}" class="${styles.loadingContainer}">${Spinner({ size: 'lg' })}</span>
    <div id="${LAST_ELEMENT_ID}" class="${styles.lastElement}" />
  `;

  // Render methods
  const render = (movies: MovieType[]) => {
    const movieList = document.getElementById(MOVIE_LIST_ELEMENT_ID);
    const noResults = document.getElementById(NO_RESULTS_ELEMENT_ID);
    if (state.page === 1) {
      if (movieList) movieList.innerHTML = '';
      if (noResults) noResults.innerHTML = '';
    }
    if (movies.length) {
      movieList?.appendChild(getMoviesTemplate(movies));
      return;
    }
    if (state.searchTerm && !state.loading) {
      noResults?.appendChild(html`<h4>Sorry... No movies found for<br>"${state.searchTerm}"</h4>`);
    }
  };

  const renderLoading = (loading: boolean) => {
    const loadingEl = document.getElementById(LOADING_ELEMENT_ID);
    if (!loadingEl) return;
    if (loading) {
      loadingEl.classList.add(styles.loading);
    } else {
      loadingEl.classList.remove(styles.loading);
    }
  };

  // Handle Infinite Scroll
  const onLastElementVisible = async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(async (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting && !state.loading) {
        const lastElement = document.getElementById(LAST_ELEMENT_ID);
        if (!lastElement) return;
        observer.disconnect();
        await loadMoreMovies(state, setState);
        observer.observe(lastElement);
      }
    });
  };

  const initIntersectionObserver = () => {
    const observer = new IntersectionObserver(onLastElementVisible, { root: null, threshold: 0 });
    const lastElement = document.getElementById(LAST_ELEMENT_ID);
    if (lastElement) observer.observe(lastElement);
  };

  // Fetch initial data and attach observer
  loadMovies(state, setState).then(() => initIntersectionObserver());

  return createElement(template);
};

export default MovieList;
