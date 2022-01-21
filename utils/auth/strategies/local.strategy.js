const { Strategy } = require('passport-local');

const UserService = require('./../../../services/user.service');
const service = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const LocalStrategy = new Strategy(
  /**Personalizar como se usan los campos con respecto a la DB*/
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      /**
       * Si pasa todos los filtros para que se puede ejecutar el done
       */
      delete user.dataValues.password;
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
);

module.exports = LocalStrategy;
