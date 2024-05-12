var blueprintConfig = require('./blueprints');

var ROUTE_PREFIX = blueprintConfig.blueprints.prefix || '';

function addGlobalPrefix(routes) {
  var paths = Object.keys(routes);
  var newRoutes = {};

  if (ROUTE_PREFIX === '') {
    return routes;
  }

  paths.forEach((path) => {
    var pathParts = path.split(' ');
    var uri = pathParts.pop();
    var prefixedURI = '';
    var newPath = '';

    prefixedURI = ROUTE_PREFIX + uri;

    pathParts.push(prefixedURI);

    newPath = pathParts.join(' ');
    // construct the new routes
    newRoutes[newPath] = routes[path];
  });

  return newRoutes;
}

module.exports.routes = addGlobalPrefix({
  'GET /fetch': { action: 'auth/fetch' },
  'POST /login': { action: 'auth/login' },

});
