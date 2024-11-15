import HeaderBackOffice from "@/components/Header/HeaderBackOffice";
import LayoutBackOffice from "@/components/Layout/LayoutBackOffice";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col, Container, Pagination } from "react-bootstrap";
import Link from "@/components/Reuseable/Link";
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
  console.log(session, "sessionsessionsession");
  const [projects, setProjects] = useState([]);
  const [listCategory, setListCategory] = useState([]);
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
  const filteredProjects = (projects||[]).filter((project) => {
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

   
  useEffect(() => {
    axiosInstance.get('/common/list-types/?codes=category_projects').then(({data: {data}}) => {
      setListCategory(data[0].listItem)
    })
  }, [])


  return (
    <LayoutBackOffice>
      <HeaderBackOffice />
      <Container style={{ marginTop: "82px" }} className="py-5">
        <h1 className="display-4">Crowdfet Proyectos</h1>
        <p className="text-muted">
          Explora y filtra proyectos por categoría, estado, y más
        </p>

        <Form className="p-4 shadow-sm rounded bg-light">
          <Row className="g-3">
            <Col md={4}>
              <Form.Group controlId="filterName">
                <Form.Label>Nombre del Proyecto</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Buscar por nombre"
                    value={filters.name}
                    onChange={handleFilterChange}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="filterCategory">
                <Form.Label>Categoría</Form.Label>
                <div className="input-group">
                  <Form.Control
                    as="select"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <option value="">Seleccionar Categoría</option>
                    {listCategory.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Control>
                </div>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="filterStatus">
                <Form.Label>Estado</Form.Label>
                <div className="input-group">
                  <Form.Control
                    as="select"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">Seleccionar Estado</option>
                    <option value="Completed">Publicado</option>
                    <option value="Pending">Pendiente</option>
                  </Form.Control>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="outline-danger"
              className="d-flex align-items-center"
              onClick={() => setFilters({ name: "", category: "", status: "" })}
            >
              {/* <FaTimes className="me-2" /> */}
              Limpiar Filtros
            </Button>
          </div>
        </Form>

        {/* Project Table */}
        <div className="shadow-sm rounded mt-4 pt-3">
          <Table striped bordered hover responsive className="">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Estado</th>
                <th>Meta $</th>
                <th>Acumulado $</th>
                <th>Inversores</th>
              </tr>
            </thead>
            <tbody>
              {(filteredProjects || []).length > 0 ? (
                filteredProjects.map((project, index) => (
                  <tr key={project.id}>
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle">
                      <Link
                        className="w-100"
                        href={`/single-project-admin/${project.id}`}
                        target="_blanck"
                      >
                        <strong>{project.title}</strong>
                      </Link>
                    </td>
                    <td className="align-middle text-capitalize">
                      {project.category}
                    </td>
                    <td className="align-middle">
                      <span
                        className={`badge rounded-pill ${
                          project.status === "approved"
                            ? "bg-primary"
                            : project.status === "pending"
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                      >
                        {fotmatStatus(project.status)}
                      </span>
                    </td>
                    <td className="align-middle text-end">
                      {fotmatPrice(project.fundingAmount)}
                    </td>
                    <td className="align-middle text-end">
                      {fotmatPrice(project.transaction.totalSum)}
                    </td>
                    <td className="align-middle text-center">
                      <Link href={`inversores/${project.id}`}>Ver...</Link>
                    </td>
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
          <div className="d-flex justify-content-end px-5">
            <PaginationComponent
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
          </div>
        </div>
      </Container>
    </LayoutBackOffice>
  );
};

export default AdminPage;
