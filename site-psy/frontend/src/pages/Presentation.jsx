import React from 'react';
import { useTranslation } from 'react-i18next';
import './../styles/presentation.css';

export default function Presentation() {
  const { t } = useTranslation();

  return (
    <div className='Pcontainer'>
      <h1 className="H2green">{t('presentation.text1')}</h1>
      <div className="bar"></div>
      <p className="Pgreen">{t('presentation.text2')}</p>
      <p className="Pgreen">{t('presentation.text3')}</p>
      <p className="Pgreen">{t('presentation.text4')}</p>
      <p className="Pgreen">{t('presentation.text5')}</p>

      <h1 className="H2green">{t('presentation.text6')}</h1>
      <div className="bar"></div>
      <p className="Pgreen">{t('presentation.text7')}</p>
      <p className="Pgreen">{t('presentation.text8')}</p>
      <p className="Pgreen">{t('presentation.text9')}</p>

      <h1 className="H2green">{t('presentation.text10')}</h1>
      <div className="bar"></div>
      <p className="Pgreen">{t('presentation.text11')}</p>
      <p className="Pgreen">{t('presentation.text12')}</p>
      <p className="Pgreen">{t('presentation.text13')}</p>
      <p className="Pgreen">{t('presentation.text14')}</p>
      <p className="Pgreen">{t('presentation.text15')}</p>
      <p className="Pgreen">{t('presentation.text16')}</p>
      <p className="Pgreen">{t('presentation.text17')}</p>
      <p className="Pgreen">{t('presentation.text18')}</p>
      <p className="Pgreen">{t('presentation.text19')}</p>
      <p className="Pgreen">{t('presentation.text20')}</p>
      <p className="Pgreen">{t('presentation.text21')}</p>
      <p className="Pgreen">{t('presentation.text22')}</p>

      <h1 className="H2green">{t('presentation.text23')}</h1>
      <div className="bar"></div>
      <p className="Pgreen">{t('presentation.text24')}</p>
      <p className="Pgreen">{t('presentation.text25')}</p>
      <p className="Pgreen">{t('presentation.text26')}</p>

      <h1 className="H2green">{t('presentation.text27')}</h1>
      <div className="bar"></div>
      <p className="Pgreen">{t('presentation.text28')}</p>
      <p className="Pgreen">{t('presentation.text29')}</p>

      <h1 className="H2green">{t('presentation.bookTitle')}</h1>
      <div className="bar"></div>
      <div className="article">
        <div className="media-block">
          <img src="./../public/book.jpg" alt="" />
          <div className="barVwhite"></div>
        </div>
        <div className="article-infos">
          <h1 className="H2white">{t('presentation.bookHeading')}</h1>
          <p className="Pwhite">{t('presentation.bookText1')}</p>
          <p className="Pwhite">{t('presentation.bookText2')}</p>
          <a target="_blank" href="https://www.amazon.fr/Cest-dans-t%C3%AAte-Margaux-Viti-ebook/dp/B0B5H2T5CB">
            {t('presentation.bookLink')}
          </a>
        </div>
      </div>

      <h1 className="H2green">{t('presentation.podcastTitle')}</h1>
      <div className="bar"></div>
      <div className="article">
        <div className="media-block">
          <img src="./../public/podcast.jpg" alt="" />
          <div className="barVwhite"></div>
        </div>
        <div className="article-infos">
          <h1 className="H2white">{t('presentation.podcastHeading')}</h1>
          <p className="Pwhite">{t('presentation.podcastText1')}</p>
          <p className="Pwhite">{t('presentation.podcastText2')}</p>
          <a target="_blank" href="https://podcasts.audiomeans.fr/bien-etre-chronique-155e86396033/peu-importe-ce-quon-vous-dit-vos-symptomes-sont-bien-reels--53408b57">
            {t('presentation.podcastLink')}
          </a>
        </div>
      </div>
    </div>
  );
}
