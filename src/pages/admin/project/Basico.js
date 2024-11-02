import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Basico = () => {

  const [fileName, setFileName] = useState("");
  const [videoName, setVideoName] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const initialValuesBasic = {
    title: "",
    subtitle: "",
    mainCategory: "",
    subCategory: "",
    category: "",
    subCategoryOption: "",
    location: "",
    file: null,
    video: null,
    day: "",
    month: "",
    year: "",
    duracion: "",
    contribuciones: "",
  };

  const validationBasic = Yup.object().shape({
    title: Yup.string().required("El título es requerido"),
    subtitle: Yup.string().required("El subtítulo es requerido"),

    mainCategory: Yup.string().required("La categoría principal es requerida"),
    subCategory: Yup.string().required(
      "La subcategoría principal es requerida"
    ),
    category: Yup.string().required("La categoría es requerida"),
    subCategoryOption: Yup.string().required("La subcategoría es requerida"),

    location: Yup.string().required("La ubicación es requerida"),

    file: Yup.mixed()
      .required("Se requiere un archivo")
      .test("fileSize", "El archivo es demasiado grande", (value) => {
        return value && value.size <= 50 * 1024 * 1024; // 50 MB
      })
      .test("fileType", "El tipo de archivo no es válido", (value) => {
        return (
          value &&
          ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
            value.type
          )
        );
      }),

    video: Yup.mixed()
      .required("Se requiere un archivo")
      .test("fileSize", "El archivo es demasiado grande", (value) => {
        return value && value.size <= 5120 * 1024; // 5120 MB
      })
      .test("fileType", "El tipo de archivo no es válido", (value) => {
        return (
          value &&
          [
            "video/mp4",
            "video/mpeg",
            "video/avi",
            "video/3gp",
            "video/wmv",
            "video/flv",
          ].includes(value.type)
        );
      }),

    pixelId: Yup.string().required("El ID de pixel es requerido"),
    accessToken: Yup.string().required("El token de acceso es requerido"),

    day: Yup.number()
      .required("El día es requerido")
      .min(1, "El día debe ser al menos 1")
      .max(31, "El día debe ser como máximo 31"),
    month: Yup.number()
      .required("El mes es requerido")
      .min(1, "El mes debe ser al menos 1")
      .max(12, "El mes debe ser como máximo 12"),
    year: Yup.number()
      .required("El año es requerido")
      .min(1900, "El año debe ser mayor a 1900"),

    duracion: Yup.string().required("Debes seleccionar una duración"),
    contribuciones: Yup.string().required(
      "Debes seleccionar una opción de contribuciones"
    ),
  });

  const handleSubmitBasic = (values) => {
    console.log(values);
  };


  return (
    <>
      <div className="mb-5">
        <h2>Empieza con los fundamentos básicos</h2>
        <p>Haz que sea fácil para las personas conocer tu proyecto.</p>
      </div>
      <Formik
        initialValues={initialValuesBasic}
        validationSchema={validationBasic}
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
            <Row className="mb-4">
              <Col md={4}>
                <h5>Título del proyecto</h5>
                <p>
                  Escribe un título y un subtítulo de forma clara y concisa para
                  transmitir rápidamente la esencia de tu proyecto. Ambos
                  aparecerán tanto en la página del proyecto como en la de
                  prelanzamiento.
                </p>
                <p>
                  También los verán los posibles patrocinadores si tu proyecto
                  aparece en las páginas de la categoría, en los resultados de
                  búsqueda o en los correos electrónicos que enviamos a nuestra
                  comunidad.
                </p>
              </Col>
              <Col md={8}>
                <div className="border rounded-3 p-3">
                  <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="El archivo histórico del Museo de Arte Moderno a tu alcance"
                      value={values.title}
                      onChange={handleChange}
                      isInvalid={!!errors.title && touched.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicSubtitle">
                    <Form.Label>Subtítulo</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="subtitle"
                      placeholder="El proyecto busca poner en valor y digitalizar los archivos históricos del Museo de Arte Moderno para que todos puedan acceder a ellos."
                      rows={3}
                      value={values.subtitle}
                      onChange={handleChange}
                      isInvalid={!!errors.subtitle && touched.subtitle}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.subtitle}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="mt-3">
                    <p className="text-success">
                      <i className="bi bi-lightbulb"></i> Ofrece a los
                      patrocinadores la mejor primera impresión de tu proyecto
                      con títulos interesantes.
                    </p>
                    <a href="#" className="text-success">
                      Más información...
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
            <hr />

            <Row className="mb-4">
              <Col md={4}>
                <h5>Categoría del proyecto</h5>
                <p>
                  Elige una categoría y una subcategoría principales para ayudar
                  a los patrocinadores a encontrar tu proyecto.
                </p>
                <p>
                  La segunda subcategoría nos permitirá ofrecerte mejores
                  sugerencias para tu proyecto. No se mostrará en la página del
                  proyecto ni afectará la forma en que aparece en los resultados
                  de búsqueda.
                </p>
                <p>
                  Puedes cambiarlas en cualquier momento antes y durante tu
                  campaña.
                </p>
              </Col>
              <Col md={8}>
                <div className="border rounded-3 p-3">
                  {/* <Form noValidate onSubmit={handleSubmit}> */}
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formMainCategory">
                        <Form.Label>Categoría principal</Form.Label>
                        <Form.Select
                          name="mainCategory"
                          value={values.mainCategory}
                          onChange={handleChange}
                          isInvalid={
                            !!errors.mainCategory && touched.mainCategory
                          }
                        >
                          <option value="">Seleccionar</option>
                          <option>Tecnología</option>
                          <option>Arte</option>
                          <option>Música</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.mainCategory}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formSubCategory">
                        <Form.Label>Subcategoría principal</Form.Label>
                        <Form.Select
                          name="subCategory"
                          value={values.subCategory}
                          onChange={handleChange}
                          isInvalid={
                            !!errors.subCategory && touched.subCategory
                          }
                        >
                          <option value="">Seleccionar</option>
                          <option>Software</option>
                          <option>Hardware</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.subCategory}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-3">
                      <Form.Group controlId="formCategory">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select
                          name="category"
                          value={values.category}
                          onChange={handleChange}
                          isInvalid={!!errors.category && touched.category}
                        >
                          <option value="">Seleccionar</option>
                          <option>Opción 1</option>
                          <option>Opción 2</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.category}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-3">
                      <Form.Group controlId="formSubCategoryOption">
                        <Form.Label>Subcategoría</Form.Label>
                        <Form.Select
                          name="subCategoryOption"
                          value={values.subCategoryOption}
                          onChange={handleChange}
                          isInvalid={
                            !!errors.subCategoryOption &&
                            touched.subCategoryOption
                          }
                        >
                          <option value="">Seleccionar</option>
                          <option>Opción 1</option>
                          <option>Opción 2</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.subCategoryOption}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <hr />

            <Row className="mb-4">
              <Col md={4}>
                <h5>Ubicación del proyecto</h5>
                <p>
                  Ingresa la ubicación que mejor describa la ubicación de tu
                  proyecto.
                </p>
              </Col>
              <Col md={8}>
                <div className="border rounded-3 p-3">
                  {/* <Form noValidate onSubmit={handleSubmit}> */}
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-search"></i>
                    </span>
                    <Form.Control
                      type="text"
                      name="location"
                      placeholder="Empieza a escribir tu ubicación..."
                      value={values.location}
                      onChange={handleChange}
                      isInvalid={!!errors.location && touched.location}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.location}
                    </Form.Control.Feedback>
                  </div>
                </div>
              </Col>
            </Row>
            <hr />

            {/* Imagen del proyecto */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Imagen del proyecto</h5>
                <p>
                  Agrega una imagen que represente claramente tu proyecto y que
                  se vea bien en diferentes tamaños, ya que aparecerá en la
                  página de tu proyecto, en el sitio web y en las aplicaciones
                  móviles de Kickstarter, y (cuando se comparta) en las redes
                  sociales.
                </p>
                <p>
                  Tu imagen debe tener al menos 1024x576 píxeles. Se recortará
                  en una proporción de 16:9.
                </p>
                <p>
                  <span className="text-success">
                    Evita imágenes con banners, distintivos o texto
                  </span>
                  que podrían ser ilegibles en formatos más pequeños o ser
                  penalizados por el algoritmo de Facebook. Además, reducen tus
                  posibilidades de aparecer en la página de inicio y en los
                  boletines de Kickstarter.
                </p>
              </Col>
              <Col md={8}>
                {/* <Form noValidate onSubmit={handleSubmit}> */}
                <div className="border rounded-3 p-3 text-center">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif,.webp"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("file", file);
                      setFileName(file ? file.name : "");
                    }}
                    style={{ display: "none" }}
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button className="btn" as="span">
                      Sube una imagen
                    </Button>
                  </label>
                  <p className="mt-2">
                    Coloca una imagen aquí o selecciona un archivo.
                  </p>
                  <small>
                    Debe ser un archivo JPG, PNG, GIF o WEBP, no mayor a 50 MB.
                  </small>
                  {errors.file && touched.file && (
                    <Alert variant="danger" className="mt-2">
                      {errors.file}
                    </Alert>
                  )}
                  {fileName && (
                    <p className="mt-2">Archivo seleccionado: {fileName}</p>
                  )}
                </div>
                {/* </Form> */}
              </Col>
            </Row>
            <hr />

            {/* Video del proyecto */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Video del proyecto (opcional)</h5>
                <p>Agrega un video que describa tu proyecto.</p>
                <p>
                  Cuéntale a las personas cómo se van a emplear los fondos
                  recaudados, cómo planeas llevarlo a cabo, quién eres y por qué
                  este proyecto es importante para ti.
                </p>
                <p>
                  Después de que hayas subido tu video, utiliza nuestro editor
                  para agregar subtítulos en el mismo u otro idioma de modo que
                  tu proyecto sea más accesible para todos.
                </p>
              </Col>
              <Col md={8}>
                {/* <Form noValidate onSubmit={handleSubmit}> */}
                <div className="border rounded-3 p-3 text-center">
                  <input
                    type="file"
                    accept=".mov,.mpeg,.avi,.mp4,.3gp,.wmv,.flv"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("video", file);
                      setVideoName(file ? file.name : "");
                    }}
                    style={{ display: "none" }}
                    id="video-upload"
                  />
                  <label htmlFor="video-upload">
                    <Button className="btn" as="span">
                      Sube un video
                    </Button>
                  </label>
                  <p className="mt-2">
                    Coloca un video aquí o selecciona un archivo.
                  </p>
                  <small>
                    Debe ser un archivo MOV, MPEG, AVI, MP4, 3GP, WMV o FLV, no
                    mayor a 5120 MB.
                  </small>
                  {errors.video && touched.video && (
                    <Alert variant="danger" className="mt-2">
                      {errors.video}
                    </Alert>
                  )}
                  {videoName && (
                    <p className="mt-2">Archivo seleccionado: {videoName}</p>
                  )}
                </div>
                <p className="text-success mt-2">
                  <i className="bi bi-lightbulb"></i> El 80 % de los proyectos
                  exitosos tienen un video...
                </p>
                {/* </Form> */}
              </Col>
            </Row>
            <hr />

            {/* Fecha límite de publicación */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Fecha límite de publicación (opcional)</h5>
                <p>
                  Te daremos recomendaciones sobre cuándo completar los pasos
                  que demoren unos días en procesarse. Podrás modificar esta
                  fecha hasta que publiques el proyecto, que debe hacerse
                  manualmente.
                </p>
              </Col>
              <Col md={8}>
                {/* <Form noValidate onSubmit={handleSubmit}> */}
                <div className="border rounded-3 p-3">
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      name="day"
                      placeholder="DD"
                      className="me-2"
                      value={values.day}
                      onChange={handleChange}
                      isInvalid={!!errors.day && touched.day}
                    />
                    <Form.Control
                      type="text"
                      name="month"
                      placeholder="MM"
                      className="me-2"
                      value={values.month}
                      onChange={handleChange}
                      isInvalid={!!errors.month && touched.month}
                    />
                    <Form.Control
                      type="text"
                      name="year"
                      placeholder="YYYY"
                      value={values.year}
                      onChange={handleChange}
                      isInvalid={!!errors.year && touched.year}
                    />
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setFieldValue("day", date.getDate());
                        setFieldValue("month", date.getMonth() + 1);
                        setFieldValue("year", date.getFullYear());
                      }}
                      customInput={
                        <Button
                          variant="outline-secondary"
                          onClick={() => setShowDatePicker(!showDatePicker)}
                        >
                          <i className="bi bi-calendar"></i>
                        </Button>
                      }
                    />
                  </div>
                  <p className="my-4">
                    <strong>
                      Te recomendaremos cuando tú deberías hacerlo:
                    </strong>
                    <div className="ml-5">
                      <li>
                        Confirma tu identidad y proporciona la información de
                        pago
                      </li>
                      <li>Envía tu proyecto a revisión</li>
                    </div>
                  </p>
                  <p className="mt-2 text-success">
                    <i className="bi bi-lightbulb"></i> Configurar una fecha
                    objetivo no hará que el proyecto se publique
                    automáticamente.
                  </p>
                  {errors.day && touched.day && (
                    <div className="text-danger">{errors.day}</div>
                  )}
                  {errors.month && touched.month && (
                    <div className="text-danger">{errors.month}</div>
                  )}
                  {errors.year && touched.year && (
                    <div className="text-danger">{errors.year}</div>
                  )}
                </div>
                {/* </Form> */}
              </Col>
            </Row>
            <hr />

            {/* Duración de la campaña */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Duración de la campaña</h5>
                <p>
                  Define un límite de tiempo para tu campaña. No podrás
                  cambiarlo después de la publicación.
                </p>
              </Col>
              <Col md={8}>
                <div className="border rounded-3 p-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="duracion"
                      id="fijo"
                      value="fijo"
                      checked={values.duracion === "fijo"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="fijo">
                      Número fijo de días (1-60)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="duracion"
                      id="fecha"
                      value="fecha"
                      checked={values.duracion === "fecha"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="fecha">
                      Finalizar en una fecha y hora específica
                    </label>
                  </div>
                  {errors.duracion && touched.duracion && (
                    <div className="text-danger">{errors.duracion}</div>
                  )}
                  <p className="mt-2 text-success">
                    <i className="bi bi-lightbulb"></i> Las campañas cuya
                    duración se establece por 30 días o menos...
                  </p>
                  <div className="form-check mt-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="contribuciones"
                      id="noActivar"
                      value="noActivar"
                      checked={values.contribuciones === "noActivar"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="noActivar">
                      No activar las contribuciones tardías
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="contribuciones"
                      id="activar"
                      value="activar"
                      checked={values.contribuciones === "activar"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="activar">
                      Activar las contribuciones tardías
                    </label>
                  </div>
                  {errors.contribuciones && touched.contribuciones && (
                    <div className="text-danger">{errors.contribuciones}</div>
                  )}
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

export default Basico;