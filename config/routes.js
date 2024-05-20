var blueprintConfig = require("./blueprints");

var ROUTE_PREFIX = blueprintConfig.blueprints.prefix || "";

function addGlobalPrefix(routes) {
  var paths = Object.keys(routes);
  var newRoutes = {};

  if (ROUTE_PREFIX === "") {
    return routes;
  }

  paths.forEach((path) => {
    var pathParts = path.split(" ");
    var uri = pathParts.pop();
    var prefixedURI = "";
    var newPath = "";

    prefixedURI = ROUTE_PREFIX + uri;

    pathParts.push(prefixedURI);

    newPath = pathParts.join(" ");
    // construct the new routes
    newRoutes[newPath] = routes[path];
  });

  return newRoutes;
}

module.exports.routes = addGlobalPrefix({
  /*
   * Rutas para las acciones de autenticación
   *
   */
  "GET /fetch": { action: "auth/fetch" },
  "POST /login": { action: "auth/login" },

  /*
   * Rutas para las acciones de los egresos
   *
   */

  'GET /egresos': { action: 'gestion-egresos/listar-egresos' },
  'GET /egresos/exportar': { action: 'gestion-egresos/exportar-egresos'},
});
