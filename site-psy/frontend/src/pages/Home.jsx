import { Link } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './../styles/home.css';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className='pagecontainer'>

      <article className='Bloc1'>
        <div className='Bloc1-1'>
          <h1 className='H1green'>{t('home.title')}</h1>
          <div className="bar"></div>
          <p className='Pgreen'>{t('home.intro')}</p>
          <h2>{t('home.scrollHint')}</h2>
        </div>

        <div className='Bloc1-2'>
          <div className="bar2"></div>
          <div className="Bloc1-2-1">
            <img src="./../../public/Photo-wt-bg.png" alt="" />
            <h1 className='H1green'>MARGAUX VITI</h1>
            <p className='Pgreen'>{t('home.titleRole')}</p>
          </div>
        </div>
      </article>

      <article className='Bloc2' id='Bloc2'>
        <div className="Bloc2-1">
          <h1 className='H1green'>{t('home.servicesTitle')}</h1>
          <div className="bar"></div>
          <p className='Pgreen'>{t('home.servicesText')}</p>
          <div className="bar"></div>
        </div>

        <div className="Bloc2-2">
          <div className="Bloc2-2-1">
            <h1 className='H2green'>{t('home.teleconsultTitle')}</h1>
          </div>
          <div className="Bloc2-2-2">
            <p className='Pgreen'>{t('home.teleconsultText1')}</p>
            <p className='Pgreen'>{t('home.teleconsultText2')}</p>
          </div>
        </div>
      </article>

      <article className='Bloc3'></article>
    </div>
  );
}