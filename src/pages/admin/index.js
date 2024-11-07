import { useSession } from "next-auth/react";
import { useState } from "react";
import { Table, Form, Button, Row, Col, Container } from "react-bootstrap";

const crowdfundingProjects = [
  {
    id: 1,
    name: "Green Energy Project",
    category: "Environment",
    status: "Ongoing",
    goal: 50000,
    raised: 35000,
  },
  {
    id: 2,
    name: "Tech for Education",
    category: "Education",
    status: "Completed",
    goal: 30000,
    raised: 30000,
  },
  {
    id: 3,
    name: "Healthcare for All",
    category: "Health",
    status: "Ongoing",
    goal: 70000,
    raised: 45000,
  },
  {
    id: 4,
    name: "Arts in Community",
    category: "Art",
    status: "Pending",
    goal: 20000,
    raised: 5000,
  },
];

const AdminPage = () => {
  const session = useSession();
  console.log(session, "sessionsessionsession");
  const [projects, setProjects] = useState(crowdfundingProjects);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    status: "",
  });

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const filterByName =
      filters.name === "" ||
      project.name.toLowerCase().includes(filters.name.toLowerCase());
    const filterByCategory =
      filters.category === "" || project.category === filters.category;
    const filterByStatus =
      filters.status === "" || project.status === filters.status;
    return filterByName && filterByCategory && filterByStatus;
  });

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">Crowdfunding Project Management</h1>

      {/* Filter Form */}
      <Form className="mb-4">
        <Row className="g-3">
          <Col md={4}>
            <Form.Group controlId="filterName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Search by project name"
                value={filters.name}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="filterCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                <option value="Environment">Environment</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Art">Art</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="filterStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Statuses</option>
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
          Clear Filters
        </Button>
      </Form>

      {/* Project Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Project Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Goal ($)</th>
            <th>Raised ($)</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.category}</td>
                <td>
                  <span
                    className={`badge ${
                      project.status === "Ongoing"
                        ? "bg-primary"
                        : project.status === "Completed"
                        ? "bg-success"
                        : "bg-warning"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td>{project.goal.toLocaleString()}</td>
                <td>{project.raised.toLocaleString()}</td>
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
    </Container>
  );
};

export default AdminPage;
