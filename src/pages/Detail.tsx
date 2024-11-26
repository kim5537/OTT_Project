import {
  getVideos,
  getMovies,
  GetMoviesResult,
  searchGeneres,
  getReviews,
  getCredits,
} from "../api";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import YouTube from "react-youtube";
import styled from "styled-components";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { makeImagePath } from "../utils";

const Container = styled.div`
  background-color: ${(props) => props.theme.black.veryDark};
  width: 100%;
  height: 140vh;
  padding: 0 60px;
`;
const Loader = styled.div``;

const Inner = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1900px;
  padding: 10px 20px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
  margin: 60px auto;
`;
const Left = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MovieWrap = styled.div``;

const Crewrap = styled.div`
  width: 100%;
  height: 340px;
  background-color: ${({ theme }) => theme.black.lighter};
  border-radius: 16px;
  padding: 40px 60px;
`;

const CrewList = styled.div`
  font-size: 1.6rem;
`;

const CrewImgWrap = styled.div`
  display: flex;
  max-width: 1000px;
  margin: 20px auto;
  justify-content: space-between;
  div {
    width: 140px;
    height: 140px;
  }
`;

const CrewName = styled.h5`
  margin-top: 6px;
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.white.darker};
`;

const CharacName = styled.div`
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
  color: ${({ theme }) => theme.white.darker};
  opacity: 0.6;
`;

const Right = styled.div`
  height: inherit;
`;

const RightWrap = styled.div`
  position: sticky;
  top: 70px;
  background-color: ${(props) => props.theme.black.lighter};
  min-height: 800px;
  padding: 40px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.white.lighter};
  word-break: keep-all;
`;

const SubTitle = styled.h3`
  color: ${({ theme }) => theme.white.darker};
  font-weight: 400;
  margin-bottom: 14px;
  margin-left: 4px;
`;
const VoteAndAdult = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 10px;
`;
const Wrap = styled(motion.div)``;

const GenreItem = styled.div`
  display: flex;
  gap: 2%;
`;

const Box = styled.div`
  height: 30px;
  padding: 10px 14px;
  height: auto;
  background-color: ${({ theme }) => theme.black.veryDark};
  border-radius: 10px;
  color: ${({ theme }) => theme.white.lighter};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ReviewTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  h3 {
    margin-top: 8px;
  }
`;

const ReviewBox = styled.div`
  height: 300px;
  padding: 10px 14px;
  background-color: ${({ theme }) => theme.black.veryDark};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Review = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 300px;
  width: 100%;
  padding: 20px 10px 20px 20px;
  /* text-overflow: clip; */
`;

const ReviewTitle = styled(motion.div)``;

const ReviewDesc = styled.div`
  color: ${({ theme }) => theme.white.darker};
  opacity: 0.8;
  height: 220px;
  width: 100%;
  overflow-wrap: break-word;
  overflow-y: scroll;
  padding-right: 6px;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.white.darker};
    opacity: 0.8;
    border-radius: 4px;
  }
`;

interface GeneresItem {
  id: number;
  name: string;
}

interface ReviewResult {
  author: string;
  author_details: {
    avatar_path: string | null;
    name: string;
    rating: number | null;
    username: string;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

interface castType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

const Detail = () => {
  const [leaving, setLeaving] = useState(false);
  const [leavingCrew, setLeavingCrew] = useState(false);
  const [index, setIndex] = useState(0);
  const [crewIndex, setCrewIndex] = useState(0);
  const { movieId } = useParams<{ movieId: string }>();

  const offset = 1;
  const offset2 = 5;

  const { data, isLoading } = useQuery<GetMoviesResult>({
    queryKey: ["nowMovie"],
    queryFn: getMovies,
  });
  //해당영화정보
  const nowMovie = data?.results.filter(
    (movie) => movie.id === Number(movieId)
  )[0];
  //해당영화 id
  const nowMovieId = data?.results.filter(
    (movie) => String(movie.id) === movieId
  )[0].id;
  //영화 유투브
  const { data: video, isLoading: videoLoding } = useQuery({
    queryKey: ["video", nowMovieId],
    queryFn: async () => {
      if (!nowMovieId) return { results: [] };
      return await getVideos(nowMovieId);
    },
  });
  //영화 장르
  const { data: genres, isLoading: genreLoding } = useQuery({
    queryKey: ["genre"],
    queryFn: searchGeneres,
  });
  //영화 리뷰
  const { data: reviews, isLoading: reviewsLoding } = useQuery({
    queryKey: ["reviews", nowMovieId],
    queryFn: async () => {
      if (!nowMovieId) return { results: [] };
      return await getReviews(nowMovieId);
    },
  });
  //영화 출연진
  const { data: credits, isLoading: creditsLoding } = useQuery({
    queryKey: ["credits", nowMovieId],
    queryFn: async () => {
      if (!nowMovieId) return { results: [] };
      return await getCredits(nowMovieId);
    },
  });
  console.log(credits);
  //슬라이드
  //출연진 슬라이드
  const toggleCrew = () => setLeavingCrew((prev) => !prev);

  // const crewIndexFn = (bt: string) => {
  //   if (credits) {
  //     //사용할 data 값 - 15명의 배우들
  //     setLeavingCrew(true);
  //     const castsLeng = credits.cast.slice(0, 15).length;
  //     const maxIndex = Math.ceil(castsLeng.length / offset2) - 1;
  //     if (bt === "right") {
  //       setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  //     } else {
  //       setIndex((prev) => (prev === maxIndex ? maxIndex : prev - 1));
  //     }
  //   }
  // };
  //리뷰 슬라이드
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const reviewIndex = () => {
    if (reviews) {
      setLeaving(true);
      const totalReviews = reviews.results.length;
      const maxIndex = Math.ceil(totalReviews / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const rowVariants = {
    hidden: {
      x: window.innerWidth + 10,
    },
    visible: {
      x: 0,
    },
    exit: {
      x: -window.innerWidth - 10,
    },
  };
  return (
    <Container>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Inner>
            <Left>
              <MovieWrap>
                {videoLoding ? (
                  <Loader>Loading...</Loader>
                ) : (
                  <YouTube
                    videoId={video?.results[0].key}
                    opts={{ width: "100%", height: "680px" }}
                  />
                )}
              </MovieWrap>
              <Crewrap>
                <CrewList>
                  <Wrap>
                    <SubTitle>Cast</SubTitle>
                  </Wrap>
                  <CrewImgWrap>
                    <AnimatePresence
                      initial={false}
                      onExitComplete={toggleCrew}
                    >
                      {credits?.cast
                        .slice(0, 15)
                        .slice(
                          crewIndex * offset2,
                          crewIndex * offset2 + offset2
                        )
                        .map((cast: castType) => (
                          <Wrap>
                            <Box>
                              <img
                                src={makeImagePath(cast.profile_path)}
                                width={"140px"}
                              />
                            </Box>
                            <CrewName>{cast.name}</CrewName>
                            <CharacName>{cast.character}</CharacName>
                          </Wrap>
                        ))}
                    </AnimatePresence>
                  </CrewImgWrap>
                </CrewList>
              </Crewrap>
            </Left>
            <Right>
              <RightWrap>
                <Title>{nowMovie?.title}</Title>
                <VoteAndAdult>
                  <Wrap>
                    <SubTitle>평점</SubTitle>
                    <Box>{nowMovie ? nowMovie.vote_average.toFixed(1) : 0}</Box>
                  </Wrap>
                  <Wrap>
                    <SubTitle>나이</SubTitle>
                    <Box>{nowMovie?.adult ? "Adult" : "ALL"}</Box>
                  </Wrap>
                </VoteAndAdult>
                <Wrap>
                  <SubTitle>장르</SubTitle>
                  <GenreItem>
                    {nowMovie?.genre_ids.map((genreId) => (
                      <Box key={genreId}>
                        {
                          genres?.genres.find(
                            (item: GeneresItem) => item.id === genreId
                          ).name
                        }
                      </Box>
                    ))}
                  </GenreItem>
                </Wrap>
                <Wrap>
                  <ReviewTitleWrap>
                    <SubTitle>리뷰</SubTitle>
                    <Box onClick={reviewIndex}> {">"} </Box>
                  </ReviewTitleWrap>
                  <ReviewBox>
                    <AnimatePresence
                      initial={false}
                      onExitComplete={toggleLeaving}
                    >
                      <Review
                        key={index}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ type: "tween", duration: 1 }}
                      >
                        {reviews?.results.length === 0 ? (
                          <Wrap>
                            <ReviewDesc>리뷰가 없습니다</ReviewDesc>
                          </Wrap>
                        ) : (
                          reviews?.results
                            .slice(index * offset, index * offset + offset)
                            .map((review: ReviewResult) => (
                              <Wrap key={review.id}>
                                <ReviewTitle>
                                  <SubTitle>{review.author}</SubTitle>
                                </ReviewTitle>
                                <ReviewDesc>{review.content}</ReviewDesc>
                              </Wrap>
                            ))
                        )}
                      </Review>
                    </AnimatePresence>
                  </ReviewBox>
                </Wrap>
              </RightWrap>
            </Right>
          </Inner>
        </>
      )}
    </Container>
  );
};

export default Detail;
