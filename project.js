import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Proyect = () => {
  const [activeTab, setActiveTab] = useState("basico");

  const renderContent = () => {
    switch (activeTab) {
      case "basico":
        return (
          <>
            <div className="row">
              <div className="col-md-6">
                <h2>Empieza con los fundamentos básicos</h2>
                <p>Haz que sea fácil para las personas conocer tu proyecto.</p>
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
              </div>
              <div className="col-md-6">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="El archivo histórico del Museo de Arte Moderno a tu alcance"
                    />
                    <small className="form-text text-muted">0/60</small>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Subtítulo</label>
                    <textarea
                      className="form-control"
                      placeholder="El proyecto busca poner en valor y digitalizar los archivos históricos del Museo de Arte Moderno para que todos puedan acceder a ellos."
                      rows="3"
                    ></textarea>
                    <small className="form-text text-muted">0/135</small>
                  </div>
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
                </form>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6">
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
              </div>
              <div className="col-md-6">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">Categoría principal</label>
                      <select className="form-select">
                        <option>Tecnología</option>
                        <option>Arte</option>
                        <option>Música</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        Subcategoría principal
                      </label>
                      <select className="form-select">
                        <option>Software</option>
                        <option>Hardware</option>
                      </select>
                    </div>
                    <div className="col-md-6 mt-3">
                      <label className="form-label">Categoría</label>
                      <select className="form-select">
                        <option>Seleccionar</option>
                        <option>Opción 1</option>
                        <option>Opción 2</option>
                      </select>
                    </div>
                    <div className="col-md-6 mt-3">
                      <label className="form-label">Subcategoría</label>
                      <select className="form-select">
                        <option>Seleccionar</option>
                        <option>Opción 1</option>
                        <option>Opción 2</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <h5>Ubicación del proyecto</h5>
                <p>
                  Ingresa la ubicación que mejor describa la ubicación de tu
                  proyecto.
                </p>
              </div>
              <div className="col-md-6">
                <form>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Empieza a escribir tu ubicación..."
                    />
                  </div>
                </form>
              </div>
            </div>
            <hr />

            {/* Imagen del proyecto */}
            <div className="row mb-4">
              <div className="col-md-6">
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
              </div>
              <div className="col-md-6">
                <div className="border p-3 text-center">
                  <button className="btn btn-outline-secondary">
                    Sube una imagen
                  </button>
                  <p className="mt-2">
                    Coloca una imagen aquí o selecciona un archivo.
                  </p>
                  <small>
                    Debe ser un archivo JPG, PNG, GIF o WEBP, no mayor a 50 MB.
                  </small>
                </div>
              </div>
            </div>
            <hr />

            {/* Video del proyecto */}
            <div className="row mb-4">
              <div className="col-md-6">
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
              </div>
              <div className="col-md-6">
                <div className="border p-3 text-center">
                  <button className="btn btn-outline-secondary">
                    Sube un video
                  </button>
                  <p className="mt-2">
                    Coloca un video aquí o selecciona un archivo.
                  </p>
                  <small>
                    Debe ser un archivo MOV, MPEG, AVI, MP4, 3GP, WMV o FLV, no
                    mayor a 5120 MB.
                  </small>
                </div>
                <p className="text-success mt-2">
                  El 80 % de los proyectos exitosos tienen un video...
                </p>
              </div>
            </div>
            <hr />
            {/* Fecha límite de publicación */}
            <div className="row mb-4">
              <div className="col-md-6">
                <h5>Fecha límite de publicación (opcional)</h5>
                <p>
                  Te daremos recomendaciones sobre cuándo completar los pasos
                  que demoren unos días en procesarse. Podrás modificar esta
                  fecha hasta que publiques el proyecto, que debe hacerse
                  manualmente.
                </p>
              </div>
              <div className="col-md-6">
                <div className="border p-3">
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="DD"
                    />
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="MM"
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="YYYY"
                    />
                  </div>
                  <p className="mt-2 text-success">
                    Configurar una fecha objetivo no hará que el proyecto se
                    publique automáticamente.
                  </p>
                </div>
              </div>
            </div>
            <hr />
            {/* Duración de la campaña */}
            <div className="row mb-4">
              <div className="col-md-6">
                <h5>Duración de la campaña</h5>
                <p>
                  Define un límite de tiempo para tu campaña. No podrás
                  cambiarlo después de la publicación.
                </p>
              </div>
              <div className="col-md-6">
                <div className="border p-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="duracion"
                      id="fijo"
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
                    />
                    <label className="form-check-label" htmlFor="fecha">
                      Finalizar en una fecha y hora específica
                    </label>
                  </div>
                  <p className="mt-2 text-success">
                    Las campañas cuya duración se establece por 30 días o
                    menos...
                  </p>
                  <div className="form-check mt-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="contribuciones"
                      id="noActivar"
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
                    />
                    <label className="form-check-label" htmlFor="activar">
                      Activar las contribuciones tardías
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case "funcionamiento":
        return (
          <div>
            {/* Presupuesto del proyecto */}
            <div className="row mb-4">
              <div className="col-md-4">
                <h2>Hablemos de dinero</h2>
                <p>Planifica y administra las finanzas de tu proyecto.</p>
                <h5>
                  Presupuesto del proyecto{" "}
                  <span className="badge bg-success">BETA</span> (opcional)
                </h5>
                <p>
                  Determina los diversos costos para hacer realidad tu proyecto
                  con nuestra plantilla de hojas de cálculo de Google...
                </p>
              </div>
              <div className="col-md-8">
                <div className="border p-3">
                  <h6>Crea y comparte tu presupuesto.</h6>
                  <p>
                    La transparencia puede generar confianza entre tus
                    patrocinadores e incrementar tus posibilidades de ser
                    destacado en Kickstarter.
                  </p>
                  <img
                    src="https://dummyimage.com/150x150/000000/fff"
                    alt="Gráfico"
                    className="img-fluid mb-3"
                  />
                  <form>
                    <div className="mb-3">
                      <label className="form-label">
                        Tu correo electrónico
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                    <button className="btn btn-dark">
                      Generar mi hoja de cálculo
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="row mb-4">
              <div className="col-md-4">
                <h5>Meta</h5>
                <p>
                  Define una meta alcanzable que cubra lo que necesitas para
                  completar tu proyecto...
                </p>
              </div>
              <div className="col-md-8">
                <div className="border p-3">
                  <label className="form-label">Monto de la meta</label>
                  <div className="input-group">
                    <span className="input-group-text">MX$</span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0"
                    />
                  </div>
                  <small className="form-text text-muted">
                    <img
                      src="https://dummyimage.com/100x100/000000/fff"
                      alt="image"
                      className="img-fluid mb-3"
                    />
                    para estimar los costos totales, incluidos los impuestos y
                    cargos.
                  </small>
                </div>
              </div>
            </div>
          </div>
        );
      case "recompensa":
        return <div>Contenido de Recompensa</div>;
      case "historia":
        return (
          <div>
            {/* Historia del proyecto */}
            <div className="row mb-4">
              <div className="col-md-12">
                <h2>Presenta tu proyecto</h2>
                <p>
                  Cuéntale a las personas por qué deberían entusiasmarse con tu
                  proyecto. Sé específico, y a la vez claro y conciso.
                </p>
                <h5>Historia del proyecto</h5>
                <p>
                  Describe cómo se van a emplear los fondos recaudados, por qué
                  este proyecto es importante para ti, cómo planeas llevarlo a
                  cabo y quién eres. <a href="#">Leer más</a> sobre cómo contar
                  tu historia.
                </p>
                <div
                  className="p-1 mb-2 border border-success d-flex align-items-center"
                  role="alert"
                >
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Gráfico"
                    className="img-fluid mb-3"
                  />
                  Te presentamos nuestro editor de historias mejorado
                  <button className="btn btn-outline-secondary ms-auto">
                    Descubre sus funciones
                  </button>
                </div>
                <textarea
                  className="form-control mb-3"
                  rows="5"
                  placeholder="Usa texto, imágenes, videos y audio para redactar una historia cautivadora."
                ></textarea>
              </div>
            </div>
            <hr />
            {/* Riesgos y desafíos */}
            <div className="row mb-4">
              <div className="col-md-4">
                <h5>Riesgos y desafíos</h5>
                <p>
                  Sé honesto acerca de los posibles riesgos y desafíos del
                  proyecto y cómo planeas superarlos para completarlo.
                </p>
              </div>
              <div className="col-md-8">
                <div className="border p-3">
                  <textarea
                    className="form-control mb-2"
                    rows="3"
                    placeholder="Algunos de los riesgos y desafíos comunes que quizás desees abordar son el presupuesto, los plazos para las recompensas y para el proyecto en sí, el tamaño de tu audiencia..."
                  ></textarea>
                  <p className="text-success">
                    <i className="bi bi-lightbulb"></i> Comunica los riesgos y
                    desafíos desde el principio para crear las expectativas
                    adecuadas. <a href="#">Más información...</a>
                  </p>
                </div>
              </div>
            </div>
            <hr />
            {/* Compromisos medioambientales */}
            <div className="row mb-4">
              <div className="col-md-4">
                <h5>Compromisos medioambientales (recomendado)</h5>
                <p>
                  Reduce el impacto de tu proyecto en el planeta y aumenta las
                  posibilidades de destacarte entre los posibles patrocinadores.{" "}
                  <a href="#">Visita nuestro centro de recursos</a> para conocer
                  las prácticas clave.
                </p>
                <p className="text-success">
                  ecovadis logo
                  <br />
                  Ofrecemos solo a los creadores de Kickstarter una
                  actualización gratuita de Ecovadis Premium, que incluye una
                  evaluación de sostenibilidad, un resumen de resultados y un
                  distintivo para las páginas de proyectos con alto rendimiento.
                </p>
              </div>
              <div className="col-md-8">
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
              </div>
            </div>
            <hr />
            {/* Uso de la IA */}
            <div className="row mb-4">
              <div className="col-md-4">
                <h5>Uso de la IA</h5>
                <p>
                  Kickstarter apoya el trabajo creativo y a las personas que lo
                  realizan. Los proyectos que incluyen herramientas y
                  tecnologías de IA están permitidos en algunos casos. Si tu
                  proyecto utiliza IA de alguna manera, cuéntanos un poco más
                  para que podamos evaluar si cumple con los requisitos de
                  nuestra política.
                </p>
                <a href="#">
                  Información sobre la política de IA en Kickstarter
                </a>
              </div>
              <div className="col-md-8">
                <div className="border p-3">
                  <p>
                    ¿Tu proyecto incluirá el desarrollo de tecnología de IA o
                    utilizará contenido de IA?
                  </p>
                  <div className="form-check">
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
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {/* Preguntas frecuentes */}
            <div className="row mb-4">
              <div className="col-md-4">
                <h5>Preguntas frecuentes</h5>
                <p>Publicar respuestas de las preguntas frecuentes</p>
              </div>
              <div className="col-md-8">
                <div className="border p-3 text-center">
                  <button className="btn btn-dark">
                    Añadir otra pregunta frecuente
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "persona":
        return (
          <div>
            {/* Preséntate */}
            <div className="row mb-4">
              <div className="col-md-12">
                <h2>Preséntate</h2>
                <p>
                  Dale a los patrocinadores una idea de quién eres y agrega
                  colaboradores si trabajas con un equipo.
                </p>
              </div>
            </div>

            {/* Tu perfil */}
            <div className="row mb-4">
              <div className="col-md-4">
                <h5>Tu perfil</h5>
                <p>
                  Esto aparecerá en la página de tu proyecto y debe incluir tu
                  nombre, foto y biografía.
                </p>
              </div>
              <div className="col-md-8">
                <div className="border p-3 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Perfil"
                      className="rounded-circle me-3"
                    />
                    <div>
                      <strong>freiman</strong>
                      <p className="mb-0">Creador del proyecto</p>
                    </div>
                  </div>
                  <button className="btn btn-dark">
                    <i className="bi bi-pencil"></i> Completa tu perfil
                  </button>
                </div>
              </div>
            </div>

            {/* URL personalizada */}
            <div className="row mb-4">
              <div className="col-md-4">
                <h5>URL personalizada</h5>
                <p>
                  Crea una URL personalizada para tu página de perfil con al
                  menos tres caracteres. Esta también será el comienzo de la URL
                  de tu proyecto, la generaremos más adelante.
                </p>
              </div>
              <div className="col-md-8">
                <div className="input-group mb-2">
                  <span className="input-group-text">
                    <i className="bi bi-link-45deg"></i>{" "}
                    https://kickstarter.com/profile/
                  </span>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                <div className="d-flex justify-content-between">
                  <small className="form-text text-muted">
                    <i className="bi bi-info-circle"></i> Incluye al menos una
                    letra; también puedes usar números y guiones.
                  </small>
                  <span>0/20</span>
                </div>
                <div className="text-end mt-2">
                  <button className="btn btn-dark">Confirmar</button>
                </div>
              </div>
            </div>

            {/* Colaboradores */}
            <div className="row mb-4">
              <div className="col-md-4">
                <h5>Colaboradores (opcional)</h5>
                <p>
                  Si trabajas con otros, puedes otorgarles permiso para editar
                  este proyecto, comunicarse con los patrocinadores y coordinar
                  la entrega de las recompensas.
                </p>
              </div>
              <div className="col-md-8">
                <div className="border p-3">
                  <div className="alert alert-light border-start border-primary border-3">
                    <i className="bi bi-info-circle-fill me-2 text-primary"></i>
                    Verifica tu correo electrónico antes de agregar
                    colaboradores
                    <small className="d-block">
                      (Si se muestra aquí el correo electrónico incorrecto,{" "}
                      <a href="#">actualízalo en tu cuenta</a>.)
                    </small>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      value="freimanuribe15@gmail.com"
                      readOnly
                    />
                    <button className="btn btn-outline-secondary">
                      Enviar correo de verificación
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "pago":
        return (
          <div>
            {/* Verifica los datos y agrega una cuenta bancaria */}
            <div className="row mb-4">
              <div className="col-md-12">
                <h2>Verifica los datos y agrega una cuenta bancaria</h2>
                <p>
                  Confirma quién va a recaudar y recibir los fondos si el
                  proyecto alcanza la meta de financiamiento. Revisa tu
                  información. Aceptas que los datos proporcionados son
                  verdaderos y reconoces que no se podrán modificar una vez
                  enviados.
                </p>
              </div>
            </div>

            {/* Correo electrónico de contacto */}
            <div className="row mb-4">
              <div className="col-md-4">
                <h5>Correo electrónico de contacto</h5>
                <p>
                  Confirma la dirección de correo electrónico que debemos usar
                  para enviarte correspondencia sobre este proyecto.
                </p>
                <small className="d-block mb-2">
                  (Si se muestra aquí el correo electrónico incorrecto,{" "}
                  <a href="#">actualízalo en tu cuenta</a>.)
                </small>
              </div>
              <div className="col-md-8">
                <div className="border p-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      value="freimanuribe15@gmail.com"
                      readOnly
                    />
                    <button className="btn btn-dark">
                      Enviar correo de verificación
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            {/* Verifica los datos y agrega una cuenta bancaria */}
            <div className="row mb-4">
              <div className="col-md-4">
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
              </div>
              <div className="col-md-8">
                <div className="border p-3 mb-3">
                  <p className="text-center">
                    <i className="bi bi-lock"></i> Completa los pasos anteriores
                    para desbloquear esta sección
                  </p>
                </div>
              </div>
            </div>

            {/* Verificación del proyecto */}
            <div className="row mb-4">
              <div className="col-md-4">
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
              </div>
              <div className="col-md-8">
                <div className="border p-3 mb-3">
                  <p className="text-center">
                    <i className="bi bi-lock"></i> Completa los pasos anteriores
                    para desbloquear esta sección
                  </p>
                </div>
              </div>
            </div>
            <hr />
            {/* Cuenta bancaria */}
            <div className="row mb-4">
              <div className="col-md-4">
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
              </div>
              {/* Sección bloqueada */}
              <div className="col-md-8">
                <div>
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
              </div>
            </div>

            {/* Método de pago */}
            <div className="row mb-4">
              <div className="col-md-4">
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
              </div>

              {/* Sección de contracargos */}
              <div className="col-md-8">
                <div>
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
              </div>
            </div>
          </div>
        );
      case "promocion":
        return (
          <div>
            {/* Prepararse para publicar */}
            <div className="row mb-4">
              <div className="col-md-12">
                <h2>Prepárate para publicar</h2>
                <p>Prepárate para promover tu proyecto.</p>
              </div>
            </div>

            {/* URL del proyecto */}
            <div className="row mb-4">
              <div className="col-md-4">
                <h5>URL del proyecto</h5>
                <p>
                  Usaremos el título de tu proyecto actual para generar una URL.
                  Incluso si cambias el título más adelante, la URL seguirá
                  siendo la misma. La página del proyecto no estará activa hasta
                  que lo publiques.
                </p>
              </div>
              <div className="col-md-8">
                <div className="alert alert-light border border-secondary p-3">
                  <i className="bi bi-lock"></i> No puedes generar tu URL hasta
                  que no lo hayas enviado a revisión.
                </div>
              </div>
            </div>

            {/* Página de pre lanzamiento */}
            <div className="row mb-4">
              <div className="col-md-4">
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
                  </a>{" "}
                  mientras te preparas para publicar tu proyecto. Puedes
                  agregarlos al material gráfico de la promoción en las redes
                  sociales.
                </p>
              </div>
              <div className="col-md-8">
                <div className="alert alert-light border border-secondary p-3">
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
                <button className="btn btn-dark">Activar mi página</button>
              </div>
            </div>
            {/* Etiquetas de referencia personalizadas */}
            <div className="row mb-4">
              <div className="col-md-4">
                <h5>Etiquetas de referencia personalizadas</h5>
                <p>
                  Genera etiquetas de referencia personalizadas a fin de crear
                  enlaces rastreables únicos para tus iniciativas de marketing
                  fuera de Kickstarter.
                </p>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Insertar etiqueta..."
                />
                <div className="">
                  <button className="btn btn-secondary">
                    Generar etiqueta
                  </button>
                </div>
              </div>
            </div>

            {/* Google Analytics */}
            <div className="row mb-4">
              <div className="col-md-4">
                <h5>Google Analytics</h5>
                <p>
                  Esta poderosa herramienta ofrece información sobre el
                  desempeño de tu proyecto, incluido el número de visitantes que
                  acceden a tu página, de dónde vienen y cuántos de ellos hacen
                  contribuciones. Escribe un ID de seguimiento o secreto de API
                  para conectar tu proyecto.
                </p>
              </div>
              <div className="col-md-8 row mb-4">
                <div className="col-md-6">
                  <label>ID de seguimiento</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
                <div className="col-md-6">
                  <label>Secreto de API</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-12 text-end">
                  <button className="btn btn-secondary">Guardado</button>
                </div>
              </div>
            </div>
            {/* Pixel de Meta */}
            <div className="row mb-4">
              <div className="col-md-4">
                <h2>Pixel de Meta</h2>
                <p>
                  El pixel de Meta (anteriormente, pixel de Facebook) es una
                  herramienta que mide la eficacia de la publicidad en Facebook
                  e Instagram. Agregar un <a href="#">ID de pixel</a> te permite
                  saber si tus anuncios llegan a la audiencia que te interesa
                  antes y durante tu campaña.
                </p>
              </div>
              <div className="col-md-8">
                <label htmlFor="pixelId" className="form-label">
                  ID de pixel
                </label>
                <input
                  type="text"
                  id="pixelId"
                  className="form-control"
                  placeholder="123456789123456789"
                />
                <button className="btn btn-secondary mt-4">Guardado</button>
              </div>
            </div>

            {/* Token de acceso */}
            <div className="row mb-4">
              <div className="col-md-4">
                <h5>Token de acceso para la API de conversiones de Meta</h5>
                <p>
                  La API de conversiones de Meta funciona junto con el pixel de
                  Meta para crear una conexión de eventos directa y más
                  confiable entre Kickstarter y Meta. Agrega un{" "}
                  <a href="#">Token de acceso</a> para conectar Kickstarter a tu
                  administrador de eventos de Meta.
                </p>
              </div>
              <div className="col-md-8">
                <label htmlFor="accessToken" className="form-label">
                  Token de acceso
                </label>
                <input type="text" id="accessToken" className="form-control" />
                <button className="btn btn-secondary mt-4">Guardado</button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "basico" ? "active" : ""}`}
            onClick={() => setActiveTab("basico")}
          >
            Básico
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "funcionamiento" ? "active" : ""
            }`}
            onClick={() => setActiveTab("funcionamiento")}
          >
            Funcionamiento
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "recompensa" ? "active" : ""}`}
            onClick={() => setActiveTab("recompensa")}
          >
            Recompensa
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "historia" ? "active" : ""}`}
            onClick={() => setActiveTab("historia")}
          >
            Historia
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "persona" ? "active" : ""}`}
            onClick={() => setActiveTab("persona")}
          >
            Persona
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "pago" ? "active" : ""}`}
            onClick={() => setActiveTab("pago")}
          >
            Pago
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "promocion" ? "active" : ""}`}
            onClick={() => setActiveTab("promocion")}
          >
            Promoción
          </button>
        </li>
      </ul>
      <div className="tab-content mt-3">{renderContent()}</div>
    </div>
  );
};

export default Proyect;
