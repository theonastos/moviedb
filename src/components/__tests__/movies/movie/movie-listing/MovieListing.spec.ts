import {fireEvent, getByTestId, waitFor, within} from '@testing-library/dom';
import MovieListing from '@components/movies/movie/movie-listing/MovieListing';
import { movieMock } from '@mocks/movie/movie';
import eventBus from '@lib/event-bus';

describe('MovieListing', () => {
  it('should render movie listing properly', () => {
    const container = document.createElement('div');
    container.appendChild(MovieListing({ movie: movieMock }));
    const listing = getByTestId(container, 'movie-listing-button');
    expect(within(listing).getByTestId('movie-listing-img')).toHaveAttribute('src', `${process.env.MOVIE_DB_IMAGE_REPOSITORY_BASE_URL}/w154${movieMock.poster_path}`);
    expect(container).toHaveTextContent(movieMock.title);
    expect(container).toHaveTextContent(movieMock.overview);
    expect(container).toHaveTextContent(`8.7 / 10`);
    expect(container).toHaveTextContent(`23 Sep 1994`);
  });

  it('should update query and trigger event when clicked', async () => {
    let eventTriggered = false;
    eventBus.getInstance().eventTarget.addEventListener('MOVIE_DETAILS_TRIGGERED', () => eventTriggered = true);

    const container = document.createElement('div');
    container.appendChild(MovieListing({ movie: movieMock }));
    const listing = getByTestId(container, 'movie-listing-button');
    fireEvent.click(listing);
    expect(window.location.search).toBe(`?movieId=${movieMock.id}`);
    await waitFor(() => expect(eventTriggered).toBeTruthy());
  });
  
});