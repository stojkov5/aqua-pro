import { Row, Col } from "antd";
import "../styles/Contact.css";
import { FaViber } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
const Contact = () => {
  return (
    <div className="contact-container">
      <Row justify="center" className="contact-row">
        <Col span={22} className="contact-content">
          <h1 className="contact-title">Contact Us</h1>
          <Row justify="center" gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <div className="contact-text">
                <p>
                  <strong>Email:</strong> aquaproswim@gmail.com
                </p>
                <p>
                  <strong>Phone:</strong> 071 248 750
                </p>
                <p>
                  <strong>Address:</strong> Skopje Sports Center
                </p>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="contact-text">
                <a
                  className="contact-link"
                  href="https://invite.viber.com/?g2=AQBA%2FulmutsTplWRWXLeuqFN1yvN2Tl%2BvVEH%2B4YrKQAq2v%2FghMN7A2H21yxMOeG%2F"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaViber className="contact-icon" />
                  <span>Join Viber Community</span>
                </a>
                <br />
                <a
                  href="https://chat.whatsapp.com/I2Oyifd19hT62KWCOL55C3?mode=wwt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <FaWhatsapp className="contact-icon" />
                  <span>Join WhatsApp Community</span>{" "}
                </a>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
