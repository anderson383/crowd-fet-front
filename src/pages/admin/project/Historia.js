import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Historia = () => {
  const initialValues = {
    descripcion: "",
    riesgos: "",
    compromisosMedioambientales: [],
    usoIA: "",
  };

  const validationSchema = Yup.object().shape({
    descripcion: Yup.string().required("Descripción es obligatorio"),
    riesgos: Yup.string().required("Riesgos y desafíos es obligatorio"),
    compromisosMedioambientales: Yup.array()
      .of(Yup.string())
      .required("Debes seleccionar al menos un compromiso medioambiental"),
    usoIA: Yup.string().required("Debes indicar si usas IA"),
  });

  const handleSubmitBasic = (values) => {
    console.log(values);
  };

    return (
      <>
        <Formik
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
                    Cuéntale a las personas por qué deberían entusiasmarse con
                    tu proyecto. Sé específico, y a la vez claro y conciso.
                  </p>
                  <h5>Historia del proyecto</h5>
                  <p>
                    Describe cómo se van a emplear los fondos recaudados, por
                    qué este proyecto es importante para ti, cómo planeas
                    llevarlo a cabo y quién eres. <a href="#">Leer más</a> sobre
                    cómo contar tu historia.
                  </p>
                  <div
                    className="p-1 mb-2 border border-success d-flex align-items-center"
                    role="alert"
                  >
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Image"
                      className="img-fluid mb-3 ml-2"
                    />
                    Te presentamos nuestro editor de historias mejorado
                    <Button className="btn ms-auto">
                      Descubre sus funciones
                    </Button>
                  </div>
                  <Form.Group controlId="formHistoria">
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="descripcion"
                      placeholder="Usa texto, imágenes, videos y audio para redactar una historia cautivadora."
                      value={values.descripcion}
                      onChange={handleChange}
                      isInvalid={!!errors.descripcion && touched.descripcion}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.descripcion}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* <textarea
                    className="form-control mb-3"
                    rows="5"
                    placeholder="Usa texto, imágenes, videos y audio para redactar una historia cautivadora."
                  ></textarea> */}
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
              {/* Compromisos medioambientales */}
              <Row className="mb-4">
                <Col md={4}>
                  <h5>Compromisos medioambientales (recomendado)</h5>
                  <p>
                    Reduce el impacto de tu proyecto en el planeta y aumenta las
                    posibilidades de destacarte entre los posibles
                    patrocinadores.{" "}
                    <a href="#">Visita nuestro centro de recursos</a> para
                    conocer las prácticas clave.
                  </p>
                  <p className="text-success">
                    ecovadis logo
                    <br />
                    Ofrecemos solo a los creadores de Kickstarter una
                    actualización gratuita de Ecovadis Premium, que incluye una
                    evaluación de sostenibilidad, un resumen de resultados y un
                    distintivo para las páginas de proyectos con alto
                    rendimiento.
                  </p>
                </Col>
                <Col md={8}>
                  <div className="border p-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="diseno"
                      />
                      <label className="form-check-label" htmlFor="diseno">
                        Diseño de larga duración
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="reciclaje"
                      />
                      <label className="form-check-label" htmlFor="reciclaje">
                        Reutilización y reciclaje
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="materiales"
                      />
                      <label className="form-check-label" htmlFor="materiales">
                        Materiales sustentables
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="fabricas"
                      />
                      <label className="form-check-label" htmlFor="fabricas">
                        Fábricas ecológicas
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="entrega"
                      />
                      <label className="form-check-label" htmlFor="entrega">
                        Entrega y distribución sustentables
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="algoMas"
                      />
                      <label className="form-check-label" htmlFor="algoMas">
                        Algo más
                      </label>
                    </div>
                  </div>
                </Col>
              </Row>
              <hr />
              {/* Uso de la IA */}
              <Row className="mb-4">
                <Col md={4}>
                  <h5>Uso de la IA</h5>
                  <p>
                    Kickstarter apoya el trabajo creativo y a las personas que
                    lo realizan. Los proyectos que incluyen herramientas y
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
              <Row className="mb-4">
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
              </Row>

              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </Form>
          )}
        </Formik>
      </>
    );
      
};

export default Historia;
