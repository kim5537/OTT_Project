import { ReactComponent as VivaPlayLogo } from "../vivaplay.svg";
import styled, { keyframes } from "styled-components";

const wave = keyframes`
  0% { x: -400px; }
  100% { x: 0; }
`;

const logoFill = keyframes`
  0% {
    transform: translateY(0px) rotate(20deg);
  }
  25% {
    transform: translateY(-70px) translatex(100px)  rotate(10deg);
  }
  50% {
    transform: translateY(-100px) rotate(-15deg);
  }
  65% {
    transform: translateY(-120px)  translatex(-100px)  rotate(0deg);
  }
  90% {
    transform: translateY(-180px)  translatex(0px)  rotate(15deg);
  }
  100% {
    transform: translateY(-180px)  translatex(0px)  rotate(10deg);
  }
`;

const move = keyframes`
  0% {
    transform: translateY(0) rotate(90deg);
  }
  50% {
    transform:  translateY(-10%) rotate(180deg);
  }
  100% {
    transform: translateY(-20%) rotate(360deg);
  }
`;

const move2 = keyframes`
  0% {
    transform: translateY(-12%) rotate(60deg);
  }
  25% {
    transform: translateY(-22%) rotate(180deg);
  }
  50% {
    transform: translateY(-32%) rotate(60deg);
  }
  75% {
    transform: translateY(-42%) rotate(180deg);
  }
  100% {
    transform: translateY(-56%) rotate(360deg);
  }
`;

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(360deg, #2954cc 0%, #067fda 100%);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Inner = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #000;
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 200px;
    height: 200px;
    position: relative;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
    &:nth-child(1) {
      position: absolute;
      stroke: #2954cc;
      stroke-width: 2.5;
      z-index: 10;
      path {
        fill: none;
      }
    }
    &:nth-child(2) {
      position: absolute;
    }
  }

  .wave-two {
    width: 800px;
    height: 800px;
    position: absolute;
    bottom: -250%;
    left: -90%;
    border-radius: 55%;
    /* background: #2954cc; */
    background: black;
    animation: ${move} 5s infinite linear;
    z-index: -20;
  }
  .wave-one {
    width: 800px;
    height: 800px;
    position: absolute;
    bottom: -90%;
    left: -150%;
    border-radius: 40%;
    background: black;
    animation: ${move2} 6s infinite linear;
    z-index: 8;
  }
`;

const Loading = () => {
  return (
    <Container>
      <Inner>
        <Wrapper>
          <VivaPlayLogo className="logo" />
          <div className="wave-one"></div>
          <div className="wave-two"></div>
          <VivaPlayLogo className="logostroke" />
        </Wrapper>
      </Inner>
    </Container>
  );
};

export default Loading;
