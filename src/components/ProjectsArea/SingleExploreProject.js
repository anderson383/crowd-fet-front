import React from "react";
import { Image } from "react-bootstrap";
import Link from "../Reuseable/Link";

const SingleExploreProject = ({ project = {} }) => {
  const { fundingAmount, category, title, id, image } = project;

  const porcentaje  = (meta, mount) => {
    const porcentajeFaltante = 100 - (((meta - mount) / meta) * 100);
    return porcentajeFaltante
  }
  return (
    <div className="explore-projects-item mt-30">
      <Image src={image} alt={title} />
      <div className="explore-projects-content">
        <div className="item d-flex align-items-center">
          <span>{category}</span>
        </div>
        <Link href={`/single-project/${id}`}>
          <h3 className="title">{title}</h3>
        </Link>
        <div className="projects-range">
          <div className="projects-range-content">
            <ul>
              <li>Recaudado:</li>
              <li>{porcentaje(fundingAmount, fundingAmount)}%</li>
            </ul>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${porcentaje(fundingAmount, fundingAmount)}%`,
                }}
                aria-valuenow={porcentaje(fundingAmount, fundingAmount)}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {porcentaje(fundingAmount, fundingAmount)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleExploreProject;
