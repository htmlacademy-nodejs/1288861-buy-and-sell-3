'use strict';

const {Router} = require(`express`);
const csrf = require(`csurf`);

const upload = require(`../middle-wares/upload`);
const auth = require(`../middle-wares/auth`);
const {ensureArray} = require(`../../utils`);

const api = require(`../api`).getAPI();
const offersRouter = new Router();

const csrfProtection = csrf();

offersRouter.get(`/category/:id`, (req, res) => {
  const {user} = req.session;
  res.render(`category`, {user});
});

offersRouter.get(`/add`, auth, csrfProtection, async (req, res) => {
  const {user} = req.session;
  const categories = await api.getCategories();
  res.render(`offers/new-ticket`, {categories, user, csrfToken: req.csrfToken()});
});

offersRouter.post(`/add`, auth, upload.single(`avatar`), csrfProtection, async (req, res) => {
  const {user} = req.session;
  const {body, file} = req;
  const offerData = {
    picture: file ? file.filename : ``,
    sum: body.price,
    type: body.action,
    description: body.comment,
    title: body[`ticket-name`],
    categories: ensureArray(body.category),
    userId: user.id
  };
  try {
    await api.createOffer(offerData);
    res.redirect(`/my`);
  } catch (errors) {
    const errorMessages = errors.response.data.split(`\n`);
    const categories = await api.getCategories();
    res.render(`offers/new-ticket`, {categories, user, errorMessages, csrfToken: req.csrfToken()});
  }
});

offersRouter.get(`/edit/:id`, auth, csrfProtection, async (req, res) => {
  const {user} = req.session;
  const {id} = req.params;
  const [offer, categories] = await Promise.all([
    api.getOffer(id),
    api.getCategories()
  ]);
  res.render(`offers/ticket-edit`, {id, offer, categories, user, csrfToken: req.csrfToken()});
});

offersRouter.post(`/edit/:id`, auth, upload.single(`avatar`), csrfProtection, async (req, res) => {
  const {user} = req.session;
  const {body, file} = req;
  const {id} = req.params;
  const offerData = {
    picture: file ? file.filename : body[`old-image`],
    sum: body.price,
    type: body.action,
    description: body.comment,
    title: body[`ticket-name`],
    categories: ensureArray(body.category),
    userId: user.id
  };
  try {
    await api.editOffer(id, offerData);
    res.redirect(`/my`);
  } catch (errors) {
    const errorMessages = errors.response.data.split(`\n`);
    const [offer, categories] = await Promise.all([
      api.getOffer(id),
      api.getCategories()
    ]);
    res.render(`offers/ticket-edit`, {id, offer, categories, user, errorMessages, csrfToken: req.csrfToken()});
  }
});

offersRouter.get(`/:id`, csrfProtection, async (req, res) => {
  const {user} = req.session;
  const {id} = req.params;
  const offer = await api.getOffer(id, true);
  res.render(`offers/ticket`, {offer, id, user, csrfToken: req.csrfToken()});
});

offersRouter.post(`/:id/comments`, auth, csrfProtection, async (req, res) => {
  const {user} = req.session;
  const {id} = req.params;
  const {comment} = req.body;
  try {
    await api.createComment(id, {userId: user.id, text: comment});
    res.redirect(`/offers/${id}`);
  } catch (errors) {
    const errorMessages = errors.response.data.split(`\n`);
    const offer = await api.getOffer(id, true);
    res.render(`offers/ticket`, {offer, id, user, errorMessages, csrfToken: req.csrfToken()});
  }
});

module.exports = offersRouter;
