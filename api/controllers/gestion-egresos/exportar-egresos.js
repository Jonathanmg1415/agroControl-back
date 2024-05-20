/* eslint-disable camelcase */
module.exports = {
  friendlyName: 'Listar egresos para exportar',

  description:
    'Retorna los egresos para exportar, manteniendo el mismo filtro, pero una paginación diferente',

  inputs: {
    pagination: {
      description: 'Filtros de la paginacion exportar.',
      example: 'Objeto paginacion ',
      type: 'ref',
      required: false,
    },

    filter: {
      description: 'Filtros de la paginacion exportar.',
      example: 'Objeto paginacion ',
      type: 'ref',
      required: false,
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
    sails.log.verbose('-----> Listar egresos para exportar');
    sails.log.verbose('Paginacion', pagination, '\n', 'filtro', filter);

    try {
      let registrosEgresos = {};
      await Egresos.getDatastore().transaction(async (db) => {
        registrosEgresos = await sails.helpers.egresos.listarEgresos.with({
          pagination: pagination,
          filter: filter,
        });
      });

      return exits.success({
        mensaje:
          'Consulta de los egresos para exportar esta correcta',
        datos: {
          pagination: registrosEgresos.datos.pagination,
          egresos: registrosEgresos.datos.egresos,
        },
      });
    } catch (error) {
      sails.log.error(
        'Error en la consulta de transacciones de pago para exportar',
        error
      );
      return exits.errorGeneral(error.message);
    }
  },
};
