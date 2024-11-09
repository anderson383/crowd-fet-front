import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Tabs, Tab, Button, Table, Modal, Form, Alert } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { InfoCircle } from 'react-bootstrap-icons';
import * as Yup from "yup";
import { es } from 'date-fns/locale';
import {format} from 'date-fns';
// Modelo inicial para un elemento nuevo
const initialElementState = {
  id: "",
  title: "",
  imageId: null,
};

// Modelo inicial para una recompensa (Reward)
const initialRewardState = {
  id: "",
  title: "",
  description: "",
  pledgedAmount: 0,
  availability: 0,
  limitTime: "",
  content: "",
  estimatedDelivery: "",
  shipping: false,
  imageId: null,
  selectedOptions: []
};

// Esquema de validación para el formulario de `Element`
const validationSchemaElement = Yup.object({
  title: Yup.string()
    .required("El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres"),
  imageId: Yup.mixed()
    .required("La imagen es obligatoria")
    .test("fileType", "Formato no válido. Solo imágenes", (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
      );
    }),
});

// Esquema de validación para el formulario de `Reward`
const validationSchema = Yup.object({
  title: Yup.string().required("El título es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  pledgedAmount: Yup.number()
    .required("La cantidad prometida es obligatoria")
    .min(0, "La cantidad debe ser positiva"),
  availability: Yup.number()
    .required("La disponibilidad es obligatoria")
    .min(0, "Debe ser al menos 0"),
  limitTime: Yup.date().nullable(),
  shipping: Yup.boolean(),
  selectedOptions: Yup.array()
    .min(1, 'Debes seleccionar al menos una opción')
    .required('Este campo es obligatorio'),
});

// eslint-disable-next-line react/display-name
const ElementsManager = forwardRef((props, ref) => {
  const [alertElements, setAlertElements] = useState(false);
  const [alertRewards, setAlertRewards] = useState(false);
  
  const [isEditingReward, setIsEditingReward] = useState(false);
  const [rewards, setRewards] = useState([]); // Lista de elementos
  const [elements, setElements] = useState([]); // Lista de elementos
  const [showModal, setShowModal] = useState(false); // Mostrar modal
  const [showRewardModal, setShowRewardModal] = useState(false); // Mostrar modal de Reward
  const [isEditing, setIsEditing] = useState(false); // Estado de edición
  const [previewImage, setPreviewImage] = useState(null); // Vista previa de la imagen
  const [currentReward, setCurrentReward] = useState(null);

  // Función para abrir el modal de Element
  const handleShowElementModal = (element = initialElementState) => {
    setIsEditing(!!element.id);
    setPreviewImage(
      element.imageId ? URL.createObjectURL(element.imageId) : null
    );
    setShowModal(true);
  };

  // Función para abrir el modal de Reward
  const handleShowRewardModal = (reward = initialRewardState) => {
    setIsEditing(!!reward.id);
    setPreviewImage(
      reward.imageId ? URL.createObjectURL(reward.imageId) : null
    );
    setShowRewardModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPreviewImage(null);
  };

  const handleCloseRewardModal = () => {
    setShowRewardModal(false);
    setPreviewImage(null);
  };

  // Manejador de cambios para archivos de imagen
  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("imageId", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleExternalSubmit = () => {
    if (!elements?.length) {
      setAlertElements(true);
    } else {
      setAlertElements(false);
    }

    if (!rewards?.length) {
      setAlertRewards(true);
    } else {
      setAlertRewards(false);
    }
  }

  // Configuración para uso externo del componente
  useImperativeHandle(ref, () => ({
    elements,
    rewards,
    handleExternalSubmit
  }));

  const onSubmitReward = (values) => {
    console.log(values)
    if (isEditingReward) {
      setRewards(
        rewards.map((reward) =>
          reward.id === currentReward.id ? { ...values, id: currentReward.id } : reward
        )
      );
    } else {
      
      setRewards([...rewards, { ...values, id: Date.now() }]);
    }
    handleCloseRewardModal();
  };

  const onEditReward = (reward) => {
    setCurrentReward(reward);
    setIsEditingReward(true);
    handleShowRewardModal();
  };

  const onDeleteReward = (id) => {
    setRewards(rewards.filter((reward) => reward.id !== id));
  };

  return (
    <Tabs defaultActiveKey="elements" id="element-reward-tabs" className="mb-3">
      <Tab eventKey="elements" title={
         <>
            Elementos {  alertElements && <InfoCircle style={{ marginLeft: '5px', color: 'red' }}  title="Información sobre Elementos" />} 
          </>
      }>
        <div className="container mt-5">
          <div className="d-flex justify-content-between mb-5 align-items-center">
            <h2>Crea tus elementos</h2>
            <Button
              variant="primary"
              onClick={() => handleShowElementModal()}
              className="mb-3"
            >
              Crear Elemento
            </Button>
          </div>
          {
            alertElements && (
              <Alert variant="danger" className="mt-2">
                  No has cargado elementos
              </Alert>
            )
          }
         
          {/* Tabla de elementos */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Título</th>
                <th width="50%">Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {elements.map((element) => (
                <tr key={element.id}>
                  <td>{element.title}</td>
                  <td>
                    {element.imageId ? (
                      <img
                        src={URL.createObjectURL(element.imageId)}
                        alt="preview"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleShowElementModal(element)}
                      className="me-2"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() =>
                        setElements(
                          elements.filter((el) => el.id !== element.id)
                        )
                      }
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
              {elements.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    No hay elementos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Modal para crear o editar un Elemento */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {isEditing ? "Editar Elemento" : "Crear Elemento"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Formik
                initialValues={initialElementState}
                validationSchema={validationSchemaElement}
                onSubmit={(values, { resetForm }) => {
                  setElements((prevElements) =>
                    isEditing
                      ? prevElements.map((el) =>
                          el.id === values.id ? values : el
                        )
                      : [
                          ...prevElements,
                          { ...values, id: Date.now().toString() },
                        ]
                  );
                  handleCloseModal();
                  resetForm();
                }}
              >
                {({ setFieldValue, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                      <Form.Label>Título</Form.Label>
                      <Field
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Ingresa el título"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                    <Form.Group controlId="formImageId" className="mt-3">
                      <Form.Label>Imagen</Form.Label>
                      <Form.Control
                        type="file"
                        name="imageId"
                        onChange={(e) => handleImageChange(e, setFieldValue)}
                      />
                      {previewImage && (
                        <img
                          src={previewImage}
                          alt="preview"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                      <ErrorMessage
                        name="imageId"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                      </Button>
                      <Button variant="primary" type="submit">
                        {isEditing ? "Guardar Cambios" : "Crear Elemento"}
                      </Button>
                    </Modal.Footer>
                  </Form>
                )}
              </Formik>
            </Modal.Body>
          </Modal>
        </div>
      </Tab>
      <Tab
        eventKey="rewards"
        title={
          <>
            Recompensas {  alertRewards && <InfoCircle style={{ marginLeft: '5px', color: 'red' }}  title="Información sobre Elementos" />} 
          </>
        }

        
      >
        {/* Aquí iría el formulario y tabla de Recompensas */}
        <div className="d-flex justify-content-between mb-5 align-items-center">
            <h2>Crea tus recompensas</h2>
            <Button
            variant="primary"
            onClick={() => {
              handleShowRewardModal()
              setIsEditingReward(false)
            }}
            className="mb-3"
            >
              Crear Recompensa
            </Button>
        </div>

        {
            alertElements && (
              <Alert variant="danger" className="mt-2">
                  No has cargado recompensas
              </Alert>
            )
          }

        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Cantidad Prometida</th>
                    <th>Total de Disponibilidad</th>
                    <th>Límite de Tiempo</th>
                    <th>Entrega Estimada</th>
                    <th>Envío</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {rewards.map((reward) => (
                    <tr key={reward.id}>
                        <td>{reward.title}</td>
                        <td>{reward.description}</td>
                        <td>${reward.pledgedAmount.toFixed(2)}</td>
                        <td>{reward.availability}</td>
                        <td>{reward.limitTime ? format(reward.limitTime, 'dd-MM-yyyy', { locale: es }) : 'N/A'}</td>
                        <td>{format(new Date(reward.estimatedDelivery), 'MMMM yyyy', { locale: es })}</td>
                        <td>{reward.shipping ? 'Sí' : 'No'}</td>
                        <td>
                            <Button variant="warning" size="sm" onClick={() => onEditReward(reward)}>Editar</Button>{' '}
                            <Button variant="danger" size="sm" onClick={() => onDeleteReward(reward.id)}>Eliminar</Button>
                        </td>
                    </tr>
                ))}
                {rewards.length === 0 && (
                    <tr>
                    <td colSpan="8" className="text-center">
                        No hay elementos disponibles.
                    </td>
                    </tr>
                )}
            </tbody>
        </Table>
        {/* Modal de recompensas */}
        <Modal show={showRewardModal} onHide={handleCloseRewardModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditing ? "Editar Recompensa" : "Crear Recompensa"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
                initialValues={isEditingReward ? currentReward : initialRewardState}
            //   initialValues={initialRewardState}
            enableReinitialize
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                onSubmitReward(values);
                handleCloseRewardModal();
                resetForm();
              }}
            >
              {({ handleSubmit, setFieldValue, values }) => (
                <Form onSubmit={handleSubmit}>
                  <Modal.Body>
                    {/* Campo: Título */}
                    <Form.Group controlId="formTitle">
                      <Form.Label>Título</Form.Label>
                      <Field
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Título de la recompensa"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>

                    {/* Campo: Descripción */}
                    <Form.Group controlId="formDescription" className="mt-3">
                      <Form.Label>Descripción</Form.Label>
                      <Field
                        as="textarea"
                        name="description"
                        className="form-control"
                        placeholder="Descripción detallada"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>

                    {/* Campo: Cantidad Prometida */}
                    <div className="d-flex gap-3">

                        <Form.Group controlId="formPledgedAmount" className="mt-3">
                        <Form.Label>Cantidad Prometida</Form.Label>
                        <Field
                            type="number"
                            name="pledgedAmount"
                            className="form-control"
                            placeholder="Cantidad prometida en USD"
                        />
                        <ErrorMessage
                            name="pledgedAmount"
                            component="div"
                            className="text-danger"
                        />
                        </Form.Group>

                        {/* Campo: Disponibilidad */}
                        <Form.Group controlId="formAvailability" className="mt-3">
                        <Form.Label>Total de disponibilidad</Form.Label>
                        <Field
                            type="number"
                            name="availability"
                            className="form-control"
                            placeholder="Cantidad disponible"
                        />
                        <ErrorMessage
                            name="availability"
                            component="div"
                            className="text-danger"
                        />
                        </Form.Group>
                    </div>

                    {/* Campo: Límite de Tiempo */}
                    <Form.Group controlId="formLimitTime" className="mt-3">
                      <Form.Label>Límite de Tiempo</Form.Label>
                      <Field
                        type="date"
                        name="limitTime"
                        className="form-control"
                        placeholder="Fecha límite (opcional)"
                      />
                      <ErrorMessage
                        name="limitTime"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>

                    {/* Campo: Contenido */}
                    <Form.Group controlId="formContent" className="mt-3">
                      <Form.Label>Contenido</Form.Label>
                      <Field
                        as="textarea"
                        name="content"
                        className="form-control"
                        placeholder="Contenido adicional"
                      />
                      <ErrorMessage
                        name="content"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>

                    {/* Campo: Fecha de Entrega Estimada */}
                    <Form.Group
                      controlId="formEstimatedDelivery"
                      className="mt-3"
                    >
                      <Form.Label>Fecha de Entrega Estimada</Form.Label>
                      <Field
                        type="month"
                        name="estimatedDelivery"
                        className="form-control"
                        placeholder="Fecha estimada de entrega"
                      />
                      <ErrorMessage
                        name="estimatedDelivery"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>

                    {/* Campo: Envío */}
                    <Form.Group controlId="formShipping" className="mt-3">
                      <Form.Check
                        checked={values.shipping}
                        type="checkbox"
                        name="shipping"
                        label="Requiere Envío"
                        onChange={(e) =>
                          setFieldValue("shipping", e.target.checked)
                        }
                      />
                      <ErrorMessage
                        name="shipping"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>

                    <Form.Group controlId="formMultipleSelect" className="mt-3">
                      <Form.Label>Selecciona los elementos de la recompensa</Form.Label>
                      <Field
                        as="select"
                        name="selectedOptions"
                        multiple
                        className="form-control"
                        onChange={(event) => {
                          const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
                          setFieldValue("selectedOptions", selectedValues);
                        }}
                      >
                        {
                          elements.map((element) => (
                            <option key={element.id} value={element.id}>
                              {element.title}
                            </option>
                          ))
                        }
                      </Field>
                      <ErrorMessage name="selectedOptions" component="div" className="text-danger" />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRewardModal}>
                      Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                      Guardar Cambios
                    </Button>
                  </Modal.Footer>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </Tab>
    </Tabs>
  );
});

export default ElementsManager;
