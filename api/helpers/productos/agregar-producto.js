/* eslint-disable camelcase */
module.exports = {
  friendlyName: 'Agregar producto',

  description: 'Helper para agregar producto',

  inputs: {
    nombre: {
      type: 'string',
      required: true,
      example: 'enum',
    },
    tipo: {
      type: 'string',
      required: true,
      example: 'enum',
    },
    valorestimado: {
      type: 'number',
      required: true,
      example: 1000000,
    },
    descripcion: {
      type: 'string',
      required: true,
      example: 'enum',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({
    nombre,
    tipo,
    valorestimado,
    descripcion,
  }) {
    sails.log.verbose('-----> Helper agregar producto');

    try {
      let productos = {};

      await Productos.getDatastore().transaction(async (db) => {

        const nuevoProducto = {
          nombre: nombre,
          tipo: tipo,
          valorestimado: valorestimado,
          descripcion: descripcion,
        };

        productos = await Productos.create(nuevoProducto)
          .usingConnection(db)
          .fetch();
      });

      return productos;
    } catch (error) {
      sails.log.error('Error en la transaccion del registro producto', error);
    }
  },
};
