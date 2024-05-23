module.exports = {
  friendlyName: 'Agregar producto',

  description: 'servicio para agregar los productos',

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
      nombre,
      tipo,
      valorestimado,
      descripcion      
    },
    exits
  ) {
    sails.log.verbose('-----> Agregar nuevo producto');

    try {
      sails.log.info(
        'Estos son los datos ',
        nombre,
        tipo,
        valorestimado,
        descripcion
        
      );      
    
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

    }  catch (error) {
      sails.log.error('Error al agregar el producto', error);
      if (error.message === 'Datos de entrada no válidos') {
        return exits.invalidData(error.message);
      } else {
        return exits.errorGeneral(error.message);
      }
    }
  },
};