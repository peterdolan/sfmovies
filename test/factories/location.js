'use strict';

const Factory = require('rosie').Factory;

module.exports = Factory.define('location')
  .attr('location', '')
  .attr('movie_id', '');
