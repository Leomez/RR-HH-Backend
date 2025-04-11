
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { log } = require("console");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "uploads/otros"; // Inicialmente, una carpeta por defecto
        console.log("Tipo de solicitud:", file, "---fin---");
        if (file.fieldname) {
            log(req.body.tipoSolicitud);
            const folders = {
                recibo: "uploads/recibos",
                cv: "uploads/cvs",
                dni: "uploads/dnis",
                certificado: "uploads/certificados",
                foto: "uploads/fotos",
                reciboSueldo: "uploads/recibosSueldo",
                resumen: "uploads/resumenes",
                solicitud: "uploads/solicitudes"
            };

            folder = folders[file.fieldname] || folder;
        }

        // Asegurar que la carpeta exista
        fs.mkdirSync(folder, { recursive: true });

        cb(null, folder);
    },
    filename: function (req, file, cb) {
        // const uniqueName =
        //     Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
        cb(null, file.originalname); // Usar el nombre original del archivo
    }
});

// Validación de archivos
const fileFilter = function (req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf", "image/jpg", "image/avif"];
    
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Formato de archivo no permitido. Solo JPEG, PNG y PDF."), false);
    }

    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB por archivo
});

module.exports = upload;
