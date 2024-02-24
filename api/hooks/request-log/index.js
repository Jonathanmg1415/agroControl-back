var morgan = require('morgan');

module.exports = function requestLog(sails) {
  return {
    /**
     * Default configuration
     *
     * We do this in a function since the configuration key for
     * the hook is itself configurable, so we can't just return
     * an object.
     */
    defaults: {
      requestlogger: {
        // Turn morgan logging on by default in development environment
        // and off for production, using the 'dev' format
        //see: https://github.com/expressjs/morgan#predefined-formats for more formats
        format: 'dev',
        inDevelopment: true,
        inProduction: false,
      },
    },

    routes: {
      before: {
        'ALL /*': function addRequestLogging(req, res, next) {
          sails.log.verbose('addRequestLogging');
          // If the hook has been deactivated, just return
          //Need to define requestlogger manually, since don't have acces to this.configKey
          var loggerSettings = sails.config['requestlogger'];
          var isProduction = process.env.NODE_ENV === 'production';

          if (
            (isProduction && loggerSettings.inProduction === true) ||
            (!isProduction && loggerSettings.inDevelopment === true)
          ) {
            var logger = morgan(loggerSettings.format);
            logger(req, res, (err) => {
              if (err) {
                return next(err);
              }

              next();
            });
          } else {
            return next();
          }
        },
      },
    },

    /**
     * Initialize the hook
     * @param  {Function} cb Callback for when we're done initializing
     */
    initialize: function (cb) {
      // Finally
      sails.log.verbose('cb addRequestLogging');

      cb();
    },
  };
};
