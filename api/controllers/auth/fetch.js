module.exports = {
  friendlyName: 'Fetch',

  description: 'Fetch auth.',

  inputs: {
    extratoken: {
      description:
        'The decoded to try in this attempt, e.g. "irl@example.com".',
      type: 'string',
      required: false,
    },
  },

  exits: {
    success: {
      description: 'The requesting user agent has been successfully logged in.',
    },

    badToken: {
      description: `The provided token header does not match any user in the database.`,
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

  fn: async function () {
    const decoded = this.req.decoded;
    const token = this.req.bearerToken;

    sails.log.verbose('fetch decoded', decoded);

    try {
      // Look up by the id.
      // (note that we lowercase it to ensure the lookup is always case-insensitive,
      // regardless of which database we're using)
      var userRecord = await User.findOne({
        id: decoded.sub.id,
      });

      sails.log.verbose('fetch userRecord', userRecord);

      // If there was no matching user, respond thru the "badCombo" exit.
      if (!userRecord) {
        throw 'badToken';
      }

      // Obtener los links
      const links = await sails.helpers.auth.generateMenulinks(
        userRecord.email
      );

      //return the token here
      return {
        ejecucion: {
          respuesta: {
            estado: 'OK',
            message: `${userRecord.email} has been logged in`,
          },
          datos: {
            user: {
              data: userRecord,
            },
            links: links,
            token: '',
          },
        },
      };
    } catch (error) {
      sails.log.error('fetch ', error);
      throw 'badToken';
    }
  },
};
