import React from "react";
import SearchIconSVG from "../../assets/icons/feature_search.svg?react";
import CheckIconSVG from "../../assets/icons/feature_check.svg?react";
import MessageIconSVG from "../../assets/icons/feature_chat.svg?react";

function Features() {
  return (
    <section className="features-section">
      <h2>이런 경험, 다들 있으시죠?</h2>
      <p>
        선생님을 찾아뵈어야 하지만 교무실 위치를 몰라 헤맨 경험, <br />
        교무실에 갔지만 선생님이 안 계셔서 교무실을 몇 번이나 오간 경험, <br />
        누구나 한 번쯤 있으실 겁니다. <br />
        특히 저희 선린인터넷고등학교는 학교가 넓어 이런 불편함이 더 크게
        느껴지곤 합니다.
        <br />
        저희 선린샘터는 다음의 주요 기능들을 통해 여러분의 시간을 아껴드리고,
        <br />더 편리하게 선생님을 찾아뵐 수 있도록 도와드립니다.
      </p>
      <div className="feature-items">
        <div className="feature-item">
          <div className="icon-wrapper">
            <SearchIconSVG className="feature-icon" />
          </div>
          <h3>선생님 교무실 위치 찾기</h3>
          <p>
            선생님과 성함을 검색하면 선생님의 교무실 위치를 바로 알 수 있습니다.
          </p>
        </div>
        <div className="feature-item">
          <div className="icon-wrapper">
            <CheckIconSVG className="feature-icon" />
          </div>
          <h3>선생님의 자리 비움 여부 확인</h3>
          <p>
            선생님께서 현재 교무실에서 자리를 비우셨는지에 대한 정보를 손쉽게
            확인할 수 있습니다.
          </p>
        </div>
        <div className="feature-item">
          <div className="icon-wrapper">
            <MessageIconSVG className="feature-icon" />
          </div>
          <h3>선생님께 간단한 쪽지 남기기</h3>
          <p>
            선생님께 간단히 쪽지를 남겨서 직접 찾아가기 전에 용건을 전달할 수
            있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;
