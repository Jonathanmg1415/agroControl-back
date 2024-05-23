/* eslint-disable camelcase */
module.exports = {
  friendlyName: "Eliminar egresos",

  description: "Helper para Eliminar el egreso",

  inputs: {
    idEgreso: {
      type: "number",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function ({ idEgreso }) {
    sails.log.verbose("-----> Helper Eliminar transaccion egreso");

    try {
      let egresoEliminado = {};

      await Egresos.getDatastore().transaction(async (db) => {
        const consultaEgresoExistente = await Egresos.findOne({
          id: idEgreso,
        });

        if (!consultaEgresoExistente) {
          throw new Error(
            "Error: El egreso que requiere eliminar no se encuentra"
          );
        }

        egresoEliminado = await Egresos.destroyOne({
          id: consultaEgresoExistente.id,
        }).usingConnection(db);

        sails.log.verbose("Egreso Eliminado: ", egresoEliminado);
      });

      return egresoEliminado;
    } catch (error) {
      sails.log.error("Error en la transaccion del registro egreso", error);
    }
  },
};
