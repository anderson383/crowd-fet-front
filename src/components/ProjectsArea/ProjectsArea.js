import { projectsArea } from "@/data/projectsArea";
import React, { useEffect , useState} from "react";
import { Col, Container, Row } from "react-bootstrap";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Title from "../Reuseable/Title";
import SingleProject from "./SingleProject";
import axiosInstance from "src/config/axios/axios";

SwiperCore.use([Autoplay, Pagination]);

const options = {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    clickable: true,
  },
  breakpoints: {
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  },
};

const { tagline, title } = projectsArea;



const ProjectsArea = ({ className = "" }) => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1); // Página actual
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
        })
        .catch((err) => {
          console.error(err);
        });
    }, [page, limit]);

  return (
    <section className={`explore-projects-area ${className}`}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Title
              title="Explorar proyectos"
              className="text-center"
            />
          </Col>
        </Row>
        <div className="explore-project-active">
          <Swiper {...options}>
            <div className="swiper-wrapper">
              {projects.map((project) => (
                <SwiperSlide key={project.id}>
                  <SingleProject className="short-text" project={project} />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default ProjectsArea;
