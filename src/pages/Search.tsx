import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate 추가
import styled from "styled-components";
import {
  searchContents,
  getCertification,
  GetMoviesResult,
  Movie,
} from "../api";
import { makeImagePath } from "../utils";
import Pagination from "react-js-pagination";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.black.lighter};
  padding: 20px;
  padding-left: 50px;
`;

const Header = styled.div`
  margin-top: 80px;
  margin-bottom: 60px;
  padding-left: 30px;
  color: ${(props) => props.theme.white.darker};
  h1 {
    font-size: 28px;
  }
`;

const MovieGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;
`;

const MovieCard = styled.div`
  width: 240px;
  height: 150px;
  background: ${(props) => props.theme.black.darker};
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 100px auto;
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    li {
      margin: 0 5px;
      a {
        color: ${(props) => props.theme.white.darker};
        padding: 5px 10px;
        border-radius: 5px;
        text-decoration: none;
        transition: background 0.3s;
        &:hover {
          background: ${(props) => props.theme.blue.darker};
        }
      }
      &.active a {
        background: ${(props) => props.theme.blue.darker};
        color: white;
      }
    }
  }
`;

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const [currentPage, setCurrentPage] = useState(1);
  const [certifications, setCertifications] = useState<Record<number, string>>(
    {}
  );

  const moviesPerPage = 20;

  const { data: movieData, isLoading: movieLoading } =
    useQuery<GetMoviesResult>({
      queryKey: ["searchContents", keyword],
      queryFn: () => searchContents(keyword),
    });

  const currentMovies = (movieData?.results || [])
    .filter((movie) => movie?.id) // id가 있는 영화만 포함
    .slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage);

  useEffect(() => {
    const fetchCertifications = async () => {
      const results: Record<number, string> = {};
      for (const movie of currentMovies) {
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

    if (currentMovies.length > 0) {
      fetchCertifications();
    }
  }, [currentMovies]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onDetail = (movieId: number | undefined) => {
    if (!movieId) {
      console.error("Invalid movie ID:", movieId);
      return;
    }
    navigate(`/movies/${movieId}`);
  };

  if (movieLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>
        {keyword ? (
          <h1>검색어 "{keyword}"에 대한 결과입니다.</h1>
        ) : (
          <h1>검색어를 입력해주세요!</h1>
        )}
      </Header>
      <MovieGrid>
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} onClick={() => onDetail(movie.id)}>
            <MoviePoster
              src={makeImagePath(movie.poster_path || "")}
              alt={movie.title}
            />
            <Overlay>
              <div className="title">{movie.title}</div>
              <div className="age-restriction">
                {certifications[movie.id] || "15"}
              </div>
            </Overlay>
          </MovieCard>
        ))}
      </MovieGrid>
      <StyledPagination>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={moviesPerPage}
          totalItemsCount={movieData?.results.length || 0}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </StyledPagination>
    </Container>
  );
};

export default Search;
