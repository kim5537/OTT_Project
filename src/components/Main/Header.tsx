<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useMatch, useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as VivaPlayLogo } from "../../vivaplay.svg";
import { getAutocompleteResults } from "../../api";
import { useLocation } from "react-router-dom";
=======
import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ReactComponent as VivaPlayLogo } from "../../vivaplay.svg";
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9

const Nav = styled(motion.nav)<{ $isScrolled: boolean }>`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => (props.$isScrolled ? "20px 40px" : "30px 60px")};
  background-color: ${(props) => (props.$isScrolled ? "black" : "transparent")};
  color: ${(props) =>
    props.$isScrolled ? props.theme.blue.lighter : props.theme.blue.darker};
  z-index: 10;
  font-size: 18px;
  position: fixed;
  top: 0;
  transition: background-color 0.3s, padding 0.3s;

  @media (max-width: 768px) {
    padding: ${(props) => (props.$isScrolled ? "5px 20px" : "10px 20px")};
  }
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const LogoContainer = styled(motion.div)`
  cursor: pointer;

  svg {
    width: 80px;
    height: 40px;

    @media (max-width: 768px) {
      width: 60px;
      height: 30px;
    }
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const Item = styled.li`
  position: relative;
  cursor: pointer;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.7;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${(props) => props.theme.blue.darker};
`;

const Search = styled.form`
  color: ${(props) => props.theme.blue.darker};
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
    fill: ${(props) => props.theme.blue.darker};
  }
`;

<<<<<<< HEAD
const SearchBar = styled(motion.input)`
=======
const Input = styled(motion.input)`
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
  width: 200px;
  position: absolute;
  left: -170px;
  transform-origin: right center;
  background: transparent;
<<<<<<< HEAD
  color: #fff;
=======
  color: ${(props) => props.theme.red};
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
  font-size: 14px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.blue.darker};
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 150px;
    left: -130px;
  }
`;

const ProfileMenu = styled.div`
  display: flex;
<<<<<<< HEAD
  cursor: pointer;
  align-items: center;
  gap: 15px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 16px;
  color: #fff;
  background: ${(props) => props.theme.blue.darker};
=======
  align-items: center;
  gap: 15px;

>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const TranslateButton = styled.button`
  background: ${(props) => props.theme.blue.darker};
  color: ${(props) => props.theme.white.lighter};
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
  transition: background 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.blue.lighter};
  }
`;

<<<<<<< HEAD
const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.blue.darker};
  border-radius: 4px;
  outline: none;
`;

const SuggestionsList = styled.ul`
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.blue.darker};
  position: absolute;
  top: 140%;
  right: -200%;
  width: 240px;
  background: ${(props) => props.theme.black.lighter};
  border-radius: 4px;
  margin: 0;
  padding: 0;
  z-index: 100;

  li {
    font-size: 14px;
    padding: 8px;
    cursor: pointer;
    color: ${(props) => props.theme.white.lighter};
    &:hover {
      background: ${(props) => props.theme.blue.darker};
    }
  }
`;

=======
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
interface Form {
  keyword: string;
}

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
<<<<<<< HEAD
  const [logged, setLogged] = useState(false);
=======
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const LoveMatch = useMatch("/love");
  const inputAnimation = useAnimation();
<<<<<<< HEAD
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [suggestions, setSuggestions] = useState<any[]>([]); // 자동 완성 결과
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null); // 디바운싱 타이머
  const clearSuggestionsTimeoutRef = useRef<NodeJS.Timeout | null>(null); // 10초 타이머
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
=======
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9

  useEffect(() => {
    scrollY.on("change", () => {
      setIsScrolled(scrollY.get() > 60);
    });
  }, [scrollY]);

<<<<<<< HEAD
  useEffect(() => {
    // Login 페이지에서 넘어온 상태 확인
    if (location.state?.logged) {
      setLogged(true);
    }
  }, [location.state]);

  const handleLogin = () => {
    if (logged) {
      setLogged(false); // 로그아웃 처리
    } else {
      navigate("/login", { state: { from: location.pathname } }); // 로그인 페이지로 이동
    }
  };

=======
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
  const openSearch = () => {
    if (searchOpen) {
      inputAnimation.start({ scaleX: 0 });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
<<<<<<< HEAD

    if (!searchOpen) {
      setSuggestions([]); // 서치바를 닫을 때 추천 목록 초기화
      setSearchTerm(""); // 검색어 초기화
    }
=======
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
  };

  const goToMain = () => {
    navigate("/");
  };

<<<<<<< HEAD
  const onValid = (data: { keyword: string }) => {
    const trimmedKeyword = data.keyword.trim();
    if (trimmedKeyword) {
      setSearchParams({ keyword: trimmedKeyword }); // 쿼리 값 설정
      navigate(`/search?keyword=${trimmedKeyword}`, { replace: true }); // 검색 페이지로 이동

      setSearchTerm(""); // 검색어 초기화 (자동완성과 상관없이 초기화)
      setSuggestions([]); // 추천 목록 닫기
      if (clearSuggestionsTimeoutRef.current) {
        clearTimeout(clearSuggestionsTimeoutRef.current); // 타이머 제거
      }
    }
  };

  // 검색어가 변경될 때 자동 완성 데이터s
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const results = await getAutocompleteResults(searchTerm);
        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching autocomplete results:", error);
      }
    };

    // 사용자가 입력을 멈춘 후 API 호출
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(fetchSuggestions, 300);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // 10초 타이머 초기화
    if (clearSuggestionsTimeoutRef.current) {
      clearTimeout(clearSuggestionsTimeoutRef.current);
    }
    if (value.trim()) {
      clearSuggestionsTimeoutRef.current = setTimeout(() => {
        setSuggestions([]);
      }, 10000);
    } else {
      setSuggestions([]);
    }
  };

  // 추천 항목 클릭 처리
  const handleSuggestionClick = (suggestion: any) => {
    navigate(`/movies/${suggestion.id}`);
    setSearchTerm("");
    setSuggestions([]);
    if (clearSuggestionsTimeoutRef.current) {
      clearTimeout(clearSuggestionsTimeoutRef.current);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?keyword=${searchTerm.trim()}`);
      setSearchTerm("");
      setSuggestions([]);
      if (clearSuggestionsTimeoutRef.current) {
        clearTimeout(clearSuggestionsTimeoutRef.current);
      }
    }
=======
  const { register, handleSubmit, setValue } = useForm<Form>();
  const onValid = (data: Form) => {
    navigate(`/search?keyword=${data.keyword}`);
    setValue("keyword", "");
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
  };

  return (
    <Nav $isScrolled={isScrolled}>
      <Col>
        <LogoContainer
          onClick={goToMain}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <VivaPlayLogo />
        </LogoContainer>
        <Items>
          <Item>
            <Link to="/">홈{homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
<<<<<<< HEAD

=======
          <Item>
            <Link to="/tv">
              시리즈
              {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
          <Item>
            <Link to="/love">
              즐겨찾기
              {LoveMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>

      <Col>
<<<<<<< HEAD
        <Search onSubmit={handleSearchSubmit}>
=======
        <Search onSubmit={handleSubmit(onValid)}>
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
          <motion.svg
            onClick={openSearch}
            animate={{ x: searchOpen ? -194 : 0 }}
            transition={{ type: "linear" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </motion.svg>
<<<<<<< HEAD
          <SearchBar
=======
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
            type="text"
            placeholder="제목, 사람, 장르"
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
<<<<<<< HEAD
            value={searchTerm}
            onChange={handleInputChange}
          />
          {searchTerm && suggestions.length > 0 && (
            <SuggestionsList>
              {suggestions.map((item) => (
                <li key={item.id} onClick={() => handleSuggestionClick(item)}>
                  {item.title || item.name || "Unknown"}
                </li>
              ))}
            </SuggestionsList>
          )}
        </Search>
        <ProfileMenu onClick={handleLogin}>
          {logged ? "로그아웃" : "로그인"}
=======
          />
        </Search>
        <ProfileMenu>
          <img src="https://via.placeholder.com/30" alt="Profile" />
          <TranslateButton>🌐번역</TranslateButton>
>>>>>>> 1bee319d09bb4168ef218489fb59a49adfa5acd9
        </ProfileMenu>
      </Col>
    </Nav>
  );
};

export default Header;
