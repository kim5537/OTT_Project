import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as VivaPlayLogo } from "../vivaplay.svg";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: url("/cupang.jpg") center/cover no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
  @media (max-width: 768px) {
    width: 100%;
    overflow-x: hidden;
  }
`;

const Containe = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  z-index: 2;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(7px);
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 20px 30px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  z-index: 2;
`;
const Logo = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 100px;
    height: 100px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  color: #fff;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;
const StyledInput = styled.input`
  padding: 20px 200px;
  padding-left: 20px;
  background: #181a21;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  &::placeholder {
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 20px 40px;
    padding-left: 20px;
  }
`;

const FindId = styled.div`
  color: #fff;
  font-size: 14px;
  display: flex;
  gap: 2px;
  justify-content: end;
  width: 100%;
  margin-bottom: 0;
  cursor: pointer;
  margin-top: 40px;
  & > p {
    transition: all 0.3s;
  }
  &:hover {
    opacity: 0.8;
    & > p {
      transform: translateX(4px);
    }
  }
`;

const Button = styled.button`
  width: 100%;
  height: 60px;
  background: ${(props) => props.theme.blue.darker};
  color: #fff;
  border: none;
  font-size: 20px;
  line-height: 1.2;
  border-radius: 10px;
  transition: all 0.3s;

  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.blue.lighter};
  }
`;

const Join = styled.div`
  margin-top: 28px;
  color: #fff;
  font-size: 18px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Login: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const logged = true;
    const redirectTo = location.state?.from || "/";
    navigate(redirectTo, { state: { logged } });
  };

  const handleLogo = () => {
    navigate("/");
  };

  const handleJoin = () => {
    navigate("/join");
  };

  const handleFind = () => {
    alert("준비중인 서비스입니다!");
  };

  return (
    <Wrapper>
      <Containe>
        <Logo onClick={handleLogo}>
          <VivaPlayLogo />
        </Logo>
        <Form onSubmit={handleLogin}>
          <Title>로그인</Title>
          <StyledInput
            type="text"
            placeholder="이메일"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <StyledInput
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />
          <FindId onClick={handleFind}>
            아이디, 비밀번호 찾기 <p>&rarr;</p>
          </FindId>
          <Button type="submit">로그인</Button>
          <Join onClick={handleJoin}>
            VIVA 회원이 아니신가요? <b>지금 가입하세요.</b>
          </Join>
        </Form>
      </Containe>
    </Wrapper>
  );
};

export default Login;
