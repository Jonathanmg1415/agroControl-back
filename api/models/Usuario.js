module.exports = {
  datastore: "nombredeldatastore",

  attributes: {
    email: {
      type: "string",
      maxLength: 45,
      protect: true,
      required: true,
      description: "email de usuario",
      example: "test@ejemplo.com",
    },
  },
  customToJSON: function () {
    return _.omit(this, [
      'password',
      'passwordResetToken',
      'passwordResetTokenExpiresAt',
      'emailStatus',
      'lastSeenAt',
      'lastSeenAt',
    ]);
  },
};
