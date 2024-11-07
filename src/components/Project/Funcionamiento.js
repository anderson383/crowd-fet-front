import React from "react";

import { Formik } from "formik";
import * as Yup from "yup";

import { Form, Row, Col, Button } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";

const Funcionamiento = () => {
  const initialValues = {
    correoElectronico: "",
    montoMeta: "",
  };

  const validationSchema = Yup.object().shape({
    correoElectronico: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es requerido"),
    montoMeta: Yup.number()
      .positive("El monto de la meta debe ser positivo")
      .required("El monto de la meta es requerido"),
  });


  const handleSubmitBasic = (values) => {
    console.log(values);
  };

  return (
    <>
      <div className="mb-5">
        <h2>Hablemos de dinero</h2>
        <p>Planifica y administra las finanzas de tu proyecto.</p>
      </div>
      {/* Presupuesto del proyecto */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitBasic}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Col md={4}>
                <h5>
                  Presupuesto del proyecto
                  <span className="badge bg-success">BETA</span> (opcional)
                </h5>
                <p>
                  Determina los diversos costos para hacer realidad tu proyecto
                  con nuestra plantilla de hojas de cálculo de Google...
                </p>
              </Col>
              <Col md={8}>
                <div className="border rounded-3 p-3">
                  <h6>Crea y comparte tu presupuesto.</h6>
                  <p>
                    La transparencia puede generar confianza entre tus
                    patrocinadores e incrementar tus posibilidades de ser
                    destacado en Kickstarter.
                  </p>
                  <img
                    src="https://dummyimage.com/150x150/000000/fff"
                    alt="Gráfico"
                    className="img-fluid mb-3"
                  />
                  <form>
                    <Form.Group className="mb-3">
                      <Form.Label>Tu correo electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        name="correoElectronico"
                        placeholder="correo@ejemplo.com"
                        value={values.correoElectronico}
                        onChange={handleChange}
                        isInvalid={
                          !!errors.correoElectronico &&
                          touched.correoElectronico
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.correoElectronico}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button className="btn btn-dark">
                      Generar mi hoja de cálculo
                    </Button>
                  </form>
                </div>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}>
                <h5>Meta</h5>
                <p>
                  Define una meta alcanzable que cubra lo que necesitas para
                  completar tu proyecto...
                </p>
              </Col>
              <Col md={8}>
                <Form.Group className="border rounded-3 p-3">
                  <Form.Label>Monto de la meta</Form.Label>
                  <Form.Control
                    type="number"
                    name="montoMeta"
                    placeholder="0"
                    value={values.montoMeta}
                    onChange={handleChange}
                    isInvalid={!!errors.montoMeta && touched.montoMeta}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.montoMeta}
                  </Form.Control.Feedback>
                  <small className="form-text text-muted">
                    <img
                      src="https://dummyimage.com/100x100/000000/fff"
                      alt="image"
                      className="img-fluid mb-3"
                    />
                    para estimar los costos totales, incluidos los impuestos y
                    cargos.
                  </small>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Funcionamiento;
