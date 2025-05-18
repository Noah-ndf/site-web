import React from 'react';
import './../styles/Tarifs.css';

export default function infos() {
  return <div className='Tcontainer'>

  <h1 className="H2green">Tarifs :</h1>
  <div className="bar"></div>
<article className="Tarticle">
  <div className="bar-container">
    <div className="barVwhite"></div>
  </div>
  <div className="text">
    <div className="line">
      <h2 className="H2white">Étudiant :</h2>
      <p className="Pwhite">séance de 50 min - 60 €</p>
    </div>
    <div className="line">
      <h2 className="H2white">Adulte :</h2>
      <p className="Pwhite">séance de 50 min - 70 €</p>
    </div>
  </div>
</article>
  <article className="Tarticle">
  <div className="bar-container">
    <div className="barVwhite"></div>
  </div>
  <div className="text2">
      <h2 className="H2white">Information pratiques :</h2>
      <p className="Pwhite">Le règlement se fait par virement (automatique sur Doctolib) – AVANT la consultation - en téléconsultation.</p>
      <h2 className="H2white">Remboursement des séances :</h2>
      <p className="Pwhite">Certaines mutuelles remboursent une partie des séances</p>
      <p className="Pwhite">Pour de plus amples renseignements, je vous recommande de vous adresser à votre complémentaire santé</p>
      <h2 className="H2white">Retards, déplacements et annulations :</h2>
      <p className="Pwhite">En cas de retard, merci de me prévenir au 07 81 82 20 84 dès que possible.</p>
      <p className="Pwhite">En cas de déplacement ou d’annulation, merci de me prévenir 48H à l’avance.</p>
      <p className="Pwhite">En cas de rendez-vous non-honoré sans me prévenir, la séance est dû.</p>
  </div>
</article>

  <h1 className="H2green">Coordonnées :</h1>
  <div className="bar"></div>
  <article className="Tarticle">
  <div className="bar-container">
    <div className="barVwhite"></div>
  </div>
  <div className="text2">
      <h2 className="H2white">E mail :</h2>
      <p className="Pwhite">psychologue.margauxviti@gmail.com</p>
  </div>
</article>
  <article className="Tarticle">
  <div className="bar-container">
    <div className="barVwhite"></div>
  </div>
  <div className="text2">
      <h2 className="H2white">Télephone  :</h2>
      <p className="Pwhite">(+33) 07 81 82 20 84</p>
      <p className="Pwhite">N’hésitez pas à me laisser un message vocal ou un sms avec votre nom et prénom ainsi qu’un numéro de téléphone sur lequel vous rappeler.</p>
  </div>
</article>


  </div>;
}