import React from 'react';
import Accordion from '../../components/ui/Accordion';
import "../../styles/pages/faq.css";


function FAQ() {
  const faqItems = [
    {
      question: '로그인 없이 이용이 가능한가요?',
      answer: '아니요, 해당 서비스는 선린인터넷고 계정(@sunrint.hs.kr)으로 로그인해야만 이용이 가능합니다.',
    },
    {
      question: '선생님의 자리 비움 상태는 어떻게 업데이트되나요?',
      answer: '선생님께서 직접 앱을 통해 자신의 자리 비움 상태를 설정하실 수 있습니다.',
    },
    {
      question: '쪽지를 보낸 후 선생님이 확인했는지 알 수 있나요?',
      answer: '네, 쪽지에서 선생님의 읽음 여부를 확인할 수 있습니다.',
    },
    {
      question: '모든 선생님의 정보가 다 있나요?',
      answer: '기본적으로 선린인터넷고등학교의 모든 선생님 정보가 포함되어 있습니다. 단, 새로 오신 선생님이나 퇴직하신 선생님의 정보는 업데이트에 시간이 소요될 수 있습니다.',
    },
    {
      question: '모바일에서도 이용할 수 있나요?',
      answer: '네, 선린샘터는 반응형 웹 디자인으로 제작되어 모바일, 태블릿 등 다양한 기기에서 최적화된 화면으로 이용할 수 있습니다.',
    },
  ];

  return (
    <section className="faq-section">
      <h2>자주 묻는 질문</h2>
      <div className="accordion-container">
        {faqItems.map((item, index) => (
          <Accordion key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
}

export default FAQ;