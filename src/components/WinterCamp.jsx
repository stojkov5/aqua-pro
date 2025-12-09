// src/components/WinterCamp.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/WinterCamp.css";

const WinterCamp = () => {
  const { t } = useTranslation();

  return (
    <section className="wintercamp-wrapper text-white">
      {/* Background + overlay */}
      <div className="wintercamp-bg">
        <div className="wintercamp-overlay" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 space-y-16">
        {/* HERO */}
        <header className="text-center space-y-4">
          <p className="tracking-[0.18em] text-[0.65rem] md:text-xs uppercase text-sky-200">
            {t("winterCamp.hero.tagline")}
          </p>

          <h1 className="wintercamp-title">
            {t("winterCamp.hero.title")}
          </h1>

          <p className="wintercamp-subtitle font-semibold">
            {t("winterCamp.hero.datesLocation")}
          </p>

          <p className="wintercamp-body-text max-w-3xl mx-auto">
            {t("winterCamp.hero.p1")}
          </p>

          <p className="wintercamp-body-text max-w-3xl mx-auto">
            {t("winterCamp.hero.p2")}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="/public/WinterCamp/APWinterCamp.pdf"
              className="wintercamp-primary-btn"
              target="_blank"
            >
              {t("winterCamp.hero.pdfButton")}
            </a>
          </div>
        </header>

        {/* IMAGE STRIP */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
            <img
              src="/WinterCamp/Borovec.webp"
              alt={t("winterCamp.images.borovecAlt")}
              className="w-full h-40 md:h-56 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
            <img
              src="/WinterCamp/WinterCamp.webp"
              alt={t("winterCamp.images.campAlt")}
              className="w-full h-40 md:h-56 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
            <img
              src="/WinterCamp/WinterCampPool.webp"
              alt={t("winterCamp.images.poolAlt")}
              className="w-full h-40 md:h-56 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </section>

        {/* WHY AQUA PRO WINTER CAMP */}
        <section className="wintercamp-section-block">
          <h2 className="wintercamp-section-title">
            {t("winterCamp.why.title")}
          </h2>

          <ul className="wintercamp-bullet-list space-y-2 mt-3">
            <li>{t("winterCamp.why.item1")}</li>
            <li>{t("winterCamp.why.item2")}</li>
            <li>{t("winterCamp.why.item3")}</li>
            <li>{t("winterCamp.why.item4")}</li>
            <li>{t("winterCamp.why.item5")}</li>
          </ul>

          <p className="wintercamp-body-text mt-4">
            {t("winterCamp.why.p1")}
          </p>
        </section>

        {/* WHAT'S INCLUDED / PRICE */}
        <section className="grid gap-8 lg:grid-cols-[1.4fr,1fr]">
          {/* Included */}
          <div className="wintercamp-section-block">
            <h2 className="wintercamp-section-title">
              {t("winterCamp.included.title")}
            </h2>

            <ul className="wintercamp-bullet-list space-y-2 mt-3">
              <li>{t("winterCamp.included.item1")}</li>
              <li>{t("winterCamp.included.item2")}</li>
              <li>{t("winterCamp.included.item3")}</li>
              <li>{t("winterCamp.included.item4")}</li>
              <li>{t("winterCamp.included.item5")}</li>
            </ul>

            <div className="mt-5 space-y-1 text-sm md:text-base">
              <p>
                <span className="font-semibold">
                  {t("winterCamp.included.priceLabel")}
                </span>
              </p>
              <p>{t("winterCamp.included.priceSingle")}</p>
              <p>{t("winterCamp.included.priceDouble")}</p>
            </div>

            <p className="wintercamp-body-text mt-4 text-sky-100">
              {t("winterCamp.included.notIncluded")}
            </p>
          </div>

          {/* Location highlight */}
          <div className="wintercamp-section-block wintercamp-conditions">
            <h2 className="wintercamp-section-title">
              {t("winterCamp.location.title")}
            </h2>
            <p className="wintercamp-body-text">
              {t("winterCamp.location.p1")}
            </p>
            <p className="wintercamp-body-text mt-3">
              {t("winterCamp.location.p2")}
            </p>
          </div>
        </section>

        {/* REGISTRATION */}
        <section className="wintercamp-section-block">
          <h2 className="wintercamp-section-title">
            {t("winterCamp.registration.title")}
          </h2>

          <p className="wintercamp-body-text">
            {t("winterCamp.registration.intro")}
          </p>

          <ul className="wintercamp-bullet-list space-y-2 mt-3">
            <li>{t("winterCamp.registration.item1")}</li>
            <li>{t("winterCamp.registration.item2")}</li>
          </ul>

          <p className="wintercamp-body-text mt-4">
            {t("winterCamp.registration.note")}
          </p>
        </section>

        {/* CONTACT */}
        <footer className="pt-4 border-t border-white/10 text-center text-xs md:text-sm text-sky-100">
          <p className="mb-1">{t("winterCamp.contact.title")}</p>
          <p>
            📧{" "}
            <a
              href="mailto:aquaproswim@gmail.com"
              className="underline underline-offset-4"
            >
              aquaproswim@gmail.com
            </a>{" "}
            · 📞{" "}
            <a href="tel:+38971248750" className="underline underline-offset-4">
              071/248-750
            </a>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default WinterCamp;
