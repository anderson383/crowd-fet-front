import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col, Container } from "react-bootstrap";
import axiosInstance from "src/config/axios/axios";


const AdminPage = () => {
  const session = useSession();
  console.log(session, "sessionsessionsession");
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    status: "",
  });

  const [page, setPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [limit, setLimit] = useState(10); // Límites por página

  useEffect(() => {
    axiosInstance
      .get("/project", {
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
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page, limit]);

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const filterByName =
      filters.name === "" ||
      project.title.toLowerCase().includes(filters.name.toLowerCase());

    const filterByCategory =
      filters.category === "" || project.category === filters.category;
    const filterByStatus =
      filters.status === "" || project.status === filters.status;
    return filterByName && filterByCategory && filterByStatus;
  });

  // Change page
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const fotmatPrice = (money) => {
    const price =  new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(money);

    return price;
  };


   const fotmatStatus = (status) => {
    if (status === "approved") return "Aprobado";
    if (status === "pending") return "Pendiente";
   };

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">Crowdfunding Proyectos</h1>

      {/* Filter Form */}
      <Form className="mb-4">
        <Row className="g-3">
          <Col md={4}>
            <Form.Group controlId="filterName">
              <Form.Label>Nombre del proyecto</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Search por nombre"
                value={filters.name}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="filterCategory">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">Categorias</option>
                <option value="Environment">Environment</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Art">Art</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="filterStatus">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">Estados</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button
          variant="outline-primary"
          className="mt-3"
          onClick={() => setFilters({ name: "", category: "", status: "" })}
        >
          Limpiar Filtros
        </Button>
      </Form>

      {/* Project Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Estado</th>
            <th>Goal ($)</th>
            <th>Raised ($)</th>
          </tr>
        </thead>
        <tbody>
          {(filteredProjects || []).length > 0 ? (
            (filteredProjects || []).map((project, index) => (
              <tr key={project.id}>
                <td>{++index}</td>
                <td>
                  {project.title} - {project.subtitle}
                </td>
                <td>{project.category}</td>
                <td>
                  <span
                    className={`badge ${
                      project.status === "approved"
                        ? "bg-primary"
                        : project.status === "pending"
                        ? "bg-warning"
                        : "bg-success"
                    }`}
                  >
                    {fotmatStatus(project.status)}
                  </span>
                </td>
                <td>{fotmatPrice(project.fundingAmount)}</td>
                <td>{fotmatPrice(project.fundingAmount)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No projects found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

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
  );
};

export default AdminPage;
