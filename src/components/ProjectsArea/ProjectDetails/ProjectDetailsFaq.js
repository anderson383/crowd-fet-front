import React, { useState } from "react";
import Faqs from "@/components/FaqArea/Faqs";
import { projectDetailsFaq } from "@/data/projectsArea";
import { Col, Button, Modal, Image, Container, Row } from "react-bootstrap";
import { projectDetailsStory } from "@/data/projectsArea";

const { items, images, text3 } = projectDetailsStory;


const { faqs, id } = projectDetailsFaq;


const ProjectDetailsFaq = ({ recompensas, getClassName }) => {
  // const [current, setCurrent] = useState(recompensas[0].id);
  const [current, setCurrent] = useState();
   const handleCurrent = (current) => {
     setCurrent(current);
   };
  return (
    <div className={getClassName(id)} id={id} role="tabpanel">
      {/* <Faqs faqs={faqs} className="mt-70" /> */}
      {/* <div className={`faq-accordion overflow-hidden `}>
        <div className={`accrodion-grp faq-accrodion`}>
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`accrodion overflow-hidden${
                current === faq.id ? " active" : ""
              }`}
            >
              <div className="accrodion-inner">
                <div
                  onClick={() => handleCurrent(faq.id)}
                  className="accrodion-title"
                >
                  <h4>
                    <span>{++index}.</span> {faq.title}
                  </h4>
                </div>
                <div
                  className={`accrodion-content${
                    current === faq.id ? "" : " d-none"
                  }`}
                >
                  <div
                    className={`inner animated${
                      current === faq.id ? " fadeInUp" : ""
                    }`}
                  >
                    <p>{faq.text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <div className={`faq-accordion overflow-hidden `}>
        <div className={`accrodion-grp faq-accrodion`}>
          {(recompensas || []).map(({ id, title, description, elements }, index) => (
            <div
              key={id}
              className={`accrodion overflow-hidden${
                current === id ? " active" : ""
              }`}
            >
              <div className="accrodion-inner">
                <div
                  onClick={() => handleCurrent(id)}
                  className="accrodion-title"
                >
                  <h4>
                    {/* <i className="flaticon-checkmark"></i> */}
                    <span>{++index}.</span> {title}
                  </h4>
                </div>
                <div
                  className={`accrodion-content${
                    current === id ? "" : " d-none"
                  }`}
                >
                  <div
                    className={`inner animated${
                      current === id ? " fadeInUp" : ""
                    }`}
                  >
                    <p>{description}</p>

                    {(elements || []).map(
                      ({ id, title, image }) => (
                          <div className="project-details-sidebar" key={id}>
                            <div className="project-details-info box">
                              <div className="info">
                                <Image
                                  src={image?.fileUrl}
                                  className="image-recompensa"
                                  alt=""
                                />
                                <h5 className="title">{title}</h5>
                                {/* <span>{info.backed} backed</span> */}
                              </div>
                              {/* <p>{title}</p> */}
                            </div>
                            {/* {perks.map((perk) => (
                    <ProjectDetailsPark perk={perk} key={perk.id} />
                  ))} */}
                          </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="project-details-item mt-70"> */}
        {/* <p>{text2}</p> */}
        {/* {(recompensas || []).map(({ id, title, description, elements }) => (
          <div className={`item`} key={id}>
            <i className="flaticon-checkmark"></i>
            <h5 className="title">{title}</h5>
            <p>{description}</p>

            {(elements || []).map(({ id, title, image, className = "" }) => (
              <div className="project-details-sidebar" key={id}>
                <div className="project-details-info mt-70 box">
                  <div className="info">
                    <Image
                      src={image?.fileUrl}
                      className="image-recompensa"
                      alt=""
                    />
                    <h5 className="title">{title}</h5>
                    {/* <span>{info.backed} backed</span> */}
                  {/* </div> */}
                  {/* <p>{title}</p> */}
                {/* </div> */}
                {/* {perks.map((perk) => (
                    <ProjectDetailsPark perk={perk} key={perk.id} />
                  ))} */}
              {/* </div> */}
            {/* ))} */}
          {/* </div> */}
        {/* ))} */}
        {/* {items.map(({ id, title, text, className = "" }) => (
          <div className={`item ${className}`} key={id}>
            <i className="flaticon-checkmark"></i>
            <h5 className="title">{title}</h5>
            <p>{text}</p>
          </div>
        ))} */}
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
      {/* </div> */}
    </div>
  );
};

export default ProjectDetailsFaq;
