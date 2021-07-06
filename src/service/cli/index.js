'use strict';

const help = require(`./help`);
const filldb = require(`./fill-db`);
const version = require(`./version`);
const server = require(`./server`);
const fill = require(`./fill`);

const Cli = {
  [filldb.name]: filldb,
  [help.name]: help,
  [version.name]: version,
  [server.name]: server,
  [fill.name]: fill,
};

module.exports = {
  Cli,
};
