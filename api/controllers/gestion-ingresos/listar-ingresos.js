module.exports = {
  friendlyName: 'listar ingresos',

  description: '',

  inputs: {
    pagination: {
      description: 'Filtros de la paginacion.',
      example: 'Objeto paginacion ',
      type: 'ref',
      required: true,
    },

    filter: {
      description: 'Filtros de la paginacion.',
      example: 'Objeto paginacion ',
      type: 'ref',
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

  fn: async function ({ pagination, filter }, exits) {
    sails.log.verbose('-----> Listar ingresos');
    sails.log.verbose('Paginacion', pagination, '\n', 'filtro', filter);

    try {
      let ingresos = await sails.helpers.ingresos.listarIngresos.with({
        pagination: pagination,
        filter: filter,
      });

      return exits.success({
        mensaje: 'Listado de los ingresos esta correcto',
        datos: {
          pagination: ingresos.datos.pagination,
          records: {
            data: ingresos.datos.ingresos,
          },
        },
      });
    } catch (error) {
      sails.log.error('Error en el listado de egresos', error);
      return exits.errorGeneral(error.message);
    }
  },
};
