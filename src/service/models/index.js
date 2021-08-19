"use strict";

const {Model} = require(`sequelize`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineOffer = require(`./offer`);
const defineUser = require(`./user`);
const Aliases = require(`./aliases`);

class OfferCategory extends Model {}

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Offer = defineOffer(sequelize);
  const User = defineUser(sequelize);

  Offer.hasMany(Comment, {as: Aliases.COMMENTS, foreignKey: `offerId`});
  Comment.belongsTo(Offer, {foreignKey: `offerId`});

  OfferCategory.init({}, {sequelize});

  Offer.belongsToMany(Category, {through: OfferCategory, as: Aliases.CATEGORIES});
  Category.belongsToMany(Offer, {through: OfferCategory, as: Aliases.OFFERS});
  Category.hasMany(OfferCategory, {as: Aliases.OFFER_CATEGORIES});

  User.hasMany(Offer, {as: Aliases.OFFERS, foreignKey: `userId`});
  Offer.belongsTo(User, {as: Aliases.USERS, foreignKey: `userId`});

  User.hasMany(Comment, {as: Aliases.COMMENTS, foreignKey: `userId`});
  Comment.belongsTo(User, {as: Aliases.USERS, foreignKey: `userId`});

  return {Category, Comment, Offer, OfferCategory, User};
};

module.exports = define;
