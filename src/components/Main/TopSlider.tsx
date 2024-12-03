import React from "react";
import styled from "styled-components";
import { makeImagePath } from "../../utils";
import { useNavigate } from "react-router-dom";
import { Movie } from "../../api";

interface Top10SliderProps {
  movies: any[];
}

const Container = styled.div`
  width: 100%;
  position: relative;
  margin-top: 30px;
`;

const Title = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.white.lighter};
  padding-left: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
    padding-left: 10px;
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
  overflow-x: hidden;
  overflow-y: hidden;

  @media (max-width: 1024px) {
    gap: 30px;
  }

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const Box = styled.div<{ bgPhoto: string }>`
  position: relative;
  width: 200px;
  height: 300px;
  background: url(${(props) => props.bgPhoto}) center/cover no-repeat;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 1024px) {
    width: 180px;
    height: 270px;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 220px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 180px;
  }
`;

const Rank = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 100px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
  z-index: 0;

  @media (max-width: 1024px) {
    font-size: 80px;
  }

  @media (max-width: 768px) {
    font-size: 60px;
  }

  @media (max-width: 480px) {
    font-size: 40px;
  }
`;

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  width: 80%;
  position: absolute;
  bottom: 14px;
  right: 18px;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 12px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 14px;

  @media (max-width: 1024px) {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 8px;
    padding: 5px;
  }

  span {
    display: inline-block;
    background-color: ${(props) => props.theme.blue.lighter};
    padding: 5px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    margin-top: 8px;

    @media (max-width: 1024px) {
      font-size: 10px;
    }

    @media (max-width: 768px) {
      font-size: 8px;
    }

    @media (max-width: 480px) {
      font-size: 6px;
    }
  }
`;

const TopSlider: React.FC<Top10SliderProps> = ({ movies }) => {
  const history = useNavigate();

  // 상세 페이지 이동
  const onDetail = ({ movie }: { movie: Movie }) => {
    history(`/movies/${movie.id}`);
  };

  return (
    <Container>
      <Title>👑 오늘 대한민국의 TOP 6 시리즈</Title>
      <SliderWrapper>
        {movies.slice(0, 6).map((movie, index) => (
          <Box
            onClick={() => onDetail({ movie })}
            key={movie.id}
            bgPhoto={makeImagePath(movie.backdrop_path || "")}
          >
            <Rank>{index + 1}</Rank>
            <Overlay>
              <div>{movie.title}</div>
              <span>{index === 0 ? "최신 등록" : "새로운 에피소드"}</span>
            </Overlay>
          </Box>
        ))}
      </SliderWrapper>
    </Container>
  );
};

export default TopSlider;
