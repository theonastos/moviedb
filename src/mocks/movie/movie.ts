import { MovieReview, MovieType } from '@models/movie/movie';

export const movieMock: MovieType = {
  id: 1,
  title: 'The Shawshank Redemption',
  poster_path: '/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg',
  release_date: '1994-09-23',
  vote_average: 8.7,
  vote_count: 19548,
  overview: 'Short overview of the movie',
  adult: false,
  backdrop_path: '/xBKGJQsAIeweesB79KC89FpBrVr.jpg',
  genre_ids: [18, 80],
  original_language: 'en',
  original_title: 'The Shawshank Redemption',
  popularity: 51.403,
  video: false,
};

export const movieReviewsMock: MovieReview[] = [
  {
    author: 'author1',
    content: 'content1',
    id: '1',
    url: 'url1',
    author_details: {
      avatar_path: 'avatar_path',
      name: 'name',
      rating: 1,
      username: 'username',
    },
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
  {
    author: 'author2',
    content: 'content2',
    id: '2',
    url: 'url2',
    author_details: {
      avatar_path: 'avatar_path',
      name: 'name',
      rating: 1,
      username: 'username',
    },
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
  {
    author: 'author3',
    content: 'content3',
    id: '3',
    url: 'url3',
    author_details: {
      avatar_path: 'avatar_path',
      name: 'name',
      rating: 1,
      username: 'username',
    },
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
];
