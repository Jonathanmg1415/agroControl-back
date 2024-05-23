module.exports = {
  friendlyName: 'Guardar egresos',

  description: 'servicio para guardar los egresos',

  inputs: {
    valor: {
      type: 'number',
      required: true,
    },
    fecha: {
      type: 'string',
      required: true,
    },
    descripcion: {
      type: 'string',
      required: true,
    },
    nombre: {
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

  fn: async function (
    {
      fecha,
      nombre,
      descripcion,
      valor,
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
        valor,
      );

      const ingresos =
          await sails.helpers.ingresos.guardarIngresos.with({
            fecha: fecha,
            nombre: nombre,
            descripcion: descripcion,
            valor: valor,
            usuario: this.req.decoded.sub.id,
          });

      return exits.success({
        mensaje: 'Transaccion de registro egreso es correcta',
        datos: { ingresos },
      });
    } catch (error) {
      sails.log.error('Error en la transaccion del registro egreso', error);
      return exits.errorGeneral(error.message);
    }
  },
};
