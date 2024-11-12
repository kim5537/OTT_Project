const API_KEY = "0bfa8e0db1de8e824bd0d70046c726e4";
const BASE_PATH = "https://api.themoviedb.org/3";

interface Movie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  original_title: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  adults: boolean;
}

export interface GetMoviesResult {
  dates: {
    maximum: string;
    minimun: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const getMovies = () => {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-kr`
  ).then((response) => response.json());
};

export const searchContents = (keyword: string) => {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${keyword}&language=ko-kr`
  ).then((response) => response.json());
};

// export const searchContents = (keyword: string) => {
//   return fetch(
//     `${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko-kr&query=${keyword}`
//   ).then((response) => response.json());
// };

export const searchGeneres = () => {
  return fetch(`${BASE_PATH}/genre/movie/list?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};
