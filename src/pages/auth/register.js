import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import { signIn } from "next-auth/react"; // Si necesitas manejar el login después del registro
import {} from 'next'
import Link from 'next/link';
import bgLogin from "@/assets/images/fet_imagen.jpg"
import axiosInstance from "src/config/axios/axios";
const Register = () => {
  const router = useRouter();
  const [codeProgram, setCodeProgram] = React.useState([]);

  // Esquema de validación usando Yup
  const validationSchema = Yup.object().shape({
    document: Yup.string().required("El documento es requerido"),
    full_name: Yup.string().required("El nombre completo es requerido"),
    last_name: Yup.string().required("Los apellidos son requeridos"),
    email: Yup.string().email("Email inválido").required("Email es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
    code_student: Yup.string().required("El código de registro es requerido"),
    code_program: Yup.string().required("El código del programa es requerido"),
  });

  useEffect(() => {
    axiosInstance.get('/common/programs').then(({data}) => {
      if (data) {
        setCodeProgram(data.data)
      }
    })
  }, [])

  const handleSubmitRegister = async (values, { setFieldError, setSubmitting }) => {
    // Aquí puedes enviar los datos a tu API para registrar al usuario
    try {
      // Aquí realiza la llamada a tu API para registrar al usuario
      const response = await axiosInstance.post('/auth/register', values);

      if (!response) {
        // Manejo de errores según el estado de la respuesta
        const errorData = await response.json();
        setFieldError("email", errorData.message || "Error al registrar usuario");
      } else {
        // Redirigir al usuario a la página de login o dashboard
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setFieldError("email", "Error en el servidor");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <Container fluid className="vh-100">
        <Row className="h-100">
          {/* Sección izquierda con fondo */}
          <Col
            md={6}
            className=""
            style={{ backgroundImage: `url(${bgLogin.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'right' }}
          />

          {/* Sección derecha con el formulario */}
          <Col md={6} className="d-flex justify-content-center align-items-center bg-light">
            <div className="w-75">
              <h2 className="mb-4">Registro de Usuario</h2>

              {/* Formik */}
              <Formik
                initialValues={{
                  document: '',
                  full_name: '',
                  last_name: '',
                  email: '',
                  password: '',
                  code_student: '',
                  code_program: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmitRegister}
              >
                {({
                  handleSubmit,
                  handleChange,
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  handleBlur
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicDocument">
                      <Form.Label>Documento</Form.Label>
                      <Form.Control
                        type="text"
                        name="document"
                        placeholder="Ingrese el documento"
                        value={values.document}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.document && touched.document}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.document}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicFullName">
                      <Form.Label>Nombre Completo</Form.Label>
                      <Form.Control
                        type="text"
                        name="full_name"
                        placeholder="Ingrese su nombre completo"
                        value={values.full_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.full_name && touched.full_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.full_name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLastName">
                      <Form.Label>Apellidos</Form.Label>
                      <Form.Control
                        type="text"
                        name="last_name"
                        placeholder="Ingrese sus apellidos"
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.last_name && touched.last_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.last_name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Ingrese su email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.email && touched.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Ingrese su contraseña"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.password && touched.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCodeStudent">
                      <Form.Label>Código de Registro Universitario</Form.Label>
                      <Form.Control
                        type="text"
                        name="code_student"
                        placeholder="Ingrese el código de registro"
                        value={values.code_student}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.code_student && touched.code_student}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.code_student}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCodeProgram">
                      <Form.Label>Código del Programa</Form.Label>
                      <Form.Select
                        name="code_program"
                        value={values.code_program}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.code_program && touched.code_program}
                      >
                        <option value="">Seleccione el código del programa</option>
                        {
                          codeProgram.map((program) => (
                            <option key={program.id} value={program.id}>{program.name}</option>
                          ))
                        }
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.code_program}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
                      Registrarse
                    </Button>
                  </Form>
                )}
              </Formik>
              <div className="mt-3">
                <Link  href="/auth/login">¿Ya tienes una cuenta? Inicia sesión</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Register;
