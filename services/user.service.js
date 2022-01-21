const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

const boom = require('@hapi/boom');
class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer'],
    });
    return rta;
  }
  async findByEmail(email) {
    const user = await models.User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound(`User ${id} Not found`);
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    await user.update(changes);
    return { id };
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
