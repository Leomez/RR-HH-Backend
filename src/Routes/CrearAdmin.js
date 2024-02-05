const { crearEmpleado } = require("../Services/Empleado/CrearEmpleado");
const { crearSector } = require("../Services/Sector/CrearSector");

async function CrearAdmin() {
  const sector = {
    nombre_sector: "Sistemas",
  };

  const admin = {
    legajo: "123459",
    dni: "29779354",
    nombre_empleado: "Leonardo Ariel",
    apellido_empleado: "Meza",
    fecha_nac: "1982-08-17",
    telefono: "1156592447",
    correo: "leoariel17@gmail.com",
    fecha_ingr: "2022-06-01",
    sector: "Sistemas",
    cargo: "Empleado",
    categoria: "2°",
    permisos: "ADMIN",
    estado: "Activo",
    domicilio: {
      calle: "Unamuno",
      numero: 3070,
      ciudad: "Quilmes",
      cod_postal: "1879",
    },
  };

  try {
      await crearSector(sector.nombre_sector);
      await crearEmpleado(admin)    
  } catch (error) {
    console.log(error);
  }
}

module.exports = { CrearAdmin }