import { Link } from 'react-router-dom';
import React from 'react';
import './../styles/home.css';


export default function Home() {
  return <div className='pagecontainer'>
 
 <article className='Bloc1'>
  <div className='Bloc1-1'>
    <h1>Écouter, comprendre, évoluer ensemble.</h1>
    <div className="bar"></div>
    <p>Mon approche thérapeutique est basée sur l'écoute active, l'empathie et la compréhension de chaque individu dans sa singularité. Je crois en la capacité de chacun à évoluer et à se reconstruire, quel que soit le point de départ.</p>
    <h2>Découvrez mes services plus bas</h2>
  </div>
  <div className='Bloc1-2'>
    <div className="bar2"></div>
    <div className="Bloc1-2-1">
      <img src="./../../public/Photo-wt-bg.png" alt="" />
      <h1>MARGAUX VITI</h1>
      <p>Psychologue (clinicienne) et  Psychotérapeute</p>
    </div>
  </div>
 </article>
  
 <article className='Bloc2' id='Bloc2'>
  <div className="Bloc2-1">
    <h1>Ce que je vous propose :</h1>
    <div className="bar2-1"></div>
    <p>
      Lors de notre première rencontre, nous apprendrons à faire connaissance et après une écoute
      bienveillante et sans jugement de votre demande, nous construirons ensemble
      l’accompagnement qui vous convient le mieux.
    </p>
    <div className="bar2-2"></div>
  </div>
  <div className="Bloc2-2">
    <div className="Bloc2-2-1">
      <h1>Téléconsultation :</h1>
    </div>
    <div className="Bloc2-2-2">
      <p>
        La psychothérapie doit être accessible à toutes et tous et de n’importe où, c’est pourquoi je
      vous propose un accompagnement en ligne afin de palier vos contraintes de déplacement et
      d’organisation personnelle ou simplement pour répondre à un choix, une préférence.</p>

      <p>
      C’est un accompagnement flexible qui vous permet d’avoir accès à un suivi psychologique quelle que
      soit votre situation (maladies chroniques, grossesse alitée, vie à l’étranger, horaires de travail
      incompatibles avec un rendez-vous en cabinet, impératifs familiaux, etc.).</p>

      <Link to="/presentation">Plus sur moi</Link>
    </div>
  </div>
 </article>

  </div>;
}
