'use strict';

const Factory = require('rosie').Factory;

module.exports = Factory.define('movie')
  .attr('title', '')
  .attr('release_year', '');
