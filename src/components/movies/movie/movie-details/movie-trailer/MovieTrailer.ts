import { getMovieTrailer } from '@services/movies/movies.service';
import { createElement, replaceElementWithAttr, replaceElementWithId } from '@lib/dom';
import html from '@lib/html';
import createPubSub from '@lib/state';
import styles from './MovieTrailer.module.scss';

type MovieTrailerProps = {
  movieId: string;
};

const MovieTrailer = ({ movieId }: MovieTrailerProps) => {
  const elementId = `movie-trailer-${movieId}`;
  const state = { trailerId: '', loading: true };
  const statePubSub = createPubSub<{ trailerId: string; loading: boolean }>();

  const getTemplate = (id: string) => html`
    <div class="${styles.videoContainer}" data-id="${elementId}" data-testid="movie-trailer">
      <iframe
        width="100%"
        height="200"
        class="${styles.video}"
        src="https://www.youtube-nocookie.com/embed/${id}?controls=1&rel=0&autoplay=1"
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  `;

  getMovieTrailer(movieId).then((data) => {
    statePubSub.publish({ trailerId: data!, loading: false });
  });

  statePubSub.subscribe((newState) => {
    if (newState.trailerId) {
      replaceElementWithId(elementId, getTemplate(newState.trailerId));
    }
    if (state.trailerId !== newState.trailerId) {
      state.trailerId = newState.trailerId;
    }
    if (state.loading !== newState.loading) {
      state.loading = newState.loading;
    }
  });

  return createElement(getTemplate(state.trailerId));
};

export default MovieTrailer;
