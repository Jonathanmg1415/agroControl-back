module.exports = {
  friendlyName: 'Guardar egresos',

  description: 'servicio para guardar los egresos',

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
    descripcion: {
      type: 'string',
      required: true,
      example: 'enum',
    },
    valortotal: {
      type: 'number',
      required: true,
      example: 1000000,
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

  fn: async function (
    {
      fecha,
      nombre,
      descripcion,
      valortotal,
    },
    exits
  ) {
    sails.log.verbose('-----> Guardar registro del egreso');

    try {
      sails.log.info(
        'Estos son los datos ',
        fecha,
        nombre,
        this.req.decoded.sub,
        descripcion,
        valortotal,
      );

      const egresos =
          await sails.helpers.egresos.guardarEgresos.with({
            fecha: fecha,
            nombre: nombre,
            descripcion: descripcion,
            valortotal: valortotal,
            usuario: this.req.decoded.sub.id,
          });

      return exits.success({
        mensaje: 'Transaccion de registro egreso es correcta',
        datos: { egresos },
      });
    } catch (error) {
      sails.log.error('Error en la transaccion del registro egreso', error);
      return exits.errorGeneral(error.message);
    }
  },
};
