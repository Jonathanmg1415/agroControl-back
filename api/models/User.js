/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: 'agrocontroldb',

  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    password: {
      type: 'string',
      protect: true,
      required: true,
      description: 'Representación hash de la clase de un identificacion.',
      example: '2$28a8eabna301089103-13948134nad',
    },
    email: {
      type: 'string',
      unique: true,
      isEmail: true,
      maxLength: 80,
      required: true,
      example: 'mary.escobar@example.com',
      extendedDescription: 'Email ',
    },
    status: {
      type: 'string',
      isIn: ['change-requested', 'confirmed'],
      defaultsTo: 'confirmed',
    },
    roles: {
      type: 'string',
      isIn: ['cliente', 'admin'],
      defaultsTo: 'cliente',
    },
    passwordResetToken: {
      type: 'string',
      description:
        'Un token único utilizado para verificar que el identificacion es quién esta recuperando la contraseña. Expira despues de un (1) uso o despues de que pasa un tiempo.',
      allowNull: true,
    },
    passwordResetTokenExpiresAt: {
      type: 'number',
      description:
        'Un JS timestamp representa el momento que `passwordResetToken` expira o 0 si el identificacion no solito el token.',
      example: 1502844074211,
      allowNull: true,
    },
    lastSeenAt: {
      type: 'number',
      description:
        'A JS timestamp representa el momento más reciente que el identificacion a interactuado con el backend o 0 si no esta logueado o no interactua.',
      example: 1502844074211,
      allowNull: true,
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
  },
  customToJSON: function () {
    return _.omit(this, [
      'password',
      'passwordResetToken',
      'passwordResetTokenExpiresAt',
      'status',
      'lastSeenAt',
      'lastSeenAt',
    ]);
  },
};
