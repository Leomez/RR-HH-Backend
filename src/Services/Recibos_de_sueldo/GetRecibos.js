const { Recibo_de_sueldo } = require("../../Config/db");
const fs = require("fs").promises;
const path = require("path");
const { PDFDocument, PDFSignature, PDFName, PDFWidgetAnnotation, PDFRef } = require("pdf-lib");


async function obtenerRecibosDeSueldo(id) {
  try {
    const resultados = await Recibo_de_sueldo.findAll({
      where: {
        EmpleadoId: id,
      },
      raw: true,
    });

    if (resultados.length === 0) {
      return {
        success: false,
        message: "No se encontraron resultados",
      };
    } else {
      // Array para almacenar los recibos de sueldo con archivos
      const recibosConArchivos = [];

      // Iterar sobre los resultados y obtener los archivos
      for (const recibo of resultados) {
        const archivoPath = path.join(
          __dirname,
          "../../../uploads/recibos",
          recibo.url_archivo
        );
        try {
          // Lee el archivo como un buffer
          const archivoBuffer = await fs.readFile(archivoPath);

          // Convierte el buffer a base64 para enviarlo al front-end
          // const archivoBase64 = archivoBuffer.toString("base64");

          // Crea un nuevo documento PDF
          const pdfDoc = await PDFDocument.load(archivoBuffer);
          
          
          
          // Guarda el PDF modificado
          const pdfBytes = await pdfDoc.save();

          // Convierte el buffer del PDF a base64 para enviarlo al front-end
          const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

          // Agrega el recibo de sueldo con el archivo al array
          recibosConArchivos.push({
            ...recibo,
            archivo: pdfBase64,
          });
        } catch (error) {
          // Manejar errores de lectura de archivo si es necesario
          console.error("Error al leer el archivo:", error);
        }
      }

      return {
        success: true,
        message: "Se encontraron resultados",
        data: recibosConArchivos,
      };
    }
  } catch (error) {
    throw new Error("Error al obtener los recibos de sueldo: " + error.message);
  }
}

module.exports = { obtenerRecibosDeSueldo };

//
