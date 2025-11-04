/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import "../styles/Registration.css";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Registration = () => {
  const { t } = useTranslation();

  const pricingTiers = t("registration.plans", { returnObjects: true });

  return (
    <motion.div
      className="registration-section my-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={containerVariants}
    >
      <Row justify="center">
        <Col
          span={20}
          className="text-center registration-container p-8 rounded-2xl"
        >
          {/* Title */}
          <motion.h2
            className="registration-title montserrat-700 mb-4"
            variants={itemVariants}
          >
            {t("registration.title")}
          </motion.h2>

          {/* Steps */}
          <motion.ol
            className="registration-steps montserrat-300 mb-10 text-gray-200 text-left mx-auto max-w-2xl list-decimal pl-5"
            variants={itemVariants}
          >
            <li>{t("registration.steps.0")}</li>
            <li>{t("registration.steps.1")}</li>
            <li>{t("registration.steps.2")}</li>
          </motion.ol>

          {/* Pricing Cards */}
          <Row gutter={[16, 16]} justify="center">
            {pricingTiers.map((tier, idx) => (
              <Col key={idx} xs={24} sm={12} md={8}>
                <motion.div className="pricing-card" variants={itemVariants}>
                  <h3 className="text-xl font-semibold mb-2">{tier.title}</h3>
                  <p className="text-lg font-bold mb-1">{tier.price}</p>
                  {tier.price2 && (
                    <p className="text-lg font-bold mb-1">{tier.price2}</p>
                  )}
                  <p className="text-sm text-gray-100">{tier.details}</p>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* CTA Button */}
          <motion.div
            className="mt-8 registration-button-container"
            variants={itemVariants}
          >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfdxA7-fPEZUGFV9oQB9TaEX_Xtwsp0ED8NessTaU1I9FGXQw/viewform?usp=send_form"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 12px rgba(255,255,255,0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="registration-btn montserrat-300"
              >
                {t("registration.cta")}
              </motion.button>
            </a>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
};

export default Registration;
