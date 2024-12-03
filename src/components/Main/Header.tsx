import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ReactComponent as VivaPlayLogo } from "../../vivaplay.svg";

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

const Input = styled(motion.input)`
  width: 200px;
  position: absolute;
  left: -170px;
  transform-origin: right center;
  background: transparent;
  color: ${(props) => props.theme.red};
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
  align-items: center;
  gap: 15px;

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

interface Form {
  keyword: string;
}

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const LoveMatch = useMatch("/love");
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    scrollY.on("change", () => {
      setIsScrolled(scrollY.get() > 60);
    });
  }, [scrollY]);

  const openSearch = () => {
    if (searchOpen) {
      inputAnimation.start({ scaleX: 0 });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };

  const goToMain = () => {
    navigate("/");
  };

  const { register, handleSubmit, setValue } = useForm<Form>();
  const onValid = (data: Form) => {
    navigate(`/search?keyword=${data.keyword}`);
    setValue("keyword", "");
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
          <Item>
            <Link to="/tv">
              시리즈
              {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/love">
              즐겨찾기
              {LoveMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>

      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={openSearch}
            animate={{ x: searchOpen ? -194 : 0 }}
            transition={{ type: "linear" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            type="text"
            placeholder="제목, 사람, 장르"
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
          />
        </Search>
        <ProfileMenu>
          <img src="https://via.placeholder.com/30" alt="Profile" />
          <TranslateButton>🌐번역</TranslateButton>
        </ProfileMenu>
      </Col>
    </Nav>
  );
};

export default Header;
