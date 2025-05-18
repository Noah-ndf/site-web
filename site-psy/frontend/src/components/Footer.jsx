import React from "react";
import { useTranslation } from 'react-i18next';
import './../styles/footer.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <div className="left">
        <h1>{t('footer.name')}</h1>
        <div className="footerbar"></div>
        <p>{t('footer.title')}</p>
        <p>{t('footer.contact')}</p>
      </div>
      <div className="right">
        <img src="./../public/greenlogo.png" alt="" />
        <p>{t('footer.legal')}</p>
      </div>
    </div>
  );
}
