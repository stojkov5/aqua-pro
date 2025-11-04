/* eslint-disable no-unused-vars */
import React from "react";
import { Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import "../styles/Schedule.css";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Schedule = () => {
  const { t } = useTranslation();

  const days = t("schedule.days", { returnObjects: true });
  const rosters = t("schedule.rosters", { returnObjects: true });
  const sessions = t("schedule.sessions", { returnObjects: true });
  const team = t("schedule.team", { returnObjects: true });

  return (
    <Row justify="center" className="py-30">
      <Col span={20}>
        <motion.div
          className="schedule-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h1 className="schedule-heading" variants={fadeIn} custom={0}>
            {t("schedule.title")}
          </motion.h1>

          <motion.div className="schedule-table-wrapper" variants={slideIn}>
            <table className="custom-schedule-table w-full">
              <thead>
                <tr>
                  <th>{days.time}</th>
                  <th>{days.monday}</th>
                  <th>{days.tuesday}</th>
                  <th>{days.wednesday}</th>
                  <th>{days.thursday}</th>
                  <th>{days.friday}</th>
                  <th>{days.saturday}</th>
                  <th>{days.sunday}</th>
                </tr>
              </thead>
              <tbody>
                {/* Table Rows */}
                {/* ... (Keep your full row logic as it is) */}
                {/* Reuse the table rows you provided earlier without change */}
                {/* First row */}
                <tr>
                  <td>11:00</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div>
                      <span className="roster roster-multi">
                        {t("schedule.roster")}{" "}
                        <span className="roster-1">1</span>;
                        <span className="roster-2">2</span>;
                        <span className="roster-3">3</span>;
                        <span className="roster-4">4</span>
                      </span>
                      <br />
                      <small>{t("schedule.bigSmallPool")}</small>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span className="roster roster-multi">
                        {t("schedule.roster")}{" "}
                        <span className="roster-1">1</span>;
                        <span className="roster-2">2</span>;
                        <span className="roster-3">3</span>;
                        <span className="roster-4">4</span>
                      </span>
                      <br />
                      <small>{t("schedule.bigSmallPool")}</small>
                    </div>
                  </td>
                </tr>

                {/* Remaining rows ... (unchanged) */}
                {/* Just keep your original row rendering logic intact */}
                {/* 17:00, 18:00, 21:00 rows here */}
                <tr>
                  <td>17:00</td>
                  {[...Array(5)].map((_, i) => {
                    if (i === 0 || i === 2) {
                      return (
                        <td key={i}>
                          <div>
                            <span className="roster">
                              {t("schedule.roster")}{" "}
                              <span className="roster-1">1</span>;
                              <span className="roster-3">3</span>;
                              <span className="roster-4">4</span>
                            </span>
                            <br />
                            <small>{t("schedule.bigSmallPool")}</small>
                          </div>
                        </td>
                      );
                    } else if (i === 4) {
                      return (
                        <td key={i}>
                          <div>
                            <span className="roster">
                              {t("schedule.roster")}{" "}
                              <span className="roster-2">2</span>;
                              <span className="roster-3">3</span>;
                            </span>
                            <br />
                            <small>{t("schedule.bigPool")}</small>
                          </div>
                        </td>
                      );
                    } else {
                      return <td key={i}></td>;
                    }
                  })}

                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td>18:00</td>
                  {[...Array(5)].map((_, i) => {
                    if (i === 0 || i === 2) {
                      return (
                        <td key={i}>
                          <div>
                            <span className="roster">
                              {t("schedule.roster")}{" "}
                              <span className="roster-1">1</span>;
                              <span className="roster-3">3</span>;
                            </span>
                            <br />
                            <small>{t("schedule.bigSmallPool")}</small>
                          </div>
                        </td>
                      );
                    } else if (i === 4) {
                      return (
                        <td key={i}>
                          <div>
                            <span className="roster">
                              {t("schedule.roster")}{" "}
                              <span className="roster-2">2</span>;
                              <span className="roster-3">3</span>;
                            </span>
                            <br />
                            <small>{t("schedule.bigPool")}</small>
                          </div>
                        </td>
                      );
                    } else {
                      return <td key={i}></td>;
                    }
                  })}

                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td>21:00</td>
                  {[...Array(5)].map((_, i) =>
                    i === 1 || i === 3 ? (
                      <td key={i}>
                        <div>
                          <span className="roster">
                            {t("schedule.aquaAerobic")}{" "}
                          </span>
                          <br />
                          <small>{t("schedule.smallPool")}</small>
                        </div>
                      </td>
                    ) : (
                      <td key={i}></td>
                    )
                  )}
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </motion.div>

          <Row gutter={[16, 16]} className="mt-10">
            {[0, 1, 2].map((index) => {
              let mdSpan;

              if (index === 0) {
                mdSpan = 8;
              } else if (index === 1) {
                mdSpan = 10;
              } else {
                mdSpan = 6;
              }

              return (
                <Col xs={24} lg={mdSpan} key={index}>
                  <motion.div
                    variants={fadeIn}
                    custom={index + 1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {index === 0 && (
                      <>
                        <h2 className="schedule-subtitle">
                          {t("schedule.rosterLevels")}
                        </h2>
                        <div className="schedule-table-wrapper">
                          <table className="custom-schedule-table small">
                            <thead>
                              <tr>
                                <th>{t("schedule.roster")}</th>
                                <th>{t("schedule.ageGroups")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="roster-1">
                                  {t("schedule.rosters.roster")} 1
                                </td>
                                <td>{rosters["1"]}</td>
                              </tr>
                              <tr>
                                <td className="roster-2">
                                  {t("schedule.rosters.roster")} 2
                                </td>
                                <td>{rosters["2"]}</td>
                              </tr>
                              <tr>
                                <td className="roster-3">
                                  {t("schedule.rosters.roster")} 3
                                </td>
                                <td>{rosters["3"]}</td>
                              </tr>
                              <tr>
                                <td className="roster-4">
                                  {t("schedule.rosters.roster")} 4
                                </td>
                                <td>{rosters["4"]}</td>
                              </tr>
                              <tr>
                                <td className="aqua">
                                  {t("schedule.aquaAerobic")}
                                </td>
                                <td>{rosters["aqua"]}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}

                    {index === 1 && (
                      <>
                        <h2 className="schedule-subtitle">
                          {t("schedule.sessionPerWeek")}
                        </h2>
                        <div className="schedule-table-wrapper">
                          <table className="custom-schedule-table small w-full">
                            <thead>
                              <tr>
                                <th>{t("schedule.ageGroupsShort")}</th>
                                {sessions.header.map((age, i) => (
                                  <th key={i}>{age}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="roster-1">
                                  {t("schedule.sessions.roster")} 1
                                </td>
                                {sessions.r1.map((v, i) => (
                                  <td key={i}>{v}</td>
                                ))}
                              </tr>
                              <tr>
                                <td className="roster-2">
                                  {t("schedule.sessions.roster")} 2
                                </td>
                                {sessions.r2.map((v, i) => (
                                  <td key={i}>{v}</td>
                                ))}
                              </tr>
                              <tr>
                                <td className="roster-3">
                                  {t("schedule.sessions.roster")} 3
                                </td>
                                {sessions.r3.map((v, i) => (
                                  <td key={i}>{v}</td>
                                ))}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}

                    {index === 2 && (
                      <>
                        <h2 className="schedule-subtitle">
                          {t("schedule.teamManagement")}
                        </h2>
                        <div className="schedule-table-wrapper">
                          <table className="custom-schedule-table small w-full">
                            <thead>
                              <tr>
                                <th>{t("schedule.name")}</th>
                                <th>{t("schedule.surname")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {team.map((person, i) => (
                                <tr key={i}>
                                  <td>{person.first}</td>
                                  <td>{person.last}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        </motion.div>
      </Col>
    </Row>
  );
};

export default Schedule;
