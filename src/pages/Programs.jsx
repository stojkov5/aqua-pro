/* eslint-disable no-unused-vars */
import { useTranslation } from "react-i18next";
import { Row, Col } from "antd";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  TrophyOutlined,
  InfoCircleOutlined,
  ScheduleOutlined,
  TeamOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import "../styles/Programs.css";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Programs = () => {
  const { t } = useTranslation();
  const eventList = t("programs.eventsList", { returnObjects: true });
  const medalRounds = t("programs.medalRounds", { returnObjects: true });
  const categories = t("programs.categories", { returnObjects: true });

  return (
    <Row justify="center" className="py-30">
      <Col span={20}>
        <motion.section
          className="programs-wrapper"
          initial="visible" // Load immediately
          animate="visible"
        >
          {/* Title shows immediately */}
          <motion.h1
            className="programs-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("programs.title")}
          </motion.h1>

          {/* Event Info & Contact – show immediately */}
          <motion.div
            className="programs-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <h2 className="programs-subtitle">
                  <InfoCircleOutlined /> {t("programs.eventInfo")}
                </h2>
                <ul className="programs-list">
                  <li>{t("programs.date")}</li>
                  <li>{t("programs.pool")}</li>
                  <li>{t("programs.temp")}</li>
                  <li>{t("programs.entryFee")}</li>
                  <li>{t("programs.deadline")}</li>
                  <li>{t("programs.rules")}</li>
                  <li>
                    📄{" "}
                    <a
                      href="/2025 Aqua Pro Swim Meet.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pdf-link"
                    >
                      {t("programs.download")}
                    </a>
                  </li>
                </ul>
              </Col>
              <Col xs={24} md={12}>
                <h2 className="programs-subtitle">
                  <EnvironmentOutlined /> {t("programs.locationContact")}
                </h2>
                <ul className="programs-list">
                  <li>{t("programs.location")}</li>
                  <li>
                    📞 <a href="tel:+38971248750">+389 71 248 750</a>
                  </li>
                  <li>
                    🌐{" "}
                    <Link to="http://www.aquaproswim.com/" target="blank">
                      aquaproswim.com
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </motion.div>

          {/* Categories */}
          <motion.div
            className="programs-block"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="programs-subtitle">
              <TeamOutlined /> {t("programs.categoriesTitle")}
            </h2>
            <Row gutter={[16, 16]}>
              {categories.map((cat, i) => (
                <Col xs={24} md={8} key={i}>
                  <motion.div
                    className="programs-category-card"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <span className="category-label">{cat.label}</span>
                    <span className="category-desc">{cat.description}</span>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>

          {/* Events */}
          <motion.div
            className="programs-block"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="programs-subtitle">
              <CalendarOutlined /> {t("programs.events")}
            </h2>
            <Row gutter={[16, 16]}>
              {eventList.map((event, i) => (
                <Col xs={24} sm={12} md={8} key={i}>
                  <motion.div
                    className="programs-event-card"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {event}
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>

          {/* Schedule */}
          <motion.div
            className="programs-block"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="programs-subtitle">
              <ScheduleOutlined /> {t("programs.schedule")}
            </h2>
            <ul className="programs-list">
              <li>{t("programs.warmup")}</li>
              <li>{t("programs.raceStart")}</li>
            </ul>
          </motion.div>

          {/* Medal + Awards */}
          <motion.div
            className="programs-block"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <h2 className="programs-subtitle">
                  <TrophyOutlined /> {t("programs.medals")}
                </h2>
                <ul className="programs-list">
                  {medalRounds.map((medal, i) => (
                    <li key={i}>{medal}</li>
                  ))}
                </ul>
              </Col>
              <Col xs={24} md={12}>
                <h2 className="programs-subtitle">
                  <TrophyOutlined /> {t("programs.awards")}
                </h2>
                <ul className="programs-list">
                  <li>{t("programs.award1")}</li>
                  <li>{t("programs.award2")}</li>
                  <li>{t("programs.award3")}</li>
                  <li>{t("programs.award4")}</li>
                </ul>
              </Col>
            </Row>
          </motion.div>

          {/* Health */}
          <motion.div
            className="programs-block"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="programs-subtitle">
              <ExclamationCircleOutlined /> {t("programs.health")}
            </h2>
            <p className="programs-text">{t("programs.healthText")}</p>
          </motion.div>
        </motion.section>
      </Col>
    </Row>
  );
};

export default Programs;
