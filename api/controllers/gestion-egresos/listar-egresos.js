module.exports = {
  friendlyName: 'listar egresos',

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
    sails.log.verbose('-----> Listar egresos');
    sails.log.verbose('Paginacion', pagination, '\n', 'filtro', filter);

    try {
      let egresos = await sails.helpers.egresos.listarEgresos.with({
        pagination: pagination,
        filter: filter,
      });

      return exits.success({
        mensaje: 'Listado de los egresos esta correcto',
        datos: {
          pagination: egresos.datos.pagination,
          records: {
            data: egresos.datos.egresos,
          },
        },
      });
    } catch (error) {
      sails.log.error('Error en el listado de egresos', error);
      return exits.errorGeneral(error.message);
    }
  },
};
