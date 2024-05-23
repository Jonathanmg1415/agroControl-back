

/* eslint-disable camelcase */
module.exports = {
  friendlyName: 'Guardar ingresos',

  description: 'Helper para guardar el ingreso',

  inputs: {
    fecha: {
      type: 'string',
      required: true,
      example: '2022-06-17',
    },
    nombre: {
      type: 'string',
      required: true,
      example: 'enum',
    },
    valor: {
      type: 'number',
      required: true,
      example: 1000000,
    },
    descripcion: {
      type: 'string',
      required: true,
      example: 'enum',
    },
    usuario: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({
    fecha,
    nombre,
    valor,
    descripcion,
    usuario,
  }) {
    sails.log.verbose('-----> Helper guardar transaccion ingreso');

    try {
      let ingresos = {};

      await Ingresos.getDatastore().transaction(async (db) => {

        const nuevoIngreso= {
          fecha: fecha,
          nombre: nombre,
          valor: valor,
          descripcion: descripcion,
          user_id: +usuario,
        };

        console.log('nuevoIngreso',nuevoIngreso);
        ingresos = await Ingresos.create(nuevoIngreso)
          .usingConnection(db)
          .fetch();
      });

      return ingresos;
    } catch (error) {
      sails.log.error('Error en la transaccion del registro ingreso', error);
    }
  },
};
