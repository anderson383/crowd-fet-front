import { exploreProjects } from "@/data/projectsArea";
import React, { useState, useEffect } from "react";
import { Col, Button, Container, Row } from "react-bootstrap";
import SingleExploreProject from "./SingleExploreProject";
import axiosInstance from "src/config/axios/axios";

// const { projects } = exploreProjects;

const ExploreProjectsThree = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [limit, setLimit] = useState(10); // Límites por página

  useEffect(() => {
    axiosInstance
      .get("/project/list", {
        params: {
          page,
          limit,
        },
        headers: {
          "Content-Type": "multipart/form-data", // Este encabezado se ajusta automáticamente
        },
      })
      .then((response) => response.data.data)
      .then((data) => {
        setProjects(data.projects);
        console.log(data.projects);

        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page, limit]);

  // Change page
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <section className="explore-projects-3-area explore-v2-page pt-90 pb-120">
      <Container>
        <div className="explore-margin">
          <Row className="justify-content-center">
            {projects.map((project) => (
              <Col lg={6} md={6} sm={9} key={project.id}>
                <SingleExploreProject project={project} />
              </Col>
            ))}
          </Row>
        </div>
        {/* Pagination Controls */}
        <div className="d-flex justify-content-between">
          <Button
            variant="secondary"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Anterior
          </Button>
          <span>
            Pagina {page} de {totalPages}
          </span>
          <Button
            variant="secondary"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Siguiente
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default ExploreProjectsThree;
