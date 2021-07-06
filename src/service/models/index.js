"use strict";

const {Model} = require(`sequelize`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineOffer = require(`./offer`);
const Aliases = require(`./aliases`);

class OfferCategory extends Model {}

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Offer = defineOffer(sequelize);

  Offer.hasMany(Comment, {as: Aliases.COMMENTS, foreignKey: `offerId`});
  Comment.belongsTo(Offer, {foreignKey: `offerId`});

  OfferCategory.init({}, {sequelize});

  Offer.belongsToMany(Category, {through: OfferCategory, as: Aliases.CATEGORIES});
  Category.belongsToMany(Offer, {through: OfferCategory, as: Aliases.OFFERS});
  Category.hasMany(OfferCategory, {as: Aliases.OFFER_CATEGORIES});

  return {Category, Comment, Offer, OfferCategory};
};

module.exports = define;
