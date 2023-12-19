
const formatearFecha = (fecha) => {
    const fechaActual = new Date();
    const fechaRecibo = new Date(fecha);

    if (
        fechaRecibo.getDate() === fechaActual.getDate() &&
        fechaRecibo.getMonth() === fechaActual.getMonth() &&
        fechaRecibo.getFullYear() === fechaActual.getFullYear()
    ) {
        return "Hoy";
    } else if (
        fechaRecibo.getDate() === fechaActual.getDate() - 1 &&
        fechaRecibo.getMonth() === fechaActual.getMonth() &&
        fechaRecibo.getFullYear() === fechaActual.getFullYear()
    ) {
        return "Ayer";
    } else {
        const opcionesFecha = {
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        return fechaRecibo.toLocaleDateString("es-AR", opcionesFecha);
    }
};

module.exports = { formatearFecha }