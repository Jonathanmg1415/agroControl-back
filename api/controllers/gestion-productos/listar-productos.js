module.exports = {
  friendlyName: 'listar productos',

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
    sails.log.verbose('-----> Listar productos');
    sails.log.verbose('Paginacion', pagination, '\n', 'filtro', filter);

    try {
      let productos = await sails.helpers.productos.listarProductos.with({
        pagination: pagination,
        filter: filter,
      });

      return exits.success({
        mensaje: 'Listado de los productos esta correcto',
        datos: {
          pagination: productos.datos.pagination,
          records: {
            data: productos.datos.productos,
          },
        },
      });
    } catch (error) {
      sails.log.error('Error en el listado de productos', error);
      return exits.errorGeneral(error.message);
    }
  },
};
