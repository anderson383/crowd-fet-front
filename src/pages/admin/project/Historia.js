import React, { useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Viewer, Worker } from "@react-pdf-viewer/core";

const Historia = ( { formRef } ) => {
  const initialValues = {
    descripcion: "",
    riesgos: "",
    compromisosMedioambientales: [],
    usoIA: "",
    file: null,
  };

  const validationSchema = Yup.object().shape({
    descripcion: Yup.string().required("Descripción es obligatorio"),
    riesgos: Yup.string().required("Riesgos y desafíos es obligatorio"),
    usoIA: Yup.string().required("Debes indicar si usas IA"),
    file: Yup.mixed().required("Por favor selecciona un archivo PDF"),
  });

  const handleSubmitBasic = (values) => {
    console.log(values);
  };

  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(URL.createObjectURL(file));
    } else {
      alert("Por favor selecciona un archivo PDF");
    }
  };

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitBasic}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {/* Historia del proyecto */}
            <Row className="mb-4">
              <Col md={12}>
                <h2>Presenta tu proyecto</h2>
                <p>
                  Cuéntale a las personas por qué deberían entusiasmarse con tu
                  proyecto. Sé específico, y a la vez claro y conciso.
                </p>
                <h5>Historia del proyecto</h5>
                <p>
                  Describe cómo se van a emplear los fondos recaudados, por qué
                  este proyecto es importante para ti, cómo planeas llevarlo a
                  cabo y quién eres. <a href="#">Leer más</a> sobre cómo contar
                  tu historia.
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control
                    type="file"
                    accept="application/pdf"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file && file.type === "application/pdf") {
                        setFieldValue("file", file);
                        setPdfFile(URL.createObjectURL(file));
                      } else {
                        alert("Por favor selecciona un archivo PDF");
                      }
                    }}
                    style={{ display: 'inline-block', width: 'auto', marginRight: '10px' }}
                />
                <Button variant="primary" onClick={() => document.getElementById('formFile').click()}>
                    Seleccionar PDF
                </Button>
            </Form.Group>
              {pdfFile && (
                  <div style={{ border: '1px solid #ddd', padding: '10px', marginTop: '20px',height: '750px', width: '80%', overflow: 'auto' }}>
                      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                          <Viewer fileUrl={pdfFile} />
                      </Worker>
                  </div>
              )}

              {errors.file && touched.file && (
                <Alert variant="danger" className="mt-2">
                  {errors.file}
                </Alert>
              )}
            </Col>
            </Row>
            <hr />
            {/* Riesgos y desafíos */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Riesgos y desafíos</h5>
                <p>
                  Sé honesto acerca de los posibles riesgos y desafíos del
                  proyecto y cómo planeas superarlos para completarlo.
                </p>
              </Col>
              <Col md={8}>
                <div className="border p-3">
                  <Form.Group controlId="formRiesgos">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="riesgos"
                      placeholder="Algunos de los riesgos y desafíos comunes que quizás desees abordar son el presupuesto, los plazos para las recompensas y para el proyecto en sí, el tamaño de tu audiencia..."
                      value={values.riesgos}
                      onChange={handleChange}
                      isInvalid={!!errors.riesgos && touched.riesgos}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.riesgos}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* <textarea
                      className="form-control mb-2"
                      rows="3"
                      placeholder="Algunos de los riesgos y desafíos comunes que quizás desees abordar son el presupuesto, los plazos para las recompensas y para el proyecto en sí, el tamaño de tu audiencia..."
                    ></textarea> */}
                  <p className="text-success">
                    <i className="bi bi-lightbulb"></i> Comunica los riesgos y
                    desafíos desde el principio para crear las expectativas
                    adecuadas. <a href="#">Más información...</a>
                  </p>
                </div>
              </Col>
            </Row>
            <hr />
            {/* Uso de la IA */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Uso de la IA</h5>
                <p>
                  Kickstarter apoya el trabajo creativo y a las personas que lo
                  realizan. Los proyectos que incluyen herramientas y
                  tecnologías de IA están permitidos en algunos casos. Si tu
                  proyecto utiliza IA de alguna manera, cuéntanos un poco más
                  para que podamos evaluar si cumple con los requisitos de
                  nuestra política.
                </p>
                <a href="#">
                  Información sobre la política de IA en Kickstarter
                </a>
              </Col>
              <Col md={8}>
                <div className="border p-3">
                  <p>
                    ¿Tu proyecto incluirá el desarrollo de tecnología de IA o
                    utilizará contenido de IA?
                  </p>

                  <div className="form-check mt-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="usoIA"
                      id="siActivar"
                      value="siActivar"
                      checked={values.usoIA === "siActivar"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="siActivar">
                      Si
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="usoIA"
                      id="noActivar"
                      value="noActivar"
                      checked={values.usoIA === "noActivar"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="noActivar">
                      No
                    </label>
                  </div>
                  {errors.usoIA && touched.usoIA && (
                    <div className="text-danger">{errors.usoIA}</div>
                  )}

                  {/* <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="ia"
                        id="si"
                      />
                      <label className="form-check-label" htmlFor="si">
                        Sí
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="ia"
                        id="no"
                      />
                      <label className="form-check-label" htmlFor="no">
                        No
                      </label>
                    </div> */}
                </div>
              </Col>
            </Row>
            <hr />
            {/* Preguntas frecuentes */}
            {/* <Row className="mb-4">
              <Col md={4}>
                <h5>Preguntas frecuentes</h5>
                <p>Publicar respuestas de las preguntas frecuentes</p>
              </Col>
              <Col md={8}>
                <div className="border p-3 text-center">
                  <Button className="btn btn-dark">
                    Añadir otra pregunta frecuente
                  </Button>
                </div>
              </Col>
            </Row> */}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Historia;
