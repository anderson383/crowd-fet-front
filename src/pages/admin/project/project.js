import React, { useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Basico from "./Basico";
import Funcionamiento from "./Funcionamiento";
import Historia from "./Historia";
import Persona from "./Persona";

const Proyect = () => {
  const [activeTab, setActiveTab] = useState("basico");

  // const [fileName, setFileName] = useState("");
  // const [videoName, setVideoName] = useState("");

  // const [selectedDate, setSelectedDate] = useState(null);
  // const [showDatePicker, setShowDatePicker] = useState(false);

  // const initialValuesBasic = {
  //   title: "",
  //   subtitle: "",
  //   mainCategory: "",
  //   subCategory: "",
  //   category: "",
  //   subCategoryOption: "",
  //   location: "",
  //   file: null,
  //   video: null,
  //   day: "",
  //   month: "",
  //   year: "",
  //   duracion: "",
  //   contribuciones: "",
  // };

  // const validationBasic = Yup.object().shape({
  //   title: Yup.string().required("El título es requerido"),
  //   subtitle: Yup.string().required("El subtítulo es requerido"),

  //   mainCategory: Yup.string().required("La categoría principal es requerida"),
  //   subCategory: Yup.string().required(
  //     "La subcategoría principal es requerida"
  //   ),
  //   category: Yup.string().required("La categoría es requerida"),
  //   subCategoryOption: Yup.string().required("La subcategoría es requerida"),

  //   location: Yup.string().required("La ubicación es requerida"),

  //   file: Yup.mixed()
  //     .required("Se requiere un archivo")
  //     .test("fileSize", "El archivo es demasiado grande", (value) => {
  //       return value && value.size <= 50 * 1024 * 1024; // 50 MB
  //     })
  //     .test("fileType", "El tipo de archivo no es válido", (value) => {
  //       return (
  //         value &&
  //         ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
  //           value.type
  //         )
  //       );
  //     }),

  //   video: Yup.mixed()
  //     .required("Se requiere un archivo")
  //     .test("fileSize", "El archivo es demasiado grande", (value) => {
  //       return value && value.size <= 5120 * 1024; // 5120 MB
  //     })
  //     .test("fileType", "El tipo de archivo no es válido", (value) => {
  //       return (
  //         value &&
  //         [
  //           "video/mp4",
  //           "video/mpeg",
  //           "video/avi",
  //           "video/3gp",
  //           "video/wmv",
  //           "video/flv",
  //         ].includes(value.type)
  //       );
  //     }),

  //   pixelId: Yup.string().required("El ID de pixel es requerido"),
  //   accessToken: Yup.string().required("El token de acceso es requerido"),

  //   day: Yup.number()
  //     .required("El día es requerido")
  //     .min(1, "El día debe ser al menos 1")
  //     .max(31, "El día debe ser como máximo 31"),
  //   month: Yup.number()
  //     .required("El mes es requerido")
  //     .min(1, "El mes debe ser al menos 1")
  //     .max(12, "El mes debe ser como máximo 12"),
  //   year: Yup.number()
  //     .required("El año es requerido")
  //     .min(1900, "El año debe ser mayor a 1900"),

  //   duracion: Yup.string().required("Debes seleccionar una duración"),
  //   contribuciones: Yup.string().required(
  //     "Debes seleccionar una opción de contribuciones"
  //   ),
  // });

  const handleSubmitBasic = (values) => {
    console.log(values);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "basico":
        return <Basico />;
      case "funcionamiento":
        return <Funcionamiento/>
      case "recompensa":
        return <div>Contenido de Recompensa</div>;
      case "historia":
        return <Historia/>
      case "persona":
        return <Persona/>
        // return (
        //   <Row>
        //     {/* Preséntate */}
        //     <Row className="mb-4">
        //       <h2>Preséntate</h2>
        //       <p>
        //         Dale a los patrocinadores una idea de quién eres y agrega
        //         colaboradores si trabajas con un equipo.
        //       </p>
        //     </Row>

        //     {/* Tu perfil */}
        //     <Row className="mb-4">
        //       <Col md={4}>
        //         <h5>Tu perfil</h5>
        //         <p>
        //           Esto aparecerá en la página de tu proyecto y debe incluir tu
        //           nombre, foto y biografía.
        //         </p>
        //       </Col>
        //       <Col md={8}>
        //         <div className="border rounded-3 p-3 d-flex align-items-center justify-content-between">
        //           <div className="d-flex align-items-center">
        //             <img
        //               src="https://via.placeholder.com/50"
        //               alt="Perfil"
        //               className="rounded-circle me-3"
        //             />
        //             <div>
        //               <strong>freiman</strong>
        //               <p className="mb-0">Creador del proyecto</p>
        //             </div>
        //           </div>
        //           <Button className="btn btn-dark">
        //             <i className="bi bi-pencil"></i> Completa tu perfil
        //           </Button>
        //         </div>
        //       </Col>
        //     </Row>

        //     {/* URL personalizada */}
        //     <Row className="mb-4">
        //       <Col md={4}>
        //         <h5>URL personalizada</h5>
        //         <p>
        //           Crea una URL personalizada para tu página de perfil con al
        //           menos tres caracteres. Esta también será el comienzo de la URL
        //           de tu proyecto, la generaremos más adelante.
        //         </p>
        //       </Col>
        //       <Col md={8}>
        //         <div className="border rounded-3 p-3">
        //           <Formik
        //             initialValues={{
        //               profileLink: "",
        //             }}
        //             validationSchema={Yup.object().shape({
        //               profileLink: Yup.string()
        //                 .required("El enlace del perfil es requerido")
        //                 .min(1, "Incluye al menos una letra")
        //                 .max(20, "No puede exceder los 20 caracteres"),
        //             })}
        //             onSubmit={(values) => {
        //               console.log(
        //                 "Enlace del perfil confirmado:",
        //                 values.profileLink
        //               );
        //             }}
        //           >
        //             {({
        //               handleSubmit,
        //               handleChange,
        //               values,
        //               touched,
        //               errors,
        //             }) => (
        //               <Form noValidate onSubmit={handleSubmit}>
        //                 <div className="input-group mb-2">
        //                   <span className="input-group-text">
        //                     <i className="bi bi-link-45deg"></i>{" "}
        //                     https://kickstarter.com/profile/
        //                   </span>
        //                   <Form.Control
        //                     type="text"
        //                     name="profileLink"
        //                     value={values.profileLink}
        //                     onChange={handleChange}
        //                     isInvalid={
        //                       !!errors.profileLink && touched.profileLink
        //                     }
        //                   />
        //                   <Form.Control.Feedback type="invalid">
        //                     {errors.profileLink}
        //                   </Form.Control.Feedback>
        //                 </div>
        //                 <div className="d-flex justify-content-between">
        //                   <small className="form-text text-muted">
        //                     <i className="bi bi-info-circle"></i> Incluye al
        //                     menos una letra; también puedes usar números y
        //                     guiones.
        //                   </small>
        //                   <span>{values.profileLink.length}/20</span>
        //                 </div>
        //                 <div className="text-end mt-2">
        //                   <Button className="btn btn-dark" type="submit">
        //                     Confirmar
        //                   </Button>
        //                 </div>
        //               </Form>
        //             )}
        //           </Formik>
        //         </div>
        //       </Col>
        //     </Row>

        //     {/* Colaboradores */}
        //     <Row className="mb-4">
        //       <Col md={4}>
        //         <h5>Colaboradores (opcional)</h5>
        //         <p>
        //           Si trabajas con otros, puedes otorgarles permiso para editar
        //           este proyecto, comunicarse con los patrocinadores y coordinar
        //           la entrega de las recompensas.
        //         </p>
        //       </Col>
        //       <Col md={8}>
        //         <div className="border rounded-3 p-3">
        //           <div className="alert alert-light border-start border-primary border-3">
        //             <i className="bi bi-info-circle-fill me-2 text-primary"></i>
        //             Verifica tu correo electrónico antes de agregar
        //             colaboradores
        //             <small className="d-block">
        //               (Si se muestra aquí el correo electrónico incorrecto,{" "}
        //               <a href="#">actualízalo en tu cuenta</a>
        //               .)
        //             </small>
        //           </div>
        //           <Formik
        //             initialValues={{
        //               email: "freimanuribe15@gmail.com",
        //             }}
        //             validationSchema={Yup.object().shape({
        //               email: Yup.string()
        //                 .email("El correo electrónico es inválido")
        //                 .required("El correo electrónico es requerido"),
        //             })}
        //             onSubmit={(values) => {
        //               console.log(
        //                 "Enviando correo de verificación a:",
        //                 values.email
        //               );
        //             }}
        //           >
        //             {({
        //               handleSubmit,
        //               handleChange,
        //               values,
        //               touched,
        //               errors,
        //             }) => (
        //               <Form noValidate onSubmit={handleSubmit}>
        //                 <div className="input-group">
        //                   <span className="input-group-text">
        //                     <i className="bi bi-envelope"></i>
        //                   </span>
        //                   <Form.Control
        //                     type="email"
        //                     name="email"
        //                     value={values.email}
        //                     onChange={handleChange}
        //                     readOnly
        //                     isInvalid={!!errors.email && touched.email}
        //                   />
        //                   <Form.Control.Feedback type="invalid">
        //                     {errors.email}
        //                   </Form.Control.Feedback>
        //                   <Button className="btn" type="submit">
        //                     Enviar correo de verificación
        //                   </Button>
        //                 </div>
        //               </Form>
        //             )}
        //           </Formik>
        //         </div>
        //       </Col>
        //     </Row>
        //   </Row>
        // );
      case "pago":
        return (
          <div>
            {/* Verifica los datos y agrega una cuenta bancaria */}
            <div className="mb-4">
              <h2>Verifica los datos y agrega una cuenta bancaria</h2>
              <p>
                Confirma quién va a recaudar y recibir los fondos si el proyecto
                alcanza la meta de financiamiento. Revisa tu información.
                Aceptas que los datos proporcionados son verdaderos y reconoces
                que no se podrán modificar una vez enviados.
              </p>
            </div>

            {/* Correo electrónico de contacto */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Correo electrónico de contacto</h5>
                <p>
                  Confirma la dirección de correo electrónico que debemos usar
                  para enviarte correspondencia sobre este proyecto.
                </p>
                <small className="d-block mb-2">
                  (Si se muestra aquí el correo electrónico incorrecto,{" "}
                  <a href="#">actualízalo en tu cuenta</a>.)
                </small>
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
                      console.log(
                        "Enviando correo de verificación a:",
                        values.email
                      );
                      // Aquí puedes manejar el envío del correo de verificación
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
                          <Button className="btn btn-dark" type="submit">
                            Enviar correo de verificación
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Col>
            </Row>

            <hr />
            {/* Verifica los datos y agrega una cuenta bancaria */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Tipo de proyecto</h5>
                <p>
                  Selecciona “Individuo” si tu proyecto va a recaudar y recibir
                  fondos a tu nombre. Selecciona “Empresa” u “Organización sin
                  fines de lucro” si vas a recaudar y recibir fondos en nombre
                  de una entidad que te pertenece o en la cual eres un ejecutivo
                  con autorización para representarla.
                </p>
                <p>
                  Más información sobre las{" "}
                  <a href="#">consideraciones fiscales</a> al administrar tu
                  proyecto.
                </p>
              </Col>
              <Col md={8}>
                <div className="border rounded-3 p-3 mb-3">
                  <p className="text-center">
                    <i className="bi bi-lock"></i> Completa los pasos anteriores
                    para desbloquear esta sección
                  </p>
                </div>
              </Col>
            </Row>

            {/* Verificación del proyecto */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Verificación del proyecto</h5>
                <p>
                  Te redirigiremos a Stripe, nuestro proveedor de procesamiento
                  de pagos, para que ingreses tu edad, ubicación geográfica,
                  información fiscal y otros datos. Los creadores que recauden
                  fondos en nombre de una empresa u organización sin fines de
                  lucro deben proporcionar información similar, además de otros
                  datos sobre los <a href="#">propietarios y directores</a> de
                  la entidad.
                </p>
                <p>
                  Si continúas, certificas la veracidad de los datos
                  proporcionados.
                </p>
              </Col>
              <Col md={8}>
                <div className="border rounded-3 p-3 mb-3">
                  <p className="text-center">
                    <i className="bi bi-lock"></i> Completa los pasos anteriores
                    para desbloquear esta sección
                  </p>
                </div>
              </Col>
            </Row>
            <hr />
            {/* Cuenta bancaria */}
            <Row className="mb-4">
              <Col md={4}>
                <h2>Cuenta bancaria</h2>
                <p>
                  Agrega la cuenta corriente donde deseas recibir los fondos.
                  Esta cuenta debe tener su domicilio en México y aceptar
                  depósitos directos en la moneda de tu proyecto. No admitimos
                  giros bancarios, cuentas de ahorro ni cuentas bancarias
                  virtuales.
                </p>
                <p>
                  Declaras que tienes autorización para vincular esta cuenta
                  bancaria al proyecto. Si vas a recaudar fondos como individuo,
                  la cuenta debe estar registrada a tu nombre. Si vas a hacer en
                  nombre de una empresa u organización sin fines de lucro, la
                  cuenta debe estar registrada a nombre de esa entidad.
                </p>
                <p>
                  Asegúrate de que tus datos sean correctos, ya que no podrás
                  cambiarlos después de enviar el proyecto para su revisión.
                  Kickstarter no es responsable si las transferencias bancarias
                  se pierden debido a un error en las credenciales o tipo de
                  cuenta bancaria.
                </p>
              </Col>
              {/* Sección bloqueada */}
              <Col md={8}>
                <div className="border rounded-3 p-3 mb-3">
                  <div className="alert alert-light border border-secondary p-3">
                    <i className="bi bi-lock"></i> Completa los pasos anteriores
                    para desbloquear esta sección
                  </div>
                  <p className="text-success">
                    <i className="bi bi-info-circle"></i> La cuenta bancaria
                    receptora debe pertenecer al individuo, empresa o entidad
                    sin fines de lucro que recauda los fondos para este
                    proyecto.
                  </p>
                </div>
              </Col>
            </Row>

            {/* Método de pago */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Método de pago</h5>
                <p>
                  Agrega una tarjeta de crédito o débito Visa, Mastercard o
                  American Express. No aceptamos las tarjetas Discover, JCB,
                  Maestro ni Visa Electron.
                </p>
                <p>
                  Esta tarjeta debe estar registrada a nombre del individuo o
                  entidad (o propietario de la entidad) que recauda los fondos
                  para este proyecto.
                </p>
                <p>
                  Al agregar esta tarjeta, autorizas a Kickstarter a debitar
                  fondos en caso de reembolsos o contracargos por disputas
                  perdidas en tu proyecto.
                </p>
              </Col>

              {/* Sección de contracargos */}
              <Col md={8}>
                <div className="border rounded-3 p-3 mb-3">
                  <div className="alert alert-light border border-secondary p-3">
                    <i className="bi bi-lock"></i> Completa los pasos anteriores
                    para desbloquear esta sección
                  </div>
                  <p className="text-success">
                    <i className="bi bi-info-circle"></i> Se producen
                    contracargos cuando un patrocinador presenta una disputa.{" "}
                    <a href="#">Más información...</a>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        );
      case "promocion":
        return (
          <>
            {/* Prepararse para publicar */}
            <Row className="mb-4">
              <h2>Prepárate para publicar</h2>
              <p>Prepárate para promover tu proyecto.</p>
            </Row>

            {/* URL del proyecto */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>URL del proyecto</h5>
                <p>
                  Usaremos el título de tu proyecto actual para generar una URL.
                  Incluso si cambias el título más adelante, la URL seguirá
                  siendo la misma. La página del proyecto no estará activa hasta
                  que lo publiques.
                </p>
              </Col>
              <Col md={8}>
                <div className="alert alert-light border border-secondary p-3">
                  <i className="bi bi-lock"></i> No puedes generar tu URL hasta
                  que no lo hayas enviado a revisión.
                </div>
              </Col>
            </Row>
            <hr />

            {/* Página de pre lanzamiento */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Página de pre lanzamiento</h5>
                <p>
                  El título, subtítulo y categoría de tu proyecto de la sección
                  Básicos aparecerán automáticamente en esta página. Los
                  potenciales patrocinadores podrán encontrar esta información
                  en Kickstarter, pero deberías compartir tu página de pre
                  lanzamiento con todos para generar entusiasmo y atención en
                  torno a tu proyecto antes de publicarlo.
                </p>
                <p>
                  <a href="#">
                    Descarga distintivos y logos de Kickstarter para las redes
                    sociales
                  </a>
                  mientras te preparas para publicar tu proyecto. Puedes
                  agregarlos al material gráfico de la promoción en las redes
                  sociales.
                </p>
              </Col>
              <Col md={8}>
                <div className="border rounded-3 p-3">
                  <div className="alert alert-primary p-3">
                    <i className="bi bi-info-circle"></i> No puedes activar tu
                    página hasta que hayamos aprobado tu proyecto.
                  </div>
                  <p className="text-success">
                    <i className="bi bi-circle-fill"></i> Inactiva
                  </p>
                  <p>Título, subtítulo e imagen de la pestaña Básicos</p>
                  <div
                    className="border border-secondary mb-3"
                    style={{ height: "100px", backgroundColor: "#f0f0f0" }}
                  ></div>
                  <div className="text-end">
                    <Button className="btn btn-dark">Activar mi página</Button>
                  </div>
                </div>
              </Col>
            </Row>
            <hr />

            {/* Etiquetas de referencia personalizadas */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Etiquetas de referencia personalizadas</h5>
                <p>
                  Genera etiquetas de referencia personalizadas a fin de crear
                  enlaces rastreables únicos para tus iniciativas de marketing
                  fuera de Kickstarter.
                </p>
              </Col>
              <Col md={8}>
                <div className="border rounded-3 p-3">
                  {/* <div className="mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Insertar etiqueta..."
                    />
                  </div>
                  <div className="text-end">
                    <Button className="btn btn-secondary">
                      Generar etiqueta
                    </Button>
                  </div> */}
                  <Formik
                    initialValues={{
                      tag: "",
                    }}
                    validationSchema={Yup.object().shape({
                      tag: Yup.string().required("La etiqueta es requerida"),
                    })}
                    onSubmit={(values) => {
                      console.log(values);
                      // Aquí puedes manejar el envío de la etiqueta
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
                        <div className="mb-4">
                          <Form.Control
                            type="text"
                            name="tag"
                            placeholder="Insertar etiqueta..."
                            value={values.tag}
                            onChange={handleChange}
                            isInvalid={!!errors.tag && touched.tag}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.tag}
                          </Form.Control.Feedback>
                        </div>
                        <div className="text-end">
                          <Button className="btn btn-secondary" type="submit">
                            Generar etiqueta
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Col>
            </Row>
            <hr />
            {/* Google Analytics */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Google Analytics</h5>
                <p>
                  Esta poderosa herramienta ofrece información sobre el
                  desempeño de tu proyecto, incluido el número de visitantes que
                  acceden a tu página, de dónde vienen y cuántos de ellos hacen
                  contribuciones. Escribe un ID de seguimiento o secreto de API
                  para conectar tu proyecto.
                </p>
              </Col>
              <Col md={8}>
                <div className="border rounded-3 p-3 mb-4">
                  <Formik
                    initialValues={{
                      trackingId: "",
                      apiSecret: "",
                    }}
                    validationSchema={Yup.object().shape({
                      trackingId: Yup.string()
                        .required("El ID de seguimiento es requerido")
                        .matches(
                          /^G-\w{10}$/,
                          "El ID de seguimiento debe seguir el formato G-XXXXXXXXXX"
                        ),
                      apiSecret: Yup.string().required(
                        "El secreto de API es requerido"
                      ),
                    })}
                    onSubmit={(values) => {
                      console.log(values);
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
                        <div className="mb-4">
                          <label>ID de seguimiento</label>
                          <Form.Control
                            type="text"
                            name="trackingId"
                            placeholder="G-XXXXXXXXXX"
                            value={values.trackingId}
                            onChange={handleChange}
                            isInvalid={
                              !!errors.trackingId && touched.trackingId
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.trackingId}
                          </Form.Control.Feedback>
                        </div>
                        <div className="mb-4">
                          <label>Secreto de API</label>
                          <Form.Control
                            type="text"
                            name="apiSecret"
                            placeholder=""
                            value={values.apiSecret}
                            onChange={handleChange}
                            isInvalid={!!errors.apiSecret && touched.apiSecret}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.apiSecret}
                          </Form.Control.Feedback>
                        </div>
                        <div className="text-end">
                          <Button className="btn btn-secondary" type="submit">
                            Guardado
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Col>
            </Row>
            {/* Pixel de Meta */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Pixel de Meta</h5>
                <p>
                  El pixel de Meta (anteriormente, pixel de Facebook) es una
                  herramienta que mide la eficacia de la publicidad en Facebook
                  e Instagram. Agregar un <a href="#">ID de pixel</a> te permite
                  saber si tus anuncios llegan a la audiencia que te interesa
                  antes y durante tu campaña.
                </p>
              </Col>
              <Col md={8}>
                <div className="border rounded-3 p-3">
                  <Formik
                    initialValues={{
                      pixelId: "",
                    }}
                    validationSchema={Yup.object().shape({
                      pixelId: Yup.string()
                        .required("El ID de pixel es requerido")
                        .matches(
                          /^\d{15,}$/,
                          "El ID de pixel debe ser un número de al menos 15 dígitos"
                        ), // Ajusta la expresión regular según el formato esperado
                    })}
                    onSubmit={(values) => {
                      console.log(values);
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
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPixelId"
                        >
                          <Form.Label>ID de pixel</Form.Label>
                          <Form.Control
                            type="text"
                            name="pixelId"
                            placeholder="123456789123456789"
                            value={values.pixelId}
                            onChange={handleChange}
                            isInvalid={!!errors.pixelId && touched.pixelId}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.pixelId}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <div className="text-end">
                          <Button variant="secondary" type="submit">
                            Guardado
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Col>
            </Row>
            <hr />
            {/* Token de acceso */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Token de acceso para la API de conversiones de Meta</h5>
                <p>
                  La API de conversiones de Meta funciona junto con el pixel de
                  Meta para crear una conexión de eventos directa y más
                  confiable entre Kickstarter y Meta. Agrega un{" "}
                  <a href="#">Token de acceso</a> para conectar Kickstarter a tu
                  administrador de eventos de Meta.
                </p>
              </Col>
              <Col md={8}>
                <div className="border rounded-3 p-3">
                  <Formik
                    initialValues={{
                      accessToken: "",
                    }}
                    validationSchema={Yup.object().shape({
                      accessToken: Yup.string()
                        .required("El token de acceso es requerido")
                        .min(
                          10,
                          "El token de acceso debe tener al menos 10 caracteres"
                        ),
                    })}
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
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicAccessToken"
                        >
                          <Form.Label>Token de acceso</Form.Label>
                          <Form.Control
                            type="text"
                            name="accessToken"
                            value={values.accessToken}
                            onChange={handleChange}
                            isInvalid={
                              !!errors.accessToken && touched.accessToken
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.accessToken}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <div className="text-end">
                          <Button variant="secondary" type="submit">
                            Guardado
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Col>
            </Row>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs">
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
            className={`nav-link ${
              activeTab === "funcionamiento" ? "active" : ""
            }`}
            onClick={() => setActiveTab("funcionamiento")}
          >
            Funcionamiento
          </Button>
        </li>
        <li className="nav-item">
          <Button
            className={`nav-link ${activeTab === "recompensa" ? "active" : ""}`}
            onClick={() => setActiveTab("recompensa")}
          >
            Recompensa
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
        <li className="nav-item">
          <Button
            className={`nav-link ${activeTab === "pago" ? "active" : ""}`}
            onClick={() => setActiveTab("pago")}
          >
            Pago
          </Button>
        </li>
        <li className="nav-item">
          <Button
            className={`nav-link ${activeTab === "promocion" ? "active" : ""}`}
            onClick={() => setActiveTab("promocion")}
          >
            Promoción
          </Button>
        </li>
      </ul>
      <div className="tab-content mt-3">{renderContent()}</div>
    </div>
  );
};

export default Proyect;
