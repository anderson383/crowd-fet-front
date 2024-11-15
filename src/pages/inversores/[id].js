import HeaderBackOffice from "@/components/Header/HeaderBackOffice";
import LayoutBackOffice from "@/components/Layout/LayoutBackOffice";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  Table,
  Form,
  Button,
  Row,
  Col,
  Container,
  Pagination,
} from "react-bootstrap";
import Link from "@/components/Reuseable/Link";
import axiosInstance from "src/config/axios/axios";
import { useRouter } from "next/router";


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

const AdminPage = () => {

  const router = useRouter();
  const { id } = router.query;

  // const session = useSession();
  const [inversores, setInversores] = useState([]);
  const [page, setPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [limit, setLimit] = useState(10); // Límites por página

  useEffect(() => {
    // console.log("🚀 ~ AdminPage ~ id:", id);
    if (id) {
      axiosInstance
        .get(`/project/listInversores?id=${id}`, {
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
          setInversores(data);
          setTotalPages(data.totalPages);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);


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
    const price = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(money);

    return price;
  };
  return (
    <LayoutBackOffice>
      <HeaderBackOffice />
      <Container style={{ marginTop: "82px" }} className="py-5">
        <h1 className="display-4">Crowdfet Inversores</h1>
        {/* Project Table */}
        <div className="shadow-sm rounded mt-4 pt-3">
          <Table striped bordered hover responsive className="">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Monto</th>
                <th>Proyecto</th>
              </tr>
            </thead>
            <tbody>
              {(inversores || []).length > 0 ? (
                inversores.map((inversor, index) => (
                  <tr key={inversor.id}>
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle">
                        <strong>{inversor.name}</strong>
                    </td>
                    <td className="align-middle text-capitalize">
                      {inversor.email}
                    </td>
                    <td className="align-middle text-end">
                      {fotmatPrice(inversor.mount)}
                    </td>
                    <td className="align-middle text-center">
                      <Link
                        className="w-100"
                        href={`/single-project/${inversor.projectId}`}
                        target="_blanck"
                      >
                      {inversor.project}
                      </Link>
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
