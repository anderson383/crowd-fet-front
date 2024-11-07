export const createFormData = (data, formData = new FormData()) => {
  // Mapea cada clave y valor de data en el FormData proporcionado o el nuevo
  Object.keys(data).forEach((key) => {
      // Solo agrega valores no nulos
      if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
      }
  });

  return formData;
};
