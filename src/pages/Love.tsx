import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SliderComponent from "../components/Main/Slider";
import { useNavigate } from "react-router-dom";
import { Movie, getMovies } from "../api";

const Container = styled.div`
  width: 100%;
  background: ${(props) => props.theme.black.lighter};
  padding: 30px;
  height: 100vh;
`;

const Title = styled.h2`
  color: white;
  margin-top: 100px;
  padding-left: 30px;
  margin-bottom: 40px;
`;

const Message = styled.div`
  color: ${(props) => props.theme.white.darker};
  font-size: 18px;
  text-align: center;
  margin-top: 50px;
`;

const Love = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]); // 타입 지정
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const savedFavorites = localStorage.getItem("favoriteMovies");
      if (savedFavorites) {
        const movieIds = JSON.parse(savedFavorites) as number[];
        const allMovies = await getMovies();
        const favorites = allMovies.results.filter((movie) =>
          movieIds.includes(movie.id)
        );
        setFavoriteMovies(favorites);
      }
    };

    fetchFavoriteMovies();
  }, []);

  // 영화 클릭 시 상세 페이지로 이동
  const handleMovieClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <Container>
      <Title>내가 즐겨찾는 프로그램</Title>
      <div>
        {favoriteMovies.length > 0 ? (
          <SliderComponent movies={favoriteMovies} onClick={handleMovieClick} />
        ) : (
          <Message>즐겨찾기한 영화가 없습니다.</Message>
        )}
      </div>
    </Container>
  );
};

export default Love;
