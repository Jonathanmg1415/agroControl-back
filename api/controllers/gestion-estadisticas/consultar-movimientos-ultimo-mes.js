module.exports = {
  friendlyName: 'Listar egresos e ingresos de los últimos 30 días',

  description: 'Obtiene los egresos e ingresos de los últimos 30 días y los agrupa en un array con su respectivo tipo.',

  inputs: {},

  exits: {
    success: {
      description: 'Finalización satisfactoria para enviar OK',
      responseType: 'okResponse',
    },

    errorGeneral: {
      description: 'Un error sin identificar generado en el try/catch.',
      responseType: 'nokResponse',
    },
  },

  fn: async function (_, exits) {
    sails.log.verbose('-----> Listar egresos e ingresos de los últimos 30 días');

    try {
      // Obtener la fecha de hace 30 días
      const fechaInicial = new Date();
      fechaInicial.setDate(fechaInicial.getDate() - 30);

      // Consulta para obtener los ingresos de los últimos 30 días
      const ingresos = await sails.models.ingresos.find({
        fecha: { '>=': fechaInicial, '<=': new Date() },
      });

      // Consulta para obtener los egresos de los últimos 30 días
      const egresos = await sails.models.egresos.find({
        fecha: { '>=': fechaInicial, '<=': new Date() },
      });

      // Crear un array para almacenar los movimientos de los últimos 30 días
      const movimientos = [];

      // Agregar los ingresos al array de movimientos con su tipo correspondiente
      for (const ingreso of ingresos) {
        movimientos.push({
          tipo: 'ingreso',
          descripcion: ingreso.descripcion,
          fecha: ingreso.fecha,
          monto: ingreso.valor,
        });
      }

      // Agregar los egresos al array de movimientos con su tipo correspondiente
      for (const egreso of egresos) {
        movimientos.push({
          tipo: 'egreso',
          descripcion: egreso.descripcion,
          fecha: egreso.fecha,
          monto: egreso.valortotal,
        });
      }

      return exits.success({
        mensaje: 'Listado de egresos e ingresos de los últimos 30 días obtenido correctamente',
        datos: {
          movimientos: movimientos,
        },
      });
    } catch (error) {
      sails.log.error('Error al listar egresos e ingresos de los últimos 30 días:', error);
      return exits.errorGeneral(error.message);
    }
  },
};
