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

const Joi = require('joi');

module.exports = async function (req, res, proceed) {
  /**
   * this is param checking if they are provided
   */
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  try {
    await schema.validateAsync(req.allParams());
  } catch (error) {
    sails.log(error.stringify);
    if (error.name === 'ValidationError') {
      return res.badRequest({ error }).json();
    }
    return res.serverError({ error }).json();
  }

  return proceed();
};
