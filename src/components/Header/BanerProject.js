import { Container, Button } from "react-bootstrap";
import axiosInstance from "src/config/axios/axios";
import React from "react";

const Baner = ({ projectId, projectStatus }) => {
  const btnAct = () => {
    axiosInstance
      .get(`project/active?id=${projectId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data.data)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Determinamos el texto dependiendo del estado del proyecto
  let statusText = "";
  if (projectStatus === "pending") {
    statusText = "Este proyecto se encuentra pendiente de aprobación.";
  } else if (projectStatus === "approved") {
    statusText = "Este proyecto ha sido aprobado.";
  } else if (projectStatus === "rejected") {
    statusText = "Este proyecto ha sido rechazado.";
  }

  return (
    <div className="abc">
      <Container>
        <p className="text-white fw-bold">{statusText}</p>
        {projectStatus === "pending" && (
          <Button className="px-5" onClick={btnAct}>
            Aprobar
          </Button>
        )}
      </Container>
    </div>
  );
};

export default Baner;
