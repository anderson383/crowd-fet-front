import HeaderBackOffice from "@/components/Header/HeaderBackOffice";
import LayoutBackOffice from "@/components/Layout/LayoutBackOffice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col, Container, Pagination, Modal } from "react-bootstrap";
import axiosInstance from "src/config/axios/axios";

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
    for (let number = Math.max(2, page - 1); number <= Math.min(totalPages - 1, page + 1); number++) {
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

const AdminPage = () => {
  const session = useSession();
  const router = useRouter();

  const [listCategory, setListCategory] = useState([]);

  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    status: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/project", {
        params: { page, limit },
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => response.data.data)
      .then((data) => {
        setProjects(data.projects);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.error(err));
  }, [page, limit]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProjects = projects.filter((project) => {
    const filterByName = !filters.name || project.title.toLowerCase().includes(filters.name.toLowerCase());
    const filterByCategory = !filters.category || project.category === filters.category;
    const filterByStatus = !filters.status || project.status === filters.status;
    return filterByName && filterByCategory && filterByStatus;
  });

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const formatPrice = (money) => {
    return money ? new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(money) : 0;
  };

  const formatStatus = (status) => {
    if (status === "approved") return "Aprobado";
    if (status === "pending") return "Pendiente";
    return status;
  };

  const handleEdit = (projectId) => {
    router.push(`/edit-project/${projectId}`);
  };

  const handleDeleteClick = (project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    axiosInstance
      .delete(`/project/${selectedProject.id}`)
      .then(() => {
        setProjects(projects.filter((proj) => proj.id !== selectedProject.id));
        setShowDeleteModal(false);
      })
      .catch((err) => console.error(err));
  };


  useEffect(() => {
    axiosInstance.get('/common/list-types/?codes=category_projects').then(({data: {data}}) => {
      setListCategory(data[0].listItem)
    })
  }, [])

  return (
    <LayoutBackOffice>
      <HeaderBackOffice />
      <Container style={{ marginTop: "82px" }} className="py-5">
        <h1 className="display-4">Gestión de Proyectos</h1>
        <p className="text-muted">Explora y administra tus proyectos de crowdfunding</p>

        <Button
          variant="primary"
          className="mb-4"
          onClick={() => router.push("/student/project")}
        >
          Crear Nuevo Proyecto
        </Button>

        <Form className="p-4 shadow-sm rounded bg-light">
          <Row className="g-3">
            <Col md={4}>
              <Form.Group controlId="filterName">
                <Form.Label>Nombre del Proyecto</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Buscar por nombre"
                  value={filters.name}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="filterCategory">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="">Seleccionar Categoría</option>
                  {
                    listCategory.map(cat => (
                      <option key={cat.id} value={cat.name} >{cat.name}</option>
                    ))
                  }
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
                  <option value="">Seleccionar Estado</option>
                  {/* <option value="Ongoing">Ongoing</option> */}
                  <option value="Completed">Publicado</option>
                  <option value="Pending">Pendiente</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="outline-danger"
              onClick={() => setFilters({ name: "", category: "", status: "" })}
            >
              Limpiar Filtros
            </Button>
          </div>
        </Form>

        <Table striped bordered hover responsive className="shadow-sm rounded mt-4">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Meta $</th>
              <th>Acumulado $</th>
              <th width="15%">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <tr key={project.id}>
                  <td>{index + 1}</td>
                  <td>{project.title}</td>
                  <td className="text-capitalize">{project.category}</td>
                  <td>
                    <span
                      className={`badge rounded-pill ${
                        project.status === "approved"
                          ? "bg-primary"
                          : project.status === "pending"
                          ? "bg-warning text-dark"
                          : "bg-success"
                      }`}
                    >
                      {formatStatus(project.status)}
                    </span>
                  </td>
                  <td>{formatPrice(project.fundingAmount)}</td>
                  <td>{formatPrice(project.raisedAmount)}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(project.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteClick(project)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No se encontraron proyectos
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="d-flex justify-content-end px-5">
              <PaginationComponent handlePageChange={handlePageChange} page={page} totalPages={totalPages}  />
            </div>

        {/* Modal de confirmación para eliminar */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Estás seguro de que deseas eliminar el proyecto {selectedProject?.title}?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </LayoutBackOffice>
  );
};

export default AdminPage;