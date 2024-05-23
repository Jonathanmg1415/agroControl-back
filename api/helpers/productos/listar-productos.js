module.exports = {
    friendlyName: 'listar productos',
  
    description: '',
  
    inputs: {
      pagination: {
        description: 'Filtros de la paginacion.',
        example: 'Objeto paginacion ',
        type: 'ref',
        required: true,
      },
  
      filter: {
        description: 'Filtros de la paginacion.',
        example: 'Objeto paginacion ',
        type: 'ref',
        required: true,
      },
    },
  
    exits: {
      success: {
        description: 'Finalización satisfactoria para enviar OK',
      },
  
      errorGeneral: {
        description: 'Un error sin identificar generado en el try/catch.',
      },
    },
  
    fn: async function ({ pagination, filter }, exits) {
      sails.log.verbose('-----> Helper Listar productos');
      sails.log.verbose('Paginacion', pagination, '\n', 'filtro', filter);
  
      try {
        let { page, rowsPerPage, sortBy, descending } = pagination;
        const startRow = (page - 1) * rowsPerPage;
        let limite = +pagination.limite;
        let filtroSortBy = [];
        let sort = {};
        if (sortBy) {
          sails.log.verbose('con sortBy', sortBy);
          sort[sortBy] = descending === 'true' ? 'DESC' : 'ASC';
          filtroSortBy = [sort];
        } /*else {
          filtroSortBy = [{ fecha: 'DESC' }];
        }
        let fechaInput = '';*/
        let filtroWhere = {};
  
        /*if (filter.fechaInicial && filter.fechaFinal) {
          fechaInput = new Date(filter.fechaFinal);
          fechaInput.setHours(0.5);
          filtroWhere['fecha'] = {
            '>=': filter.fechaInicial,
            '<=': fechaInput,
          };
        }*/
  
        if (filter.productoBusqueda) {
          filtroWhere['nombre'] = { contains: filter.productoBusqueda.trim() };
        }
  
        let queryCount = {
          where: filtroWhere,
        };
  
        let queryTabla = {
          where: filtroWhere,
          skip: startRow,
          limit: limite,
          sort: filtroSortBy,
        };
        pagination.rowsNumber = await Productos.count(queryCount);
  
        sails.log.verbose('filtroWhere', filtroWhere);
        const Productos = await Productos.find(queryTabla);
        sails.log.verbose('Productos registrados: ', Productos);
  
        return exits.success({
          mensaje: 'Listado de los Productos esta correcto',
          datos: {
            pagination: pagination,
            Productos: Productos,
          },
        });
      } catch (error) {
        sails.log.error('Error en el listado de los Productos', error);
        return exits.errorGeneral(error.message);
      }
    },
  };
  