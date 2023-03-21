import { waitFor } from '@testing-library/dom';
import MovieReviews from '@components/movies/movie/movie-details/movie-reviews/MovieReviews';
import { movieReviewsMock } from '@mocks/movie/movie';

global.fetch = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    ok: true,
    json: async () => ({ success: true }),
  });
});

describe('MovieReviews', () => {
  let mockFetch: jest.SpyInstance;

  beforeEach(() => {
    mockFetch = jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    mockFetch.mockRestore();
  });

  it('should render movie reviews properly', async () => {
    const movieId = '123';

    const container = document.createElement('div');

    mockFetch.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: async () => ({ results: movieReviewsMock }),
      });
    });

    container.appendChild(MovieReviews({ movieId }));

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith(`https://api.test.org/movie/${movieId}/reviews?api_key=test-api-key`),
    );
  });
});
