/* eslint-disable camelcase */
module.exports = {
  friendlyName: "Eliminar egresos",

  description: "Eliminacion de egresos",

  inputs: {
    idEgreso: {
      type: "number",
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

  fn: async function ({ idEgreso }, exits) {
    sails.log.verbose("-----> Eliminar egresos controller");

    try {
      let egresoEliminado = {};
      await Egresos.getDatastore().transaction(async (db) => {
        egresoEliminado = await sails.helpers.egresos.eliminarEgresos.with({
          idEgreso: idEgreso,
        });
      });

      return exits.success({
        mensaje: "Eliminacion de egresos esta correcto",
        datos: {
          egresoEliminado,
        },
      });
    } catch (error) {
      sails.log.error("Error en la eliminacion de egresos", error);
      return exits.errorGeneral(error.message);
    }
  },
};
