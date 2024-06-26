const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Generate new jwt token',

  description: '',

  inputs: {
    subject: {
      type: {},
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {

    const payload = {
      sub: inputs.subject,
      iss: 'LogRocket Sails API',
    };
    const secret = sails.config.jwtSecret || process.env.JWT_SECRET;

    const token = jwt.sign(payload, secret, { expiresIn: '4h' });

    return token;
  },
};
