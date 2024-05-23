module.exports = {
  friendlyName: "editar producto",

  description: "Para actualizar los datos de un producto",

  inputs: {
    datosProducto: {
      type: "ref",
      required: true,
    },
  },

  exits: {
    success: {
      description: "Finalización satisfactoria para enviar OK",
      responseType: "okResponse",
    },

    errorGeneral: {
      description: "Un error sin identificar generado en el try/catch.",
      responseType: "nokResponse",
    },
  },

  fn: async function ({ datosProducto }, exits) {
    sails.log.verbose("-----> Editar producto");

    try {
      let registroProducto = {};

      await Productos.getDatastore().transaction(async (db) => {
        sails.log.verbose("Actualizar producto en la base de datos");

        registroProducto = await Productos.updateOne({
          id: datosProducto.id,
        })
          .set(datosProducto)
          .usingConnection(db);
      });

      return exits.success({
        mensaje: "Actualización de datos del producto finaliza correctamente",
        datos: {
          registroProducto,
        },
      });
    } catch (error) {
      sails.log.error("Error en la transaccion del registro producto", error);
      return exits.errorGeneral(error.message);
    }
  },
};
