import Faqs from "@/components/FaqArea/Faqs";
import { projectDetailsFaq } from "@/data/projectsArea";
import React from "react";
import { projectDetailsStory } from "@/data/projectsArea";

const { items } = projectDetailsStory;


const { faqs, id } = projectDetailsFaq;

const ProjectDetailsFaq = ({ getClassName }) => {
  return (
    <div className={getClassName(id)} id={id} role="tabpanel">
      {/* <Faqs faqs={faqs} className="mt-70" /> */}
      <div className="project-details-item mt-70">
        {/* <p>{text2}</p> */}
        {items.map(({ id, title, text, className = "" }) => (
          <div className={`item ${className}`} key={id}>
            <i className="flaticon-checkmark"></i>
            <h5 className="title">{title}</h5>
            <p>{text}</p>
          </div>
        ))}
        {/* <Row>
          {images.map((image, i) => (
            <Col lg={6} md={6} sm={6} key={i}>
              <div className="project-details-thumb">
                <Image src={image.src} alt="" />
              </div>
            </Col>
          ))}
        </Row>
        <p className="text">{text3}</p> */}
      </div>
    </div>
  );
};

export default ProjectDetailsFaq;
