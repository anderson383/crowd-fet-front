import Layout from "@/components/Layout/Layout";
import * as Yup from 'yup';
import { Formik } from "formik";
import React from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import bgLogin from "@/assets/images/fet_imagen.jpg"
import Link from "next/link";
import { ROLES } from "src/constants/roles";
const Home = () => {
  console.log(bgLogin, 'bgLogin')
  const router = useRouter()
   // Esquema de validación usando Yup
   const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
  });

  const handleSubmitLogin = async (values, {setFieldError, setSubmitting }) => {          
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (res?.error) {
      setFieldError('password', 'Credenciales incorrectas');
    } else {
      console.log("entre");
      // router.push("/admin"); // Redirige al dashboard u otra página después del login exitoso
      router.push("/project"); // Redirige al dashboard u otra página después del login exitoso
      console.log(res)
      const session = await getSession();
      if (session.user.rol === ROLES.ADMIN) {
        router.push('/admin');
      } else {
        router.push('/estudent');
      }
    }
    setSubmitting(false);
  }

  return (
    <Layout>
      <Container fluid className="vh-100">
      <Row className="h-100">
        <Col
          md={6}
          className=""
          style={{ backgroundImage: `url(${bgLogin.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'right' }}
        />
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center bg-light"
        >
          <div className="w-75">
            <h2 className="mb-4">Iniciar sesión</h2>

            {/* Formik */}
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmitLogin}
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
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
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
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                       onBlur={handleBlur}
                      isInvalid={!!errors.password && touched.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={isSubmitting}
                  >
                    Enviar
                  </Button>
                </Form>
              )}
            </Formik>
            <div className="mt-3">
              <Link  href="/auth/register">¿No tienes tienes una cuenta? Registrate</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    </Layout>
  );
};

export default Home;
