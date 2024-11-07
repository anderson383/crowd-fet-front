import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Form as BootstrapForm,
  Col,
  Container,
  Card,
  Row,
} from "react-bootstrap";

// Esquema de validación con Yup
const validationSchema = Yup.object({
  nombres: Yup.string()
    .required("Los nombres son obligatorios")
    .matches(/^[a-zA-Z\s]+$/, "Solo se permiten letras"),
  apellidos: Yup.string()
    .required("Los apellidos son obligatorios")
    .matches(/^[a-zA-Z\s]+$/, "Solo se permiten letras"),
  email: Yup.string()
    .email("Correo electrónico no válido")
    .required("El correo electrónico es obligatorio"),
  codigoEstudiante: Yup.string()
    .required("El código de estudiante es obligatorio")
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten letras y números"),
  numeroIdentificacion: Yup.string()
    .required("El número de identificación es obligatorio")
    .matches(/^[0-9]+$/, "Solo se permiten números"),
});

const Configuration = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    codigoEstudiante: "",
    numeroIdentificacion: "",
  });

  const handleSubmitForm = async (values) => {
    setFormData(values); // Guardar los valores en el estado
    console.log("Datos guardados:", values);
  };

  return (
    <Container className="my-5">
      <Card className="shadow rounded">
        <Card.Header className="text-center">
          <h4>Perfil</h4>
        </Card.Header>
        <Card.Body>
          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleSubmitForm}
          >
            {({ handleSubmit }) => (
              <BootstrapForm onSubmit={handleSubmit} noValidate>
                <Row>
                  <Col xs={12} md={6}>
                    <BootstrapForm.Group
                      controlId="formNombres"
                      className="mb-3"
                    >
                      <BootstrapForm.Label>Nombres:</BootstrapForm.Label>
                      <Field
                        name="nombres"
                        type="text"
                        as={BootstrapForm.Control}
                        isInvalid={!!ErrorMessage.nombres}
                      />
                      <ErrorMessage
                        name="nombres"
                        component="div"
                        className="text-danger"
                      />
                    </BootstrapForm.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <BootstrapForm.Group
                      controlId="formApellidos"
                      className="mb-3"
                    >
                      <BootstrapForm.Label>Apellidos:</BootstrapForm.Label>
                      <Field
                        name="apellidos"
                        type="text"
                        as={BootstrapForm.Control}
                        isInvalid={!!ErrorMessage.apellidos}
                      />
                      <ErrorMessage
                        name="apellidos"
                        component="div"
                        className="text-danger"
                      />
                    </BootstrapForm.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <BootstrapForm.Group controlId="formEmail" className="mb-3">
                      <BootstrapForm.Label>
                        Correo electrónico:
                      </BootstrapForm.Label>
                      <Field
                        name="email"
                        type="email"
                        as={BootstrapForm.Control}
                        isInvalid={!!ErrorMessage.email}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </BootstrapForm.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <BootstrapForm.Group
                      controlId="formCodigoEstudiante"
                      className="mb-3"
                    >
                      <BootstrapForm.Label>
                        Código de estudiante:
                      </BootstrapForm.Label>
                      <Field
                        name="codigoEstudiante"
                        type="text"
                        as={BootstrapForm.Control}
                        isInvalid={!!ErrorMessage.codigoEstudiante}
                      />
                      <ErrorMessage
                        name="codigoEstudiante"
                        component="div"
                        className="text-danger"
                      />
                    </BootstrapForm.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <BootstrapForm.Group
                      controlId="formNumeroIdentificacion"
                      className="mb-3"
                    >
                      <BootstrapForm.Label>
                        Número de identificación:
                      </BootstrapForm.Label>
                      <Field
                        name="numeroIdentificacion"
                        type="text"
                        as={BootstrapForm.Control}
                        isInvalid={!!ErrorMessage.numeroIdentificacion}
                      />
                      <ErrorMessage
                        name="numeroIdentificacion"
                        component="div"
                        className="text-danger"
                      />
                    </BootstrapForm.Group>
                  </Col>
                </Row>

                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Enviar
                  </Button>
                </div>
              </BootstrapForm>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Configuration;
