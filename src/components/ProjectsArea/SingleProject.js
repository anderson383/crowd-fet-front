import React from "react";
import { Image } from "react-bootstrap";
import {
  calcularPorcentaje,
  formatPrice,
  calcularDiasConMoment,
} from "@/utils/helpers";
import Link from "../Reuseable/Link";

const SingleProject = ({ project = {}, className = "" }) => {
  const {
    id,
    image,
    category,
    launchDate,
    title,
    campaignDuration,
    fundingAmount,
    transaction,
  } = project;

  return (
    <div className="explore-projects-item mt-30">
      <div className="explore-projects-thumb">
        <Image src={image} alt="explore-projects" />
        {/* <a href="#">
          <i className="fa fa-heart"></i>
        </a> */}
      </div>
      <div className="explore-projects-content">
        <div className="item d-flex align-items-center">
          <span>{category}</span>
          <p>
            <i className="fa fa-clock-o"></i>{" "}
            {calcularDiasConMoment(launchDate, campaignDuration)} días restantes
          </p>
        </div>
        <Link href={`/single-project/${id}`}>
          <h3 className={`title ${className}`}>{title}</h3>
        </Link>
        <div className="projects-range">
          <div className="projects-range-content">
            <ul>
              <li>Recaudado:</li>
              <li>
                {calcularPorcentaje(fundingAmount, transaction?.totalSum)}%
              </li>
            </ul>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${calcularPorcentaje(
                    fundingAmount,
                    transaction?.totalSum
                  )}%`,
                }}
                aria-valuenow={calcularPorcentaje(
                  fundingAmount,
                  transaction?.totalSum
                )}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
        <div className="projects-goal">
          <span>
            Meta: <span>{formatPrice(fundingAmount)} COP</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
