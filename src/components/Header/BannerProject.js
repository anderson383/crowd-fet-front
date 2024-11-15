import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import axiosInstance from "src/config/axios/axios";

const Banner = ({ projectId, projectStatus }) => {
  const [active, setActive] = useState(false);

  // Efecto para actualizar el estado "active" si el proyecto está aprobado
  useEffect(() => {
    if (projectStatus === "approved") {
      setActive(true);
    }
  }, [projectStatus]);

  // Función para activar el proyecto
  const handleActivate = async () => {
    try {
      const response = await axiosInstance.get(
        `project/active?id=${projectId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.data);
      setActive(true);
    } catch (error) {
      console.error("Error al activar el proyecto:", error);
    }
  };

  // Determinar el texto del estado del proyecto
  const getStatusText = () => {
    switch (projectStatus) {
      case "pending":
        return "Este proyecto se encuentra pendiente de aprobación.";
      case "approved":
        return "Este proyecto ha sido aprobado.";
      case "rejected":
        return "Este proyecto ha sido rechazado.";
      default:
        return "Estado del proyecto desconocido.";
    }
  };

  return (
    <div className="content-banner">
      <Container>
        <p className="text-white banner-text">{getStatusText()}</p>
        {projectStatus === "pending" && !active && (
          <Button className="px-5 main-btn" onClick={handleActivate}>
            Aprobar
          </Button>
        )}
      </Container>
    </div>
  );
};

export default Banner;
