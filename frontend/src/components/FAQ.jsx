import React, { useState } from "react";
import "../styles/FAQ.css";
import { Container, Row, Col } from "react-bootstrap";
import Newsletter from "./Newsletter";

const FAQ = () => {
  const faqData = [
    {
      question: "What are the must-visit places in India?",
      answer:
        "India is a diverse country with numerous must-visit places. Some highlights include the Taj Mahal in Agra, the palaces of Rajasthan, the beaches of Goa, the backwaters of Kerala, the Himalayan region, and vibrant cities like Delhi and Mumbai.",
    },
    {
      question: "What are the visa requirements for traveling to India?",
      answer:
        "Most travelers need a visa to enter India. You can apply for an e-Visa online if you're eligible, or you may need to visit an Indian embassy or consulate for a traditional visa. Ensure your passport is valid for at least six months from your date of entry.",
    },

    {
      question: "What type of food can I expect in India?",
      answer:
        "India offers a rich variety of cuisine, with each region having its specialties. You'll find everything from spicy curries and street food to delicious vegetarian dishes and sweets. Be sure to try local delicacies and regional specialties during your visit.",
    },
    {
      question: "What is the best way to get around in India?",
      answer:
        "Travel options in India include domestic flights, trains, buses, and taxis. For short distances, auto-rickshaws and ride-sharing apps are convenient. Trains are a popular way to travel between cities, and flights can save time for long distances.",
    },
    {
      question: "What should I pack for my trip to India?",
      answer:
        "Pack lightweight, breathable clothing suitable for the weather and comfortable shoes for exploring. Depending on the region and time of year, you might need warm clothing or rain gear. Also, bring sunscreen, a hat, and any personal medications.",
    },
    {
      question: "Are there any cultural customs I should be aware of?",
      answer:
        "India has diverse cultural practices, so it's important to be respectful of local customs. Dress modestly, especially when visiting religious sites, and remove your shoes before entering temples. It's also polite to greet with a 'Namaste' and avoid public displays of affection.",
    },
  ];

  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    if (activeQuestion === index) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(index);
    }
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col>
              <h2 className="text-center">Frequently Asked Questions</h2>
              <div className="faq__wrapper">
                {faqData.map((item, index) => (
                  <div
                    className={`faq__item ${
                      activeQuestion === index ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className="faq__question">
                      <h4>
                        {item.question}{" "}
                        <span>
                          {activeQuestion === index ? (
                            <i className="ri-arrow-drop-up-line"></i>
                          ) : (
                            <i className="ri-arrow-down-line"></i>
                          )}
                        </span>
                      </h4>
                    </div>
                    {activeQuestion === index && <p>{item.answer}</p>}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default FAQ;
