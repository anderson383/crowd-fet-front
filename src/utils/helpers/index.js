import moment from "moment";

export const formatPrice = (money) => {
  const price = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(money);

  return price;
};

export const calcularPorcentaje = (meta, mount) => {
  const porcentajeFaltante = 100 - ((meta - mount) / meta) * 100;
  return porcentajeFaltante;
};

export const calcularDiasConMoment = (launchDate, campaignDuration) => {
  const fechaInicio = moment(launchDate);
  console.log(fechaInicio, "fechaInicio");
  const fechaFin = moment(campaignDuration);

  const dias = fechaFin.diff(fechaInicio, "days");

  return dias;
}

export const capitalizeText = (text) => {
   return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
 }