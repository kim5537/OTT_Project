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

const Container = styled.div`
  background-color: ${(props) => props.theme.black.veryDark};
  width: 100%;
  height: 140vh;
  padding: 0 60px;
`;
const Loader = styled.div``;

const Inner = styled.div`
  height: inherit;
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
`;

const MovieWrap = styled.div``;

const Right = styled.div`
  height: inherit;
`;

const RightWrap = styled.div`
  position: sticky;
  top: 70px;
  background-color: ${(props) => props.theme.black.lighter};
  height: 800px;
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
  align-items: center;
  gap: 20px;
`;
const Wrap = styled.div``;
const GenreItem = styled.div`
  display: flex;
  gap: 10px;
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
`;

const BoxMotion = styled(motion.div)``;

const Review = styled(motion.div)`
  position: absolute;
  width: 100%;
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

interface ReviewType {
  id: number;
  page: number;
  results: ReviewResult[];
  total_pages: number;
  total_results: number;
}
const Detail = () => {
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const offset = 1;
  const { data, isLoading } = useQuery<GetMoviesResult>({
    queryKey: ["nowMovie"],
    queryFn: getMovies,
  });
  const { movieId } = useParams<{ movieId: string }>();
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
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const reviewIndex = () => {
    if (reviews) {
      setLeaving(true);
      const maxIndex = Math.ceil(reviews / offset) - 1;
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
  const boxVariants = {
    normal: { scale: 1 },
    hover: {
      scale: 1.3,
      y: -50,
      transition: { delay: 0.5, duration: 0.3, type: "tween" },
    },
  };

  console.log(reviews);
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
            </Left>
            <Right>
              <RightWrap>
                <Title>{nowMovie?.title}</Title>
                <VoteAndAdult>
                  <Wrap>
                    <SubTitle>평점</SubTitle>
                    <Box>{nowMovie?.vote_average}</Box>
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
                      <Box>
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
                  <SubTitle>리뷰</SubTitle>
                  <Box style={{ height: "200px" }}>
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
                        {reviews?.results
                          .slice(index * offset, index * offset + offset)
                          .map((review: ReviewResult) => (
                            <BoxMotion
                              key={review.id}
                              variants={boxVariants}
                              initial="normal"
                              whileHover="hover"
                            >
                              <SubTitle>{review.author}</SubTitle>
                            </BoxMotion>
                          ))}
                      </Review>
                    </AnimatePresence>
                  </Box>
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
