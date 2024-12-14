import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as VivaPlayLogo } from "../vivaplay.svg";
import { useNavigate } from "react-router-dom";

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
  padding: 30px 20px 40px;

  @media (max-width: 768px) {
    padding: 20px 30px;
  }
`;

const Form = styled.form<{ highlight?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  z-index: 2;

  & > div {
    display: flex;
    gap: 6px;
    margin-left: 4px;

    &:nth-of-type(1) {
      margin-top: 8px;
    }
    & > input {
      cursor: pointer;
    }
    & > label {
      color: ${(props) => props.theme.white.lighter};
      font-size: ${(props) => (props.highlight ? "1rem" : "0.9rem")};
      font-weight: ${(props) => (props.highlight ? "bold" : "100")};
      cursor: pointer;
    }
  }
`;

const Logo = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 3;
  svg {
    width: 100px;
    height: 100px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  color: #fff;
  margin: 0 auto;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    margin-top: 4px;
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
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.blue.lighter};
  }
  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
`;

const Join: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkboxes, setCheckboxes] = useState({
    all: false,
    agree: false,
    event: false,
    gift: false,
  });
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const isValid = /\S+@\S+\.\S+/.test(e.target.value);
    setEmailError(isValid ? "" : "이메일 형식을 확인해주세요.");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === "all") {
      setCheckboxes({
        all: checked,
        agree: checked,
        event: checked,
        gift: checked,
      });
    } else {
      setCheckboxes((prev) => ({ ...prev, [name]: checked }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    }
  };

  const handleLogo = () => {
    navigate("/");
  };

  const isFormValid =
    email && password && !emailError && !passwordError && checkboxes.agree;

  return (
    <Wrapper>
      <Containe>
        <Logo onClick={handleLogo}>
          <VivaPlayLogo />
        </Logo>
        <Form onSubmit={handleSubmit}>
          <Title>회원가입</Title>
          <StyledInput
            type="text"
            placeholder="이메일"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && (
            <span style={{ color: "red", marginLeft: "4px" }}>
              {emailError}
            </span>
          )}
          <StyledInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <StyledInput
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {passwordError && (
            <span style={{ color: "red", marginLeft: "4px" }}>
              {passwordError}
            </span>
          )}
          <div>
            <input
              type="checkbox"
              name="all"
              id="all"
              checked={checkboxes.all}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="all" data-highlight="true">
              약관동의
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              name="agree"
              id="agree"
              checked={checkboxes.agree}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="agree">개인정보 수집 및 이용에 대한 안내</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="event"
              id="event"
              checked={checkboxes.event}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="event">이벤트 / 마케팅 수신 동의 (선택)</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="gift"
              id="gift"
              checked={checkboxes.gift}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="gift">혜택 알림 수신 동의 (선택)</label>
          </div>
          <Button type="submit" disabled={!isFormValid}>
            회원가입
          </Button>
        </Form>
      </Containe>
    </Wrapper>
  );
};

export default Join;
