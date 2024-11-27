import {
  getVideos,
  getMovies,
  GetMoviesResult,
  searchGeneres,
  getReviews,
} from "../api";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import YouTube from "react-youtube";
import styled from "styled-components";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DtailCastSlide from "../components/DtailCastSlide";
import RandomMovieSlide from "../components/RandomMovieSlide";

const Container = styled.div`
  background-color: ${(props) => props.theme.black.veryDark};
  width: 100%;
  height: 100%;
  padding: 0 60px;
  @media screen and (max-width: 800px) {
    padding: 10px;
  }
`;
const Loader = styled.div``;

const Inner = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1900px;
  padding: 60px 20px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    padding: 60px 0px;
  }
`;

const Left = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Right = styled.div`
  height: inherit;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const RightMobile = styled.div`
  height: inherit;
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
  }
`;

const MovieWrap = styled.div`
  div:nth-child(1) {
    border-radius: 14px;
    overflow: hidden;
    @media screen and (max-width: 800px) {
      height: 400px;
      border-radius: 14px;
      overflow: hidden;
    }
    iframe:nth-child(1) {
      height: 100%;
    }
  }
`;

const Crewrap = styled.div`
  width: 100%;
  height: 340px;
  background-color: ${({ theme }) => theme.black.lighter};
  border-radius: 16px;
  padding: 40px 60px;
`;

const RandomMoviewrap = styled.div`
  width: 100%;
  height: 460px;
  background-color: ${({ theme }) => theme.black.lighter};
  border-radius: 16px;
  padding: 40px 60px;
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

const Detail = () => {
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const { movieId } = useParams<{ movieId: string }>();

  const offset = 1;

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
              <RightMobile>
                <RightWrap>
                  <Title>{nowMovie?.title}</Title>
                  <VoteAndAdult>
                    <Wrap>
                      <SubTitle>평점</SubTitle>
                      <Box>
                        {nowMovie ? nowMovie.vote_average.toFixed(1) : 0}
                      </Box>
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
              </RightMobile>
              <Crewrap>
                <DtailCastSlide nowMovieId={nowMovieId} />
              </Crewrap>
              <RandomMoviewrap>
                <RandomMovieSlide />
              </RandomMoviewrap>
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
