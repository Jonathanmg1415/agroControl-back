module.exports = {
  friendlyName: 'consultar producto',

  description: '',

  inputs: {
    idProducto: {
      type: 'number',
      required: true,
      example: 123,
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

  fn: async function (inputs, exits) {
    sails.log.verbose('-----> Consultar producto');

    try {
      let producto = await Productos.findOne({
        id: +inputs.idProducto,
      });

      sails.log.verbose('Producto consultado: ', producto);

      return exits.success({
        mensaje: 'Consulta del producto es correcta',
        datos: {
          producto,
        },
      });
    } catch (error) {
      sails.log.error("Error en la transaccion del registro producto", error);
      return exits.errorGeneral(error.message);
    }
  },
};
