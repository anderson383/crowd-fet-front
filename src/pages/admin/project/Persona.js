import React, { useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
const Proyect = ( { formRef } ) => {
  const handleSubmitBasic = (values) => {
    console.log(values);
  };

  return (
    <Row>
      {/* Preséntate */}
      <Row className="mb-4">
        <h2>Preséntate</h2>
        <p>
          Dale a los patrocinadores una idea de quién eres y agrega
          colaboradores si trabajas con un equipo.
        </p>
      </Row>

      {/* Tu perfil */}
      <Row className="mb-4">
        <Col md={4}>
          <h5>Tu perfil</h5>
          <p>
            Esto aparecerá en la página de tu proyecto y debe incluir tu nombre,
            foto y biografía.
          </p>
        </Col>
        <Col md={8}>
          <div className="border rounded-3 p-3 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img
                src="https://via.placeholder.com/50"
                alt="Perfil"
                className="rounded-circle me-3"
              />
              <div>
                <strong>freiman</strong>
                <p className="mb-0">Creador del proyecto</p>
              </div>
            </div>
            <Button className="btn btn-dark">
              <i className="bi bi-pencil"></i> Completa tu perfil
            </Button>
          </div>
        </Col>
      </Row>

      {/* URL personalizada
            <Row className="mb-4">
                <Col md={4}>
                <h5>URL personalizada</h5>
                <p>
                    Crea una URL personalizada para tu página de perfil con al
                    menos tres caracteres. Esta también será el comienzo de la URL
                    de tu proyecto, la generaremos más adelante.
                </p>
                </Col>
                <Col md={8}>
                <div className="border rounded-3 p-3">
                    <Formik
                    initialValues={{
                        profileLink: "",
                    }}
                    validationSchema={Yup.object().shape({
                        profileLink: Yup.string()
                        .required("El enlace del perfil es requerido")
                        .min(1, "Incluye al menos una letra")
                        .max(20, "No puede exceder los 20 caracteres"),
                    })}
                    onSubmit={(values) => {
                        console.log(
                        "Enlace del perfil confirmado:",
                        values.profileLink
                        );
                    }}
                    >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                        <div className="input-group mb-2">
                            <span className="input-group-text">
                            <i className="bi bi-link-45deg"></i>{" "}
                            https://kickstarter.com/profile/
                            </span>
                            <Form.Control
                            type="text"
                            name="profileLink"
                            value={values.profileLink}
                            onChange={handleChange}
                            isInvalid={
                                !!errors.profileLink && touched.profileLink
                            }
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.profileLink}
                            </Form.Control.Feedback>
                        </div>
                        <div className="d-flex justify-content-between">
                            <small className="form-text text-muted">
                            <i className="bi bi-info-circle"></i> Incluye al
                            menos una letra; también puedes usar números y
                            guiones.
                            </small>
                            <span>{values.profileLink.length}/20</span>
                        </div>
                        <div className="text-end mt-2">
                            <Button className="btn btn-dark" type="submit">
                            Confirmar
                            </Button>
                        </div>
                        </Form>
                    )}
                    </Formik>
                </div>
                </Col>
            </Row> */}

      {/* Colaboradores */}
      <Row className="mb-4">
        <Col md={4}>
          <h5>Colaboradores (opcional)</h5>
          <p>
            Si trabajas con otros, puedes otorgarles permiso para editar este
            proyecto, comunicarse con los patrocinadores y coordinar la entrega
            de las recompensas.
          </p>
        </Col>
        <Col md={8}>
          <div className="border rounded-3 p-3">
            <Formik
              initialValues={{
                email: "freimanuribe15@gmail.com",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("El correo electrónico es inválido")
                  .required("El correo electrónico es requerido"),
              })}
              onSubmit={(values) => {
                console.log("Enviando correo de verificación a:", values.email);
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      readOnly
                      isInvalid={!!errors.email && touched.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                    <Button className="btn" type="submit">
                      Enviar correo de verificación
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Row>
  );
};

export default Proyect;
