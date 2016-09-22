'use strict';

const Factory = require('rosie').Factory;

module.exports = Factory.define('movie')
  .attr('location', '')
  .attr('movie_id', '');
