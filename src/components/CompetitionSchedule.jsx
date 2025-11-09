/* eslint-disable no-unused-vars */
import React from "react";
import { Row, Col } from "antd";
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

// === TEAM PROGRAM DATA (from PDF) ===
const rawProgram = {
  January: [
    { week: "Week 3", date: "13–19", location: "Borovets (BUL)", organizer: "Aqua Pro SC", competition: "Winter Camp", category: "ET;A;B;C" },
  ],
  February: [], // no events listed
  March: [
    { week: "Week 1", date: "01–02", location: "Skopje (MKD)", organizer: "Neptun SC", competition: "Neptun Kup", category: "A;B;C;D" },
    { week: "Week 2", date: "14–16", location: "Belgrade (SRB)", organizer: "PSS LC", competition: "Serbia Open", category: "ET;A;B;C" },
    { week: "Week 3", date: "21–23", location: "Thessaloniki (GRE)", organizer: "GR LC", competition: "ISC Ivanofea", category: "ET" },
    { week: "Week 3", date: "22–23", location: "Skopje (MKD)", organizer: "Delfin SC", competition: "Delfin Kup", category: "A;B;C;D" },
  ],
  April: [
    { week: "Week 1", date: "05–06", location: "Skopje (MKD)", organizer: "Vardar 2018 LC", competition: "Vardar 2018 Open", category: "A;B;C;D" },
    { week: "Week 2", date: "12–13", location: "(SLO/CYP)", organizer: "(SLO/CYP) LC", competition: "Multinations Youth", category: "MKD National Team (2010–2012 / 2007–2009)" },
    { week: "Week 2", date: "12–13", location: "Belgrade (SRB)", organizer: "11 April LC", competition: "11 April GP", category: "ET;A;B;C" },
    { week: "Week 3", date: "17–21", location: "Sandanski (BUL)", organizer: "Aqua Pro LC", competition: "Spring Camp", category: "ET;A;B;C" },
    { week: "Week 4", date: "29", location: "Skopje (MKD)", organizer: "NPF LC", competition: "Nacionalno Dalecinsko", category: "A;B;C" },
  ],
  May: [
    { week: "Week 3", date: "17–18", location: "Skopje (MKD)", organizer: "Orion LC", competition: "Orion Kup", category: "A;B;C;D" },
    { week: "Week 4", date: "24–25", location: "Banja Luka (BIH)", organizer: "Olymp LC", competition: "Banja Luka Open", category: "ET;A;B;C" },
  ],
  June: [
    { week: "Week 2", date: "13–15", location: "(SRB)", organizer: "PSS LC", competition: "Comen Cup", category: "MKD National Team (2009–2011 m / 2010–2012 f)" },
    { week: "Week 3", date: "16–23", location: "(GRE)", organizer: "Aqua Pro LC", competition: "Summer Camp", category: "ET;A;B;C" },
    { week: "Week 4", date: "26–28", location: "Samorin (SVK)", organizer: "EA LC", competition: "European Championship U23", category: "MKD National Team (2002>)" },
  ],
  July: [
    { week: "Week 1", date: "01–06", location: "Samorin (SVK)", organizer: "EA LC", competition: "European Championship Jr.", category: "2007–2009" },
    { week: "Week 2", date: "12–13", location: "Skopje (MKD)", organizer: "NPF LC", competition: "Nacionalno Prvenstvo", category: "All" },
    { week: "Week 3", date: "18", location: "Krusevo (MKD)", organizer: "Pirani OWS", competition: "KDP 2 Tose Proeski", category: "A;B;C" },
    { week: "Week 3", date: "20–26", location: "Skopje (MKD)", organizer: "MOK LC", competition: "European Youth Olympic Festival", category: "MKD National Team (2010–2011)" },
    { week: "Week 4", date: "25.07–02.08", location: "Ohrid (MKD)", organizer: "Aqua Pro LC/OWS", competition: "Summer Camp 2", category: "A;B;C" },
    { week: "Week 4", date: "26–27", location: "Ohrid (MKD)", organizer: "Aqua Spirit LC", competition: "Ohrid Open", category: "A;B;C" },
    { week: "Week 4", date: "27.07–03.08", location: "SGP WA LC", organizer: "WA LC", competition: "World Championship", category: "MKD National Team" },
  ],
  August: [
    { week: "Week 1", date: "02", location: "Ohrid (MKD)", organizer: "Ohridski Branovi OWS", competition: "Ilindenski Maraton", category: "A;B;C" },
    { week: "Week 3", date: "19–24", location: "Otopeni (ROU)", organizer: "WA LC", competition: "World Championship Jr.", category: "MKD National Team (2007–2009)" },
  ],
  September: [
    { week: "Week 2", date: "13", location: "Skopje (MKD)", organizer: "Delfin LC", competition: "Delfin Sprint", category: "A;B;C;D" },
    { week: "Week 4", date: "29", location: "Skopje (MKD)", organizer: "Orion SC", competition: "Orion Mini", category: "A;B;C;D" },
  ],
  October: [
    { week: "Week 3", date: "25–26", location: "Skopje (MKD)", organizer: "Delfin SC", competition: "Nemo Kup", category: "A;B;C;D" },
  ],
  November: [
    { week: "Week 2", date: "08–09", location: "Skopje (MKD)", organizer: "Beta Sharks SC", competition: 'ISM "MRB"', category: "ET;A;B;C;D" },
    { week: "Week 4", date: "29–30", location: "Skopje (MKD)", organizer: "Skopje SC", competition: "Skopje Open", category: "ET;A;B;C;D" },
  ],
  December: [
    { week: "Week 1", date: "02–07", location: "(POL)", organizer: "EA SC", competition: "European Championship", category: "MKD National Team" },
    { week: "Week 2", date: "13–14", location: "Skopje (MKD)", organizer: "NPF SC", competition: "Nacionalno Prvenstvo", category: "ET;A;B;C;D" },
    { week: "Week 3", date: "20–21", location: "Nis (SRB)", organizer: "St. Nikola LC", competition: "St. Nikola Nish", category: "A;B;C" },
    { week: "Week 3", date: "21", location: "Skopje (MKD)", organizer: "Atlantida SC", competition: "Atlantida", category: "A;B;C;D" },
    { week: "Week 4", date: "28", location: "Skopje (MKD)", organizer: "Aqua Pro SC", competition: "Talent Cup", category: "A;B;C;D" },
  ],
};

// === Helper: ensure all 4 weeks per month ===
const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
const fillEmptyWeeks = (monthEvents) =>
  weeks.map((week) => {
    const found = monthEvents.find((e) => e.week === week);
    return (
      found || {
        week,
        date: "—",
        location: "—",
        organizer: "—",
        competition: "—",
        category: "—",
        empty: true,
      }
    );
  });

const CompetitionSchedule = () => {
  return (
    <Row justify="center" className="py-30">
      <Col span={22}>
        <motion.div
          className="schedule-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h1 className="schedule-heading" variants={fadeIn} custom={0}>
            AQUA PRO TEAM PROGRAM 2025
          </motion.h1>

          {Object.entries(rawProgram).map(([month, events], index) => (
            <motion.div
              key={month}
              variants={fadeIn}
              custom={index + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="schedule-subtitle text-center mb-4 text-white font-semibold text-xl">
                {month}
              </h2>
              <div className="schedule-table-wrapper">
                <table className="custom-schedule-table w-full">
                  <thead>
                    <tr>
                      <th>Week</th>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Organizer</th>
                      <th>Competition</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fillEmptyWeeks(events).map((item, i) => (
                      <tr key={i} className={item.empty ? "opacity-40" : ""}>
                        <td>{item.week}</td>
                        <td>{item.date}</td>
                        <td>{item.location}</td>
                        <td>{item.organizer}</td>
                        <td>{item.competition}</td>
                        <td>{item.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Col>
    </Row>
  );
};

export default CompetitionSchedule;
