import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Table, Modal, Form,Alert } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Modelo inicial para un elemento nuevo
const initialElementState = {
    id: '',
    title: '',
    imageId: null, // Imagen se almacena como File
};

// Esquema de validación con Yup
const validationSchema = Yup.object({
    title: Yup.string()
        .required('El título es obligatorio')
        .min(3, 'El título debe tener al menos 3 caracteres'),
    imageId: Yup.mixed()
        .required('La imagen es obligatoria')
        .test('fileType', 'Formato no válido. Solo imágenes', (value) => {
            return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
        })
});

// eslint-disable-next-line react/display-name
const ElementsManager = forwardRef((props, ref) => {
    const [alertElements, setAlertElements] = useState(false);
    const [elements, setElements] = useState([]); // Lista de elementos
    const [showModal, setShowModal] = useState(false); // Mostrar modal
    const [isEditing, setIsEditing] = useState(false); // Estado de edición
    const [previewImage, setPreviewImage] = useState(null); // Vista previa de la imagen

    // Función para abrir el modal y preparar los datos
    const handleShowModal = (element = initialElementState) => {
        setIsEditing(!!element.id);
        setPreviewImage(element.imageId ? URL.createObjectURL(element.imageId) : null);
        setShowModal(true);
    };

    // Función para cerrar el modal y limpiar los datos
    const handleCloseModal = () => {
        setShowModal(false);
        setPreviewImage(null);
    };

    // Manejo de cambios para el archivo de imagen
    const handleImageChange = (e, setFieldValue) => {
        const file = e.target.files[0];
        if (file) {
            setFieldValue('imageId', file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };
    

    const handleExternalSubmit = () => {
        if ((elements || []).length === 0) {
            setAlertElements(true)
            return;
        }
    };

    useImperativeHandle(ref, () => ({
        handleExternalSubmit
    }));

    return (
        <div className="container mt-5">
            <div className='d-flex justify-content-between mb-5 align-items-center'>
              <div className='w-50'>
                <h2>Crea tus recompensas</h2>
                <p>Incluir artículos en sus recompensas y complementos facilita que los patrocinadores comprendan y comparen sus ofertas. Un artículo puede ser cualquier cosa que planee ofrecer a sus patrocinadores. Algunos ejemplos incluyen naipes, una copia digital de un libro, una entrada para una obra de teatro o incluso un agradecimiento en su documental.</p>
              </div>
                <Button variant="primary" onClick={() => handleShowModal()} className="mb-3" style={{ height: 'max-content' }}>
                    Crear Elemento
                </Button>
            </div>
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
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                    />
                                ) : (
                                    'No image'
                                )}
                            </td>
                            <td>
                                <Button variant="primary" onClick={() => handleShowModal(element)} className="me-2">
                                    Editar
                                </Button>
                                <Button variant="danger" onClick={() => setElements(elements.filter((el) => el.id !== element.id))}>
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

            {alertElements && (
                <Alert variant="danger" className="mt-2">
                Sebe añadir por lo menos una recompensa para poder continuar
                </Alert>
              )}

            {/* Modal para crear o editar elemento */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar Elemento' : 'Crear Elemento'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialElementState}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            if (isEditing) {
                                setElements((prevElements) =>
                                    prevElements.map((el) => (el.id === values.id ? values : el))
                                );
                            } else {
                                setElements((prevElements) => [
                                    ...prevElements,
                                    { ...values, id: Date.now().toString() } // Genera ID temporal
                                ]);
                            }
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
                                        <div className="mt-2">
                                            <img 
                                                src={previewImage} 
                                                alt="preview" 
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                                            />
                                        </div>
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
                                        {isEditing ? 'Guardar Cambios' : 'Crear Elemento'}
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </div>
    );
});

export default ElementsManager;
