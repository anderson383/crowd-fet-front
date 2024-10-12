import BannerSlider from "@/components/BannerSlider/BannerSlider";
import BrandArea from "@/components/BrandArea/BrandArea";
import Categories from "@/components/Categories/Categories";
import CtaArea from "@/components/CtaArea/CtaArea";
import FunFacts from "@/components/FunFacts/FunFacts";
import GuideArea from "@/components/GuideArea/GuideArea";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import * as Yup from 'yup';
import NewsArea from "@/components/NewsArea/NewsArea";
import ProjectsArea from "@/components/ProjectsArea/ProjectsArea";
import TeamArea from "@/components/TeamArea/TeamArea";
import TeamMainArea from "@/components/TeamArea/TeamMainArea";
import TestimonialsArea from "@/components/Testimonials/TestimonialsArea";
import TogetherArea from "@/components/TogetherArea/TogetherArea";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import { Formik } from "formik";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const Home = () => {
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
      console.log('entre')
      router.push('/admin'); // Redirige al dashboard u otra página después del login exitoso
    }
    setSubmitting(false);
  }

  return (
    <Layout>
      <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Sección izquierda con fondo */}
        <Col md={6} className="d-none d-md-block bg-left-side" />

        {/* Sección derecha con el formulario */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center bg-light"
        >
          <div className="w-75">
            <h2 className="mb-4">Login</h2>

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
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
    </Layout>
  );
};

export default Home;
