import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAtom } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import mySvg from "../../assets/img/landingimg.svg";
import featureuno from "../../assets/img/featureuno.png";
import featuredos from "../../assets/img/featuredos.png";
import featuretres from "../../assets/img/featuretres.png";
import yasmin from "../../assets/img/yasmin.jpg";
import villena from "../../assets/img/villena.jpg";
import kevin from "../../assets/img/kevin.jpg";
export const MainScreen = () => {
  return (
    <div className="app__landing">
      <header className="app__landing-header">
        <div className="app__landing-header-container">
          <FontAwesomeIcon
            icon={faAtom}
            className="app__landing-header-container-icon"
          />
          <Link
            to="/auth/login"
            className="app__landing-link-button header-button"
          >
            {" "}
            ¡Empieza ya!{" "}
          </Link>
        </div>
      </header>
      <section className="app__landing-intro">
        <div className="app__landing-intro-container">
          <div className="app__landing-intro-inner">
            <div className="app__landing-intro-inner-text">
              <h2>Laboratorio virtual multimedia</h2>
              <p>
                El laboratorio que te permitirá representar modelos de átomos de
                manera interactiva, que además podrás usar como una herramienta
                de apoyo para realizar prácticas en línea.
              </p>
              <h3 className="app__landing-header-difum">
                ¿Y tú? ¿Ya estas listo para llevar el aprendizaje a otro nivel?
              </h3>
              <Link to="/auth/login" className="app__landing-link-button">
                {" "}
                ¡Empieza ya!{" "}
              </Link>
            </div>
            <div className="app__landing-intro-inner-image">
              <div className="app__landing-intro-inner-image-fondo">
                <img src={mySvg}></img>
                <a href="https://storyset.com/medical" className="transparente">
                  Medical illustrations by Storyset
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <h1 className="app__landing-section-title">Ventajas</h1>
      <section className="app__landing-features">
        <div className="app__landing-features-bg">
          <div className="app__landing-features-containers">
            <div className="app__landing-features-containers-item">
              <div className="app__landing-features-containers-item-header">
                <img
                  src={featureuno}
                  className="app__landing-features-containers-item-header-img"
                ></img>
              </div>
              <h1 className="app__landing-containers-item-title">
                Educación basada en Web
              </h1>
              <p className="app__landing-containers-item-text">
                Entendemos la necesidad de brindar educación de forma remota
                debido a la situación de Covid-19. Este laboratorio multimedia
                virtual está construido desde cero, está diseñado para ayudar a
                brindar educación de manera interactiva para los estudiantes.
              </p>
            </div>
            <div className="app__landing-features-containers-item">
              <div className="app__landing-features-containers-item-header">
                <img
                  src={featuredos}
                  className="app__landing-features-containers-item-header-img"
                ></img>
              </div>
              <h1 className="app__landing-containers-item-title">
                Herramienta de apoyo al profesor
              </h1>
              <p className="app__landing-containers-item-text">
                Herramienta didáctica para realizar prácticas lo que ayudará a
                que los profesores tengan más tiempo para concentrarse en las
                necesidades de aprendizaje de cada estudiante, tendrá diferentes
                ejercicios que ayudarán a los estudiantes a fortalecer sus
                conocimientos en el área de los átomos.
              </p>
            </div>
            <div className="app__landing-features-containers-item">
              <div className="app__landing-features-containers-item-header">
                <img
                  src={featuretres}
                  className="app__landing-features-containers-item-header-img"
                ></img>
              </div>
              <h1>Herramienta de apoyo a los estudiantes</h1>
              <p className="app__landing-containers-item-text">
                Brinda a los estudiantes acceso sin restricciones a prácticas
                estándar y laboratorios más personalizados para que los
                estudiantes puedan tener tiempo de práctica extendido. Haciendo
                que el aprendizaje sea interactivo y divertido.
              </p>
            </div>
          </div>
        </div>
      </section>
      <h1 className="app__landing-section-title">Nosotros</h1>
      <section className="app__landing-autors">
        <div className="app__landing-autors-container">
          <div className="app__landing-autors-container-item">
            <div className="app__landing-autors-container-item-main">
              <div className="app__landing-autors-container-item-main-header">
                <img
                  src={yasmin}
                  className="app__landing-autors-container-item-main-header-img"
                ></img>
              </div>
              <div className="app__landing-autors-container-item-main-body">
                <p>Estudiante de Ingeniería en sistemas computacionales</p>
              </div>
              <div className="app__landing-autors-container-item-main-footer">
                <p>
                  <FontAwesomeIcon icon={faInstagram} /> @yasmon25{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="app__landing-autors-container-item">
            <div className="app__landing-autors-container-item-main">
              <div className="app__landing-autors-container-item-main-header">
                <img
                  src={villena}
                  className="app__landing-autors-container-item-main-header-img"
                ></img>
              </div>
              <div className="app__landing-autors-container-item-main-body">
                <p>Estudiante de Ingeniería en sistemas computacionales</p>
              </div>
              <div className="app__landing-autors-container-item-footer">
                <p>
                  <FontAwesomeIcon icon={faInstagram} /> @carlosvillena69{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="app__landing-autors-container-item">
            <div className="app__landing-autors-container-item-main">
              <div className="app__landing-autors-container-item-main-header">
                <img
                  src={kevin}
                  className="app__landing-autors-container-item-main-header-img"
                ></img>
              </div>
              <div className="app__landing-autors-container-item-main-body">
                <p>Estudiante de Ingeniería en sistemas computacionales</p>
              </div>
              <div className="app__landing-autors-container-item-footer">
                <p>
                  <FontAwesomeIcon icon={faInstagram} /> @__kevzz__{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="app__landing-footer">
        <div className="app__landing-header-container">
          <FontAwesomeIcon
            icon={faAtom}
            className="app__landing-header-container-icon"
          />
          <Link
            to="/auth/login"
            className="app__landing-link-button header-button"
          >
            {" "}
            ¡Empieza ya!{" "}
          </Link>
        </div>
      </footer>
    </div>
  );
};
