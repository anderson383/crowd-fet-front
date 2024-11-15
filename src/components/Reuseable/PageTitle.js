import bg from "@/assets/images/page-title-bg.e4241f75.jpg";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "./Link";
import { capitalizeText } from "@/utils/helpers";

const PageTitle = ({ title = "", page = "", parent = "", className="" }) => {

  return (
    <section
      className={`page-title-area bg_cover ${className}`}
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <Container>
        <Row>
          <Col lg={12}>
            <div className="page-title-content">
              <h3 className="title" style={{ width: "80%"}}>{capitalizeText(title)}</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  {parent && (
                    <li className="breadcrumb-item active" aria-current="page">
                      {parent}
                    </li>
                  )}
                  <li className="breadcrumb-item active" aria-current="page">
                    {page || title}
                  </li>
                </ol>
              </nav>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PageTitle;
