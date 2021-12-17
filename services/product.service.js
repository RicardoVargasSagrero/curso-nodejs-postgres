const faker = require('faker');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {
    //models
    /**
     * Se queda sin constructor el product service
     */
  }

  async create(data) {
    const newProduct = await models.Product.create({
      id: faker.datatype.uuid(),
      ...data,
    });
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    /* const query = 'SELECT * FROM tasks';
    const [data, metadata] = await sequelize.query(query);
    console.log(metadata);
    return data; */
    const rta = await models.Product.findAll();
    return rta;
  }

  async findOne(id) {
    /* const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product; */
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound(`Product: ${id} Not found`);
    }
    return product;
  }

  async update(id, changes) {
    /* const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index]; */
    const product = await this.findOne(id);
    await product.update(changes);
    return { id };
  }

  async delete(id) {
    /* const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id }; */
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsService;
