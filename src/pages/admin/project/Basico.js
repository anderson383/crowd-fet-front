import React, { useEffect, useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col, Button, Alert, InputGroup } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "src/config/axios/axios";
import CitySearch from "@/components/SearchCity/SearchCity";

const Basico = ({ formRef  }) => {

  const [fileName, setFileName] = useState("");
  const [videoName, setVideoName] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [sublistCategory, setSubListCategory] = useState([]);

  const [listDeparment, setListDeparment] = useState([]);
  const [listMunicipality, setListMunicipality] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const initialValuesBasic = {
    title: "",
    subtitle: "",
    location: "",
    video: null,
    categoryId: "",
    subCategoryId: "",
    deparment: "",
    municipality: "",
    file: null,
    contribuciones: "",
    montoMeta: null,
    durationCampaign: null,
    dateLaunch: null,
  };

  const validationBasic = Yup.object().shape({
    title: Yup.string().required("El título es requerido"),
    subtitle: Yup.string().required("El subtítulo es requerido"),

    mainCategory: Yup.string().required("La categoría principal es requerida"),
    subCategory: Yup.string().required(
      "La subcategoría principal es requerida"
    ),
    categoryId: Yup.string().required("La categoría es requerida"),
    subCategoryId: Yup.string().required("La subcategoría es requerida"),

    deparment: Yup.string().required("El departamento es requerido"),
    municipality: Yup.string().required("El municipio es requerido"),
    montoMeta: Yup.number().required("El monto de la meta es requerido"),
    

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
    video: Yup.string().required("El municipio es requerido"),
    
    durationCampaign: Yup.string().required("Debes seleccionar una duración"),
    dateLaunch: Yup.string().required("Debes seleccionar una fecha"),
    contribuciones: Yup.string().required(
      "Debes seleccionar una opción de contribuciones"
    ),
  });

  const getSubCategory = (id) => {
    axiosInstance.get(`/common/list-item/?id=${id}`).then(({data: {data}}) => {
      setSubListCategory(data)
      // setListCategory(data[0].listItem)
    })
  };
  const getMunicipality = (id) => {
    axiosInstance.get(`/common/list-item/?id=${id}`).then(({data: {data}}) => {
      setListMunicipality(data)
      // setListCategory(data[0].listItem)
    })
  };


  useEffect(() => {
    axiosInstance.get('/common/list-types/?codes=category_projects').then(({data: {data}}) => {
      setListCategory(data[0].listItem)
    })
    axiosInstance.get('/common/list-types/?codes=deparments_list').then(({data: {data}}) => {
      setListDeparment(data[0].listItem)
    })
  }, [])

  const handleSubmitBasic = (values) => {
    console.log(values);

  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <>
      <div className="mb-5 pb-5">
        <h2>Empieza con los fundamentos básicos</h2>
        <p>Haz que sea fácil para las personas conocer tu proyecto.</p>
      </div>
      <Formik
        innerRef={formRef}
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
          handleBlur,
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
                <div className="border rounded-3 p-3 bg-white">
                  <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="El archivo histórico del Museo de Arte Moderno a tu alcance"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                      onBlur={handleBlur}
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
                <div className="border rounded-3 p-3 bg-white">
                  <Row>
                    <Col md={6} className="mt-3">
                      <Form.Group controlId="categoryId">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select
                          name="categoryId"
                          value={values.categoryId}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e)
                            getSubCategory(e.target.value)
                          }}
                          isInvalid={!!errors.categoryId && touched.categoryId}
                        >
                          <option value="">Seleccionar</option>
                          {
                            listCategory.map(cat => (
                              <option key={cat.id} value={cat.id} >{cat.name}</option>
                            ))
                          }
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.categoryId}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-3">
                      <Form.Group controlId="formSubCategoryOption">
                        <Form.Label>Subcategoría</Form.Label>
                        <Form.Select
                          name="subCategoryId"
                          value={values.subCategoryId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={
                            !!errors.subCategoryId &&
                            touched.subCategoryId
                          }
                        >
                          <option value="">Seleccionar</option>
                          {
                            sublistCategory.map(cat => (
                              <option key={cat.id} value={cat.id} >{cat.name}</option>
                            ))
                          }
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.subCategoryId}
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
                <div className="border rounded-3 p-3 bg-white">
                  <Row>
                    <Col md={6} className="mt-3">
                      <Form.Group controlId="deparment">
                        <Form.Label>Departamento</Form.Label>
                        <Form.Select
                          name="deparment"
                          value={values.deparment}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e)
                            getMunicipality(e.target.value)
                          }}
                          isInvalid={!!errors.deparment && touched.deparment}
                        >
                          <option value="">Seleccionar</option>
                          {
                            listDeparment.map(dep => (
                              <option key={dep.id} value={dep.id} >{dep.name}</option>
                            ))
                          }
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.deparment}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-3">
                      <Form.Group controlId="municipality">
                        <Form.Label>Municipio</Form.Label>
                        <Form.Select
                          name="municipality"
                          value={values.municipality}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={
                            !!errors.municipality &&
                            touched.municipality
                          }
                        >
                          <option value="">Seleccionar</option>
                          {
                            listMunicipality.map(mun => (
                              <option key={mun.id} value={mun.id} >{mun.name}</option>
                            ))
                          }
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.municipality}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
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
              </Col>
              <Col md={8}>
                <div className="border rounded-3 p-3 text-center bg-white">
                  <input
                    name="file"
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif,.webp"
                    onBlur={handleBlur}
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
              </Col>
            </Row>
            <hr />

            {/* Video del proyecto */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Video del proyecto (opcional)</h5>
                <p>Agrega un video que describa tu proyecto.</p>
                <p>
                  Cuéntale a las personas cómo se van a emplear los fondos recaudados, cómo planeas llevarlo a cabo, quién eres y por qué este proyecto es importante para ti.
                </p>
                <p>
                  Después de que hayas subido tu video, utiliza nuestro editor para agregar subtítulos en el mismo u otro idioma de modo que tu proyecto sea más accesible para todos.
                </p>
              </Col>
              <Col md={8}>
                <div className="border rounded-3 p-3 text-center bg-white">
                  <input
                    type="url"
                    placeholder="Introduce la URL de YouTube"
                    onChange={(event) => setFieldValue("videoUrl", event.currentTarget.value)}
                    className="form-control"
                  />
                  <small className="mt-2 d-block">
                    Ingresa un enlace de YouTube para mostrar el video.
                  </small>
                  {errors.videoUrl && touched.videoUrl && (
                    <Alert variant="danger" className="mt-2">
                      {errors.videoUrl}
                    </Alert>
                  )}
                  {/* Vista previa del video */}
                  {values.videoUrl && (
                    <div className="mt-3">
                      <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${new URL(values.videoUrl).searchParams.get("v")}`}
                        title="Video del proyecto"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
                <p className="text-success mt-2">
                  <i className="bi bi-lightbulb"></i> El 80 % de los proyectos exitosos tienen un video...
                </p>
              </Col>
            </Row>
            <hr />
            
            <Row className="mb-4">
              <Col md={4}>
                <h5>Objetivo de financiación</h5>
                <p>
                Establezca una meta alcanzable que cubra lo que necesita para completar su proyecto.La financiación es de todo o nada. Si no alcanzas tu objetivo, no recibirás ningún dinero.
                </p>
              </Col>
              <Col md={8}>
                <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                        name="montoMeta"
                        type="text"
                        placeholder="0"
                        value={values.montoMeta}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.montoMeta && touched.montoMeta}
                        aria-label="Amount (in pesos)"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.montoMeta}
                    </Form.Control.Feedback>
                </InputGroup>
              </Col>
            </Row>

            {/* Fecha límite de publicación */}
            <Row className="mb-4">
              <Col md={4}>
                <h5>Fecha de lanzamiento prevista (opcional)</h5>
                <p>
                  Te daremos recomendaciones sobre cuándo completar los pasos
                  que demoren unos días en procesarse. Podrás modificar esta
                  fecha hasta que publiques el proyecto, que debe hacerse
                  manualmente.
                </p>
              </Col>
              <Col md={8}>
                {/* <Form noValidate onSubmit={handleSubmit}> */}
                <div className="border rounded-3 p-3 bg-white">
                  <div className="d-flex">
                     <Form.Group>
                      <DatePicker
                        minDate={tomorrow}
                        placeholderText="MM/DD/YYYY"
                        selected={values.dateLaunch}
                        onChange={(date) => {
                          setFieldValue("dateLaunch", date)
                        }}
                        customInput={
                            <Form.Control
                                type="text"
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    fontSize: '1rem',
                                    borderRadius: '0.25rem',
                                    border: '1px solid #ced4da',
                                }}
                            />
                        }
                        dateFormat="MM/dd/yyyy"
                    />
                  </Form.Group>
                  </div>
                  <p className="my-4">
                  </p>
                  <p className="mt-2 text-success">
                    <i className="bi bi-lightbulb"></i> Configurar una fecha
                    objetivo no hará que el proyecto se publique
                    automáticamente.
                  </p>
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
                  Define una fecha límite para tu campaña. <b> No podrás
                  cambiarlo después de la publicación.</b>
                </p>
              </Col>
              <Col md={8}>
              <Form.Group>
                <DatePicker
                    minDate={tomorrow}
                    placeholderText="MM/DD/YYYY"
                    selected={values.durationCampaign}
                    onChange={(date) => {
                      setFieldValue("durationCampaign", date)
                    }}
                    customInput={
                        <Form.Control
                            name="durationCampaign"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.durationCampaign && touched.durationCampaign}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                fontSize: '1rem',
                                borderRadius: '0.25rem',
                            }}
                        />
                    }
                    dateFormat="MM/dd/yyyy"
                />
                 <Form.Control.Feedback type="invalid">
                    {errors.durationCampaign}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Basico;