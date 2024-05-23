module.exports = {
  friendlyName: 'Listar egresos e ingresos',

  description: 'Obtiene los egresos e ingresos entre dos fechas y los agrupa por mes.',

  inputs: {
    fechaInicial: {
      description: 'Fecha inicial para el rango de búsqueda.',
      type: 'string',
      required: true,
    },

    fechaFinal: {
      description: 'Fecha final para el rango de búsqueda.',
      type: 'string',
      required: true,
    },
  },

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

  fn: async function ({ fechaInicial, fechaFinal }, exits) {
    sails.log.verbose('-----> Listar egresos e ingresos');
    sails.log.verbose('Fecha Inicial:', fechaInicial, '\n', 'Fecha Final:', fechaFinal);

    try {

      const startDate = new Date(fechaInicial);
      const endDate = new Date(fechaFinal);


      const ingresos = await sails.models.ingresos
        .find({
          fecha: { '>=': startDate, '<=': endDate },
        })
        .select(['fecha', 'valor']);


      const egresos = await sails.models.egresos
        .find({
          fecha: { '>=': startDate, '<=': endDate },
        })
        .select(['fecha', 'valortotal']);

      const series = [];
      for (const ingreso of ingresos) {
        series.push({ x: ingreso.fecha.toISOString().substr(0, 10), y: ingreso.valor, tipo: 'Ingreso' });
      }
      for (const egreso of egresos) {
        series.push({ x: egreso.fecha.toISOString().substr(0, 10), y: egreso.valortotal, tipo: 'Egreso' });
      }
      return exits.success({
        mensaje: 'Listado de los egresos e ingresos está correcto',
        datos: {
          series: series
        },
      });
    } catch (error) {
      sails.log.error('Error en el listado de egresos e ingresos', error);
      return exits.errorGeneral(error.message);
    }
  },
};
