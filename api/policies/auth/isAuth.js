module.exports = async function (req, res, proceed) {
  var bearerHeader = req.headers['authorization'];
  sails.log.verbose('bearerHeader ' + bearerHeader);

  try {
    if (typeof bearerHeader === 'undefined') {
      return res.forbidden('No token provided');
    }

    var bearer = bearerHeader.split(' ');
    bearerToken = bearer[1];

    if (bearer[0] !== 'Bearer') {
      return res.forbidden('bearer not understood');
    }

    const decoded = await sails.helpers.auth.verifyJwtToken(bearerToken);

    req.decoded = decoded;

    sails.log.verbose('ok isAuth', decoded);
  } catch (error) {
    sails.log.error('isAuth', error, 'aqui termina el error', error.name);
    if (error.name === 'ValidationError') {
      return res.badRequest({ error }).json();
    } else if (error.name === 'Exception') {
      return res.redirect('/auth/logout');
    }
    return res.serverError({ error }).json();
  }

  return proceed();
};
