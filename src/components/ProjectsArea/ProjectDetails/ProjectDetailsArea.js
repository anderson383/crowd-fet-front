import { projectDetailsArea } from "@/data/projectsArea";
import * as Yup from 'yup';
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Modal, Row } from "react-bootstrap";
import {
  formatPrice,
  calcularPorcentaje,
  calcularDiasConMoment,
} from "@/utils/helpers";
import { Formik } from "formik";
import axiosInstance from "src/config/axios/axios";

const { backers } = projectDetailsArea;

const ProjectDetailsArea = ({project}) => {

    const {
      id,
      image,
      category,
      title,
      fundingAmount,
      launchDate,
      campaignDuration,
    } = project;

  const [isModal, setIsModal] = useState(false)

  useEffect(() => {
    console.log(global)
  }, [global])

  useEffect(() => {
    
  }, []);

  const createScriptPayment = ({ reference, signature, totalPayment }) => {
    const script = document.createElement("script");
    console.log(totalPayment, '')
    // Asignación de atributos al script
    script.src = "https://checkout.co.uat.wompi.dev/widget.js";
    script.dataset.render = "button";
    script.dataset.publicKey = "pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7";
    script.dataset.currency = "COP";
    script.dataset.amountInCents = totalPayment;
    script.dataset.reference = reference;
    script.dataset['signature:integrity'] = signature;
    script.dataset.customerDataEmail = "prueba@woompi.com";
    script.dataset.customerDataFullName = "Lola Perez";

    // Inserta el script en el elemento con el id específico
    const targetElement = document.getElementById("widget-container");
    if (targetElement) {
      targetElement.appendChild(script);
      console.log(script, 'script')
    } else {
      console.error("Elemento con id 'widget-container' no encontrado");
    }
  }
  const handleModal = () => {
    
  }

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required('El nombre es obligatorio'),
    apellido: Yup.string()
      .required('El apellido es obligatorio'),
    email: Yup.string()
      .email('Ingresa un email válido')
      .required('El email es obligatorio'),
    precio: Yup.number()
      .typeError('El precio debe ser un número')
      .positive('El precio debe ser positivo')
      .required('El precio es obligatorio'),
  });
  
  const handleSubmitForm  = (values, actions) => {
    actions.setSubmitting(true);
    axiosInstance.post(`/payment/create-payment/${id}`, {
      name: values.nombre,
      lastname: values.apellido,
      email: values.email,
      amount: values.precio
    }).then(response => {
      console.log(response)
      createScriptPayment(response.data.data);
    })

    // setIsModal(false); // 
  }

  return (
    <section className="project-details-area pt-120 pb-45">
      <Container>
        <Row>
          <Col lg={7}>
            <div className="project-details-thumb">
              <Image src={image} alt="" />
            </div>
          </Col>
          <Col lg={5}>
            <div className="project-details-content">
              <div className="details-btn">
                <span>{category}</span>
                {/* <div className="flag">
                  <Image src={flag.src} alt="" />
                  <p>{country}</p>
                </div> */}
              </div>
              <h3 className="title">{title}</h3>
              <div className="project-details-item">
                <div className="item text-center">
                  <h5 className="title">
                    {formatPrice(fundingAmount)}
                  </h5>
                  <span>Recaudado</span>
                </div>
                <div className="item text-center">
                  <h5 className="title">{backers}</h5>
                  <span>Patrocinadores</span>
                </div>
                <div className="item text-center">
                  <h5 className="title">
                    {calcularDiasConMoment(
                      launchDate,
                      campaignDuration
                    )}
                  </h5>
                  <span>Días restantes</span>
                </div>
              </div>
              <div className="projects-range">
                <div className="projects-range-content">
                  <ul>
                    <li>Raised:</li>
                    <li>
                      {calcularPorcentaje(fundingAmount, fundingAmount)}
                      %
                    </li>
                  </ul>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${calcularPorcentaje(
                          fundingAmount,
                          fundingAmount
                        )}%`,
                      }}
                      aria-valuenow={calcularPorcentaje(
                        fundingAmount,
                        fundingAmount
                      )}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                    </div>
                  </div>
                 {/* <div className="range"></div>  */}
                </div>
              </div>
              <div className="projects-goal">
                <span>
                  Meta: <span>{formatPrice(fundingAmount)} Cop</span>
                </span>
              </div>
              <div className="project-btn mt-25">
                <button className="main-btn" href="#" onClick={() => {
                  setIsModal(true)
                  setTimeout(() => {
                    handleModal()
                  }, 500)
                }}>
                  Apoya este proyecto
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal
        show={isModal}
        onHide={() => setIsModal(false)}
        dialogClassName="modal-50w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Apoyar este proyecto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Formik
            initialValues={{ nombre: '', email: '', apellido: '', precio: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmitForm}
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
                <div className="d-flex gap-3">
                  <Form.Group className="mb-3 flex-grow-1" controlId="formNombre" >
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      placeholder="Ingresa tu nombre"
                      value={values.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={!!errors.nombre && touched.nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nombre}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3 flex-grow-1" controlId="formNombre">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      name="apellido"
                      placeholder="Ingresa tu apellido"
                      value={values.apellido}
                      disabled={isSubmitting}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.apellido && touched.apellido}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.apellido}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Ingresa tu email"
                    disabled={isSubmitting}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.email && touched.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPrecio">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="text"
                    name="precio"
                    placeholder="Ingresa el precio"
                    disabled={isSubmitting}
                    value={values.precio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.precio && touched.precio}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.precio}
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
                <div className="mt-3 w-100" id="widget-container" ></div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default ProjectDetailsArea;
