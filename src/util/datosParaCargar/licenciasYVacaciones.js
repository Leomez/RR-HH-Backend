const tiposVacaciones =  [
      {
        "nombre": 1,
        "cantDias": 5,
        "descripcion": "vacaciones < 6 meses de antigúedad"
      },
      {
        "nombre": 2,
        "cantDias": 14,
        "descripcion": "vacaciones < 5 año de antiguedad"
      },
      {
        "nombre": 3,
        "cantDias": 21,
        "descripcion": "vacaciones < 10 año de antiguedad"
      },
      {
        "nombre": 4,
        "cantDias": 28,
        "descripcion": "vacaciones < 20 año de antigúedad"
      },
      {
        "nombre": 5,
        "cantDias": 35,
        "descripcion": "vacaciones > 20 año de antigúedad"
      }
    ]

const tipoLicencias = [
    {
      "nombre": "Nacimiento",
      "cantDias": 3,
      "descripcion": "Licencia por nacimiento"
    },
    {
      "nombre": "Maternidad",
      "cantDias": 90,
      "descripcion": "Licencia por maternidad"
    },
    {
      "nombre": "Fallecimiento 1",
      "cantDias": 7,
      "descripcion": "Licencia por fallecimiento de cónyuge o familiar de 1º grado"
    },
    {
      "nombre": "Fallecimiento 2",
      "cantDias": 3,
      "descripcion": "Licencia por fallecimiento de familiar de 2º y 3º grado"
    },
    {
      "nombre": "Casamiento_hijo",
      "cantDias": 2,
      "descripcion": "Licencia por casamiento o nacimiento de hijo"
    },
    {
      "nombre": "Siniestro_vivienda",
      "cantDias": 5,
      "descripcion": "Licencia por siniestro en la vivienda"
    },
    {
      "nombre": "Mudanza",
      "cantDias": 2,
      "descripcion": "Licencia por mudanza"
    },
    {
      "nombre": "Cuidado familiar",
      "cantDias": 10,
      "descripcion": "Licencia por cuidado familiar (por hijo)"
    },
    {
      "nombre": "Día de estudio",
      "cantDias": 10,
      "descripcion": "Licencia por día de estudio"
    },
    {
      "nombre": "Casamiento",
      "cantDias": 15,
      "descripcion": "Licencia por casamiento"
    }
  ]  

  const tipoPermisos = [
    {
      "nombre": "Cambio de Turno"
    },
    {
      "nombre": "Llegar tarde"
    },
    {
      "nombre": "Salir antes"
    },
    {
      "nombre": "Compensar" 
    }
  ]

  module.exports = {
    tiposVacaciones,
    tipoLicencias,
    tipoPermisos,
  }