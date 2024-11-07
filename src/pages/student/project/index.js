import React, { useRef, useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col, Button, Alert, Container } from "react-bootstrap";

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Basico from "../../../components/Project/Basico";
import Funcionamiento from "../../../components/Project/Funcionamiento";
import Historia from "../../../components/Project/Historia";
import Persona from "../../../components/Project/Persona";
import HeaderBackOffice from "@/components/Header/HeaderBackOffice";
import LayoutBackOffice from "@/components/Layout/LayoutBackOffice";
import ElementsManager from "@/components/Project/ElementsManager";
import { FileEarmark  } from 'react-bootstrap-icons';
import axiosInstance from "src/config/axios/axios";
import { createFormData } from "src/constants/formData";
import { format } from "date-fns";
const Proyect = () => {
  const formBasicRef = useRef(null);
  const formHistoryRef = useRef(null);
  const formElementsRef = useRef(null);
  const formPersonRef = useRef(null);
  const [activeTab, setActiveTab] = useState("basico");



  const handleExternalSubmit = () => {
    if (formBasicRef.current && formHistoryRef.current && formElementsRef.current) {
      const formBasic = formBasicRef.current;
      const formHistory = formHistoryRef.current;
      const formElements = formElementsRef.current;

      formBasic.submitForm(); // Llama a submitForm desde la referencia
      formHistory.submitForm();
      formElements.handleExternalSubmit(); // Llama a submitForm desde la referencia

      setTimeout(() => {
        console.log(formHistory.values)
        if (formBasic.isValid && formElements?.elements?.length > 0 && formHistory.isValid) {
          console.log(formBasic)
          console.log(formHistory)
          console.log(formElements)
  
          const formData = createFormData(formBasic.values)
          formData.delete('durationCampaign');
          formData.delete('dateLaunch');
  
          formData.append('durationCampaign',format( formBasic.values.durationCampaign, 'yyyy-MM-dd HH:mm:ss') )
          formData.append('dateLaunch', format( formBasic.values.dateLaunch, 'yyyy-MM-dd HH:mm:ss') )
  
          const formDataHistory = createFormData(formHistory.values)

          formDataHistory.forEach((value, key) => {
            formData.append(`history[${key}]`, value);
          });

          formElements?.elements?.forEach((element, index) => {
            const item = createFormData(element)
            item.forEach((value, key) => {
              if (key === 'imageId') {
                console.log(element.imageId)
                formData.append(`elements[${index}][${key}]`, element.imageId);
              } else {
                formData.append(`elements[${index}][${key}]`, value);
              }
              formData.delete(`elements[${index}][id]`)
            });
          })
  
          axiosInstance.post('/project/create-project', formData, {
            headers: {
              'Content-Type': 'multipart/form-data' // Este encabezado se ajusta automáticamente
            }
          }).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        } else {
          alert('Faltan campos por llenar')
        }
      }, [100])
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
          <div className={activeTab === "recompensa" ? 'd-block' : 'd-none'} >
            <ElementsManager ref={formElementsRef} />
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
