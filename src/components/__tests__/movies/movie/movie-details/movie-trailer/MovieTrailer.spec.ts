import { getByTestId, waitFor, prettyDOM } from '@testing-library/dom';
import MovieTrailer from '@components/movies/movie/movie-details/movie-trailer/MovieTrailer';

global.fetch = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    ok: true,
    json: async () => ({ success: true }),
  });
});

describe('MovieTrailer', () => {
  let mockFetch: jest.SpyInstance;

  beforeEach(() => {
    mockFetch = jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    mockFetch.mockRestore();
  });

  it('should render movie trailer iframe', async () => {
    const movieId = '123';

    mockFetch.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          results: [
            {
              key: 'video_key',
              site: 'YouTube',
              type: 'Trailer',
            },
          ],
        }),
      });
    });

    const container = document.createElement('div');
    container.appendChild(MovieTrailer({ movieId }));

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith(`https://api.test.org/movie/${movieId}/videos?api_key=test-api-key`),
    );
  });
});
