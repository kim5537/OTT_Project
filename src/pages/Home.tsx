import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getMovies, GetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import SliderComponent from "../components/Main/Slider";
import TopSlider from "../components/Main/TopSlider";

const Container = styled.div`
  width: 100%;
  background: ${(props) => props.theme.black.lighter};
`;

const Loader = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: ${(props) => props.theme.red};
`;

const Banner = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 680px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  position: relative;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto}) center/cover no-repeat;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.white.lighter};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const Overview = styled.p`
  font-size: 24px;
  color: ${(props) => props.theme.white.darker};
  width: 50%;
  line-height: 1.5;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  animation: fadeIn 2s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const BannerButton = styled.button`
  padding: 14px 20px;
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.white.lighter};
  background: rgba(255, 255, 255, 0.3);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: ${(props) => props.theme.blue.darker};
    color: white;
  }
`;

const GenreSelectorWrapper = styled.div`
  padding: 10px 20px;
`;

const GenreSelectorTitle = styled.h3`
  font-size: 24px;
  color: ${(props) => props.theme.white.lighter};
  margin-bottom: 40px;
`;

const GenreSelector = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px;
  button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    color: ${(props) => props.theme.white.lighter};
    cursor: pointer;

    &:hover {
      background: ${(props) => props.theme.blue.darker};
    }
  }
`;

const slideTitles = [
  "🫰 회원님을 위한 오늘의 추천 콘텐츠",
  "🥸 주말 정복 필수 리스트",
  "🔥 지금 뜨고 있는 콘텐츠",
  "👑 어워드 수상 드라마",
];

const Home = () => {
  const { data, isLoading } = useQuery<GetMoviesResult>({
    queryKey: ["nowPlaying"],
    queryFn: getMovies,
  });

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const filteredMovies = selectedGenre
    ? data?.results.filter((movie) =>
        movie.genre_ids.includes(parseInt(selectedGenre))
      )
    : null;

  return (
    <Container>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {data?.results[0] && (
            <>
              <Banner
                bgPhoto={makeImagePath(data.results[0]?.backdrop_path || "")}
              >
                <Title>{data.results[0]?.original_title}</Title>
                <Overview>{data.results[0]?.overview}</Overview>
                <ButtonGroup>
                  <BannerButton>▶ 더보기</BannerButton>
                </ButtonGroup>
              </Banner>

              <GenreSelectorWrapper>
                <GenreSelectorTitle>
                  📚 오늘은 어떤 장르를 추천해드릴까요?
                </GenreSelectorTitle>
                <GenreSelector>
                  <button onClick={() => setSelectedGenre("28")}>액션🔥</button>
                  <button onClick={() => setSelectedGenre("35")}>
                    코미디🥸
                  </button>
                  <button onClick={() => setSelectedGenre("18")}>
                    드라마😍
                  </button>
                  <button onClick={() => setSelectedGenre("27")}>공포👻</button>
                </GenreSelector>
              </GenreSelectorWrapper>
            </>
          )}

          {selectedGenre && filteredMovies && (
            <SliderComponent
              movies={filteredMovies}
              title={`🎥 오늘은 ${
                {
                  "28": "액션을",
                  "35": "코미디를",
                  "18": "드라마를",
                  "27": "공포를",
                }[selectedGenre]
              } 추천해드릴게요😁`}
            />
          )}
          {data && <TopSlider movies={data.results} />}
          {data &&
            slideTitles.map((title, idx) => {
              const start = idx * 6;
              const end = start + 6;
              const sliderMovies =
                data.results.length >= end
                  ? data.results.slice(start, end)
                  : data.results.slice(start);

              return (
                <SliderComponent
                  key={idx}
                  movies={sliderMovies}
                  title={title}
                />
              );
            })}
        </>
      )}
    </Container>
  );
};

export default Home;
