/* eslint-disable camelcase */
module.exports = {
  friendlyName: 'Guardar egresos',

  description: 'Helper para guardar el egreso',

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
    valortotal: {
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
    valortotal,
    descripcion,
    usuario,
  }) {
    sails.log.verbose('-----> Helper guardar transaccion egreso');

    try {
      let egresos = {};

      await Egresos.getDatastore().transaction(async (db) => {
        if(nombre === 'Quimico'){
          nombre = 'Fumigación';
        } else if(nombre === 'Abono'){
          nombre = 'Abono';
        }else if(nombre === 'Acarreo'){
          nombre = 'Acarreo';
        }else if(nombre === 'Plantar'){
          nombre = 'Plantación';
        }else if(nombre === 'Mano_obra'){
          nombre = 'Mano_de_obra';
        }

        const nuevoEgreso = {
          fecha: fecha,
          nombre: nombre,
          valortotal: valortotal,
          descripcion: descripcion,
          user_id: +usuario,
        };

        console.log('nuevoEgreso',nuevoEgreso)
        egresos = await Egresos.create(nuevoEgreso)
          .usingConnection(db)
          .fetch();
      });

      return egresos;
    } catch (error) {
      sails.log.error('Error en la transaccion del registro egreso', error);
    }
  },
};
