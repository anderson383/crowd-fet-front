import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";
import HeaderInfo from "./HeaderInfo";
import HeaderMenu from "./HeaderMenu";
import Avatar from "../Avatar/Avatar";
import { useSession } from "next-auth/react";
import useUser from "@/hooks/useUser";

const MainHeaderItemBackOffice = ({
  logo,
  navItems = [],
  icon,
  phone = "",
  socials,
  searchColor,
}) => {
  const user = useUser();
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
            <Avatar name={user?.full_name + " " + user?.last_name}  />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default MainHeaderItemBackOffice;
