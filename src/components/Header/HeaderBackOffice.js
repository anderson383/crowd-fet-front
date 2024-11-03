import headerData from "@/data/headerData";
import useScroll from "@/hooks/useScroll";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MainHeaderItem from "./MainHeaderItem";
import Social from "./Social";
import MainHeaderItemBackOffice from "./MainHeaderItemBackOffice";

const { logo, navItems, navItemsBackOfice, phone, icon, email, address, socials } = headerData;

const HeaderBackOffice = ({ className = "" }) => {
  const { scrollTop } = useScroll(160);

  return (
    <header className={`header-area ${className}`}>
      <div className={"main-header main-header-backoffice"}>
        <Container>
          <MainHeaderItemBackOffice
            logo={logo}
            navItems={navItemsBackOfice}
            icon={icon}
            phone={phone}
          />
        </Container>
      </div>
    </header>
  );
};

export default HeaderBackOffice;
