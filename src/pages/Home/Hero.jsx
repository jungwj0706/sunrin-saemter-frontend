import React from "react";
import CTAButton from './CTAButton';
import { Typewriter } from 'react-simple-typewriter';

function Hero() {
  return (
    <section className="hero-section">
      <h1>
        <span className="hero-title-sub">
          <Typewriter
            words={['선생님의 교무실 위치부터 자리 비움 여부까지,']}
            typeSpeed={60}
            deleteSpeed={0}
            delaySpeed={1000}
          />
        </span>
        <br />
        <span className="hero-title-main">선린샘터</span>
      </h1>
      <p>뵈러 가야하는 선생님의 교무실 위치와 선생님의 자리를 확인해 허비되는 시간을 줄여보세요.</p>
      <CTAButton />
    </section>
  );
}

export default Hero;
