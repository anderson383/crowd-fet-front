// import { projectsArea } from "@/data/projectsArea";
// import React from "react";
// import { Col, Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Col, Button, Container, Row, Pagination } from "react-bootstrap";
import SingleProject from "./SingleProject";
import axiosInstance from "src/config/axios/axios";

// const { projects } = projectsArea;

function PaginationComponent({ page, totalPages, handlePageChange }) {
  const renderPageItems = () => {
    const items = [];

    // Mostrar siempre la primera página y la última
    items.push(
      <Pagination.Item
        key={1}
        active={page === 1}
        onClick={() => handlePageChange(1)}
      >
        {1}
      </Pagination.Item>
    );

    // Mostrar "..." si estamos lejos del inicio
    if (page > 3) {
      items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
    }

    // Páginas cercanas a la actual
    for (
      let number = Math.max(2, page - 1);
      number <= Math.min(totalPages - 1, page + 1);
      number++
    ) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    // Mostrar "..." si estamos lejos del final
    if (page < totalPages - 2) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    }

    // Mostrar siempre la última página
    if (totalPages > 1) {
      items.push(
        <Pagination.Item
          key={totalPages}
          active={page === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Pagination>
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={page === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          />

          {renderPageItems()}

          <Pagination.Next
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={page === totalPages}
          />
        </Pagination>
      </div>
    </>
  );
}

const ExploreArea = () => {

  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [limit, setLimit] = useState(10); // Límites por página

  useEffect(() => {
    axiosInstance
      .get("/project/list", {
      // .get("/project", {
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
        console.log("data.projects>>", data.projects);
        setProjects(data.projects);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button
          className="mx-1"
          key={i}
          variant={i === page ? "primary" : "secondary"}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <section className="explore-area pt-90 pb-120">
      <Container>
        <Row className="justify-content-center">
          {projects.map((project) => (
            <Col lg={4} md={6} sm={7} key={project.id}>
              <SingleProject className="short-text" project={project} />
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-end px-5">
          <PaginationComponent
            handlePageChange={handlePageChange}
            page={page}
            totalPages={totalPages}
          />
        </div>
      </Container>
    </section>
  );
};

export default ExploreArea;
