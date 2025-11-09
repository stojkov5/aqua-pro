/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import { useLocation } from "react-router";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Row, Col } from "antd";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwithcer";
import "../styles/Navbar.css";
import { NavLink } from "react-router";

const navLinks = [
  { to: "/", label: "HOME" },
  {
    to: "/about",
    label: "ABOUT",
    dropdown: true,
    children: [
      { to: "/levels", label: "LEVELS" },
      { to: "/team", label: "COACHES" },
      { to: "/schedule", label: "SCHEDULE" },
    ],
  },
  { to: "/squad", label: "COMPETITION SQUAD" },
  {
    to: "/competition",
    label: "COMPETITIONS",
    dropdown: true,
    children: [
      { to: "/competitions-schedule", label: "COMPETITIONS SCHEDULE" },
    ],
  },
  { to: "/shop", label: "TEAM SHOP" },
  { to: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverXY, setHoverXY] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // 👇 Replaced dropdownOpen with index-based logic
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  const location = useLocation();
  const { t } = useTranslation();

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredIndex(index);
    setHoverXY({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleDropdownEnter = (index) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdownIndex(index);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdownIndex(null);
    }, 200);
  };

  return (
    <Row justify="center" className="absolute w-full z-50 py-3">
      <Col xs={20} lg={23}>
        <div className="flex items-center justify-between w-full">
          <div className="text-xl font-bold text-white z-10">
            <NavLink to="/">
              <img className="w-20" src="./Logo.png" alt="Aqua Pro Logo" />
            </NavLink>
          </div>

          {!isMobile && (
            <nav className="flex gap-6 text-white z-10">
              {navLinks.map((item, index) => {
                if (item.dropdown) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => handleDropdownEnter(index)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <NavLink to={item.to}>
                        {({ isActive }) => (
                          <button
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`nav-link relative ${
                              isActive ? "active" : ""
                            }`}
                          >
                            <span className="relative z-10">
                              {t(item.label)}
                            </span>
                            {hoveredIndex === index && (
                              <span
                                className="splash"
                                style={{
                                  top: hoverXY.y - 64,
                                  left: hoverXY.x - 64,
                                }}
                              />
                            )}
                            <span className="wave-underline" />
                          </button>
                        )}
                      </NavLink>

                      {openDropdownIndex === index && (
                        <div className="dropdown-menu absolute top-full mt-2 left-0 gap-2">
                          {item.children.map((child, i) => (
                            <NavLink to={child.to} key={child.to}>
                              {({ isActive }) => (
                                <button
                                  onMouseMove={(e) =>
                                    handleMouseMove(e, 999 + i)
                                  }
                                  onMouseLeave={() => setHoveredIndex(null)}
                                  className={`nav-link relative ${
                                    isActive ? "active" : ""
                                  }`}
                                >
                                  <span className="relative z-10">
                                    {t(child.label)}
                                  </span>
                                  {hoveredIndex === 999 + i && (
                                    <span
                                      className="splash"
                                      style={{
                                        top: hoverXY.y - 64,
                                        left: hoverXY.x - 64,
                                      }}
                                    />
                                  )}
                                  <span className="wave-underline" />
                                </button>
                              )}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink to={item.to} key={item.to}>
                    {({ isActive }) => (
                      <button
                        onMouseMove={(e) => handleMouseMove(e, index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`nav-link relative ${
                          isActive ? "active" : ""
                        }`}
                      >
                        <span className="relative z-10">{t(item.label)}</span>
                        {(hoveredIndex === index || isActive) && (
                          <span
                            className="splash"
                            style={{
                              top: hoverXY.y - 64,
                              left: hoverXY.x - 64,
                            }}
                          />
                        )}
                        <span className="wave-underline" />
                      </button>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          )}

          <div className="z-10">
            {!isMobile ? (
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
              </div>
            ) : (
              <Button
                type="text"
                icon={
                  <MenuOutlined style={{ fontSize: "24px", color: "white" }} />
                }
                onClick={() => setMenuOpen(!menuOpen)}
              />
            )}
          </div>
        </div>

        {menuOpen && isMobile && (
          <div className="mobile-menu fixed top-0 left-0 w-full h-screen bg-blue-500/30 backdrop-blur-xl text-white flex flex-col items-center justify-center z-50">
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((item) =>
                item.dropdown ? (
                  <div className="flex flex-col items-center gap-6" key={item.label}>
                    <NavLink
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                    >
                      {({ isActive }) => (
                        <button
                          className={`nav-link text-lg ${
                            isActive ? "active" : ""
                          }`}
                        >
                          {t(item.label)}
                        </button>
                      )}
                    </NavLink>
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={() => setMenuOpen(false)}
                      >
                        {({ isActive }) => (
                          <button
                            className={`nav-link text-lg ${
                              isActive ? "active" : ""
                            }`}
                          >
                            {t(child.label)}
                          </button>
                        )}
                      </NavLink>
                    ))}
                  </div>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                  >
                    {({ isActive }) => (
                      <button
                        className={`nav-link text-lg ${
                          isActive ? "active" : ""
                        }`}
                      >
                        {t(item.label)}
                      </button>
                    )}
                  </NavLink>
                )
              )}

              <div className="flex gap-6">
                <LanguageSwitcher />
              </div>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-6 text-white text-2xl"
            >
              ✕
            </button>
          </div>
        )}
      </Col>
    </Row>
  );
}
