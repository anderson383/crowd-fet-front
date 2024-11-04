import React, { useRef, useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col, Button, Alert, Container } from "react-bootstrap";

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Basico from "./Basico";
import Funcionamiento from "./Funcionamiento";
import Historia from "./Historia";
import Persona from "./Persona";
import HeaderBackOffice from "@/components/Header/HeaderBackOffice";
import LayoutBackOffice from "@/components/Layout/LayoutBackOffice";
import ElementsManager from "@/components/Project/ElementsManager";
import { FileEarmark  } from 'react-bootstrap-icons';
const Proyect = () => {
  const formBasicRef = useRef(null);
  const formHistoryRef = useRef(null);
  const formPersonRef = useRef(null);
  const [activeTab, setActiveTab] = useState("basico");



  const handleExternalSubmit = () => {
    if (formBasicRef.current && formHistoryRef.current) {
      formBasicRef.current.submitForm(); // Llama a submitForm desde la referencia
      formHistoryRef.current.submitForm(); // Llama a submitForm desde la referencia
    }
  };

  return (
    <LayoutBackOffice>
      <HeaderBackOffice />
        <ul className="navegacion_project">
            <li className="nav-item">
              <Button
                className={`nav-link ${activeTab === "basico" ? "active" : ""}`}
                onClick={() => setActiveTab("basico")}
              >
                Básico
              </Button>
            </li>
            <li className="nav-item">
              <Button
                className={`nav-link ${activeTab === "recompensa" ? "active" : ""}`}
                onClick={() => setActiveTab("recompensa")}
              >
                Recompensas
              </Button>
            </li>
            <li className="nav-item">
              <Button
                className={`nav-link ${activeTab === "historia" ? "active" : ""}`}
                onClick={() => setActiveTab("historia")}
              >
                Historia
              </Button>
            </li>
            <li className="nav-item">
              <Button
                className={`nav-link ${activeTab === "persona" ? "active" : ""}`}
                onClick={() => setActiveTab("persona")}
              >
                Persona
              </Button>
            </li>
        </ul>
      <Container style={{paddingBottom: '300px !important'}}>
        <div className="d-flex justify-content-end">
          <Button className="d-flex align-items-center gap-2" variant="primary" onClick={handleExternalSubmit}>
            <FileEarmark > </FileEarmark>
            Guardar
          </Button>
        </div>
        <div className="tab-content mt-3">
          <div className={activeTab === "basico" ? 'd-block' : 'd-none'}>
            <Basico formRef={formBasicRef} />
          </div>
          <div className={activeTab === "recompensa" ? 'd-block' : 'd-none'}>
            <ElementsManager />
          </div>
          <div className={activeTab === "historia" ? 'd-block' : 'd-none'}>
            <Historia formRef={formHistoryRef}  />
          </div>
          <div className={activeTab === "persona" ? 'd-block' : 'd-none'}>
            <Persona  formRef={formPersonRef} />
          </div>
        </div>
      </Container>
    </LayoutBackOffice>
  );
};

export default Proyect;
