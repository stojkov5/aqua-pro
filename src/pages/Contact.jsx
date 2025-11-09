import { Row, Col } from "antd";
import "../styles/Contact.css";
import { FaViber } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const Contact = () => {
  const { t } = useTranslation();
  return (
    <div className="contact-container">
      <Row justify="center" className="contact-row">
        <Col span={22} className="contact-content">
          <h1 className="contact-title">{t("contact-us.title")}</h1>
          <Row justify="center" gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <div className="contact-text">
                <p>
                  <strong>{t("contact-us.email")}:</strong>{" "}
                  aquaproswim@gmail.com
                </p>
                <p>
                  <strong>{t("contact-us.phone")}:</strong> 071 248 750
                </p>
                <p>
                  <strong>{t("contact-us.address")}:</strong> Skopje Sports
                  Center
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
                  <span>{t("contact-us.viber")}</span>
                </a>
                <br />
                <a
                  href="https://chat.whatsapp.com/I2Oyifd19hT62KWCOL55C3?mode=wwt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <FaWhatsapp className="contact-icon" />
                  <span>{t("contact-us.whatsapp")}</span>{" "}
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
