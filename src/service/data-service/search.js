'use strict';

const {Op} = require(`sequelize`);
const Aliases = require(`../models/aliases`);


class SearchService {
  constructor(sequelize) {
    this._Offer = sequelize.models.Offer;
  }

  async findAll(searchText) {
    const offers = await this._Offer.findAll({
      where: {
        title: {
          [Op.substring]: searchText
        }
      },
      include: [Aliases.CATEGORIES],
    });
    return offers.map((offer) => offer.get());
  }

}

module.exports = SearchService;
