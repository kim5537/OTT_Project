<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useState } from "react";
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getMovies, GetMoviesResult, Movie } from "../api";
import { makeImagePath } from "../utils";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import SliderComponent from "../components/Main/Slider";
import TopSlider from "../components/Main/TopSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Loading from "../components/Loading";
=======
import SliderComponent from "../components/Main/Slider";
import TopSlider from "../components/Main/TopSlider";
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9

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

const Banner = styled.div<{ $bgPhoto: string }>`
  width: 100%;
  height: 680px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  position: relative;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)),
<<<<<<< HEAD
    url(${(props) => props.$bgPhoto}) center/cover no-repeat;
  overflow: hidden;
  cursor: pointer;
=======
    url(${(props) => props.bgPhoto}) center/cover no-repeat;
  overflow: hidden;
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
`;

const Title = styled.h2`
  font-size: 60px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.white.lighter};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
<<<<<<< HEAD
  @media (max-width: 768px) {
    font-size: 40px;
  }
=======
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
`;

const Overview = styled.p`
  font-size: 24px;
  color: ${(props) => props.theme.white.darker};
  width: 50%;
  line-height: 1.5;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
<<<<<<< HEAD

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 20px;
=======
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
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
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
<<<<<<< HEAD
  padding: 0 20px;
=======
  padding: 10px 20px;
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
`;

const GenreSelectorTitle = styled.h3`
  font-size: 24px;
  color: ${(props) => props.theme.white.lighter};
  margin-bottom: 40px;
<<<<<<< HEAD

  @media (max-width: 768px) {
    font-size: 22px;
  }
=======
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
`;

const GenreSelector = styled.div`
  display: flex;
<<<<<<< HEAD
  gap: 20px;
=======
  gap: 10px;
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
  margin: 10px;
  button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    color: ${(props) => props.theme.white.lighter};
    cursor: pointer;

<<<<<<< HEAD
    @media (max-width: 768px) {
      flex-wrap: wrap;
      font-size: 14px;
    }

=======
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
    &:hover {
      background: ${(props) => props.theme.blue.darker};
    }
  }
`;

const slideTitles = [
  "🫰 회원님을 위한 오늘의 추천 콘텐츠",
  "🥸 주말 정복 필수 리스트",
  "🔥 지금 뜨고 있는 콘텐츠",
  "👑 어워드 수상 콘텐츠",
];

const Home = () => {
  const { data, isLoading } = useQuery<GetMoviesResult>({
    queryKey: ["nowPlaying"],
    queryFn: getMovies,
  });

<<<<<<< HEAD
  const history = useNavigate();

=======
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const filteredMovies = selectedGenre
    ? data?.results.filter((movie) =>
        movie.genre_ids.includes(parseInt(selectedGenre))
      )
    : null;

<<<<<<< HEAD
  // 상세 페이지 이동
  const onDetail = (movieId: number) => {
    history(`/movies/${movieId}`);
  };

  //슬라이드 설정
  const settings = {
    infinite: true, // 무한 루프
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 한 번에 이동할 슬라이드 수
    autoplay: true, // 자동 재생
    autoplaySpeed: 4000,
    centerMode: false,
    fade: true,
  };
  // 로딩 상태 확인
  useEffect(() => {
    const timer = setTimeout(() => setIsDelayedLoading(false), 4000); // 2초 로딩 추가
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 클리어
  }, []);
  const [isDelayedLoading, setIsDelayedLoading] = useState<boolean>(true);
  const isCurrentlyLoading = isLoading || isDelayedLoading;

=======
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
  return (
    <Container>
      {isCurrentlyLoading ? (
        <Loader>
          <Loading />
        </Loader>
      ) : (
        <>
          {data?.results[0] && (
            <>
<<<<<<< HEAD
              <div style={{ overflow: "hidden" }}>
                <Slider {...settings}>
                  {data.results.slice(0, 5).map((movie) => (
                    <div key={movie.id}>
                      <Banner
                        $bgPhoto={makeImagePath(movie.backdrop_path || "")}
                      >
                        <Title>{movie.original_title}</Title>
                        <Overview>{movie.overview}</Overview>
                        <ButtonGroup>
                          <BannerButton onClick={() => onDetail(movie.id)}>
                            ▶ 더보기
                          </BannerButton>
                        </ButtonGroup>
                      </Banner>
                    </div>
                  ))}
                </Slider>
              </div>
              <GenreSelectorWrapper>
                <GenreSelectorTitle>
                  📚 오늘은 어떤 영화를 소개해드릴까요?
=======
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
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
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
<<<<<<< HEAD
=======
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
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
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
              } 소개해드릴게요😁`}
            />
          )}
          {data && <TopSlider />}
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
