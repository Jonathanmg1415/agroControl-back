const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Verify jwt token',

  description: '',

  inputs: {
    token: {
      description: 'token para validar.',
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
    badToken: {
      description: `The provided token header does not match.`,
    },
    expired: {
      description: 'Session timed out, please login again.',
    },
  },

  fn: async function ({ token }) {
    sails.log.verbose('verify jwt token', token);

    const secret = sails.config.jwtSecret || process.env.JWT_SECRET;

    try {
      //verify if this token was from us or not
      const decoded = await jwt.verify(token, secret);
      sails.log.verbose('verify jwt token decoded', decoded);
      return decoded;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw { expired: 'Session timed out, please login again' };
      } else {
        sails.log.error('verification error', err);
        return res.forbidden('Error authenticating, please login again');
      }
    }
  },
};
