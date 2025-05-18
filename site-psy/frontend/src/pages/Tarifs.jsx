import React from 'react';
import { useTranslation } from 'react-i18next';
import './../styles/Tarifs.css';

export default function Infos() {
  const { t } = useTranslation();

  return (
    <div className='Tcontainer'>
      <h1 className="H2green">{t('tarifs.title')}</h1>
      <div className="bar"></div>

      <article className="Tarticle">
        <div className="bar-container">
          <div className="barVwhite"></div>
        </div>
        <div className="text">
          <div className="line">
            <h2 className="H2white">{t('tarifs.studentLabel')}</h2>
            <p className="Pwhite">{t('tarifs.studentInfo')}</p>
          </div>
          <div className="line">
            <h2 className="H2white">{t('tarifs.adultLabel')}</h2>
            <p className="Pwhite">{t('tarifs.adultInfo')}</p>
          </div>
        </div>
      </article>

      <article className="Tarticle">
        <div className="bar-container">
          <div className="barVwhite"></div>
        </div>
        <div className="text2">
          <h2 className="H2white">{t('tarifs.practicalInfo')}</h2>
          <p className="Pwhite">{t('tarifs.payment')}</p>
          <h2 className="H2white">{t('tarifs.reimbursement')}</h2>
          <p className="Pwhite">{t('tarifs.mutuelleInfo1')}</p>
          <p className="Pwhite">{t('tarifs.mutuelleInfo2')}</p>
          <h2 className="H2white">{t('tarifs.delayTitle')}</h2>
          <p className="Pwhite">{t('tarifs.delayInfo1')}</p>
          <p className="Pwhite">{t('tarifs.delayInfo2')}</p>
          <p className="Pwhite">{t('tarifs.delayInfo3')}</p>
        </div>
      </article>

      <h1 className="H2green">{t('tarifs.contactTitle')}</h1>
      <div className="bar"></div>

      <article className="Tarticle">
        <div className="bar-container">
          <div className="barVwhite"></div>
        </div>
        <div className="text2">
          <h2 className="H2white">{t('tarifs.emailTitle')}</h2>
          <p className="Pwhite">{t('tarifs.email')}</p>
        </div>
      </article>

      <article className="Tarticle">
        <div className="bar-container">
          <div className="barVwhite"></div>
        </div>
        <div className="text2">
          <h2 className="H2white">{t('tarifs.phoneTitle')}</h2>
          <p className="Pwhite">{t('tarifs.phone')}</p>
          <p className="Pwhite">{t('tarifs.phoneNote')}</p>
        </div>
      </article>
    </div>
  );
}
