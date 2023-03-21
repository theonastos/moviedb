import { createElement, replaceElementWithId } from '@lib/dom';
import html from '@lib/html';
import createPubSub from '@lib/state';
import { MovieReview } from '@models/movie/movie';
import { getMovieReviews } from '@services/movies/movies.service';
import userIcon from '@assets/svgs/user-icon.svg';
import { formatDate } from '@utils/date';
import styles from './MovieReviews.module.scss';

type MovieReviewsProps = {
  movieId: string;
};

const imgRepoUrl = `${process.env.MOVIE_DB_IMAGE_REPOSITORY_BASE_URL}/w92` ?? '';

const getThumbnailUrl = (path: string) => {
  if (path && /^(http|\/http)/.test(path)) return path.replace(/^\/+/g, '');
  if (path.startsWith('/')) return `${imgRepoUrl}${path}`;
  return userIcon;
}


const MovieReviews = ({ movieId }: MovieReviewsProps) => {
  const elementId = `movie-reviews-${movieId}`;
  const state = { data: [], loading: true };
  const statePubSub = createPubSub<{ data: MovieReview[]; loading: boolean }>();

  const getTemplate = (data: MovieReview[]) => {
    return html` <div id="${elementId}" class="${styles.moveReviews}" data-testid="reviews-container">
      <div class="${styles.reviews}">
        ${data.slice(0, 2).map((review: MovieReview) => {
          return html`
            <div class="${styles.review}">
              <img 
              class="${styles.icon}" 
              src="${getThumbnailUrl(review.author_details.avatar_path)}" alt="user-icon" />
              <h6 class="${styles.author}">${review.author}</h6>
              <p class="${styles.date}">${formatDate(review.created_at)}</p>
              <div class="${styles.content}">${review.content}</div>
            </div>
          `;
        })}
      </div>
    </div>`;
  };

  const fetchData = async (movieId: string) => {
    try {
      const data = await getMovieReviews(movieId);
      statePubSub.publish({ data, loading: false });
    } catch (error) {
      statePubSub.publish({ data: [], loading: false });
    }
  };

  fetchData(movieId);

  statePubSub.subscribe((newState) => {
    if (newState.loading) {
      // render loading
    } else {
      replaceElementWithId(elementId, getTemplate(newState.data));
    }
  });

  return createElement(getTemplate(state.data));
};

export default MovieReviews;
