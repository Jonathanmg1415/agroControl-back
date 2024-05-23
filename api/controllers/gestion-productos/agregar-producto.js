module.exports = {
  friendlyName: "Agregar producto",

  description: "servicio para agregar los productos",

  inputs: {
    nombre: {
      type: "string",
      required: true,
      example: "enum",
    },
    tipo: {
      type: "string",
      required: true,
      example: "enum",
    },
    valorestimado: {
      type: "number",
      required: true,
      example: 1000000,
    },
    descripcion: {
      type: "string",
      required: true,
      example: "enum",
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

  fn: async function ({ nombre, tipo, valorestimado, descripcion }, exits) {
    sails.log.verbose("-----> Agregar nuevo producto");

    try {
      sails.log.info(
        "Estos son los datos ",
        nombre,
        tipo,
        valorestimado,
        descripcion
      );

      const productos = await sails.helpers.productos.agregarProducto.with({
        nombre: nombre,
        tipo: tipo,
        descripcion: descripcion,
        valorestimado: valorestimado,
      });

      return exits.success({
        mensaje: "Transaccion de registro producto es correcta",
        datos: { productos },
      });
    } catch (error) {
      sails.log.error("Error en la transaccion del registro producto", error);
      return exits.errorGeneral(error.message);
    }
  },
};
