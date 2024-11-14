import { projectDetailsUpdates } from "@/data/projectsArea";
import React from "react";
import { Image } from "react-bootstrap";

const { id, updates } = projectDetailsUpdates;

const ProjectDetailsUpdate = ({ file, update = {} }) => {
  const { title, info, text, text2, image, id } = update;

  return (
    <div className="project-details-updates">
      {/* <div className="project-details-updates-top">
        <h3 className="title">{title}</h3>
        <div className="info-updates d-block d-sm-flex justify-content-between align-items-center">
          <div className="info">
            <Image src={info.image.src} alt="" />
            <span>
              by{" "}
              <span>
                {info.name}
                <span> {info.date}</span>
              </span>
            </span>
          </div>
          <div className="update">
            <span>#{id} Update</span>
          </div>
        </div>
      </div> */}
      <div className="project-details-updates-content">
        {file && (
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
              src={file?.fileUrl}
              width="100%"
              height="100%"
              title="PDF Viewer"
              style={{ border: "none" }}
            />
          </div>
        )}
        {/* <p>{text}</p>
        <p className="text">{text2}</p>
        <div className="project-updates-thumb mt-50">
          <Image
            src={require(`src/assets/images/${image}`).default.src}
            alt=""
          />
        </div> */}
      </div>
    </div>
  );
};

const ProjectDetailsUpdates = ({ file, getClassName }) => {
  return (
    <div className={getClassName(id)} id={id}>
      <div className="project-details-updates">
        {/* <div className="project-details-updates-top">
        <h3 className="title">{title}</h3>
        <div className="info-updates d-block d-sm-flex justify-content-between align-items-center">
          <div className="info">
            <Image src={info.image.src} alt="" />
            <span>
              by{" "}
              <span>
                {info.name}
                <span> {info.date}</span>
              </span>
            </span>
          </div>
          <div className="update">
            <span>#{id} Update</span>
          </div>
        </div>
      </div> */}
        <div className="project-details-updates-content">
          {file && (
            <div
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginTop: "20px",
                minHeight: "750px",
                width: "80%",
                display: "contents",
                overflow: "auto",
              }}
            >
              <iframe
                src={file?.fileUrl}
                style={{
                  minHeight: "750px",
                  width: "100%",
                  border: "none",
                }}
                title="PDF Viewer"
              />
            </div>
          )}
          {/* <p>{text}</p>
        <p className="text">{text2}</p>
        <div className="project-updates-thumb mt-50">
          <Image
            src={require(`src/assets/images/${image}`).default.src}
            alt=""
          />
        </div> */}
        </div>
      </div>
      {/* {updates.map((update) => (
        <ProjectDetailsUpdate file={file} update={update} key={update.id} />
      ))} */}
    </div>
  );
};

export default ProjectDetailsUpdates;
