import React from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getMovies, GetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import Slider from "../components/Slider";
import TopSlider from "../components/TopSlider";

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
  height: 700px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto}) center/cover no-repeat;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.white.lighter};
`;

const Overview = styled.p`
  font-size: 24px;
  color: ${(props) => props.theme.white.darker};
  width: 50%;
`;

const slideTitles = [
  "🫰 회원님을 위한 오늘의 추천 콘텐츠",
  "🥸 김철수 님이 시청 중인 콘텐츠",
  "🔥 지금 뜨고 있는 콘텐츠",
  "👑 어워드 수상 드라마",
];

const Home = () => {
  const { data, isLoading } = useQuery<GetMoviesResult>({
    queryKey: ["nowPlaying"],
    queryFn: getMovies, // 확장된 getMovies 사용
  });

  return (
    <Container>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {data?.results[0] && (
            <Banner
              bgPhoto={makeImagePath(data.results[0]?.backdrop_path || "")}
            >
              <Title>{data.results[0]?.original_title} </Title>
              <Overview>{data.results[0]?.overview}</Overview>
            </Banner>
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

              return <Slider key={idx} movies={sliderMovies} title={title} />;
            })}
        </>
      )}
    </Container>
  );
};

export default Home;
