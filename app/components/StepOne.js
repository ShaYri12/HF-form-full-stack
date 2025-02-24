"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/stepone.css";
import "../styles/form.css";
import Review from "./Review";
import Link from "next/link";
import { useFormValues } from "../context/FormValuesContext";

const StepOne = ({ nextStep, handleChange, values, stateOptions }) => {
  const { t, i18n } = useTranslation();
  const [activebtn, setActivebtn] = useState("en");
  const [formData, setFormData] = useState({
    location: values.location || "",
    agreement: values.agreement || false,
  });
  const [errors, setErrors] = useState({});
  const { clearAndResetLocalStorage } = useFormValues();

  const handleLanguage = (language) => {
    setActivebtn(language);
    i18n.changeLanguage(language);
  };

  const handleInputChange = (field) => (e) => {
    const value = field === "agreement" ? e.target.checked : e.target.value;
    clearAndResetLocalStorage();
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { location, agreement } = formData;
    const newErrors = {};

    if (!location) {
      newErrors.location = t("error.selectError");
    }

    if (!agreement) {
      newErrors.agreement = t("error.agreementError");
    }

    if (Object.keys(newErrors).length === 0) {
      console.log("Form data:", formData);
      handleChange(formData);
      nextStep();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="formContainer step-form">
      <div className="title-info">
        <h2>{t("stepOne.title")}</h2>
      </div>
      <div className="language">
        <p>{t("stepOne.languagePrompt")}</p>
        <div className="language-btns">
          <button
            className={`${activebtn === "en" ? "active" : ""}`}
            onClick={() => handleLanguage("en")}
          >
            <img src="/assets/usa.jpeg" alt="eng" />
            English
          </button>
          <button
            className={`${activebtn === "es" ? "active" : ""}`}
            onClick={() => handleLanguage("es")}
          >
            <img src="/assets/esp.png" alt="esp" />
            Español
          </button>
          <button
            className={`${activebtn === "pt" ? "active" : ""}`}
            onClick={() => handleLanguage("pt")}
          >
            <img src="/assets/brazil.webp" alt="por" />
            Português
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <div className="location">
          <p>{t("stepOne.chooseLocation")}</p>
          <select
            onChange={handleInputChange("location")}
            value={formData.location}
          >
            <option value="">{t("stepSix.question2.select")}</option>
            {stateOptions.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        {errors.location && <p className="error">{errors.location}</p>}
        <div className="agreement">
          <input
            type="checkbox"
            id="agreement"
            name="agreement"
            checked={formData.agreement}
            onChange={handleInputChange("agreement")}
            required
          />
          <label htmlFor="agreement">
            {t("stepOne.acknowledgement")}
            <Link href="#">{t("stepOne.refundPolicy")},</Link>
            {"  "}
            <Link href="#">{t("stepOne.termsAndConditions")},</Link>
            {"  "}
            <Link href="#">{t("stepOne.noticeOfPrivacyPractices")},</Link>{" "}
            {t("stepOne.and")}{" "}
            <Link href="#">{t("stepOne.consentToTelehealth")}.</Link>{" "}
          </label>
        </div>
        {errors.agreement && <p className="error">{errors.agreement}</p>}
        <div className="btn-group">
          <button
            type="submit"
            className="long-btn long-btn-stepthree"
            onClick={handleSubmit}
          >
            {t("stepOne.startJourney")}
          </button>
        </div>
      </form>
      <Review />
    </div>
  );
};

export default StepOne;
