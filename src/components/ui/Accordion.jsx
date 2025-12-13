import React, { useState } from 'react';
import '../../styles/components/accordion.css'; 

function Accordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <button className="accordion-header" onClick={toggleAccordion} aria-expanded={isOpen}>
        {question}
        <div className={`accordion-icon ${isOpen ? 'open' : ''}`}>
          {isOpen ? '︿' : '﹀'}
        </div>
      </button>
      {isOpen && (
        <div className="accordion-content">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default Accordion;