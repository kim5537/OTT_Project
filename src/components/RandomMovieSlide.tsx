import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { getCredits, getMovies, Movie } from "../api";
import { useParams } from "react-router-dom";

const SubTitle = styled.h3`
  color: ${({ theme }) => theme.white.darker};
  font-weight: 400;
  margin-bottom: 10px;
  margin-left: 4px;
  font-size: 34px;
`;
const Wrap = styled(motion.div)``;

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

const PosterWrap = styled.div`
  width: 400px;
  height: 200px;
  overflow: hidden;
  object-fit: cover 30%;
  object-position: center;
  border-radius: 16px;
`;

const List = styled.div`
  font-size: 1.6rem;
`;

const TitleWrap = styled.div`
  max-width: 1300px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

const Arrow = styled.div`
  display: flex;
  gap: 10px;
`;

const ImgWrap = styled.div`
  display: flex;
  max-width: 1300px;
  height: 280px;
  padding: 14px 80px;
  margin: 20px auto;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.black.veryDark};
  border-radius: 16px;
  overflow: hidden;
  position: relative;
`;

const Slider = styled(motion.div)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  max-width: 1000px;
  position: absolute;
`;

const SliderWrap = styled.div`
  height: 100%;
  div:nth-child(1) {
    //출연진 이미지 사이즈
    width: 400px;
    height: 200px;
  }
`;

const Name = styled.h5`
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

const RandomMovieSlide = () => {
  const [reSize, setReSize] = useState(false); // 반응형
  const [width, setWidth] = useState(0); //반응형
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const [offset, setOffSet] = useState(2); // offset - 페이지
  const [right, setRight] = useState(false);
  const [randomMoive, setRamdomMovie] = useState<Movie[]>([]);
  //반응형
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    setReSize(width < 1200 ? true : false);
    reSize ? setOffSet(1) : setOffSet(2);
    console.log(width, reSize);
  }, [width, reSize]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //영화
  const { data: movies, isLoading: loading } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      return await getMovies();
    },
  });
  //렌덤 영화 스토리지 저장
  useEffect(() => {
    if (movies?.results) {
      const storedMovies = localStorage.getItem("randomMovies");

      if (storedMovies) {
        // 로컬 저장소에 저장된 데이터가 있으면 복원
        setRamdomMovie(JSON.parse(storedMovies));
      } else {
        // 로컬 저장소에 데이터가 없으면 랜덤 데이터를 생성
        const shuffled = [...movies.results].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 12);
        setRamdomMovie(selected);

        // 로컬 저장소에 저장
        localStorage.setItem("randomMovies", JSON.stringify(selected));
      }
    }
  }, [movies]);

  //슬라이드
  const toggleRandom = () => setLeaving((prev) => !prev);

  const crewIndexFn = (bt: string) => {
    if (movies) {
      if (leaving) return;
      setLeaving(true);

      const total = randomMoive.length;
      const castmaxIndex = Math.ceil(total / offset) - 1;
      if (bt === "right") {
        setRight(true);
        setIndex((prev) => (prev === castmaxIndex ? 0 : prev + 1));
      } else {
        setRight(false);
        setIndex((prev) => (prev === 0 ? castmaxIndex : prev - 1));
      }
    }
  };

  const sliderVariants = {
    hidden: (custom: boolean) => ({
      x: custom ? window.innerWidth + 10 : -window.innerWidth - 10,
    }),
    visible: {
      x: 0,
    },
    exit: (custom: boolean) => ({
      x: custom ? -window.innerWidth - 10 : window.innerWidth + 10,
    }),
  };

  return (
    <List>
      <TitleWrap>
        <SubTitle>추천 영화</SubTitle>
        <Arrow>
          <Box onClick={() => crewIndexFn("left")}>{"<"}</Box>
          <Box onClick={() => crewIndexFn("right")}>{">"}</Box>
        </Arrow>
      </TitleWrap>
      <ImgWrap>
        <AnimatePresence
          initial={false}
          custom={right}
          onExitComplete={toggleRandom}
        >
          <Slider
            key={index}
            custom={right}
            variants={sliderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 1, type: "tween" }}
          >
            {randomMoive
              .slice(index * offset, index * offset + offset)
              .map((movie) => (
                <SliderWrap>
                  <Box>
                    <PosterWrap>
                      <img
                        src={makeImagePath(movie.poster_path)}
                        width={"100%"}
                      />
                    </PosterWrap>
                  </Box>
                  <Wrap>
                    <Name>{movie.title}</Name>
                    {/* <CharacName>{cast.character}</CharacName> */}
                  </Wrap>
                </SliderWrap>
              ))}
          </Slider>
        </AnimatePresence>
      </ImgWrap>
    </List>
  );
};

export default RandomMovieSlide;
