/**
 * is-super-admin
 *
 * A simple policy that blocks requests from non-super-admins.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */

module.exports = async function (req, res, proceed) {
  var bearerHeader = req.headers['authorization'];
  sails.log.verbose('bearerHeader', bearerHeader);

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

    sails.log.verbose('ok fetch', decoded);
    req.decoded = decoded;
    req.bearerToken = bearerToken;
  } catch (error) {
    sails.log.error('okFetch', error);
    if (error.name === 'ValidationError') {
      return res.badRequest({ error }).json();
    }

    return res.serverError({ error }).json();
  }

  return proceed();
};
