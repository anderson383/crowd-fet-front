import { projectDetailsTabBtns } from "@/data/projectsArea";
import React, { useState } from "react";
import { Col, Button, Modal, Image, Container, Row } from "react-bootstrap";
import ProjectDetailsComments from "./ProjectDetailsComments";
import ProjectDetailsFaq from "./ProjectDetailsFaq";
import ProjectDetailsSidebar from "./ProjectDetailsSidebar";
import ProjectDetailsStory from "./ProjectDetailsStory";
import ProjectDetailsUpdates from "./ProjectDetailsUpdates";
import ReactPlayer from "react-player";

const ProjectDetailsContent = ({project}) => {

   const [show, setShow] = useState(false);
  return (
    <section className="project-details-content-area pb-100">
      <Container>
        <div className="justify-content-center">
          <div className="project-details-content-top">
            <p>{project.subtitle}</p>
          </div>
          <div className="mb-5">
            <Button variant="primary"
              onClick={() => setShow(true)}> Leer Documento
            </Button>
            <Modal
              show={show}
              onHide={() => setShow(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                {project.file && (
                  <div
                    style={{
                      border: "1px solid #ddd",
                      padding: "10px",
                      marginTop: "20px",
                      height: "750px",
                      width: "80%",
                      display: "contents",
                      overflow: "auto",
                    }}
                  >
                    <iframe
                      src={project.file?.fileUrl}
                      width="100%"
                      height="100%"
                      title="PDF Viewer"
                      style={{ border: "none" }}
                    />
                  </div>
                )}
              </Modal.Body>
            </Modal>
          </div>
          <div className="project-details-item">
            {/* <p>{project.title}</p> */}
            <Row>
              <Col lg={6} md={6} sm={6}>
                <div className="project-details-thumb">
                  <ReactPlayer url={project.video} />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {/* <Row className="justify-content-center">
          <Col lg={8}>
            <div className="tab-btns">
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                {projectDetailsTabBtns.map(({ id, name }) => (
                  <li key={id} className="nav-item" role="presentation">
                    <a
                      onClick={() => setCurrent(id)}
                      className={`nav-link cursor-pointer${
                        id === current ? " active" : ""
                      }`}
                      role="tab"
                    >
                      {name}-
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tab-content" id="pills-tabContent">
              <ProjectDetailsStory getClassName={getClassName} /> */}
        {/* <ProjectDetailsFaq getClassName={getClassName} /> */}
        {/* <ProjectDetailsUpdates getClassName={getClassName} /> */}
        {/* <ProjectDetailsComments getClassName={getClassName} /> */}
        {/* </div>
          </Col>
          <Col lg={4} md={7} sm={9}>
            <ProjectDetailsSidebar />
          </Col> 
        </Row>*/}
      </Container>
    </section>
  );
};

export default ProjectDetailsContent;
