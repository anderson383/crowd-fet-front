import { projectDetailsArea } from "@/data/projectsArea";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import {
  formatPrice,
  calcularPorcentaje,
  calcularDiasConMoment,
} from "@/utils/helpers";

const { backers } = projectDetailsArea;

const ProjectDetailsArea = ({project}) => {

  return (
    <section className="project-details-area pt-120 pb-45">
      <Container>
        <Row>
          <Col lg={7}>
            <div className="project-details-thumb">
              <Image src={project.image} alt="" />
            </div>
          </Col>
          <Col lg={5}>
            <div className="project-details-content">
              <div className="details-btn">
                <span>{project.category}</span>
                {/* <div className="flag">
                  <Image src={flag.src} alt="" />
                  <p>{country}</p>
                </div> */}
              </div>
              <h3 className="title">{project.title}</h3>
              <div className="project-details-item">
                <div className="item text-center">
                  <h5 className="title">
                    {formatPrice(project.fundingAmount)}
                  </h5>
                  <span>Recaudado</span>
                </div>
                <div className="item text-center">
                  <h5 className="title">{backers}</h5>
                  <span>Patrocinadores</span>
                </div>
                <div className="item text-center">
                  <h5 className="title">
                    {calcularDiasConMoment(
                      project.launchDate,
                      project.campaignDuration
                    )}
                  </h5>
                  <span>Días restantes</span>
                </div>
              </div>
              <div className="projects-range">
                <div className="projects-range-content">
                  <ul>
                    <li>Raised:</li>
                    <li>
                      {calcularPorcentaje(project.fundingAmount, project.fundingAmount)}
                      %
                    </li>
                  </ul>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${calcularPorcentaje(
                          project.fundingAmount,
                          project.fundingAmount
                        )}%`,
                      }}
                      aria-valuenow={calcularPorcentaje(
                        project.fundingAmount,
                        project.fundingAmount
                      )}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {calcularPorcentaje(project.fundingAmount, project.fundingAmount)}
                      %
                    </div>
                  </div>
                  {/* <div className="range"></div> */}
                </div>
              </div>
              <div className="projects-goal">
                <span>
                  Meta: <span>{formatPrice(project.fundingAmount)} Cop</span>
                </span>
              </div>
              <div className="project-btn mt-25">
                <a className="main-btn" href="#">
                  Respalda este proyecto
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProjectDetailsArea;
