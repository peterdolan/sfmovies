'use strict';

const Bookshelf = require('../libraries/bookshelf');

module.exports = Bookshelf.Model.extend({
  tableName: 'locations',
  serialize: function () {
    return {
      id: this.get('id'),
      location: this.get('location'),
      movie_id: this.get('movie_id'),
      object: 'location'
    };
  }
});
