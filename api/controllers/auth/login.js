module.exports = {
  friendlyName: 'Login',

  description: 'Log in using the provided email and password combination.',

  extendedDescription: `This action attempts to look up the user record in the database with the
specified email address.  Then, if such a user exists, it uses
bcrypt to compare the hashed password from the database with the provided
password attempt.`,

  inputs: {
    email: {
      description: 'The email to try in this attempt, e.g. "irl@example.com".',
      type: 'string',
      required: true,
    },

    password: {
      description:
        'The unencrypted password to try in this attempt, e.g. "passwordlol".',
      type: 'string',
      required: true,
    },
  },

  exits: {
    badCombo: {
      description: `The provided email and password combination does not
      match any user in the database.`,
      responseType: 'unauthorized',
      // ^This uses the custom `unauthorized` response located in `api/responses/unauthorized.js`.
      // To customize the generic "unauthorized" response across this entire app, change that file
      // (see api/responses/unauthorized).
      //
      // To customize the response for _only this_ action, replace `responseType` with
      // something else.  For example, you might set `statusCode: 498` and change the
      // implementation below accordingly (see http://sailsjs.com/docs/concepts/controllers).
    },
  },

  fn: async function ({ email, password }) {

    sails.log.debug('action login');
    // Look up by the email address.
    // (note that we lowercase it to ensure the lookup is always case-insensitive,
    // regardless of which database we're using)
    try {
      var userRecord = await User.findOne({
        email: email.toLowerCase(),
      });

      sails.log.debug('userRecord', userRecord);
      // If there was no matching user, respond thru the "badCombo" exit.
      if (!userRecord) {
        return {
          ejecucion: {
            respuesta: {
              estado: 'NOK',
              message: `Los datos ingresados son incorrectos`,
            },
            datos: {
              user: {
                data: {},
              },
              token: '',
            },
          },
        };
      }

      // If the password doesn't match, then also exit thru "badCombo".
      await sails.helpers.passwords.checkPassword(
        password,
        userRecord.password
      );

      sails.log.debug('checkPassword OK');
      //save the date the token was generated for already inside toJSON()
      const token = await sails.helpers.auth.generateNewJwtToken(
        userRecord.toJSON()
      );

      sails.log.debug('generateNewJwtToken OK');

      // Obtener los links
      const links = await sails.helpers.auth.generateMenulinks(
        userRecord.email
      );

      sails.log.debug('generateMenulinks OK');

      await sails.helpers.auth.updateUserLastSeenAt(userRecord);

      sails.log.debug('updateUserLastSeenAt OK');

      //return the token here
      return {
        ejecucion: {
          respuesta: {
            estado: 'OK',
            message: `${userRecord.email} esta logueado!`,
          },
          datos: {
            user: {
              data: userRecord,
            },
            links: links,
            token: token,
            dominios: ['admin.isimony.com'],
          },
        },
      };
    } catch (error) {
      sails.log.error('login ', error);
      return {
        ejecucion: {
          respuesta: {
            estado: 'NOK',
            message: `Los datos ingresados son incorrectos`,
          },
          datos: {
            user: {
              data: {},
            },
            token: '',
          },
        },
      };
    }
  },
};
