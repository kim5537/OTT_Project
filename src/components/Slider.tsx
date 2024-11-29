import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { makeImagePath } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { getCertification, Movie } from "../api";
import { useNavigate } from "react-router-dom";

interface SliderProps {
  movies: any[];
  title: string;
}

const Container = styled.div`
  position: relative;
  margin-top: 50px;
  overflow: hidden;
`;

const SliderTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.white.lighter};
  padding-left: 20px;
`;

const SliderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 20px;
  &:hover > div {
    opacity: 1;
  }
`;

const Row = styled(motion.div)`
  display: flex;
  gap: 20px;
`;

const Arrow = styled.div<{ direction: "left" | "right" }>`
  position: absolute;
  top: 50%;
  width: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => (props.direction === "left" ? "left: 10px;" : "right: 10px;")}
  transform: translateY(-50%);
  z-index: 10;
  font-size: 20px;
  color: ${(props) => props.theme.white.lighter};
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  background: rgba(0, 0, 0, 0.4);
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  flex: 0 0 240px;
  height: 160px;
  background: url(${(props) => props.bgPhoto}) center/cover no-repeat;
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  .title {
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .age-restriction {
    font-size: 12px;
    padding: 2px 5px;
    color: white;
    border-radius: 4px;
    font-weight: bold;
    background: ${(props) => props.theme.blue.lighter};
  }
`;

const Info = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  opacity: 0;
  border-radius: 8px;
  transform: translateY(100%);
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;

  ${Box}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  h4 {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: bold;
    text-align: left;
  }

  .info-buttons {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 10px;

    svg {
      font-size: 12px;
      cursor: pointer;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      padding: 10px;
      transition: all 0.3s ease;

      &:nth-of-type(1) {
        background: ${(props) => props.theme.blue.lighter};
        color: ${(props) => props.theme.white.lighter};
        &:hover {
          background: ${(props) => props.theme.blue.darker};
        }
      }

      &:nth-of-type(2) {
        border: 2px solid ${(props) => props.theme.white.darker};
        background: transparent;
        color: ${(props) => props.theme.white.lighter};
        &:hover {
          border-color: ${(props) => props.theme.blue.lighter};
        }
      }
    }
  }

  .info-rating {
    font-size: 14px;
    color: ${(props) => props.theme.white.darker};
    margin-top: 14px;
    text-align: left;
  }
`;

const InfoContain = styled.div``;

const rowVariants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? window.innerWidth : -window.innerWidth,
  }),
  visible: { x: 0 },
  exit: (direction: number) => ({
    x: direction > 0 ? -window.innerWidth : window.innerWidth,
  }),
};

const Slider: React.FC<SliderProps> = ({ movies, title }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [certifications, setCertifications] = useState<Record<number, string>>(
    {}
  );
  const history = useNavigate(); // 상세 페이지 이동

  useEffect(() => {
    const fetchCertifications = async () => {
      const results: Record<number, string> = {};
      for (const movie of movies) {
        const data = await getCertification(movie.id);
        const krRelease = data.results.find(
          (release: any) => release.iso_3166_1 === "KR"
        );
        results[movie.id] =
          krRelease && krRelease.release_dates.length > 0
            ? krRelease.release_dates[0].certification || "15"
            : "15";
      }
      setCertifications(results);
    };

    fetchCertifications();
  }, [movies]);

  const handleClick = (dir: "left" | "right") => {
    const totalMovies = movies.length;
    setDirection(dir === "left" ? -1 : 1);
    setIndex((prev) =>
      dir === "left"
        ? (prev - 1 + totalMovies) % totalMovies
        : (prev + 1) % totalMovies
    );
  };

  const getDisplayedMovies = () => {
    const totalMovies = movies.length;
    return Array(6)
      .fill(0)
      .map((_, i) => movies[(index + i) % totalMovies]);
  };

  //// 상세 페이지 이동
  const onDetail = ({ movie }: { movie: Movie }) => {
    history(`/movies/${movie.id}`);
  };

  return (
    <Container>
      <SliderTitle>{title}</SliderTitle>
      <SliderWrapper>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          {"<"}
        </Arrow>
        <AnimatePresence initial={false} custom={direction}>
          <Row
            key={index}
            custom={direction}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
          >
            {getDisplayedMovies().map((movie) => (
              <Box
                key={movie.id}
                bgPhoto={makeImagePath(movie.backdrop_path || "")}
              >
                <Overlay>
                  <div className="title">{movie.title}</div>
                  <div className="age-restriction">
                    {certifications[movie.id] || "15"}
                  </div>
                </Overlay>
                <Info>
                  <h4>{movie.title}</h4>
                  <div className="info-buttons">
                    <FontAwesomeIcon
                      icon={faPlay}
                      onClick={() => onDetail({ movie })}
                    />
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                  <div className="info-rating">
                    ⭐ {movie.vote_average.toFixed(1)} / 10 | 👍{" "}
                    {movie.vote_count.toLocaleString()} likes
                  </div>
                </Info>
              </Box>
            ))}
          </Row>
        </AnimatePresence>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          {">"}
        </Arrow>
      </SliderWrapper>
    </Container>
  );
};

export default Slider;
