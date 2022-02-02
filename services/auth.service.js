const UserService = require('./user.service');
const service = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');
const nodemailer = require('nodemailer');

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('User unauthorized');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized('User unauthorized');
    }
    /**
     * Si pasa todos los filtros para que se puede ejecutar el done
     */
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }
  async sendRecoveryPassword(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: 'downtoearthpruebas@gmail.com', // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Recovery Password', // Subject line
      text: 'Hola, Bienvenido a la recuperación de contraseña', // plain text body
      html: `<b>Ingresa a este link para cambiar la contraseña => ${link} </b>
            <b> Cuenta con 15 minutos para cambiar la contraseña </b>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.nodemailerEmail,
        pass: config.nodemailerPassword,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' };
  }

  async changePassword(token, newPassword) {
    /**Falta validación de newPassword */
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });
      return { message: 'password changed' };
    } catch (err) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;
