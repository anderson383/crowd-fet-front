import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";
import HeaderInfo from "./HeaderInfo";
import HeaderMenu from "./HeaderMenu";
import Avatar from "../Avatar/Avatar";

const MainHeaderItemBackOffice = ({
  logo,
  navItems = [],
  icon,
  phone = "",
  socials,
  searchColor,
}) => {
  return (
    <Row>
      <Col lg={12}>
        <div className="main-header-item main-header-item-back">
          <div className="main-header-menus d-flex justify-content-between align-items-center">
            <div className="header-logo">
              <Link href="/">
                <Image src={logo.src} alt="logo" width={128} />
              </Link>
            </div>

            <Avatar name={'Anderson Vargas'}  />
            
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default MainHeaderItemBackOffice;
